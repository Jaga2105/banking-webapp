import React, { useEffect, useRef, useState } from "react";
import profileImg from "../assets/404.svg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { changeCustomerStatus } from "../api/customerAPI";
import { Link } from "react-router-dom";

// type Props = {}

const CustomerList = ({
  list,
  handleOnclickEditCustomer,
  handleOnclickDeleteCustomer,
  setIsCustomerStatusChanged,
  activeTab,
}: any) => {
  const [showCustomerStatusDropdown, setShowCustomerStatusDropdown] =
    useState("");
  const dropdownRef = useRef<HTMLButtonElement>(null);
  // const manageCustomerStatus = (id: string) => {
  //   if (showCustomerStatusDropdown) {
  //     setShowCustomerStatusDropdown("");
  //   } else {
  //     setShowCustomerStatusDropdown(id);
  //   }
  // };
  const handleStatusChange = async (id: string, status: boolean) => {
    setShowCustomerStatusDropdown("");
    const res: any = await changeCustomerStatus(id, status);
    if (res) {
      setIsCustomerStatusChanged((prev:boolean)=>!prev);
    }
  };
  const handleOnMouseEnter = (id: string) => {
    setShowCustomerStatusDropdown(id);
  };
  const handleOnMouseLeave = () => {
    setShowCustomerStatusDropdown("");
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowCustomerStatusDropdown("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {list.length > 0 ? (
        list.map((customer: any) => (
          <div  key={customer._id} className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
            <Link to={`/admin/cid/${customer._id}`} className="flex gap-2">
              <img
                src={customer?.profilePic || profileImg}
                alt="Profile Picture"
                className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
              />
              <div className="flex flex-col">
                <span>{customer.name}</span>
                <span>Aadhaar No: {customer.aadhaar}</span>
              </div>
            </Link >
            <div className="relative flex gap-2 flex-end">
              <button
                className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full"
                onClick={() => handleOnclickEditCustomer(customer._id)}
              >
                <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
              </button>
              <button
                className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full"
                onClick={() => handleOnclickDeleteCustomer(customer._id)}
              >
                <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
              </button>
              <button
                className="h-10 w-10 group hover:bg-gray-200 flex justify-center items-center rounded-full"
                // onClick={() => manageCustomerStatus(customer._id)}
                // ref={dropdownRef}

                onMouseEnter={() => handleOnMouseEnter(customer._id)}
                onMouseLeave={handleOnMouseLeave}
              >
                <CiMenuKebab className="h-6 w-6 text-blue-500 cursor-pointer" />
              </button>
              {showCustomerStatusDropdown === customer._id && (
                <div
                  className="absolute bg-black text-white right-8 -top-6 px-2 py-1 rounded-sm cursor-pointer"
                  onClick={() =>
                    handleStatusChange(
                      customer._id,
                      activeTab === "active" ? false : true
                    )
                  }
                  onMouseEnter={() => handleOnMouseEnter(customer._id)}
                  onMouseLeave={handleOnMouseLeave}
                >
                  {activeTab === "active" ? "Deactivate" : "Activate"}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-xl mx-auto">No customer found...</div>
      )}
    </div>
  );
};

export default CustomerList;
