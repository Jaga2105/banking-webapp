import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddCustomerModal from "../../components/AddCustomerModal";
import profileImg from "../../assets/profile_img_placeholder.svg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface initialStateTypes {
  open: boolean;
  handleOnclickAddCustomer: () => void;
}
const initialStateValues: initialStateTypes = {
  open: false,
  handleOnclickAddCustomer: () => {},
};

const AdminDashboard: React.FC = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] =
    useState<initialStateTypes>(initialStateValues);

  const handleOnclickAddCustomer = () => {
    setShowAddCustomerModal((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  return (
    <div className="w-full lg:w-1/2 bg-gray-200 rounded-md min-h-[450px] mx-auto p-4 mt-8 overflow-y-auto">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Customers List</div>
        <button
          className="text-md text-white font-semibold bg-blue-400 flex gap-1 items-center px-2 py-1 rounded-sm cursor-pointer"
          onClick={handleOnclickAddCustomer}
        >
          <CiCirclePlus className="h-6 w-6 " />
          Add New Customer
        </button>
      </div>
      <div className="py-8 flex flex-col gap-2">
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
          <div className="flex gap-2">
            <img
              src={profileImg}
              // src={
              //   userDetails?.profilePic === ""
              //     ? profileImg
              //     : userDetails?.profilePic
              // }
              alt="Profile Placeholder"
              // className={`${
              //   userDetails?.profilePic !== "" ? "h-44 w-44" : "h-36 w-36"
              // } bg-gray-200 rounded-full object-cover`}
              className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
            />
            <div className="flex flex-col">
              <span>Jagannth Nayak</span>
              <span>Aadhaar No: 7773 8819 9348</span>
            </div>
          </div>
          <div className="flex gap-2 flex-end">
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
            </button>
            <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full">
              <MdDelete className="h-6 w-6 text-red-500 cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      <AddCustomerModal
        open={showAddCustomerModal.open}
        handleOnclickAddCustomer={handleOnclickAddCustomer}
      />
    </div>
  );
};

export default AdminDashboard;
