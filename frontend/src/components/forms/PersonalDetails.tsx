import React, { ChangeEvent } from "react";
import { LoanApplicationForm } from "../../types/types"; // Adjust import path as needed
import { FaRegFilePdf } from "react-icons/fa";

interface Bank {
  id: number;
  bankName: string;
}
interface FormErrorTypes {
  name?: string;
  email?: string;
  bank?: string;
  accountNo?: string;
  incomeSlab?: boolean | null;
  bankStatement?: File | null;
}

interface PersonalDetailsProps {
  formData: Pick<
    LoanApplicationForm,
    "name" | "email" | "bank" | "accountNo" | "incomeSlab" | "bankStatement"
  >;
  // formErrors: {
  //   name?: string;
  //   email?: string;
  //   bank?: string;
  //   accountNo?: string;
  //   incomeSlab?: boolean | null;
  //   bankStatement?: File | null;
  // };
  onFormChange: (field: string, value: string | boolean | File) => void;
  //   onFileChange: (field: string, value: File) => void;
  onFileChange: (file: File) => void; // Simplified to just accept File
}

const bankList: Bank[] = [
  { id: 1, bankName: "SBI" },
  { id: 2, bankName: "HDFC" },
  { id: 3, bankName: "ICICI" },
  { id: 4, bankName: "Axis Bank" },
  { id: 5, bankName: "Kotak" },
  { id: 6, bankName: "Union Bank" },
  { id: 7, bankName: "Bank of Baroda" },
];

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  formData,
  onFormChange,
  onFileChange,
}) => {
  const [formErrors, setFormErrors] = React.useState<FormErrorTypes>({});
  const validateName = (value: string) => {
    onFormChange("name" as keyof LoanApplicationForm, value);

    if (value.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        name: "Name is required",
      }));
      return;
    } else if (value.length < 3) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Name must be at least 3 letters",
      }));
      return;
    } else {
      // onFormChange("name" as keyof LoanApplicationForm, value);
      setFormErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }
  };
  const validateEmail = (value: string) => {
    onFormChange("email" as keyof LoanApplicationForm, value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      return;
    } else if (!emailPattern.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    } else {
      // onFormChange("email" as keyof LoanApplicationForm, value);
      setFormErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  };
  const validateBank = (value: string) => {
    onFormChange("bank" as keyof LoanApplicationForm, value);
    if (value.trim() === "") {
      setFormErrors((prev) => ({
        ...prev,
        bank: "Bank selection is required",
      }));
      return;
    } else {
      // onFormChange("bank" as keyof LoanApplicationForm, value);
      setFormErrors((prev) => ({
        ...prev,
        bank: undefined,
      }));
    }
  };
  const validateAccountNo = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    // Limit to 11 digits
    const trimmedNumber = numbersOnly.slice(0, 11);

    // Update the form state
    onFormChange("accountNo" as keyof LoanApplicationForm, trimmedNumber);

    // Clear any existing error
    setFormErrors((prev) => ({
      ...prev,
      accountNo: undefined,
    }));

    // Validate length (optional)
    if (trimmedNumber.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        accountNo: "Account number is required",
      }));
    } else if (trimmedNumber.length !== 11 && trimmedNumber.length > 0) {
      setFormErrors((prev) => ({
        ...prev,
        accountNo: "Account number must be 11 digits",
      }));
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: numbers, backspace, delete, tab, arrows
    if (
      !/^\d$/.test(e.key) &&
      !["Backspace", "Delete", "Tab"].includes(e.key) &&
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)
    ) {
      e.preventDefault();
    }
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      validateName(value);
    } else if (name === "email") {
      validateEmail(value);
    } else if (name === "bank") {
      validateBank(value);
    } else if (name === "accountNo") {
      validateAccountNo(value);
    }
    // onFormChange(name as keyof LoanApplicationForm, value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.name);
    onFormChange(e.target.name as keyof LoanApplicationForm, e.target.value);
  };

  const handleRadioChange = (value: boolean) => {
    console.log("Radio value:", value);
    onFormChange("incomeSlab", value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // onFormChange("bankStatement", e.target.files[0]);
      onFileChange(e.target.files[0]); // Use the simplified onFileChange
    }
  };
  const handleDownload = () => {
    if (!formData.bankStatement) return;

    // Create a temporary URL for the file
    const fileUrl = URL.createObjectURL(formData.bankStatement);

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = formData.bankStatement.name || "bank-statement.pdf";
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <div className="space-y-12  grid">
      
      <div className="pb-12 mt-8">
        <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>

        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4 space-y-2">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                    formErrors.name
                      ? "outline-red-500 focus:outline-red-400"
                      : "outline-gray-300 focus:outline-indigo-600"
                  } sm:text-sm/6`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  // className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                    formErrors.email
                      ? "outline-red-500 focus:outline-red-400"
                      : "outline-gray-300 focus:outline-indigo-600"
                  } sm:text-sm/6`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Bank Selection */}
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold">Select Bank</h2>
              <select
                name="bank"
                id="bank"
                value={formData.bank}
                onChange={handleSelectChange}
                // className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                  formErrors.bank
                    ? "outline-red-500 focus:outline-red-400"
                    : "outline-gray-300 focus:outline-indigo-600"
                } sm:text-sm/6`}
              >
                <option value="">Select Bank</option>
                {bankList.map((bank) => (
                  <option key={bank.id} value={bank.bankName}>
                    {bank.bankName}
                  </option>
                ))}
              </select>
              {formErrors.bank && (
                <p className="text-red-500 text-sm mt-1">{formErrors.bank}</p>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label htmlFor="accountNo" className="font-semibold">
                Account No.
              </label>
              <div className="mt-2">
                <input
                  id="accountNo"
                  name="accountNo"
                  type="text"
                  // pattern="\d{11}"
                  inputMode="numeric"
                  value={formData.accountNo}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                    formErrors.accountNo
                      ? "outline-red-500 focus:outline-red-400"
                      : "outline-gray-300 focus:outline-indigo-600"
                  } sm:text-sm/6`}
                />
                {formErrors.accountNo && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.accountNo}
                  </p>
                )}
              </div>
            </div>

            {/* Income Slab */}
            <div>
              <label className="font-semibold">
                Is monthly income more than &#8377; 3,00,000/-
              </label>
              <div className="mt-2 flex items-center">
                <input
                  type="radio"
                  id="incomeYes"
                  name="incomeSlab"
                  checked={formData.incomeSlab === true}
                  onChange={() => handleRadioChange(true)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="incomeYes" className="ml-2">
                  Yes
                </label>
                <input
                  type="radio"
                  id="incomeNo"
                  name="incomeSlab"
                  checked={formData.incomeSlab === false}
                  onChange={() => handleRadioChange(false)}
                  className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="incomeNo" className="ml-2">
                  No
                </label>
              </div>
            </div>

            {/* Bank Statement Upload */}
            <div>
              <label htmlFor="bankStatement" className="font-semibold block">
                Bank Statement Upload
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Upload last 3 months bank statement (PDF, DOC, DOCX)
              </p>
              <div className="mt-4 flex items-center gap-4">
                <label className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  Browse
                  <input
                    id="bankStatement"
                    name="bankStatement"
                    type="file"
                    accept=".pdf,.doc"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {formData.bankStatement && (
                  <div className="text-sm text-gray-700 flex flex-col items-center gap-1">
                    <FaRegFilePdf
                      className="h-4 w-4 text-gray-700 cursor-pointer"
                      onClick={handleDownload}
                      title="Download Bank Statement"
                    />
                    <span>{formData.bankStatement.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
