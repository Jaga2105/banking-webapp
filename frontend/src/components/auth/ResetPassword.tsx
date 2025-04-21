import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { changePassword } from "../../api/userAPI";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";

interface FormValues {
  password: string;
  confirmPassword: string;
}
const initialFormValues = {
  password: "",
  confirmPassword: "",
};
const ResetPassword: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    // if(e.target.name==="password"){

    // }
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res: any = changePassword(loggedInUser._id, formValues.password);
    console.log(res);
    if (res) {
      setIsLoading(false);
      toast.success("Password changed successfully")
      localStorage.removeItem("user");
      localStorage.removeItem("useExpiry");
      if (!localStorage.getItem("user")) {
        navigate("/login");
      }
    }
  };
  console.log(formValues);
  return (
    <div className="text-2xl h-screen flex justify-center items-center">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-ceneter py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto  sm:w-md sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="mb-4 text-center text-2xl font-extrabold text-gray-600">
              Change Your Password Here
            </h2>
            {/* <div className="mb-4 text-md font-medium space-x-6">
            Please enter your 
          </div> */}
            {/* {inputSuccess.status && (
            <span className="mb-4 text-green-500 flex items-center text-lg space-x-6">
              <SiTicktick className="mr-2" />
              {inputSuccess.successMsg}
            </span>
          )} */}
            {/* {inputError.error && ( */}
            {/* <span className="mb-4 text-red-600 flex items-center text-lg space-x-6"> */}
            {/* <IoMdAlert className="mr-1" /> */}
            {/* {inputError.errorMsg} */}
            {/* </span>
          )} */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visiblePassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your Password"
                    // value={email}
                    autoComplete="off"
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                      "focus:border-blue-500"
                      // inputError.email.error
                      //   ? "border-red-500"
                      //   : "focus:border-blue-500"
                    } sm:text-sm`}
                    onChange={handleOnchange}
                    //   onBlur={handleOnBlur}
                  />
                  {visiblePassword ? (
                    <BsEye
                      className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                      onClick={() => setVisiblePassword(false)}
                    />
                  ) : (
                    <BsEyeSlash
                      className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                      onClick={() => setVisiblePassword(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visibleConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter Password"
                    // value={email}
                    autoComplete="off"
                    className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                      "focus:border-blue-500"
                      // inputError.email.error
                      //   ? "border-red-500"
                      //   : "focus:border-blue-500"
                    } sm:text-sm`}
                    onChange={handleOnchange}
                    //   onBlur={handleOnBlur}
                  />
                  {visibleConfirmPassword ? (
                    <BsEye
                      className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                      onClick={() => setVisibleConfirmPassword(false)}
                    />
                  ) : (
                    <BsEyeSlash
                      className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                      onClick={() => setVisibleConfirmPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700"
                >
                  {!isLoading ? (
                    "Submit"
                  ) : (
                    <PulseLoader
                      className="text-white"
                      color="white"
                      size={8}
                    />
                  )}
                </button>
              </div>
              <div className={`flex justify-center w-full`}>
                <Link to={"/"} className="text-blue-600 pl-2 cursor-pointer">
                  Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
