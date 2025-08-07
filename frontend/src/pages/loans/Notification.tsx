import React, { useEffect, useState } from "react";
import {
  getAllLoanApplicationForms,
  removeAdminRequest,
} from "../../api/loanAPI";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanApplications } from "../../store/reducers/loanApplicationsReducer";
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Link } from "react-router-dom";

type Props = {};

const Notification = (props: Props) => {
  const [notifications, setNotifications] = useState<any>([]);
  const [isNotificationRemoved, setIsNotificationRemoved] =
    useState<boolean>(false);
  //   const storedUser: any = localStorage.getItem("user");
  //   let loggedInUser: any;
  //   if (storedUser) {
  //     // Parse the string into a JavaScript object
  //     loggedInUser = JSON.parse(storedUser);
  //   }
  //   const fetchLoanApplicationForms = async () => {
  //     const res = await getAllLoanApplicationForms();
  //     const homeLoans = res.filter(
  //       (loan: any) =>
  //         loan.loanType === "home-loan" || loan.loanType === "car-loan"
  //     );
  //     const tempArr: any = homeLoans.filter(
  //       (loan: any) => loan.author === loggedInUser._id
  //     );
  //     console.log(tempArr);
  //     setNotifications(tempArr);
  //     // setIsFetching(false);
  //   };
  const handleRemoveAdminRequest = async (id: string) => {
    const res = await removeAdminRequest(id, false, "");
    if (!res.error) {
      setIsNotificationRemoved((prev) => !prev);
      toast.success("Admin request removed successfully!");
      // setIsNotificationRemoved(false);
    } else {
      toast.error(res.message || "Failed to remove admin request");
      console.error("Error removing admin request:", res.message);
    }
  };
  //   useEffect(() => {
  //     fetchLoanApplicationForms();
  //   }, [isNotificationRemoved]);

  const dispatch = useAppDispatch();
  const {  loanApplications } = useAppSelector(
    (state: RootState) => state.loanApplications
  );
  console.log(isNotificationRemoved);

  useEffect(() => {
    dispatch(fetchLoanApplications());
  }, [dispatch, isNotificationRemoved]);

  return (
    <div className="w-3/4 min-h-[calc(100vh-100px)] mx-auto mt-10 mb-10 p-4 rounded-md">
      {loanApplications.length <= 0 ? (
        <div className="w-full h-[400px] flex justify-center items-center text-2xl font-semibold">
          <div>No Notifications yet!!</div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {loanApplications.map((notification: any) => {
            return (
              notification.adminRequest && (
                <div
                  key={notification._id}
                  className="relative bg-gray-200 rounded-md px-2 py-2 min-h-10 hover:bg-gray-300 "
                >
                  <Link to={`/upload-requested-docs/${notification._id}`} className="cursor-pointer" onClick={()=>console.log("adde")}>
                    <div className="font-semibold">Requested Details:</div>
                    <div>{notification.adminRequestComment}</div>
                  </Link>
                  <RxCross2
                    className="h-4 w-4 rounded-full absolute right-4 top-6 cursor-pointer hover:font-extrabold"
                    onClick={() => handleRemoveAdminRequest(notification._id)}
                  />
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notification;
