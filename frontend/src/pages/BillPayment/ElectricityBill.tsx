import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

interface FormValueTypes {
  consumerNo: string;
  billAmount: string;
}
const initialFormValues = {
  consumerNo: "",
  billAmount: "",
};
interface ErrorValues {
  error: boolean;
  errorMsg: string;
}
interface FormErrors {
  consumerNo: ErrorValues;
  billAmount: ErrorValues;
}
const initialFormErrors = {
  consumerNo: {
    error: false,
    errorMsg: "",
  },
  billAmount: {
    error: false,
    errorMsg: "",
  },
};

const ElectricityBill = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] =
    useState<FormValueTypes>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>(initialFormErrors);

  const navigate = useNavigate();
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const validateConsumerNo = (name: string, value: string) => {
    console.log(name, value);
    // const phoneRegex = /^[6-9]\d{9}$/;
    if (value === "") {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Consumer No. required",
        },
      });
      return;
    } else if (value.length < 12) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Invalid Consumer No.",
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

  const calculateBillAmount = () => {
    return Math.floor(100 + Math.random() * 900); // Simulating a random bill amount
  };
  const fetchBillAmount = () => {
    // setIsLoading(true);
    // Simulate an API call to fetch bill amount
    // setTimeout(() => {
      setFormValues({
        ...formValues,
        billAmount: "" + calculateBillAmount(), // Example amount
      });
      // setIsLoading(false);
    // }, 2000);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "consumerNo") {
      validateConsumerNo(name, value);
      if (value.length === 12) {
        fetchBillAmount();
      } else if (value.length === 11) {
      }
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = {
        phoneNo: formValues.consumerNo,
        planAmount: formValues.billAmount,
        billType: "mobileRecharge",
        payerId: loggedInUser._id,
      };
      setIsLoading;
    //   const res: any = await mobileRecharge(data);
    //   if (!res.error) {
    //     setIsLoading(false);
    //     toast.success("Recharge Successful");
    //     navigate("/billPayments");
    //   } else {
    //     toast.error(res.error || "Recharge Failed");
    //   }
    //   console.log(res);
    };
  return (
    <div className="w-full h-full flex justify-center items-center mt-14">
      <form
        className="min-h-[300px] w-[450px] rounded-md border-t-1 border-gray-100 shadow-md flex flex-col gap-2 items-center pt-4 pb-2"
        onSubmit={handleSubmit}
      >
        <div className="text-xl font-bold mx-auto mb-4 flex justify-center items-center gap-2">
          <FaRegLightbulb className="text-purple-500" />{" "}
          <span>Pay Electricity Bill Here</span>
        </div>
        <div className="relative flex flex-col gap-1 w-4/5">
          <label htmlFor="consumerNo" className="text-lg font-semibold">
            Enter Consumer No.
          </label>
          {/* <span className="absolute -left-1 top-12 transform -translate-y-1/2 text-gray-500 text-md">
            +91-
          </span> */}
          <div className="relative">
            <input
              type="text"
              name="consumerNo"
              id="consumerNo"
              placeholder="Enter Consumer No."
              maxLength={12}
              pattern="[0-9]*" // ensures only numbers are entered
              inputMode="numeric" // shows numeric keyboard on mobile
              className="w-full outline-none border-b-2 border-gray-200 shadow-b-sm focus:border-violet-200 py-1 text-md" // `pl-6` adds left padding for the symbol
                onChange={handleOnChange}
              //   value={formValues.phoneNo}
            />
          </div>
          {formErrors.consumerNo.error && (
            <span className="text-red-600 text-sm font-semibold">
              {formErrors.consumerNo.errorMsg}
            </span>
          )}
        </div>
        {formValues.consumerNo.length === 12 && (
          <div className=" w-4/5">
            <div className="relative flex flex-col gap-1">
              <label htmlFor="billAmount" className="text-lg font-semibold">
                Bill Amount
              </label>
              <span className="absolute left-2 top-3/4 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                name="planAmount"
                id="planAmount"
                //   placeholder="Enter plan amount"
                className="w-full outline-none border-b-2 border-gray-200 shadow-b-sm focus:border-violet-200 px-8 py-1 pl-6 cursor-not-allowed" // `pl-6` adds left padding for the symbol
                //   onChange={handleOnChange}
                readOnly
                  value={formValues.billAmount}
              />
            </div>
            {/* {formErrors.planAmount.error && (
            <span className="text-red-600 text-sm font-semibold flex flex-start">
              {formErrors.planAmount.errorMsg}
            </span>
          )} */}
          </div>
        )}
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

export default ElectricityBill;
