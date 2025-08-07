import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLoanApplicationDEtails } from "../api/loanAPI";
import { toast } from "react-toastify";
import { formattedTime } from "../helpers/FormattedTime";
import { GridLoader } from "react-spinners";
import { formatIndianRupees } from "../helpers/FormatIndianRupee";
import { formattedYear } from "../helpers/formattedYear";
import { FaArrowLeft, FaRegFilePdf } from "react-icons/fa";

const ViewApplication = () => {
  const { id }: any = useParams<{ id: string }>();
  const [applicationDetails, setApplicationDetails] = useState<any>(null);
  console.log("Viewing application with ID:", id);

  const fetchApplicationDetails = async () => {
    const response: any = await getLoanApplicationDEtails(id);
    if (!response.error) {
      setApplicationDetails(response);
    } else {
      toast.error(response.message || "Failed to fetch application details");
      console.error("Error fetching application details:", response.message);
      return;
    }
  };

  const handleDownload = () => {
    if (!applicationDetails.bankStatement) return;

    const fileUrl = `http://localhost:5001${applicationDetails.bankStatement}`; // Update base URL as needed
    console.log(fileUrl);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "bank-statement.pdf";
    link.target = "_blank"; // You can set a default name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadRequestedFile = () => {
    if (!applicationDetails.requestedFile) return;

    const fileUrl = `http://localhost:5001${applicationDetails.requestedFile}`; // Update base URL as needed
    console.log(fileUrl);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "requested-file.pdf";
    link.target = "_blank"; // You can set a default name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchApplicationDetails();
  }, []);
  console.log("Application Details:", applicationDetails);
  return (
    <div className=" ">
      <div className="flex w-4/5 min-h-[calc(100vh-90px)] mx-auto bg-gray-100 mt-10 mb-10 pb-4">
        {applicationDetails ? (
          <div className="w-full">
            <div className="relative text-2xl font-bold h-10 w-full bg-gray-500 text-white flex justify-center items-center rounded-t-sm">
              {applicationDetails.loanType === "car-loan"
                ? "Car Loan Details"
                : "Home Loan Details"}
              <Link to={"/loan-applications"} className="absolute left-2">
                <FaArrowLeft className=" text-lg" />
              </Link>
            </div>
            {/* Loan Details */}
            <div className="h-10 bg-gray-300 px-3 text-xl font-semibold mb-2">
              Loan Details
            </div>
            <div className="flex gap-6 mb-4">
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Asset Type :</strong>{" "}
                </span>
                <span className="text-lg">
                  {applicationDetails.loanType === "car-loan"
                    ? applicationDetails.assetType === "used-car-loan"
                      ? "Used Car"
                      : "New Car"
                    : applicationDetails.assetType === "home-construction"
                    ? "Home Construction"
                    : "Flat Purchase"}

                  {/* {applicationDetails.assetType === "used-car-loan"
                    ? "Used Car"
                    : "New Car"} */}
                </span>
              </div>
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Status :</strong>{" "}
                </span>
                <span className="text-lg">
                  {applicationDetails.status === "pending"
                    ? "Pending"
                    : applicationDetails.status === "approved"
                    ? "Approved"
                    : "Rejected"}
                </span>
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Email :</strong>{" "}
                </span>
                <span className="text-lg">{applicationDetails.email}</span>
              </div>
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Applied :</strong>{" "}
                </span>
                <span className="text-lg">
                  {formattedTime(applicationDetails.applicationDate)}
                </span>
              </div>
            </div>
            {applicationDetails.loanType === "car-loan" && (
              <div className="flex gap-6 mb-4">
                <div className=" text-gray-600 px-6 w-1/2">
                  <span className="text-lg">
                    <strong>Brand Name :</strong>{" "}
                  </span>
                  <span className="text-lg">
                    {applicationDetails.carBrandName}
                  </span>
                </div>
                <div className=" text-gray-600 px-6 w-1/2">
                  <span className="text-lg">
                    <strong>Model :</strong>{" "}
                  </span>
                  <span className="text-lg">
                    {applicationDetails.carModelName}
                  </span>
                </div>
              </div>
            )}
            <div className="flex gap-6 mb-4">
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Loan Amount :</strong>{" "}
                </span>
                <span className="text-lg">
                  &#8377; {formatIndianRupees(applicationDetails.loanAmount)}
                </span>
              </div>
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Loan Period :</strong>{" "}
                </span>
                <span className="text-lg">
                  {formattedYear(applicationDetails.loanPeriod)} years
                </span>
              </div>
            </div>
            <div className="px-6 text-gray-600 text-lg mb-4">
              Is income salb more than 3 lakhs:{" "}
              <span className="font-bold">
                {applicationDetails.incomeSlab ? "Yes" : "No"}
              </span>
            </div>

            {/* Personal Details */}
            <div className="h-10 bg-gray-300 px-3 text-xl font-semibold flex items-center mb-2">
              Personal Details
            </div>
            <div className="flex gap-6 mb-4">
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Name :</strong>{" "}
                </span>
                <span className="text-lg">{applicationDetails.name}</span>
              </div>
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Bank Name :</strong>{" "}
                </span>
                <span className="text-lg">{applicationDetails.bank}</span>
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Email :</strong>{" "}
                </span>
                <span className="text-lg">{applicationDetails.email}</span>
              </div>
              <div className=" text-gray-600 px-6 w-1/2">
                <span className="text-lg">
                  <strong>Account No :</strong>{" "}
                </span>
                <span className="text-lg">{applicationDetails.accountNo}</span>
              </div>
            </div>
            <div className="flex gap-6 mb-4">
              <div className="flex gap-4 items-center px-6 text-gray-600 text-lg w-1/2">
                <span className="text-lg font-bold"> Bank Statemnet: </span>
                {/* <span className="font-bold">
                {applicationDetails.bankStatement}
              </span> */}
                <FaRegFilePdf
                  className="h-4 w-4 text-gray-700 cursor-pointer hover:text-indigo-500"
                  onClick={handleDownload}
                  title="Download Bank Statement"
                />
              </div>
              {applicationDetails.requestedFile && (
                <div className="flex gap-4 items-center px-6 text-gray-600 text-lg w-1/2">
                  <span className="text-lg font-bold"> Requested Document: </span>
                  {/* <span className="font-bold">
                {applicationDetails.bankStatement}
              </span> */}
                  <FaRegFilePdf
                    className="h-4 w-4 text-gray-700 cursor-pointer hover:text-indigo-500"
                    onClick={handleDownloadRequestedFile}
                    title="Download Requested File"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 w-full h-screen flex justify-center items-center">
            <GridLoader size={8} color="blue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplication;
