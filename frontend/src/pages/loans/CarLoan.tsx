import { ChangeEvent, useEffect, useState } from "react";
import PersonalDetails from "../../components/forms/PersonalDetails";
import CarLoanDetails from "../../components/forms/CarLoanDetails";
import {
  createCarLoan,
  getAllLoanApplicationForms,
  removeAdminRequest,
} from "../../api/loanAPI";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { MdOutlinePendingActions } from "react-icons/md";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { SiTicktick } from "react-icons/si";

interface LoanApplicationForm {
  author: string;
  loanType: string;
  assetType: "new-car-loan" | "used-car-loan";
  carBrandName: string;
  carModelName: string;
  loanAmount: string;
  loanPeriod: string;
  name: string;
  email: string;
  bank: string;
  accountNo: string;
  incomeSlab: boolean | null;
  bankStatement: File | null;
}
interface Errors {
  // author:string;
  carBrandName?: string;
  carModelName?: string;
  loanAmount?: string;
  loanPeriod?: string;
  name?: string;
  email?: string;
  bank?: string;
  accountNo?: string;
  incomeSlab?: boolean | null;
  bankStatement?: File | null;
  loanDetailsErrors?: string;
  submitError?: string;
}
const CarLoan = () => {
  const [activeTab, setActiveTab] = useState<
    "loan-details" | "personal-details"
  >("loan-details");
  const [formData, setFormData] = useState<LoanApplicationForm>({
    loanType: "car-loan",
    assetType: "new-car-loan",
    carBrandName: "",
    carModelName: "",
    loanAmount: "",
    loanPeriod: "60months",
    name: "",
    email: "",
    bank: "",
    accountNo: "",
    incomeSlab: null,
    bankStatement: null,
    author: "",
  });
  const [formErrors, setFormErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loanDetails, setLoanDetails] = useState<any>({});
  const [isFetching, setIsFetching] = useState(true);
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const validateLoanAmount = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");

    // Limit to 11 digits
    const trimmedNumber = numbersOnly.slice(0, 8);

    // Update the form state
    // onFormChange("accountNo" as keyof LoanApplicationForm, trimmedNumber);
    setFormData((prev) => ({
      ...prev,
      loanAmount: trimmedNumber,
    }));

    // Clear any existing error
    setFormErrors((prev) => ({
      ...prev,
      loanAmount: undefined,
    }));

    // Validate length (optional)
    if (trimmedNumber.length === 0) {
      setFormErrors((prev) => ({
        ...prev,
        loanAmount: "Loan Amount is required",
      }));
    }
  };
  const handleFormChange = (field: string, value: any) => {
    console.log("Field:", field, "Value:", value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (field === "carBrandName") {
      if (value.trim() === "") {
        setFormErrors((prev) => ({
          ...prev,
          carBrandName: "Car brand name is required",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          carBrandName: undefined,
        }));
      }
    } else if (field === "carModelName") {
      if (value.trim() === "") {
        setFormErrors((prev) => ({
          ...prev,
          carModelName: "Car model name is required",
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          carModelName: undefined,
        }));
      }
    } else if (field === "loanAmount") {
      validateLoanAmount(value);
    }
  };

  // Handle file upload separately
  const handleFileChange = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      bankStatement: file,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newFormData = new FormData(); // Works out of the box!

    if (
      formData.name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.bank.trim() === "" ||
      formErrors.accountNo?.trim() === "" ||
      formData.incomeSlab === null ||
      formData.bankStatement === null
    ) {
      setFormErrors((prev) => ({
        ...prev,
        submitError: "Please fill in all required fields in Personal Details.",
      }));
      return;
    } else {
      newFormData.append("loanType", "car-loan");
      newFormData.append("assetType", formData.assetType);
      newFormData.append("carBrandName", formData.carBrandName);
      newFormData.append("carModelName", formData.carModelName);
      newFormData.append("loanAmount", formData.loanAmount);
      newFormData.append("loanPeriod", formData.loanPeriod);
      newFormData.append("name", formData.name);
      newFormData.append("email", formData.email);
      newFormData.append("bank", formData.bank);
      newFormData.append("accountNo", formData.accountNo);
      newFormData.append("incomeSlab", String(formData.incomeSlab));
      newFormData.append("bankStatement", formData.bankStatement as Blob);
      newFormData.append("author", loggedInUser._id);
      // console.log("Form Submitted")
      console.log("Form submitted:", formData);
      // Add your submission logic here (API call, etc.)
      setIsLoading(true);
      const res: any = await createCarLoan(newFormData);
      console.log("Response from API:", res);
      if (res.error) {
        console.error("Error submitting form:", res.error);
        setFormErrors((prev) => ({
          ...prev,
          submitError: res.error.message,
        }));
        toast.error("Error submitting form: " + res.error.message);
      } else {
        console.log(res.message);
        setFormErrors((prev) => ({
          ...prev,
          submitError: undefined,
        }));
        toast.success("Form submitted successfully: " + res.message);
        // setIsLoading(false);
        // Reset form data after successful submission
        setFormData({
          author: "",
          loanType: "car-loan",
          assetType: "new-car-loan",
          carBrandName: "",
          carModelName: "",
          loanAmount: "",
          loanPeriod: "60months",
          name: "",
          email: "",
          bank: "",
          accountNo: "",
          incomeSlab: null,
          bankStatement: null,
        });
        setActiveTab("loan-details");
      }
      setIsLoading(false);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (activeTab === "loan-details") {
      // Validate loan details before moving to personal details
      if (
        formData.carBrandName.trim() === "" ||
        formData.carModelName.trim() === "" ||
        formData.loanAmount.trim() === "" ||
        formErrors.loanAmount
      ) {
        // alert("Please fill in all required fields in Loan Details.");
        setFormErrors((prev) => ({
          ...prev,
          loanDetailsErrors:
            "Please fill in all required fields in Loan Details.",
        }));
        return;
      }
      console.log("Moving to Personal Details");
      setActiveTab("personal-details");
    }
  };

  const fetchLoanApplicationForms = async () => {
    const res = await getAllLoanApplicationForms();
    const carLoans = res.filter(
      (loan: LoanApplicationForm) => loan.loanType === "car-loan"
    );
    const tempArr: any = carLoans.filter(
      (car: LoanApplicationForm) => car.author === loggedInUser._id
    );
    setLoanDetails(tempArr[0]);
    setIsFetching(false);
  };

  const handleRemoveAdminRequest = async () => {
    const res = await removeAdminRequest(loanDetails._id, false, "");
    if (!res.error) {
      toast.success("Admin request removed successfully!");
      setLoanDetails((prev: any) => ({
        ...prev,
        adminRequest: false,
        adminRequestComment: "",
      }));
    } else {
      toast.error(res.message || "Failed to remove admin request");
      console.error("Error removing admin request:", res.message);
    }
  };
  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab, formErrors.submitError]);
  useEffect(() => {
    fetchLoanApplicationForms();
  }, []);
  console.log("Form Data:", formData.bankStatement);

  if (isFetching) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <GridLoader color="blue" size={8} />
      </div>
    );
  }
  return (
    <div>
      {loanDetails?.loanType === "car-loan" &&
      loanDetails?.author === loggedInUser._id ? (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col gap-2 justify-center items-center">
          {loanDetails.status === "pending" ? (
            <MdOutlinePendingActions className="h-20 w-20 text-orange-300" />
          ) : loanDetails.status === "approved" ? (
            <SiTicktick className="h-20 w-20 text-green-500" />
          ) : (
            <RxCrossCircled className="h-20 w-20 text-red-500" />
          )}
          {/* <div> */}
          {/* {loanDetails.adminRequest && (
            <div className="w-full flex justify-center items-center absolute z-1 top-14 left-1/2 -translate-x-1/2 text-sm font-semibold bg-red-300 rounded-full px-4 py-0.5">
              Admin has requested for more information
              {loanDetails.adminRequestComment && (
                <span className="text-gray-600">
                  : {loanDetails.adminRequestComment}
                </span>
              )}
              <RxCross2
                className="h-4 w-4 absolute right-4 text-white cursor-pointer hover:font-bold"
                onClick={handleRemoveAdminRequest}
              />
            </div>
          )} */}
          {/* </div> */}
          <div className="text-2xl font-semibold">
            {" "}
            {loanDetails.status === "pending"
              ? "You have already applied for Home loan"
              : loanDetails.status === "approved"
              ? "Your application has been approved"
              : "Your application has been rejected"}
          </div>
          <div className="text-xl font-bold flex items-center justify-center">
            <span> Status : </span>
            <span
              className={`mt-2 ml-3 ${
                loanDetails.status === "pending"
                  ? "text-orange-300"
                  : loanDetails.status === "approved"
                  ? "text-green-400"
                  : "text-red-600"
              }`}
            >
              {loanDetails.status === "pending"
                ? "Pending"
                : loanDetails.status === "approved"
                ? "Approved"
                : "Rejected"}
            </span>
          </div>
          <Link
            to={"/loans"}
            className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold rounded-md px-4 py-1 mt-4"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <form
          className="w-full flex flex-col  mx-auto my-8 px-12"
          // onSubmit={handleSubmit}
        >
          <div className="w-full flex">
            <div className="w-1/2">
              <div
                className={`font-semibold ${
                  activeTab === "loan-details"
                    ? "text-blue-900"
                    : "text-gray-400"
                }`}
              >
                Loan Details
              </div>
              <div
                className={`w-full h-[5px] ${
                  activeTab === "loan-details" ? "bg-blue-900" : "bg-gray-200"
                }`}
              ></div>
            </div>
            <div className="w-1/2">
              <div
                className={`font-semibold ${
                  activeTab === "personal-details"
                    ? "text-blue-900"
                    : "text-gray-400"
                }`}
              >
                Personal Details
              </div>
              <div
                className={`w-full h-[5px] ${
                  activeTab === "personal-details"
                    ? "bg-blue-900"
                    : "bg-gray-200"
                }`}
              ></div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="space-y-12 w-1/3 pt-8 px-8">
              <div className="text-3xl font-semibold text-blue-900">
                Finances made delightfully esay!!
              </div>
              <div className="text-xl text-gray-500">
                Getting your dream car just gets easier here....
              </div>
            </div>
            <div className="w-2/3">
              <div className="mx-auto">
                {formErrors.loanDetailsErrors && (
                  <p className="text-red-500 text-sm mt-4">
                    {formErrors.loanDetailsErrors}
                  </p>
                )}
              </div>
              {activeTab === "loan-details" ? (
                <CarLoanDetails
                  formData={formData}
                  onFormChange={handleFormChange}
                  formErrors={formErrors}
                />
              ) : (
                <PersonalDetails
                  formData={formData}
                  onFormChange={handleFormChange}
                  onFileChange={handleFileChange}
                  // formErrors={formErrors}
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 px-3 py-1.5 hover:bg-gray-200 rounded-md cursor-pointer"
              onClick={() => setActiveTab("loan-details")}
            >
              Back
            </button>
            <button
              type={activeTab === "loan-details" ? "button" : "submit"}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (activeTab === "loan-details") {
                  handleNext(e);
                } else {
                  handleSubmit(e);
                }
              }}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              {activeTab === "loan-details" ? "Next" : "Submit"}
            </button>
          </div>
          {isLoading && (
            <div className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40 flex items-center justify-center z-50">
              <Circles
                height="80"
                width="80"
                color="blue"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
        </form>
      )}
    </div>
  );
};
export default CarLoan;
