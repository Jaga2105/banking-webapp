import React, { FormEvent, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  IoAlert,
  IoAlertCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { getUserDetails, sendMoney } from "../../api/userAPI";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAllPayee } from "../../api/payeeAPI";
import { calculateCreationTime } from "../../helpers/CalculateCreationTime";
import { calculatePayableAmount } from "../../helpers/CalculatePayableAmount";

interface Props {
  handleShowSendMoneyModal: (flag: boolean) => void;
  userDetails: any;
}
interface FormValues {
  // name: string;
  selectedPayeeAccountNo: string;
  selectedPayeeBankName?: string;
  amount: number;
  description: string;
}
const initialFormValues: FormValues = {
  // name: "",
  selectedPayeeAccountNo: "",
  selectedPayeeBankName: "",
  amount: 0,
  description: "",
};
interface FormErrors {
  // name: {
  //   error: boolean;
  //   errorMsg: string;
  // };
  selectedPayeeAccountNo: {
    error: boolean;
    errorMsg: string;
  };
  // selectedPayeeBankName?: {
  //   error: boolean;
  //   errorMsg: string;
  // };
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
  // name: {
  //   error: false,
  //   errorMsg: "",
  // },
  selectedPayeeAccountNo: {
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
  const [payees, setPayees] = React.useState<any>([]);

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

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
  const handleSelectOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(e.target.name);
    const { name, value } = e.target;
    const parsedValue = JSON.parse(value);
    const { accountNo, bankName } = parsedValue;
    console.log(accountNo, bankName);
    setFormValues({
      ...formValues,
      ["selectedPayeeAccountNo"]: accountNo,
      ["selectedPayeeBankName"]: bankName,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);

    const hasErrors =
      formValues.selectedPayeeAccountNo === "" ||
      Number.isNaN(formValues.amount) ||
      formValues.description === "";

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
      receiverAccountNo: formValues.selectedPayeeAccountNo,
      amount: calculatePayableAmount(
        formValues.amount,
        formValues.selectedPayeeBankName,
        userDetails.bankName
      ),
      payerBankName:userDetails.bankName,
      payeeBankName:formValues.selectedPayeeBankName,
      description: formValues.description,
      createdAt: Date.now(),
    };
    console.log(userData);
    setIsLoading(true);
    const res: any = await sendMoney(userData);
    console.log(res);
    if (res.success) {
      setIsLoading(false);
      handleClose();
      toast.success("Transaction Successful");
    } else {
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
  const fetchPayees = async () => {
    const payeeResponse: any = await getAllPayee(loggedInUser._id);
    console.log(payeeResponse);
    setPayees(
      payeeResponse.filter(
        (res: any) => calculateCreationTime(res.createdAt) > 30
      )
    );
  };
  useEffect(() => {
    fetchPayees();
  }, []);
  console.log(userDetails.bankName !== formValues.selectedPayeeBankName);
  console.log(formValues.selectedPayeeBankName, userDetails.bankName);
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
        className={`absolute flex flex-col gap-4 min-h-[400px] sm:min-h-[400px] w-[360px] sm:w-[450px] px-6 pt-6 pb-6 bg-white rounded-xl`}
        onSubmit={handleSubmit}
      >
        <div className="text-xl text-blue-400 font-semibold mx-auto">
          Enter details to send Money
        </div>
        {formErrors.submitError.error && (
          <p className="text-red-500 font-semibold mx-auto flex gap-1 items-center justify-center">
            <IoAlertCircleOutline className="h-5 w-5" />
            {formErrors.submitError.errorMsg}
          </p>
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
          <label htmlFor="selectedPayeeAccountNo" className="text-lg">
            Select Payee
          </label>
          {/* <input
            type="number"
            name="accountNo"
            placeholder="Enter 11-digit account number"
            className={`outline-none border-1 shadow-md rounded-md px-2 py-1 ${
              formErrors.accountNo.error ? "border-red-500" : "border-blue-200"
            }`}
            onChange={handleOnchange}
            onBlur={(e) => validateAccountNo(e.target.name, e.target.value)}
          /> */}
          <select
            name="selectedPayeeAccountNo"
            id="selectedPayeeAccountNo"
            className="outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1"
            onChange={handleSelectOnChange}
            // value={formValues.selectedPayeeAccountNo}
          >
            <option value="">Select Payee</option>
            {payees.map((payee: any) => {
              return (
                <option
                  key={payee._id}
                  value={JSON.stringify({
                    // ✅ Properly stringified
                    accountNo: payee.accountNo,
                    bankName: payee.bankName,
                  })}
                >
                  {payee.payeeName} ({payee.accountNo})
                </option>
              );
            })}
          </select>
          {formErrors.selectedPayeeAccountNo.error && (
            <p className="text-red-500">
              {formErrors.selectedPayeeAccountNo.errorMsg}
            </p>
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
          {formValues.selectedPayeeBankName !== "" &&
            formValues.selectedPayeeBankName !== userDetails.bankName && (
              <p className="text-green-500 font-semibold flex items-center gap-1 text-sm">
                <IoInformationCircleOutline className="w-5 h-5" />{" "}
                {/* Optional icon */}
                Additional ₹10 fee applies for inter-bank transfers
              </p>
            )}
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
        {formValues.selectedPayeeBankName !== "" &&
          formValues.selectedPayeeBankName !== userDetails.bankName && (
            <div className="w-full flex justify-between">
              <span className="font-semibold">Total Amount Payable:</span>
              <span className="font-bold text-lg">
                &#8377;{" "}
                {/* {formValues.selectedPayeeBankName !== userDetails.bankName
                ? Number(formValues.amount) + 10
                : formValues.amount} */}
                {calculatePayableAmount(
                  formValues.amount,
                  formValues.selectedPayeeBankName,
                  userDetails.bankName
                )}
              </span>
            </div>
          )}
        <button className="bg-blue-200 text-blue-600 font-bold text-lg py-1 px-2 mt-4 rounded-sm cursor-pointer">
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
