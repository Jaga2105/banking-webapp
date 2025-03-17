import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { GoQuestion } from "react-icons/go";
import { registerUser } from "../../api/authAPI";
import { Link, useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface ErrorValues {
  error: boolean;
  errorMsg: string;
}
interface Errors {
  name: ErrorValues;
  email: ErrorValues;
  password: ErrorValues;
  confirm_password: ErrorValues;
  [key: string]: ErrorValues;
}
const initialFormValues: FormValues = {
  name: "",
  email: "",
  password: "",
};

const initialErrors: Errors = {
  name: {
    error: false,
    errorMsg: "",
  },
  email: {
    error: false,
    errorMsg: "",
  },
  password: {
    error: false,
    errorMsg: "",
  },
  confirm_password: {
    error: false,
    errorMsg: "",
  },
};
const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<Errors>(initialErrors);

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const validateName = (name: string, value: string) => {
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} can't be empty`;
      error = true;
    } else if (value.length < 5) {
      errorMsg = `${name} should be of at least 5 characters`;
      error = true;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };

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
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };

  const validatePassword = (name: string, value: string) => {
    const regEx =
      /(?=^.{6,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} can't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Password length at least 6 letters and must contain one upper case, lower case and special char each`;
      error = true;
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };
  const validateConfirmPassword = (name: string, value: string) => {
    let errorMsg = "";
    let error = false;
    if (value === "") {
      error = true;
      errorMsg = "Confirm Password can't be empty";
    } else if (value !== formValues.password) {
      error = true;
      errorMsg = "Confirm Password did n't match with create password";
    }
    setErrors({
      ...errors,
      [name]: {
        error,
        errorMsg,
      },
    });
  };
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      validateName(name, value);
    } else if (name === "email") {
      validateEmail(name, value);
    } else if (name === "password") {
      validatePassword(name, value);
    } else if (name === "confirm_password") {
      validateConfirmPassword(name, value);
    }
  };
  const handleOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
    handleOnchange(e);
  };

    const handleSubmit =async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    //   const keys = Object.keys(errors) as Array<keyof Errors>;
      for (let key in errors) {
        if (errors[key].error) {
          return;
        }
      }
      const newUser = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      };
      try {
        const response= await registerUser(newUser)
        if(response.error){
          console.log(response)
          return alert(response.error)
        }
        navigate("/login")
      } catch (error) {
        console.log(error)
        alert(error);
      }
      console.log(formValues);
    };

    useEffect(() => {
      if(user){
        navigate("/")
      }
    }, [user])
    

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-ceneter py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto  sm:w-md sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-600">
            BankEasy
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.name.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                    onChange={handleOnchange}
                    onBlur={handleOnBlur}
                    placeholder="Enter your name.."
                />
                {errors.name.error && (
                  <p className="text-red-500">{errors.name.errorMsg}</p>
                )}
              </div>
            </div>
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
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.email.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                    onChange={handleOnchange}
                    onBlur={handleOnBlur}
                />
                <MdOutlineEmail className="absolute right-2 top-2 cursor-pointer h-6 w-6" />
                {errors.email.error && (
                  <p className="text-red-500">{errors.email.errorMsg}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="relative flex items-center space-x-2 text-sm font-medium text-gray-700"
              >
                <span>Password</span>{" "}
                <div className="group">
                  <GoQuestion className="h-4 w-4 text-blue-700"></GoQuestion>
                  <span className="absolute left-20 -top-5 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
                    i.e.Dummy@123
                  </span>
                </div>
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.password.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                    onChange={handleOnchange}
                    onBlur={handleOnBlur}
                />
                {showPassword ? (
                  <BsEye
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <BsEyeSlash
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                {errors.password.error && (
                  <p className="text-red-500">{errors.password.errorMsg}</p>
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
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  autoComplete="off"
                  className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  ${
                    errors.confirm_password.error
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  } sm:text-sm`}
                    onChange={handleOnchange}
                    onBlur={handleOnBlur}
                />
                {showConfirmPassword ? (
                  <BsEye
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <BsEyeSlash
                    className="absolute right-2 top-2 cursor-pointer h-6 w-6"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
                 {errors.confirm_password.error && (
                  <p className="text-red-500">{errors.confirm_password.errorMsg}</p>
                )} 
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>
            <div className={`flex justify-center w-full`}>
              <h4>Existing User?</h4>
              <Link to={"/login"} className="text-blue-600 pl-2">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
