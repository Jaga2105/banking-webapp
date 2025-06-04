import React, { ChangeEvent, FormEvent, useState } from "react";
import { TbDeviceMobileCharging } from "react-icons/tb";
import Airtel from "../assets/simProvider/Airtel.jpg";
import Jio from "../assets/simProvider/Jio.jpg";
import Vodafone from "../assets/simProvider/Vodafone.jpg";
import Bsnl from "../assets/simProvider/Bsnl.jpg";
import { toast } from "react-toastify";
interface FormValueTypes {
  phoneNo: string;
  planAmount: string;
}
const initialFormValues = {
  phoneNo: "",
  planAmount: "",
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
  const [providerDetails, setProviderDetails] = useState<ProviderTypes>(
    initialProviderDetails
  );
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
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNo") {
      // validatePhoneNo(name, value);
      if (value.length === 10) {
        fetchProviderName(name, value);
      } else if (value.length === 9) {
        setProviderDetails({
          ...providerDetails,
          ["providerName"]: "",
          ["logo"]: "",
        });
      }
    }
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValues.phoneNo === "" || formValues.planAmount === "") {
      toast.error("Fill all the fields");
      return;
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center mt-14">
      <form
        className="h-[300px] w-[450px] rounded-md border-t-1 border-gray-100 shadow-md flex flex-col gap-2 items-center pt-4"
        onSubmit={handleSubmit}
      >
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
        </div>
        <div className="relative flex flex-col gap-1 w-4/5">
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
        <button
          type="submit"
          className="px-8 py-1 mt-8 bg-purple-200 rounded-md text-purple-700 text-large font-bold cursor-pointer"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default MobileRecharge;
