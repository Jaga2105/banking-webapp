import React from "react";
import { Link } from "react-router-dom";
import { FormEvent, ChangeEvent, useState } from "react";
import { IoMdAlert } from "react-icons/io";
import { sendForgotPasswordEmail } from "../../api/authAPI";

interface ErrorValues {
  error: boolean;
  errorMsg: string;
}
const initialErrors: ErrorValues = {
  error: false,
  errorMsg: "",
};
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [inputError, setInputError] = useState<ErrorValues>(initialErrors);
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setInputError({ ...inputError, error: false, errorMsg: "" });
  };
  const validateEmail = (email: string) => {
    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let errorMsg = "";
    let error = false;
    if (email === "") {
      errorMsg = `Please provide email.`;
      error = true;
    } else if (!regEx.test(email)) {
      errorMsg = `Invalid email`;
      error = true;
    }
    setInputError({ ...inputError, error: error, errorMsg: errorMsg });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(email);
    try {
        if (!inputError.error) {
            console.log("invoked")
            const res = await sendForgotPasswordEmail(email);
            console.log(res)
          }
    } catch (error) {
        console.log(error)
    }
    
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-ceneter py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto  sm:w-md sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-600">
            Forgot Password
          </h2>
          <div className="mb-4 text-md font-medium space-x-6">
            Please enter your email address. We will send you an email to reset
            your password.
          </div>
          {inputError.error && (
            <span className="mb-4 text-red-600 flex items-center text-md space-x-6">
              <IoMdAlert className="mr-1" />
              {inputError.errorMsg}
            </span>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type={"email"}
                  name="email"
                  placeholder="Enter your email"
                  value={email}
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
                {/* <MdOutlineEmail className="absolute right-2 top-2 cursor-pointer h-6 w-6" /> */}
                {/* {inputError.email.error && (
                  <p className="text-red-500">{inputError.email.errorMsg}</p>
                )} */}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700"
              >
                {/* {!isLoading ? (
                  "Sign In"
                ) : (
                  <PulseLoader className="text-white" color="white" size={8} />
                )} */}
                Send Email
              </button>
            </div>
            <div className={`flex justify-center w-full`}>
              <h4>New User?</h4>
              <Link
                to={"/register"}
                className="text-blue-600 pl-2 cursor-pointer"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
