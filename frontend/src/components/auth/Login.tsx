import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { loginUser } from "../../api/authAPI";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
}
interface ErrorValues {
  error: boolean;
  errorMsg: string;
}
interface FormErrors {
  email: ErrorValues;
  password: ErrorValues;
  submitError: ErrorValues;
}
const initialFormValues = {
  email: "",
  password: "",
};
const initialformErrors = {
  email: {
    error: false,
    errorMsg: "",
  },
  password: {
    error: false,
    errorMsg: "",
  },
  submitError: {
    error: false,
    errorMsg: "",
  },
};

const Login: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [formValues, setformValues] = useState<FormValues>(initialFormValues);
  const [inputError, setInputError] = useState<FormErrors>(initialformErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const loggedInUser = localStorage.getItem("user");

  const navigate = useNavigate();

  // const user:any = localStorage.getItem("user");

  const validateEmail = (name: string, value: string) => {
    const regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} shouldn't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Invalid ${name}`;
      error = true;
    }
    setformValues({
      ...formValues,
      [name]: value,
    });
    setInputError({
      ...inputError,
      [name]: {
        error,
        errorMsg,
      },
    });
  };
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      validateEmail(name, value);
    } else if (value === "") {
      setInputError({
        ...inputError,
        [name]: {
          error: true,
          errorMsg: "Password required",
        },
      });
    }
    setformValues({ ...formValues, [name]: value });
  };
  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    handleOnchange(e);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.email === "" || formValues.password === "") {
      console.log("Please provide all credentials");
      return;
    }
    const user = {
      email: formValues.email,
      password: formValues.password,
    };
    try {
      setIsLoading(true);
      const response: any = await loginUser(user);

      if (response.error) {
        setInputError({
          ...inputError,
          ["submitError"]: {
            error: true,
            errorMsg: "Invalid Credentials. Please try again",
          },
        });
        toast.error(response.error);
      } else {
        // setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(response.user));
        setInputError({
          ...inputError,
          ["submitError"]: {
            error: false,
            errorMsg: "",
          },
        });
        // console.log(response.user).
        navigate("/");
        // console.log("Navigated..");
      }
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
    console.log("submitted..");
    navigate("/");
  };
  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-ceneter py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto  sm:w-md sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-600">
            FinEase
          </h2>
          {inputError.submitError.error && (
            <span className="mb-4 text-red-600 flex items-center text-lg space-x-6">
              <IoMdAlert className="mr-1" />
              {inputError.submitError.errorMsg}
            </span>
          )}
          <form className="space-y-8" onSubmit={handleSubmit}>
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
                  value={formValues.email}
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    // "focus:border-blue-500"
                    inputError.email.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                />
                <MdOutlineEmail className="absolute right-2 top-2 cursor-pointer h-6 w-6" />
                {inputError.email.error && (
                  <p className="text-red-500">{inputError.email.errorMsg}</p>
                )}
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="relative flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <span>Password</span>{" "}
                <div className="group">
                  <GoQuestion className="h-4 w-4 text-blue-700"></GoQuestion>
                  <span className="absolute left-22 -top-10 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                    Dummy@123
                  </span>
                </div>
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={formValues.password}
                  autoComplete="off"
                  placeholder="********"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    // "focus:border-blue-500"
                    inputError.password.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                />
                {visible ? (
                  <BsEye
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <BsEyeSlash
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setVisible(true)}
                  />
                )}
                {inputError.password.error && (
                  <p className="text-red-500">{inputError.password.errorMsg}</p>
                )}
              </div>
              <Link
                to={"/forgot-password"}
                className="text-sm absolute right-0 mt-1 text-blue-600 cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
            {/* <div> */}
            <button
              type="submit"
              className="group relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 cursor-pointer hover:bg-blue-700"
            >
              {!isLoading ? (
                "Sign In"
              ) : (
                <PulseLoader className="text-white" color="white" size={8} />
              )}
            </button>
            {/* </div> */}
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

export default Login;
