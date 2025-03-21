import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddCustomerModal from "../../components/AddCustomerModal";
import profileImg from "../../assets/profile_img_placeholder.svg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getAllCustomers } from "../../api/customerAPI";
import { GridLoader } from "react-spinners";
import DeleteCustomerModal from "../../components/DeleteCustomerModal";
import EditCustomerModal from "../../components/EditCustomerModal";


interface initialStateTypes {
  openAddModal: boolean;
  handleOnclickAddCustomer: () => void;
  // CustomerAddedFlag?:boolean;
  // handleOnclickCustomerAddedFlag?: ()=>void;
}
interface initialEditCustomerStateTypes {
  openEditModal: boolean;
  id:string;
  handleOnclickEditCustomer: (id:string) => void;
}
interface initialDeleteCustomerStateTypes{
  openDeleteModal:boolean;
  id:string;
  handleOnclickDeleteCustomer: (id:string) =>void;
}
const initialStateValues: initialStateTypes = {
  openAddModal: false,
  handleOnclickAddCustomer: () => {},
};
const initialEditCustomerStateValues: initialEditCustomerStateTypes = {
  openEditModal: false,
  id:"",
  handleOnclickEditCustomer: (id:string) => {},
};
const initialDeleteCustomerStateValues: initialDeleteCustomerStateTypes = {
  openDeleteModal: false,
  id:"",
  handleOnclickDeleteCustomer: (id:string) => {},
};

const AdminDashboard: React.FC = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] =
    useState<initialStateTypes>(initialStateValues);
  // const [isCustomerAdded, setIsCustomerAdded] = useState<initialStateTypes>(initialStateValues)
const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState<initialDeleteCustomerStateTypes>(initialDeleteCustomerStateValues)
const [showEditCustomerModal, setShowEditCustomerModal] = useState<initialEditCustomerStateTypes>(initialEditCustomerStateValues)  
const [customerList, setCustomerList] = useState<any>([]);
  const [isFetching, setIsFetching] = useState(true);

  const handleOnclickAddCustomer = () => {
    console.log("addonclose called")
    setShowAddCustomerModal((prevState) => ({
      ...prevState,
      openAddModal: !prevState.openAddModal,
    }));
  };
  const handleOnclickDeleteCustomer = (id:any) => {
    console.log("deleteonclose called")
    // if(showDeleteCustomerModal.id===""){
      setShowDeleteCustomerModal({...showDeleteCustomerModal, id:id});
    // }
    // setShowDeleteCustomerModal((prevState) => ({
    //   ...prevState,
    //   openDeleteModal: !prevState.openDeleteModal,
    // }));
  };
  const handleOnclickEditCustomer = (id:any) => {
    console.log("deleteonclose called")
    // if(showDeleteCustomerModal.id===""){
      setShowEditCustomerModal({...showEditCustomerModal, id:id});
    // }
    // setShowDeleteCustomerModal((prevState) => ({
    //   ...prevState,
    //   openDeleteModal: !prevState.openDeleteModal,
    // }));
  };
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchCustomers = async () => {
      console.log("called")
      try {
        setIsFetching(true);
        const result = await getAllCustomers(); // Await the promise
        console.log("Fetched customers:", result);
        setIsFetching(false)
        setCustomerList(result); // Update state with the fetched data
        
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    // Call the async function
    fetchCustomers();
  }, [showAddCustomerModal.openAddModal, showDeleteCustomerModal.id]);
  console.log(showAddCustomerModal.openAddModal)

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
      {/* <div className="py-8 flex flex-col gap-2">
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
      </div> */}
      <div className="py-8 flex flex-col gap-2">
        {!isFetching ? (
          <>
          {customerList.length > 0 ? (
            <div className="flex flex-col gap-2">
              {customerList.map((customer:any)=>(
                <div className="h-full w-full flex justify-between items-center bg-gray-100 p-2 rounded-md hover:bg-white">
                <div className="flex gap-2">
                  <img
                    src={customer?.profilePic || profileImg}
                    alt="Profile Picture"
                    className="h-12 w-12 bg-gray-200 rounded-full object-cover shadow-md"
                  />
                  <div className="flex flex-col">
                    <span>{customer.name}</span>
                    <span>Aadhaar No: {customer.aadhaar}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-end">
                  <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full" onClick={()=>handleOnclickEditCustomer(customer._id)}>
                    <FaEdit className="h-6 w-6 text-green-400 cursor-pointer" />
                  </button>
                  <button className="h-10 w-10 hover:bg-gray-200 flex justify-center items-center rounded-full" onClick={()=>handleOnclickDeleteCustomer(customer._id)}>
                    <MdDelete className="h-6 w-6 text-red-500 cursor-pointer"  />
                  </button>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <div>No Customers Yet</div>
          )}
          </>
        ):(
          <div className="h-full w-full flex justify-center items-center">
            <GridLoader className="text-white mt-28" color="blue" size={8}/>
          </div>
        )}
      </div>
      <AddCustomerModal
        open={showAddCustomerModal.openAddModal}
        handleOnclickAddCustomer={handleOnclickAddCustomer}
      />
      <EditCustomerModal
        open={showEditCustomerModal.id!==""}
        id={showEditCustomerModal.id}
        handleOnclickEditCustomer={handleOnclickEditCustomer}
      />
      <DeleteCustomerModal
        open={showDeleteCustomerModal.id!==""}
        id={showDeleteCustomerModal.id}
        handleOnclickDeleteCustomer={handleOnclickDeleteCustomer}
      />
    </div>
  );
};

export default AdminDashboard;
