import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axis from "../../assets/banks/axis.jpeg";
import bob from "../../assets/banks/bob.jpeg";
import hdfc from "../../assets/banks/HDFC.jpeg";
import icici from "../../assets/banks/ICICI.jpeg";
import kotak from "../../assets/banks/kotak.jpeg";
import sbi from "../../assets/banks/sbi.jpeg";
import ubi from "../../assets/banks/ubi.jpeg";
import bankLogo from "../../assets/banks/bankLogo.jpg";
import { toast } from "react-toastify";
import { convertImageToBase64 } from "../../helpers/FormatImage";
import { addNewPayee, getPayee, updatePayee } from "../../api/payeeAPI";
import { GridLoader, PulseLoader } from "react-spinners";

interface EditPayeeProps {
  id: string;
  handleShowEditPayee: (id: string) => void;
}
const bankList = [
  { id: 1, bankName: "SBI", img: sbi },
  { id: 2, bankName: "HDFC", img: hdfc },
  { id: 3, bankName: "ICICI", img: icici },
  { id: 4, bankName: "Axis Bank", img: axis },
  { id: 5, bankName: "Kotak", img: kotak },
  { id: 6, bankName: "Union Bank", img: ubi },
  { id: 7, bankName: "Bank of Baroda", img: bob },
];
interface formValueProps {
  bankName: string;
  bankLogo: string;
  accountNo: string;
  payeeName: string;
}
const initialFormValues: formValueProps = {
  bankName: "",
  bankLogo: "",
  accountNo: "",
  payeeName: "",
};
interface formErrorsProps {
  accountNo: {
    error: boolean;
    errorMsg: string;
  };
  bankName: {
    error: boolean;
    errorMsg: string;
  };
  payeeName: {
    error: boolean;
    errorMsg: string;
  };
  submitError: {
    error: boolean;
    errorMsg: string;
  };
}
const initialFormErrors: formErrorsProps = {
  accountNo: {
    error: false,
    errorMsg: "",
  },
  bankName: {
    error: false,
    errorMsg: "",
  },
  payeeName: {
    error: false,
    errorMsg: "",
  },
  submitError: {
    error: false,
    errorMsg: "",
  },
};

const EditPayee = ({ id, handleShowEditPayee }: EditPayeeProps) => {
  //   const [selectedBank, setSelectedBank] = useState<selectedBankProps>(initialSelectedBank);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [formValues, setFormValues] =
    useState<formValueProps>(initialFormValues);
  const [formErrors, setFormErrors] =
    useState<formErrorsProps>(initialFormErrors);
  const validateAccountNo = (name: string, value: string) => {
    const regEx = /^[0-9]{11}$/;
    let errorMsg = "";
    let error = false;
    if (value === "") {
      errorMsg = `Account No. shouldn't be empty`;
      error = true;
    } else if (!regEx.test(value)) {
      errorMsg = `Account No. should be of 11 digits`;
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
  const validatePayeeName = (name: string, value: string) => {
    if (value === "") {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Payee Name shouldn't be empty",
        },
      });
    } else if (value.length < 5) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Payee Name should be of minimum 5 characters",
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
  const validateBankName = (name: string, value: string) => {
    if (value === "") {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Bank Name shouldn't be empty",
        },
      });
    } else if (value?.length < 3) {
      setFormErrors({
        ...formErrors,
        [name]: {
          error: true,
          errorMsg: "Bank Name should be of minimum 5 characters",
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
  const handleOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "accountNo") {
      validateAccountNo(name, value);
    } else if (name === "payeeName") {
      validatePayeeName(name, value);
    } else if (name === "bankName") {
      validateBankName(name, value);
    }

    if (name === "bankName") {
      setFormValues({
        ...formValues,
        [name]: value,
        ["bankLogo"]: bankLogo,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "payeeName") {
      validatePayeeName(name, value);
    } else if (name === "bankName") {
      validateBankName(name, value);
    }
  };
  const handleSelectedBank = (bank: any) => {
    setSelectedBank(bank.bankName);
    validateBankName("bankName", bank.bankName);
    setFormValues({
      ...formValues,
      bankName: bank.bankName,
      bankLogo: bank.img,
    });
  };

  const handleClearSelectedBank = () => {
    setSelectedBank("");
    setFormValues({
      ...formValues,
      bankName: "",
    });
    validateBankName("bankName", "");
    // setFormValues({
    //   ...formValues,
    //   bankName: "",
    // });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formValues.accountNo === "" ||
      formValues.payeeName === "" ||
      formValues.bankName === ""
    ) {
      //   {
      setFormErrors({
        ...formErrors,
        submitError: {
          error: true,
          errorMsg: "Please fill all the fields",
        },
      });
      toast.error("Please fill all the fields");
      return;
      //   }
    } else {
      setFormErrors({
        ...formErrors,
        submitError: {
          error: false,
          errorMsg: "",
        },
      });
    }
    const { accountNo, payeeName, bankName, bankLogo } = formValues;
    const formattedBankLogo = await convertImageToBase64(bankLogo);
    const payeeData = {
      accountNo,
      payeeName,
      bankName,
      bankLogo: formattedBankLogo,
    };
    setIsLoading(true);
    const response = await updatePayee(id, payeeData);
    console.log(response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.message);
      handleShowEditPayee("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchPayeeDetails = async () => {
      const response: any = await getPayee(id);
      // console.log(respone)
      setFormValues(response);
      setSelectedBank(response.bankName);
      setIsFetching(false);
    };
    fetchPayeeDetails();
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40">
      {/* Close button */}
      <div
        className="absolute top-5 right-5 z-10 cursor-pointer"
        //   onClick={handleClose}
      >
        <RxCross2
          className="h-8 w-8 text-white"
          onClick={() => handleShowEditPayee("")}
        />
      </div>
      {/*Modal Backdrop */}
      <div
        className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
        onClick={() => handleShowEditPayee("")}
      ></div>
      <form
        className={`absolute flex flex-col gap-2 min-h-[350px] w-[480px] sm:w-[540px] px-4 py-8 bg-white rounded-xl overflow-y-auto`}
        onSubmit={handleSubmit}
      >
        {isFetching ? (
          <div className="min-h-[300px] w-full flex justify-center items-center">
            <GridLoader size={8} color="blue" />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full justify-center items-center px-10">
            {/* Field for Bank Name */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="bank" className="text-lg font-semibold">
                Enter receiver Bank
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="bankName"
                  placeholder={
                    selectedBank === "" ? "Enter/ Choose Bank Name" : ""
                  }
                  onChange={handleOnchange}
                  onBlur={handleOnBlur}
                  // className="outline-none border-1 shadow-md rounded-md px-3 py-1 border-blue-200 w-full"
                  className={`outline-none border-1 shadow-md rounded-md px-2 py-1 w-full
                        ${
                          formErrors.bankName.error
                            ? "border-red-500"
                            : "border-gray-200 focus:border-purple-400"
                        }`}
                  value={formValues?.bankName}
                  readOnly={!!selectedBank} // Make read-only when bank is selected
                />
                {formErrors.bankName.error && (
                  <p className="text-red-500">{formErrors.bankName.errorMsg}</p>
                )}

                {/* Bank Badge inside input */}
                {selectedBank && (
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
                    <div className="rounded-full border border-purple-300 bg-purple-100 flex gap-1 items-center justify-center overflow-hidden px-2">
                      <img
                        src={
                          bankList.find(
                            (bank) => bank.bankName === selectedBank
                          )?.img
                        }
                        alt={selectedBank}
                        className="h-4 w-4 object-cover rounded-lg"
                      />
                      <div className="text-sm ">{selectedBank}</div>
                      <RxCross2
                        className="h-3 w-3 text-purple-600 cursor-pointer"
                        onClick={handleClearSelectedBank}
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* </label> */}
            </div>
            {selectedBank === "" && formValues.bankName === "" && (
              <div className="w-full">
                <div className="text-lg font-semibold">Popular Banks</div>
                <div className="flex flex-wrap gap-2  items-center mt-2">
                  {bankList.map((bank) => (
                    <div
                      className="flex flex-col gap-2 items-center justify-center"
                      key={bank.id}
                    >
                      <div
                        className="border-1 h-10 w-10 flex justify-center items-center border-gray-300 shadow-sm rounded-md object-cover overflow-hidden hover:bg-gray-100 hover:shadow-lg cursor-pointer"
                        onClick={() => handleSelectedBank(bank)}
                      >
                        <img
                          src={bank.img}
                          alt={bank.bankName}
                          className="h-8 w-8 object-cover rounded-md"
                        />
                      </div>
                      <span className="text-xs">{bank.bankName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Field for Account Number */}
            <div className="flex flex-col gap-2 w-full ">
              <label htmlFor="bankName" className="text-lg font-semibold">
                Enter Account Number
              </label>
              <input
                type="number"
                name="accountNo"
                placeholder="Enter account number"
                maxLength={11}
                onChange={handleOnchange}
                value={formValues.accountNo}
                className={`outline-none border-1 shadow-md rounded-md px-2 py-1
                      ${
                        formErrors.accountNo.error
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-400"
                      }`}
                //   className="outline-none border-1 shadow-md rounded-md px-3 py-1 border-blue-200"
              />
              {formErrors.accountNo.error && (
                <p className="text-red-500">{formErrors.accountNo.errorMsg}</p>
              )}
            </div>
            {/* Field for Payee Name */}
            <div className="flex flex-col gap-2 w-full ">
              <label htmlFor="bankName" className="text-lg font-semibold">
                Enter Payee Name
              </label>
              <input
                type="text"
                name="payeeName"
                placeholder="Enter Payee Name"
                onChange={handleOnchange}
                value={formValues.payeeName}
                onBlur={handleOnBlur}
                className={`outline-none border-1 shadow-md rounded-md px-2 py-1
                      ${
                        formErrors.payeeName.error
                          ? "border-red-500"
                          : "border-gray-200 focus:border-purple-400"
                      }`}
                //   className="outline-none border-1 shadow-md rounded-md px-3 py-1 border-blue-200"
              />
              {formErrors.payeeName.error && (
                <p className="text-red-500">{formErrors.payeeName.errorMsg}</p>
              )}
            </div>
            <button
              className={`mt-4 w-[100px] text-white px-2 rounded-sm py-0.5 font-semibold bg-purple-400 cursor-pointer`}
              type="submit"
            >
              {!isLoading ? (
                "Update"
              ) : (
                <PulseLoader className="text-white" color="white" size={8} />
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPayee;
