import React, { useEffect, useRef, useState } from "react";
import { formattedTime } from "../../helpers/FormattedTime";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { changeLoanApplicationStatus } from "../../api/loanAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import SendRequestModal from "../../components/modals/SendRequestModal";

const ApplicationList = ({
  applications,
  showManageStatus,
  setShowManageStatus,
  manageStatus,
  setIsStatusChanged,
}: any) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const requestTooltipRef = useRef<HTMLDivElement>(null);
  const [requestTooltip, setRequestTooltip] = useState<string>("");
  const [showSendRequestModal, setShowSendRequestModal] = useState<string>("");
  const statusMap: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };

  const handleStatusChange = async (id: string, status: string) => {
    setShowManageStatus("");
    let formattedStatus: string = "";
    if (status === "Approve") {
      formattedStatus = "approved";
    } else if (status === "Reject") {
      formattedStatus = "rejected";
    } else {
      formattedStatus = "pending";
    }
    const res = await changeLoanApplicationStatus(id, formattedStatus);
    if (!res.error) {
      setIsStatusChanged((prev: boolean) => !prev);
      if (status === "Approve") {
        toast.success("Application Approved Successfully");
      } else if (status === "Reject") {
        toast.error("Application Rejected");
      }
    } else {
      toast.error(res.message || "Failed to update status");
    }
  };

  const manageShowRequestTooltip = (id: string) => {
    if (requestTooltip === id) {
      setRequestTooltip("");
    } else {
      setRequestTooltip(id);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    console.log("clicked outside...");
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowManageStatus("");
    }
  };
  useEffect(() => {
    if (showManageStatus) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showManageStatus]);
  console.log(showSendRequestModal);
  return (
    <div>
      {applications.length > 0 ? (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2">Loan Type</th>
              <th className="px-4 py-2">Applicant Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {applications.map((application: any) => (
              <tr
                key={application._id}
                className="border-b hover:bg-gray-100 h-4 justify-center items-center"
              >
                <td className="px-4 py-2">
                  {application.loanType === "car-loan"
                    ? "Car Loan"
                    : "Home Loan"}
                </td>
                <td className="px-4 py-2">{application.name}</td>
                {/* <td className="px-4 py-2">{application.status==="pending"? "Pending": application.status==="approved"?"Approved":"Rejected"}</td> */}
                <td className="px-4 py-2 flex justify-center items-center">
                  <div
                    className={` px-3 py-1 rounded-full ${
                      application.status === "pending"
                        ? "bg-orange-200 text-orange-400"
                        : application.status === "approved"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {statusMap[application.status] || "Unknown"}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {/* {new Date(application.createdAt).toLocaleDateString()} */}
                  {formattedTime(application.applicationDate)}
                </td>
                <td className="relative flex gap-2 justify-center items-center px-4 py-2">
                  {application.status === "pending" && (
                    <div
                      className="relative p-2 rounded-full hover:bg-gray-300 cursor-pointer"
                      onMouseEnter={() =>
                        manageShowRequestTooltip(application._id)
                      }
                      onMouseLeave={() => manageShowRequestTooltip("")}
                      onClick={() => setShowSendRequestModal(application._id)}
                    >
                      <VscGitPullRequestGoToChanges className="text-xl cursor-pointer" />

                      {requestTooltip === application._id && (
                        <div
                          className="absolute right-0 top-8 z-1 bg-black shadow-lg rounded-md p-2"
                          ref={requestTooltipRef}
                        >
                          <div className="px-2 py-1 text-white text-sm cursor-pointer">
                            Request Details
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-2 rounded-full hover:bg-gray-300">
                    <BsThreeDotsVertical
                      className="text-xl cursor-pointer"
                      onClick={() => manageStatus(application._id)}
                    />
                  </div>

                  <Link
                    to={`/view-application/${application._id}`}
                    className="p-2 rounded-full hover:bg-gray-300"
                  >
                    <MdPreview className="text-2xl cursor-pointer" />
                  </Link>
                  {/* <div ref={dropdownRef}> */}
                  {showManageStatus === application._id && (
                    <div
                      className="absolute right-0 top-8 z-1 bg-white shadow-lg rounded-md p-2"
                      ref={dropdownRef}
                    >
                      {OtherStatuses(application.status).map((value) => (
                        <div
                          key={value}
                          className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                          onClick={() =>
                            handleStatusChange(application._id, value)
                          }
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  )}
                  {showSendRequestModal === application._id && (
                    <SendRequestModal
                      setShowSendRequestModal={setShowSendRequestModal}
                      id={application._id}
                    />
                  )}
                  {/* </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600 mt-32 font-semibold">
          No applications found.
        </div>
      )}
    </div>
  );
};
const OtherStatuses = (currentStatus: any) => {
  let arr;
  if (currentStatus === "pending") {
    arr = ["Approve", "Reject"];
  } else if (currentStatus === "approved") {
    arr = ["Reject", "Pending"];
  } else {
    arr = ["Approve", "Pending"];
  }
  return arr;
};

export default ApplicationList;
