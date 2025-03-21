import React, { FormEvent, useEffect, useState } from "react";
import { getUserDetails, updateUser } from "../api/userAPI";
import { CgProfile } from "react-icons/cg";
import profileImg from "../assets/profile_img_placeholder.svg";
import { IoCameraOutline } from "react-icons/io5";
import imageCompression from "browser-image-compression";
import GridLoader from "react-spinners/GridLoader";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [changeDetected, setchangeDetected] = useState<boolean>(false);
  const [isUserUpdated, setIsUserUpdated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let loggedInUser: any;

  const userJSON = localStorage.getItem("user");

  if (userJSON !== null) {
    loggedInUser = JSON.parse(userJSON);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setchangeDetected(true);
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      console.error("No file selected or files is null");
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await updateUser(loggedInUser?._id, userDetails);
    if (res) {
      setchangeDetected(false);
      setIsLoading(false);
      setIsUserUpdated((prev) => !prev);
    }
  };
  const fetchUserDetails = async () => {
    const userResponse: any = await getUserDetails(loggedInUser?._id);
    setUserDetails(userResponse);
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
  return (
    <div className="flex h-130 w-full items-center justify-center">
      {userDetails ? (
        <form
          className="relative h-100 w-2xl flex justify-between items-center px-10 shadow-md ring-1 ring-gray-200 p-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="w-1/2">
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
          <div className="w-1/2 h-full flex justify-center items-center">
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
          </div>
          {changeDetected && (
            <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2 bottom-3">
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
