import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getUserDetails, updateUser } from "../api/userAPI";
import { CgProfile } from "react-icons/cg";
import profileImg from "../assets/profile_img_placeholder.svg";
import { IoCameraOutline } from "react-icons/io5";
import imageCompression from "browser-image-compression";
import GridLoader from "react-spinners/GridLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
// import { formatRelativeTime } from "../helpers/FormattedTime";
import { toast } from "react-toastify";
import { formattedTime } from "../helpers/FormattedTime";

interface FormErrorTypes {
  name: { error: boolean; errorMsg: string };
  phone: { error: boolean; errorMsg: string };
  address: { error: boolean; errorMsg: string };
  profilePic: { error: boolean; errorMsg: string };
}
const initialFormErrors:FormErrorTypes = {
  name: { error: false, errorMsg: "" },
  phone: { error: false, errorMsg: "" },
  address: { error: false, errorMsg: "" },
  profilePic: { error: false, errorMsg: "" },
};

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [formErrors, setFormErrors] = useState<FormErrorTypes>(initialFormErrors);
  const [changeDetected, setchangeDetected] = useState<boolean>(false);
  const [isUserUpdated, setIsUserUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let loggedInUser: any;

  const userJSON = localStorage.getItem("user");

  if (userJSON !== null) {
    loggedInUser = JSON.parse(userJSON);
  }
  const validateName = (name:string,value:string) =>{
    if(value.length<5){
        setFormErrors({...formErrors,[name]:{
          error:true,
          errorMsg:"Name should be at least 5 characters long"
        }});
        return;
    }else{
        setFormErrors({...formErrors,[name]:{
          error:false,
          errorMsg:""
        }});
    }
}
const validatePhone = (name:string,value:string) =>{
  const phoneRegx = /^[6-9]\d{9}$/;
  if(!phoneRegx.test(value)){
      setFormErrors({...formErrors,[name]:{
        error:true,
        errorMsg:"Phone number should be valid"
      }});
      return;
  }else{
      setFormErrors({...formErrors,[name]:{
        error:false,
        errorMsg:""
      }});
  }
}
const validateAddress = (name:string,value:string) =>{
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  if(!addressRegex.test(value)){
      setFormErrors({...formErrors,[name]:{
        error:true,
        errorMsg:"Address should be at least 3 characters long"
      }});
      return;
  }else{
      setFormErrors({...formErrors,[name]:{
        error:false,
        errorMsg:""
      }});
  }
} 
    

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setchangeDetected(true);
    if(e.target.name === "name"){
      validateName(e.target.name,e.target.value);
    }else if(e.target.name === "phone"){
      validatePhone(e.target.name,e.target.value);
    }else if(e.target.name === "address"){  
      validateAddress(e.target.name,e.target.value);
    }
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // const target = e.target as HTMLInputElement;
    setchangeDetected(true);
    if (e.target.files && e.target.files[0]) {
      const imgFile: File = e.target.files[0]; // Ensured it's not null
      // Now you can safely pass `imgFile` to any function expecting a `Blob`
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedImg = await imageCompression(imgFile, options);
        let reader = new FileReader();

        reader.readAsDataURL(imgFile);

        reader.onload = () => {
          let fileInfo = {
            name: imgFile.name,
            type: imgFile.type,
            size: Math.round(imgFile.size / 1000) + " kb",
            base64: reader.result,
            file: compressedImg,
          };
          setUserDetails({ ...userDetails, profilePic: fileInfo.base64 });
        };
      } catch (error) {}
    } else {
      setFormErrors({
        ...formErrors,
        profilePic: {
          error: true,
          errorMsg: "Please select a file",
        }})
      console.error("No file selected or files is null");
    }
  };
  const handleOnTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setchangeDetected(true);
    setUserDetails({ ...userDetails, [name]: value });
    // if(formErrors.name){
    //   validateAddress(name, value)
    // }
    // setFormValues({...formValues, [name]:value})
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateUser(loggedInUser?._id, userDetails);
    if (res) {
      setchangeDetected(false);
      setIsLoading(false);
      setIsUserUpdated((prev) => !prev);
      toast.success("User details updated successfully");
    }
  };
  const fetchUserDetails = async () => {
    const userResponse: any = await getUserDetails(loggedInUser?._id);
    setUserDetails(userResponse.others);
  };

  const handleOnCancel = () => {
    setchangeDetected(false);
    fetchUserDetails();
  };
  useEffect(() => {
    // if (isUserUpdated) {
    //   setUserDetails(null);
    // }
    // const fetchUserDetails = async () => {
    //   const userResponse: any = await getUserDetails(loggedInUser._id);
    //   setUserDetails(userResponse);
    // };
    if (!loggedInUser) {
      navigate("/");
    } else {
      fetchUserDetails();
    }
  }, [loggedInUser?._id, isUserUpdated]);
  useEffect(() => {
    !loggedInUser && navigate("/login");
  }, [loggedInUser]);
  console.log(userDetails);
  return (
    <div className="flex w-full justify-center mt-10 px-4">
      {userDetails ? (
        <form
          className="relative min-h-[480px] w-[480px] sm:w-4/5 flex flex-col px-10 py-6 shadow-lg rounded"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between">
            <div className="text-lg font-semibold border-l-4 border-blue-400 px-2 rounded">
              User Details
            </div>
            <div className="flex gap-2 items-center">
              <div className={`w-[60px] flex justify-center items-center rounded text-lg text-gray-700 font-medium px-10 ${userDetails.active ? "bg-green-400" : "bg-red-400"}`}>
                {userDetails.active ? "Active" : "Inactive"}
              </div>
            </div>
          </div>

          <div className="flex mt-12 gap-12 lg:gap-8">
            <div className="w-44 flex flex-col gap-2 items-center">
              <div className="relative h-32 w-32 lg:h-40 lg:w-40 bg-gray-400 flex justify-center items-center rounded-full object-cover">
                <img
                  src={
                    userDetails?.profilePic === ""
                      ? profileImg
                      : userDetails?.profilePic
                  }
                  alt="Profile Placeholder"
                  className={`${
                    userDetails?.profilePic !== "" ? "h-32 w-32 lg:h-40 lg:w-40" : "h-24 w-24 lg:h-32 lg:w-32"
                  } bg-gray-200 rounded-full object-cover`}
                />
                <label
                  htmlFor="profilePic"
                  className="absolute flex justify-center items-center bg-white right-1 bottom-0 shadow-md ring-1 ring-gray-100 h-10 w-10 p-3 rounded-full cursor-pointer"
                >
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    className="hidden"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                  />
                  <IoCameraOutline />
                </label>
              </div>
              <div className="font-medium mx-auto">
                {formattedTime(userDetails?.createdAt)}
              </div>
            </div>
            <div className="flex flex-col gap-6 w-full">
              <input
                type="text"
                name="name"
                className={`w-[235px] lg:w-[200px] text-2xl font-semibold focus:outline-none border-b-2 p-2 rounded ${formErrors.name.error ? "border-red-500" : "border-gray-300"}`}
                onChange={handleInputChange}
                value={userDetails.name}
              />
              <div className="flex flex-col lg:flex-row flex-wrap gap-6">
                <div className="flex flex-col w-[235px] lg:w-[200px]">
                  <label
                    htmlFor="accountNo"
                    className="text-md font-semibold text-gray-400"
                  >
                    A/c
                  </label>
                  <input
                    type="number"
                    name="accountNo"
                    id="accountNo"
                    onChange={handleInputChange}
                    value={userDetails.accountNo}
                    className={`border-b-2 p-2 focus:outline-none text-lg cursor-not-allowed rounded border-gray-300`}
                  />
                </div>
                <div className="flex flex-col w-[235px] lg:w-[200px]">
                  <label
                    htmlFor="email"
                    className="text-md font-semibold text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                    value={userDetails.email}
                    className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg cursor-not-allowed rounded"
                  />
                </div>
                <div className="flex flex-col w-[235px] lg:w-[200px]">
                  <label
                    htmlFor="phone"
                    className="text-md font-semibold text-gray-400"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    onChange={handleInputChange}
                    value={userDetails.phone}
                    className={`border-b-2 p-2 focus:outline-none text-lg rounded ${formErrors.phone.error ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>
                <div className="flex flex-col w-[235px] lg:w-[200px]">
                  <label
                    htmlFor="aadhaar"
                    className="text-md font-semibold text-gray-400"
                  >
                    Aadhaar
                  </label>
                  <input
                    type="number"
                    name="aadhaar"
                    id="aadhaar"
                    onChange={handleInputChange}
                    value={userDetails.aadhaar}
                    className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg cursor-not-allowed rounded"
                  />
                </div>
                <div className="flex flex-col w-[235px] lg:w-[424px]">
                  <label
                    htmlFor="address"
                    className="text-md font-semibold text-gray-400"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={1}
                    onChange={handleOnTextAreaChange}
                    value={userDetails.address}
                    className={`border-b-2 p-2 focus:outline-none text-lg rounded ${formErrors.address.error ? "border-red-500" : "border-gray-300"}`} 
                  />
                </div>
              </div>
            </div>
          </div>
          {changeDetected && (
            <div className="flex gap-6 mx-auto mt-20">
              <button
                className="px-2 py-1 bg-red-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
                onClick={handleOnCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 bg-green-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
              >
                {!isLoading ? (
                  "Update"
                ) : (
                  <PulseLoader className="text-white" color="white" size={8} />
                )}
              </button>
            </div>
          )}
        </form>
      ) : (
        <GridLoader size={8} color="blue" />
      )}
    </div>
  );
};

export default Profile;

{
  /* <div className="w-1/2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-md font-semibold text-gray-400 uppercase"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
                value={userDetails.name}
                className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="email"
                className="text-md font-semibold text-gray-400 uppercase"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={userDetails.email}
                className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg cursor-not-allowed"
                disabled
              />
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="phone"
                className="text-md font-semibold text-gray-400 uppercase"
              >
                Phone No.
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                // value={`${userDetails?.phone} ? ${userDetails?.phone} : ""`}
                value={userDetails?.phone ? userDetails?.phone : ""}
                placeholder="Enter your phone no."
                className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg"
              />
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <div className="relative h-44 w-44 bg-gray-200 flex justify-center items-center rounded-full object-cover">
              <img
                src={
                  userDetails?.profilePic === ""
                    ? profileImg
                    : userDetails?.profilePic
                }
                alt="Profile Placeholder"
                className={`${
                  userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
                } bg-gray-200 rounded-full object-cover`}
              />
              <label
                htmlFor="profilePic"
                className="absolute flex justify-center items-center bg-white right-4 bottom-2 shadow-md ring-1 ring-gray-100 h-10 w-10 p-3 rounded-full cursor-pointer"
              >
                <input
                  type="file"
                  name="profilePic"
                  id="profilePic"
                  className="hidden"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
                <IoCameraOutline />
              </label>
            </div>
            <div className="flex flex-col mt-4">
              <label
                htmlFor="aadhaar"
                className="text-md font-semibold text-gray-400 uppercase"
              >
                Aadhaar No.
              </label>
              <input
                type="number"
                name="aadhaar"
                id="aadhaar"
                onChange={handleInputChange}
                // value={`${userDetails?.phone} ? ${userDetails?.phone} : ""`}
                value={userDetails?.aadhaar ? userDetails?.aadhaar : ""}
                placeholder="Enter your aadhar no."
                className="border-b-2  border-gray-300 p-2 focus:outline-none text-lg"
              />
            </div>
          </div> */
}
