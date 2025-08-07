import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { RootState } from "../../store/store";
import {
  fetchLoanApplicationDetails,
  fetchLoanApplications,
  uploadRequestedFile,
} from "../../store/reducers/loanApplicationsReducer";
import { FaRegFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {};

const UploadRequestedDocs = (props: Props) => {
  const { id }: any = useParams();
  console.log(id);
  const [loanApplicationDetails, setLoanApplicationDetails] =
    useState<any>(null);
  const [formData, setFormData] = useState({ file: null } as any);

  const dispatch = useAppDispatch();
  // const { loanApplications, status } = useAppSelector(
  const { loanApplications, applicationDetails } = useAppSelector(
    (state: RootState) => state.loanApplications
  );
  // const { applicationDetails, status } = useAppSelector(
  // const { applicationDetails } = useAppSelector(
  //   (state: RootState) => state.loanApplications
  // );
  console.log(loanApplications)
  console.log(applicationDetails);
  //   if(status==="succeeded") {
  //     setLoanApplicationDetails(loanApplications[0]);
  //   }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ file: e.target.files[0] } as any);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Please select a file to upload.");
      return;
    } else {
      const data = {
        file: formData.file as Blob,
        id: id,
        adminRequest: false,
        adminRequestComment: "",
      };
      try {
        const res:any= await dispatch(uploadRequestedFile(data))
        console.log(res)
        if(res.payload){
          setFormData({ file: null });
          toast.success(res.payload.message || "File uploaded successfully!");
          dispatch(fetchLoanApplications())
          dispatch(fetchLoanApplicationDetails(id));
        }else{
          toast.error(res.payload.message || "File upload failed!");
          return;
        }
      } catch (error) {
        toast.error("File upload failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    dispatch(fetchLoanApplicationDetails(id));
  }, []);

  useEffect(() => {
    // if (loanApplications.length > 0) {
    //   setLoanApplicationDetails(loanApplications[0]);
    if(applicationDetails) {
      setLoanApplicationDetails(applicationDetails);
    }
    // }
  }, [dispatch, loanApplications, applicationDetails]);
  //   console.log(formData);
  console.log("Loan Application Details:", loanApplicationDetails);
  return (
    <div>
      {loanApplicationDetails?.adminRequest ? (
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-100px)]">
          <div className="w-[400px] h-[250px] bg-gray-200 rounded-md flex flex-col gap-4 items-center p-3">
            <h1 className="text-xl font-bold">
              {loanApplicationDetails.adminRequestComment}
            </h1>
            <div>
              <span className="font-semibold text-lg">Loan Type:</span>{" "}
              <span>
                {" "}
                {loanApplicationDetails.loanType === "home-loan"
                  ? "Home Loan"
                  : "Car Loan"}
              </span>
            </div>
            <form
              className="w-full mt-4 flex flex-col items-center gap-8"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center gap-2">
                <div>
                  <label
                    htmlFor="upload"
                    className="mr-2 font-semibold text-lg"
                  >
                    Upload File:
                  </label>
                  <label className="relative inline-flex items-center px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                    Browse
                    <input
                      id="propertyDocuments"
                      name="propertyDocuments"
                      type="file"
                      accept=".pdf,.doc"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
                {formData.file && (
                  <div className="text-sm text-gray-700 flex flex-col items-center gap-1">
                    <FaRegFilePdf
                      className="h-4 w-4 text-gray-700 cursor-pointer"
                      //   onClick={handleDownload}
                      title="Preview uploaded file"
                    />
                    {/* <span>{formData}</span> */}
                  </div>
                )}
              </div>
              <div className="">
                <button
                  type="submit"
                  className=" inline-flex items-end text-end px-4 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
            {/* <p>
              Requested Details: {loanApplicationDetails.adminRequestComment}
            </p> */}
            {/* Add form or UI to upload documents here */}
          </div>
        </div>
      ) : (
        
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-100px)]">
          {loanApplicationDetails?.requestedFile!=="" ? (
            <p className="font-semibold text-lg">Requested document sent already...</p>
          ):(
            <p className="font-semibold text-lg">No requests for uploadinhg document yet...</p>
          )}
          
        </div>
      )}
    </div>
  );
};

export default UploadRequestedDocs;
