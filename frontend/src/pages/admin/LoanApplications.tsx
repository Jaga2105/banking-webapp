import React, { useEffect, useState } from "react";
import { getAllLoanApplicationForms } from "../../api/loanAPI";
import { calculateCreationTime } from "../../helpers/CalculateCreationTime";
import { formattedTime } from "../../helpers/FormattedTime";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import ApplicationList from "./ApplicationList";

type Props = {};

const LoanApplications = (props: Props) => {
  const [applications, setApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [showManageStatus, setShowManageStatus] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState<boolean>(false);

  const fetchApplications = async () => {
    setIsFetching(true);
    try {
      const response = await getAllLoanApplicationForms();
      const pendings = response.filter((res: any) => res.status === "pending");
      const approved = response.filter((res: any) => res.status === "approved");
      const rejected = response.filter((res: any) => res.status === "rejected");
      setApplications(response);
      setPendingApplications(pendings);
      setApprovedApplications(approved);
      setRejectedApplications(rejected);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching loan applications:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const manageStatus = (applicationId: string) => {
    if (showManageStatus === "") {
      setShowManageStatus(applicationId);
    } else {
      setShowManageStatus("");
    }
  };
  useEffect(() => {
    fetchApplications();
  }, [isStatusChanged]);
  console.log(showManageStatus);
  return (
    <div className="w-full h-[calc(100vh-48px)] bg-gray-100 py-2 px-4 sm:px-8 sm:py-4 flex justify-center items-center">
      <div className="w-full sm:w-4/5 h-full bg-gray-200 px-2 py-1 sm:px-8 sm:py-4 rounded-md overflow-x-auto">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Loan Applications</div>
          <div className="flex gap-2">
            <div
              className={`px-1 text-md text-orange-400 font-bold cursor-pointer rounded-md ${
                activeTab === "pending" &&
                "border-l-4 border-t-4 border-b-orange-400"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </div>
            <div
              className={`px-1 text-md text-green-500 font-bold cursor-pointer rounded-md ${
                activeTab === "approved" &&
                "border-l-4 border-t-4 border-b-green-500"
              }`}
              onClick={() => setActiveTab("approved")}
            >
              Approved
            </div>
            <div
              className={`px-1 text-md text-red-500 font-bold cursor-pointer rounded-md ${
                activeTab === "rejected" &&
                "border-l-4 border-t-4 border-b-red-500"
              }`}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected
            </div>
          </div>
        </div>
        <div className="mt-4">
          {isFetching ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : activeTab === "pending" ? (
            <ApplicationList
              applications={pendingApplications}
              showManageStatus={showManageStatus}
              setShowManageStatus={setShowManageStatus}
              manageStatus={manageStatus}
              setIsStatusChanged={setIsStatusChanged}
            />
          ) : activeTab === "approved" ? (
            <ApplicationList
              applications={approvedApplications}
              showManageStatus={showManageStatus}
              setShowManageStatus={setShowManageStatus}
              manageStatus={manageStatus}
              setIsStatusChanged={setIsStatusChanged}
            />
          ) : (
            <ApplicationList
              applications={rejectedApplications}
              showManageStatus={showManageStatus}
              setShowManageStatus={setShowManageStatus}
              manageStatus={manageStatus}
              setIsStatusChanged={setIsStatusChanged}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplications;
