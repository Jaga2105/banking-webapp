import React, { FormEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoAlert, IoAlertCircleOutline } from "react-icons/io5";
import { sendMoney } from "../../api/userAPI";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

interface Props {
  handleShowSendMoneyModal: (flag: boolean) => void;
  userDetails: any;
}
interface FormValues {
  name: string;
  accountNo: string;
  amount: number;
  description: string;
}
const initialFormValues: FormValues = {
  name: "",
  accountNo: "",
  amount: 0,
  description: "",
};
interface FormErrors {
  name: {
    error: boolean;
    errorMsg: string;
  };
  accountNo: {
    error: boolean;
    errorMsg: string;
  };
  amount: {
    error: boolean;
    errorMsg: string;
  };
  description: {
    error: boolean;
    errorMsg: string;
  };
  submitError: {
    error: boolean;
    errorMsg: string;
  };
}
const initialFormErrors: FormErrors = {
  name: {
    error: false,
    errorMsg: "",
  },
  accountNo: {
    error: false,
    errorMsg: "",
  },
  amount: {
    error: false,
    errorMsg: "",
  },
  description: {
    error: false,
    errorMsg: "",
  },
  submitError: {
    error: false,
    errorMsg: "",
  },
};
const SendMoney = ({ handleShowSendMoneyModal, userDetails }: Props) => {
  const [formValues, setFormValues] =
    React.useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] =
    React.useState<FormErrors>(initialFormErrors);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClose = () => {
    handleShowSendMoneyModal(false);
  };
  const validateAccountNo = (name: string, value: string) => {
    const regEx = /^[0-9]{11}$/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `Account No. shouldn't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Invalid Account No.`;
      error = true;
    }
    // setFormValues({
    //   ...formValues,
    //   [name]: value,
    // });
    if (error) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error,
          errorMsg,
        },
      });
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
  const validateAmount = (name: string, value: number) => {
    if (Number.isNaN(value)) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Amount should n't be empty",
        },
      });
    } else if (value <= 0) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Amount should n't be zero or negative",
        },
      });
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
  const validateDescription = (name: string, value: string) => {
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `${name} shouldn't be empty`;
      error = true;
    } else if (value.length < 5) {
      errorMsg = `${name} length must be greater than 5 characters`;
      error = true;
    }
    // setFormValues({
    //   ...formValues,
    //   [name]: value,
    // });
    if (error) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error,
          errorMsg,
        },
      });
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
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // if (e.target.name === "accountNo") {
    //   validateAccountNo(e.target.name, e.target.value);
    // } else if (e.target.name === "amount") {
    //   validateAmount(e.target.name, e.target.valueAsNumber);
    // } else if (e.target.name === "description") {
    //   validateDescription(e.target.name, e.target.value);
    // }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validateAccountNo("accountNo", formValues.accountNo);
    // validateAmount("amount", formValues.amount);
    // validateDescription("description", formValues.description);
    const hasErrors =
      formValues.accountNo==="" ||
      Number.isNaN(formValues.amount) ||
      formValues.description==="";

    if (hasErrors) {
      setFormErrors({
        ...formErrors,
        submitError: {
          error: true,
          errorMsg: "Please fill all fields correctly",
        },
      });
      return; // Stop submission if errors exist
    }

    const userData = {
      senderAccountNo: userDetails.accountNo,
      receiverAccountNo: formValues.accountNo,
      amount: formValues.amount,
      description: formValues.description,
      createdAt: Date.now(),
    };
    setIsLoading(true);
    const res:any = await sendMoney(userData);
    console.log(res)
    if (res.success) {
      setIsLoading(false);
      handleClose();
      toast.success("Transaction Successful")
    }else{
      setIsLoading(false);
      setFormErrors({
        ...formErrors,
        submitError: {
          error: true,
          errorMsg: res.message,
        },
      });
    }
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40">
      {/* Close button */}
      <div
        className="absolute top-5 right-5 z-10 cursor-pointer"
        onClick={handleClose}
      >
        <RxCross2
          className="h-8 w-8 text-white"
          //   onClick={() => handleOnclickDeleteCustomer("")}
        />
      </div>
      {/*Modal Backdrop */}
      <div
        className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
        onMouseDown={handleClose}
      ></div>
      <form
        className={`absolute flex flex-col gap-4 min-h-[400px] sm:min-h-[400px] w-[360px] sm:w-[450px] px-6 pt-6 pb-2 bg-white rounded-xl`}
        onSubmit={handleSubmit}
      >
        <div className="text-xl text-blue-400 font-semibold mx-auto">
          Enter details to send Money
        </div>
        {formErrors.submitError.error && (
          <p className="text-red-500 font-semibold mx-auto flex gap-1 items-center justify-center">
            <IoAlertCircleOutline className="h-5 w-5"/>{formErrors.submitError.errorMsg}</p>
        )}
        {/* <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-lg">
            Account Holder Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Account holder name.."
            className="outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1"
          />
        </div> */}
        <div className="flex flex-col gap-1">
          <label htmlFor="accountNo" className="text-lg">
            Account Number
          </label>
          <input
            type="number"
            name="accountNo"
            placeholder="Enter 11-digit account number"
            className={`outline-none border-1 shadow-md rounded-md px-2 py-1 ${
              formErrors.accountNo.error ? "border-red-500" : "border-blue-200"
            }`}
            onChange={handleOnchange}
            onBlur={(e) => validateAccountNo(e.target.name, e.target.value)}
          />
          {formErrors.accountNo.error && (
            <p className="text-red-500">{formErrors.accountNo.errorMsg}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="amount" className="text-lg">
            Amount ( &#8377; )
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter amount "
            className={`outline-none border-1 shadow-md rounded-md px-2 py-1 ${
              formErrors.amount.error ? "border-red-500" : "border-blue-200"
            }`}
            onChange={handleOnchange}
            onBlur={(e) =>
              validateAmount(e.target.name, e.target.valueAsNumber)
            }
          />
          {formErrors.amount.error && (
            <p className="text-red-500">{formErrors.amount.errorMsg}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter description "
            className={`outline-none border-1 shadow-md rounded-md px-2 py-1 ${
              formErrors.description.error
                ? "border-red-500"
                : "border-blue-200"
            }`}
            onChange={handleOnchange}
            onBlur={(e) => validateDescription(e.target.name, e.target.value)}
          />
          {formErrors.description.error && (
            <p className="text-red-500">{formErrors.description.errorMsg}</p>
          )}
        </div>
        <button className="bg-blue-300 py-1 px-2 mt-4 rounded-sm cursor-pointer">
          {!isLoading ? (
            "Send"
          ) : (
            <PulseLoader className="text-white" color="white" size={8} />
          )}
        </button>
      </form>
    </div>
  );
};
export default SendMoney;
