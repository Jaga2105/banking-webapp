import { useEffect, useRef, useState } from "react";
import { formattedTime } from "../helpers/FormattedTime";
import { CiEdit, CiMenuKebab } from "react-icons/ci";
import { calculateCreationTime } from "../helpers/CalculateCreationTime";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
// utils/portal.tsx
import { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body);
};

interface PayeeDetailsProps {
  payee: {
    _id: string;
    payeeName: string;
    bankName: string;
    accountNo: string;
    createdAt: string;
    bankLogo: string;
  };
  handleShowEditPayee: (id: string) => void;
  handleShowDeletePayee: (id: string) => void;
}

const PayeeDetails = ({
  payee,
  handleShowEditPayee,
  handleShowDeletePayee,
}: PayeeDetailsProps) => {
  const [payeeStatus, setPayeeStatus] = useState(false);
  const [showManagePayeeDropdown, setShowManagePayeeDropdown] =
    useState<boolean>(false);
  const dropdownRef: any = useRef<HTMLDivElement>(null);
  // const dropdownRef = useRef({
  //     menuContainer: null,  // Will hold the menu button container
  //     portalNode: null,    // Will hold the portal dropdown DOM node
  //   });

  // let payeeStatus;
  const checkValidPayee = () => {
    if (calculateCreationTime(payee.createdAt) > 30) {
      setPayeeStatus(true);
    } else {
      setPayeeStatus;
    }
  };
  const handleShowManagePayeeDropdown = () => {
    setShowManagePayeeDropdown((prev) => !prev);
  };

  const handleEdit = () =>{
    handleShowEditPayee(payee._id);
    setShowManagePayeeDropdown(false);
  }
  const handleDelete = () =>{
    handleShowDeletePayee(payee._id);
    setShowManagePayeeDropdown(false);
  }

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) && // Not the trigger button
        !e.target.closest(".dropdown-menu")
      ) {
        setShowManagePayeeDropdown(false); // Not inside the dropdown
      } // Not inside the dropdown
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showManagePayeeDropdown]);

  useEffect(() => {
    checkValidPayee();
  }, []);
  return (
    <div
      // key={payee._id}
      className="relative flex gap-4 items-center border border-gray-200 p-2 rounded-md shadow-md hover:bg-gray-100"
    >
      <img
        src={payee.bankLogo}
        alt="Bank Logo"
        className="h-14 w-14 rounded-lg"
      />
      <div className="flex justify-between w-full">
        <div>
          <div className="text-lg font-semibold">{payee.payeeName}</div>
          <div className="flex gap-3 text-sm text-gray-500">
            <div>{payee.bankName}</div>
            <div>
              &#x2022;&#x2022;&#x2022;&#x2022;
              {payee.accountNo.slice(7)}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {formattedTime(payee.createdAt)}
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center relative overflow-visible"
          ref={dropdownRef}
          // ref={el => dropdownRef.current.menuContainer = el}
        >
          <CiMenuKebab
            className="h-6 w-6 cursor-pointer mt-2"
            onClick={handleShowManagePayeeDropdown}
          />
          {showManagePayeeDropdown && (
            <Portal>
              <div
                className="fixed z-50 mt-2 bg-white shadow-lg rounded-md border border-gray-200 dropdown-menu"
                style={{
                  top:
                    dropdownRef.current?.getBoundingClientRect().bottom +
                    window.scrollY -
                    20,
                  right:
                    window.innerWidth -
                    (dropdownRef.current?.getBoundingClientRect().right || 0),
                }}
                // ref={el => dropdownRef.current.portalNode = el}
                // ref={dropdownRef}
              >
                <div className="py-1">
                  <button
                    className="w-full flex gap-2 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleEdit}
                  >
                    <AiFillEdit className="h-5 w-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleDelete}
                  >
                    <MdDelete className="h-5 w-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </Portal>
          )}
        </div>
        {/* {showManagePayeeDropdown && (
            <Portal>
              <div
                className="fixed z-50 mt-2 bg-white shadow-lg rounded-md border border-gray-200"
                style={{
                  top:
                    dropdownRef.current?.getBoundingClientRect().bottom +
                    window.scrollY -
                    20,
                  right:
                    window.innerWidth -
                    (dropdownRef.current?.getBoundingClientRect().right || 0),
                }}
              >
                <div className="py-1">
                  <button
                    className="w-full flex gap-2 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleShowEditPayee(payee._id)}
                  >
                    <AiFillEdit className="h-5 w-5" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleShowDeletePayee(payee._id)}
                  >
                    <MdDelete className="h-5 w-5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </Portal>
          )} */}
      </div>
      <div
        className={`absolute right-0 top-0 font-medium text-sm w-[70px] flex items-center justify-center rounded-bl-md rounded-tr-md overflow-auto py-0.5 ${
          payeeStatus
            ? "bg-green-200 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {payeeStatus ? "active" : "inactive"}
      </div>
    </div>
  );
};

export default PayeeDetails;
