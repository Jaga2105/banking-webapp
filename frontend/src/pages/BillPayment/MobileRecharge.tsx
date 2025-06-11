import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TbDeviceMobileCharging } from "react-icons/tb";
import Airtel from "../../assets/simProvider/Airtel.jpg";
import Jio from "../../assets/simProvider/Jio.jpg";
import Vodafone from "../../assets/simProvider/Vodafone.jpg";
import Bsnl from "../../assets/simProvider/Bsnl.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { getUserDetails } from "../../api/userAPI";
import { mobileRecharge } from "../../api/transactionAPI";
import { IoArrowBackOutline } from "react-icons/io5";
interface FormValueTypes {
  phoneNo: string;
  planAmount: string;
}
const initialFormValues = {
  phoneNo: "",
  planAmount: "",
};
interface ErrorValues {
  error: boolean;
  errorMsg: string;
}
interface FormErrors {
  phoneNo: ErrorValues;
  planAmount: ErrorValues;
}
const initialFormErrors = {
  phoneNo: {
    error: false,
    errorMsg: "",
  },
  planAmount: {
    error: false,
    errorMsg: "",
  },
};
interface ProviderTypes {
  providerName: string;
  logo: string;
}
const initialProviderDetails = {
  providerName: "",
  logo: "",
};
const ProviderList = [
  { providerName: "Jio", logo: Jio },
  { providerName: "Airtel", logo: Airtel },
  { providerName: "Vodafone", logo: Vodafone },
  { providerName: "Bsnl", logo: Bsnl },
];
const MobileRecharge = () => {
  const [formValues, setFormValues] =
    useState<FormValueTypes>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);
  const [providerDetails, setProviderDetails] = useState<ProviderTypes>(
    initialProviderDetails
  );
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const fetchProviderName = (name: string, value: string) => {
    const firstChar = value.substring(0, 1);
    if (firstChar === "6") {
      setProviderDetails({
        ...providerDetails,
        ["providerName"]: "Jio",
        ["logo"]: Jio,
      });
    } else if (firstChar === "7") {
      setProviderDetails({
        ...providerDetails,
        ["providerName"]: "Vodafone",
        ["logo"]: Vodafone,
      });
    } else if (firstChar === "8") {
      setProviderDetails({
        ...providerDetails,
        ["providerName"]: "Bsnl",
        ["logo"]: Bsnl,
      });
    } else if (firstChar === "9") {
      setProviderDetails({
        ...providerDetails,
        ["providerName"]: "Airtel",
        ["logo"]: Airtel,
      });
    }
  };
  const validatePhone = (name: string, value: string) => {
    console.log(name, value);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (value === "") {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Mobile No. required",
        },
      });
      return;
    } else if (!phoneRegex.test(value)) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Invalid Mobile No.",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: false,
          errorMsg: "",
        },
      });
    }
  };
  const validatePlanAmount = (value: string) => {
    if (value === "") {
      setFormErrors({
        ...formErrors,
        ["planAmount"]: {
          error: true,
          errorMsg: "Plan Amount Should n't be empty",
        },
      });
      return;
    } else if (Number(value) < 10) {
      setFormErrors({
        ...formErrors,
        ["planAmount"]: {
          error: true,
          errorMsg: "Invalid Plan Amount",
        },
      });
      return;
    } else {
      setFormErrors({
        ...formErrors,
        ["planAmount"]: {
          error: false,
          errorMsg: "",
        },
      });
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNo") {
      validatePhone(name, value);
      if (value.length === 10) {
        fetchProviderName(name, value);
      } else if (value.length === 9) {
        setProviderDetails({
          ...providerDetails,
          ["providerName"]: "",
          ["logo"]: "",
        });
      }
    } else if (name === "planAmount") {
      validatePlanAmount(value);
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = {
    //   phoneNo: formValues.phoneNo,
    //   planAmount: formValues.planAmount,
    //   billType: "mobileRecharge",
    //   payerId: loggedInUser._id,
    // };
    const data = {
      senderAccountNo:userDetails.accountNo,
      phoneNo: formValues.phoneNo,
      amount:formValues.planAmount,
      description: "Mobile Recharge",
      createdAt: Date.now(),
    };
    setIsLoading;
    const res: any = await mobileRecharge(data);
    if (!res.error) {
      setIsLoading(false);
      toast.success("Recharge Successful");
      navigate("/billPayments");
    } else {
      toast.error(res.error || "Recharge Failed");
    }
    console.log(res);
  };
  const fetchUserDetails = async (userId: any) => {
    // console.log(loggedInUser?._id);
    const userResponse: any = await getUserDetails(userId);
    console.log(userResponse);
    setUserDetails(userResponse.others);
    // setTransactions(userResponse.others.transactions);
  };
  useEffect(() => {
    fetchUserDetails(loggedInUser._id);
  }, []);
  console.log();
  return (
    <div className="w-full h-full flex justify-center items-center mt-14">
      <form
        className="relative min-h-[300px] w-[450px] rounded-md border-t-1 border-gray-100 shadow-md flex flex-col gap-2 items-center pt-4 pb-2"
        onSubmit={handleSubmit}
      >
        <div className="absolute left-4 top-5.5  w-[30px] flex justify-center items-center rounded-sm py-0.5 cursor-pointer hover:bg-violet-200"
        onClick={() => navigate("/billPayments")}>
        <IoArrowBackOutline className="text-violet-600"/>
        </div>
        <div className="text-xl font-bold mx-auto mb-4 flex justify-center items-center gap-2">
          <TbDeviceMobileCharging className="text-purple-500" />{" "}
          <span>Enter Details to Recharge</span>
        </div>
        <div className="relative flex flex-col gap-1 w-4/5">
          <label htmlFor="phoneNo" className="text-lg font-semibold">
            Enter Phone No.
          </label>
          <span className="absolute -left-1 top-12 transform -translate-y-1/2 text-gray-500 text-md">
            +91-
          </span>
          <div className="relative">
            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              placeholder="Enter plan amount"
              maxLength={10}
              pattern="[0-9]*" // ensures only numbers are entered
              inputMode="numeric" // shows numeric keyboard on mobile
              className="w-full outline-none border-b-2 border-gray-200 shadow-b-sm focus:border-violet-200 px-12 py-1 pl-9 text-md" // `pl-6` adds left padding for the symbol
              onChange={handleOnChange}
              value={formValues.phoneNo}
            />
            {providerDetails.providerName && (
              <div className="flex flex-col justify-center items-center absolute right-4 top-0">
                <img
                  src={providerDetails.logo}
                  alt="Provider Logo"
                  className="h-8 w-8 rounded-full shadow-md object-cover"
                />
                {/* <span className="text-xs">{providerDetails.providerName}</span> */}
              </div>
            )}
          </div>
          {formErrors.phoneNo.error && (
            <span className="text-red-600 text-sm font-semibold">
              {formErrors.phoneNo.errorMsg}
            </span>
          )}
        </div>
        <div className=" w-4/5">
          <div className="relative flex flex-col gap-1">
            <label htmlFor="planAmount" className="text-lg font-semibold">
              Enter Plan Amount
            </label>
            <span className="absolute left-2 top-3/4 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              name="planAmount"
              id="planAmount"
              placeholder="Enter plan amount"
              className="w-full outline-none border-b-2 border-gray-200 shadow-b-sm focus:border-violet-200 px-8 py-1 pl-6" // `pl-6` adds left padding for the symbol
              onChange={handleOnChange}
              value={formValues.planAmount}
            />
          </div>
          {formErrors.planAmount.error && (
            <span className="text-red-600 text-sm font-semibold flex flex-start">
              {formErrors.planAmount.errorMsg}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-1 mt-8 bg-purple-200 rounded-md text-purple-700 text-large font-bold cursor-pointer"
        >
          {!isLoading ? (
            "Pay"
          ) : (
            <PulseLoader className="text-white" color="white" size={8} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MobileRecharge;
