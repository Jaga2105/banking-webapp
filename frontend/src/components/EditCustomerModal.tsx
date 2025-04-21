import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

import profileImg from "../assets/profile_img_placeholder.svg";
import { IoCameraOutline } from "react-icons/io5";
import { GridLoader, PulseLoader } from "react-spinners";
import { getCustomer } from "../api/customerAPI";
import { updateUser } from "../api/userAPI";

interface EditCustomerModalProps {
  open: boolean;
  id: string;
  handleOnclickEditCustomer: (id: string) => void;
}
interface FormValueTypes {
  name: string;
  email: string;
  phone: string;
  aadhaar: string;
  address: string;
  profilePic: string;
}
interface FormErrorTypes {
  name: boolean;
  email: boolean;
  phone: boolean;
  aadhaar: boolean;
  address: boolean;
  profilePic: boolean;
  submitError: "";
}
const initialFormValues: FormValueTypes = {
  name: "",
  email: "",
  phone: "",
  aadhaar: "",
  address: "",
  profilePic: "",
};
const initialFormErrors: FormErrorTypes = {
  name: false,
  email: false,
  phone: false,
  aadhaar: false,
  address: false,
  profilePic: false,
  submitError: "",
};

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({
  open,
  id,
  handleOnclickEditCustomer,
}) => {
  const [formValues, setFormValues] =
    useState<FormValueTypes>(initialFormValues);
  const [formErrors, setFormErrors] =
    useState<FormErrorTypes>(initialFormErrors);
  const [isLoading, setIsLoading] = useState(true);
  const [submitFormFlag, setSubmitFormFlag] = useState(false);

  const handleOnTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formErrors.name) {
      validateAddress(name, value);
    }
    setFormValues({ ...formValues, [name]: value });
  };
  const validateName = (name: string, value: string) => {
    if (value.length < 5) {
      setFormErrors({ ...formErrors, [name]: true });
      // return;
    } else {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  const validateEmail = (name: string, value: string) => {
    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!regEx.test(value)) {
      setFormErrors({ ...formErrors, [name]: true });
    } else {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  const validatePhone = (name: string, value: string) => {
    const phoneRegx = /^[6-9]\d{9}$/;
    if (!phoneRegx.test(value)) {
      setFormErrors({ ...formErrors, [name]: true });
    } else {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  const validateAadhaar = (name: string, value: string) => {
    const aadhaarRegex = /^[2-9]\d{11}$/;
    if (!aadhaarRegex.test(value)) {
      setFormErrors({ ...formErrors, [name]: true });
    } else {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  const validateAddress = (name: string, value: string) => {
    const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    if (!addressRegex.test(value)) {
      setFormErrors({ ...formErrors, [name]: true });
    } else {
      setFormErrors({ ...formErrors, [name]: false });
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formErrors.name) {
      if (name === "name" || name === "careOf") {
        validateName(name, value);
      } else if (name === "email") {
      } else if (name === "phone") {
        validatePhone(name, value);
      } else if (name === "aadhaar") {
        validateAadhaar(name, value);
      }
    }
    setFormValues({ ...formValues, [name]: value });
  };
  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "careOf") {
      validateName(name, value);
    } else if (name === "phone") {
      validatePhone(name, value);
    } else if (name === "aadhaar") {
      validateAadhaar(name, value);
    }
  };
  const handleTextAreaOnBlur = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateAddress(name, value);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const target = e.target as HTMLInputElement;
    // setchangeDetected(true);
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
          if (typeof reader.result === "string") {
            const fileInfo = {
              name: imgFile.name,
              type: imgFile.type,
              size: Math.round(imgFile.size / 1000) + " kb",
              base64: reader.result, // Safe to use as string
              file: compressedImg,
            };

            // Update form values with the new profile picture
            setFormValues((prevValues) => ({
              ...prevValues,
              profilePic: fileInfo.base64,
            }));
          } else {
            console.error("FileReader result is not a string.");
          }
        };
      } catch (error) {}
    } else {
      console.error("No file selected or files is null");
    }
  };

  // const handleClose = () =>{
  //   setFormValues(initialFormValues)
  //   setFormErrors(initialFormErrors)
  //   handleOnclickEditCustomer();
  // }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    setSubmitFormFlag(true);
    const res = await updateUser(id, formValues);
    console.log(res);
    if (res) {
      toast.success("Updation Successful")
      setSubmitFormFlag(false);
    }
  };
  const handleClose = () => {
    setFormValues(initialFormValues);
    setFormErrors(initialFormErrors);
    handleOnclickEditCustomer("");
  };
  // const fetchUserDetails = async () => {
  //   console.log(isLoading)
  //   const res = await getCustomer(id);
  //   console.log(isLoading)
  //   if (res.ok) {
  //     setFormValues(res);
  //     setIsLoading(false);
  //   }
  //   console.log(isLoading)
  // };
  // useEffect(() => {
  //   fetchUserDetails();
  // }, [fetchUserDetails]);

  const fetchUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getCustomer(id);
      console.log(res);
      if (res) {
        setFormValues({
          name: res.name || "",
          email: res.email || "",
          phone: res.phone || "",
          aadhaar: res.aadhaar || "",
          address: res.address || "",
          profilePic: res.profilePic || "",
        });
      } else {
        toast.error("Failed to fetch customer details");
      }
    } catch (error) {
      toast.error("An error occurred while fetching customer details");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (open && id) {
      fetchUserDetails();
    }
  }, [open, id, fetchUserDetails]);
  return (
    <div>
      {open && (
        <>
          <div className="absolute inset-0 flex items-center justify-center z-40">
            {/* Close button */}
            <div
              className="absolute top-5 right-5 z-10 cursor-pointer"
              //   onClick={handleClose}
            >
              <RxCross2 className="h-8 w-8 text-white" onClick={handleClose} />
            </div>
            {/*Modal Backdrop */}
            <div
              className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
              onMouseDown={handleClose}
            ></div>
            {/* {!isLoading ? ( */}
            <form
              className={`absolute flex flex-col gap-4 h-[480px] sm:h-[450px] w-[360px] sm:w-[650px] px-4 py-4 bg-white rounded-xl overflow-y-auto`}
              onSubmit={handleSubmit}
            >
              {!isLoading ? (
                <div>
                  <div className="text-xl font-semibold text-gray-600 mx-auto mb-4">
                    Edit the Customer Details Here
                  </div>
                  <div className="flex">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name">Customer Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${
                            formErrors.name
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          value={formValues.name}
                          onChange={handleOnChange}
                          onBlur={handleOnBlur}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">C/O:</label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          // className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${formErrors.careOf? "border-red-500" : "focus:border-blue-500"}`}
                          className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${
                            formErrors.email
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          value={formValues.email}
                          onChange={handleOnChange}
                          onBlur={handleOnBlur}
                        />
                      </div>
                    </div>
                    <div className="h-full w-full flex justify-center items-center">
                      <div className="relative h-32 w-32 bg-gray-200 flex justify-center items-center rounded-full object-cover">
                        <img
                          src={formValues?.profilePic || profileImg}
                          // src={
                          //   userDetails?.profilePic === ""
                          //     ? profileImg
                          //     : userDetails?.profilePic
                          // }
                          alt="Profile Placeholder"
                          // className={`${
                          //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
                          // } bg-gray-200 rounded-full object-cover`}
                          className="h-26 w-26 bg-gray-200 rounded-full object-cover"
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
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="careOf">Mobile No.</label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${
                            formErrors.phone
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          value={formValues.phone}
                          onChange={handleOnChange}
                          onBlur={handleOnBlur}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="aadhaar">Aadhaar No.</label>
                        <input
                          type="number"
                          name="aadhaar"
                          id="aadhaar"
                          className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${
                            formErrors.aadhaar
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          value={formValues.aadhaar}
                          onChange={handleOnChange}
                          onBlur={handleOnBlur}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-start items-start">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="addesss">Address</label>
                        <textarea
                          name="address"
                          id="address"
                          cols={30}
                          rows={4}
                          className={`w-[300px] px-2 py-1 border border-gray-300 shadow-sm rounded-sm focus:outline-none ${
                            formErrors.address
                              ? "border-red-500"
                              : "focus:border-blue-500"
                          }`}
                          value={formValues.address}
                          onChange={handleOnTextAreaChange}
                          onBlur={handleTextAreaOnBlur}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2 bottom-6">
                    <button
                      className="px-2 py-1 bg-red-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-2 py-1 bg-green-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
                    >
                      {/* Add */}
                      {!submitFormFlag ? (
                        "Update"
                      ) : (
                        <PulseLoader
                          className="text-white"
                          color="white"
                          size={8}
                        />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-[480px] w-full flex justify-center items-center">
                  <GridLoader
                    className="text-white"
                    color="blue"
                    size={8}
                  />
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditCustomerModal;

{
  /* //  ) : ( */
}
//   <div className="h-full w-full flex justify-center items-center">
//     <GridLoader
//       className="text-white mt-28"
//       color="white"
//       size={8}
//     />
//   </div>
// )}
