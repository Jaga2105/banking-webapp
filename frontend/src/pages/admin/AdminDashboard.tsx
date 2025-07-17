import React, { useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import AddCustomerModal from "../../components/AddCustomerModal";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { getAllCustomers } from "../../api/customerAPI";
import { GridLoader } from "react-spinners";
import DeleteCustomerModal from "../../components/DeleteCustomerModal";
import EditCustomerModal from "../../components/EditCustomerModal";
import CustomerList from "../../components/CustomerList";

// interface list {}
interface initialStateTypes {
  openAddModal: boolean;
  handleOnclickAddCustomer: () => void;
  // CustomerAddedFlag?:boolean;
  // handleOnclickCustomerAddedFlag?: ()=>void;
}
interface initialEditCustomerStateTypes {
  openEditModal: boolean;
  id: string;
  handleOnclickEditCustomer: (id: string) => void;
}
interface initialDeleteCustomerStateTypes {
  openDeleteModal: boolean;
  id: string;
  handleOnclickDeleteCustomer: (id: string) => void;
}
const initialStateValues: initialStateTypes = {
  openAddModal: false,
  handleOnclickAddCustomer: () => {},
};
const initialEditCustomerStateValues: initialEditCustomerStateTypes = {
  openEditModal: false,
  id: "",
  handleOnclickEditCustomer: (id: string) => {},
};
const initialDeleteCustomerStateValues: initialDeleteCustomerStateTypes = {
  openDeleteModal: false,
  id: "",
  handleOnclickDeleteCustomer: (id: string) => {},
};

const AdminDashboard: React.FC = () => {
  const [showAddCustomerModal, setShowAddCustomerModal] =
    useState<initialStateTypes>(initialStateValues);
  // const [isCustomerAdded, setIsCustomerAdded] = useState<initialStateTypes>(initialStateValues)
  const [showDeleteCustomerModal, setShowDeleteCustomerModal] =
    useState<initialDeleteCustomerStateTypes>(initialDeleteCustomerStateValues);
  const [showEditCustomerModal, setShowEditCustomerModal] =
    useState<initialEditCustomerStateTypes>(initialEditCustomerStateValues);
  // const [customerList, setCustomerList] = useState<any>([]);
  const [activeCustomerList, setActiveCustomerList] = useState<[]>([]);
  const [inActiveCustomerList, setInActiveCustomerList] = useState<[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [activeTab, setActiveTab] = useState("active");
  const [isCustomerStatusChanged, setIsCustomerStatusChanged] =
    useState<boolean>(false);

  const handleOnclickAddCustomer = () => {
    setShowAddCustomerModal((prevState) => ({
      ...prevState,
      openAddModal: !prevState.openAddModal,
    }));
  };
  const handleOnclickDeleteCustomer = (id: any) => {
    // if(showDeleteCustomerModal.id===""){
    setShowDeleteCustomerModal({ ...showDeleteCustomerModal, id: id });
    // }
    // setShowDeleteCustomerModal((prevState) => ({
    //   ...prevState,
    //   openDeleteModal: !prevState.openDeleteModal,
    // }));
  };
  const handleOnclickEditCustomer = (id: any) => {
    setShowEditCustomerModal({ ...showEditCustomerModal, id: id });
  };

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchCustomers = async () => {
      try {
        setIsFetching(true);
        const result = await getAllCustomers(); // Await the promise
        setIsFetching(false);
        const fetchedActiveList = result.filter(
          (customer: any) => customer.active === true
        );
        const fetchedInActiveList = result.filter(
          (customer: any) => customer.active !== true
        );
        setActiveCustomerList(fetchedActiveList);
        setInActiveCustomerList(fetchedInActiveList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    // Call the async function
    fetchCustomers();
  }, [
    showAddCustomerModal.openAddModal,
    showDeleteCustomerModal.id,
    showEditCustomerModal.id,
    isCustomerStatusChanged,
  ]);
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
        <div className="flex justify-end gap-4">
          <div
            className={`flex justify-center items-center gap-2 text-lg font-semibold text-green-500 cursor-pointer pb-1 ${
              activeTab === "active" ? "border-b-2 border-green-500" : ""
            }`}
            onClick={() => setActiveTab("active")}
          >
            <span>Active</span>
            <FaRegThumbsUp />
          </div>
          <div
            className={`flex justify-center items-center gap-2 text-lg font-semibold text-red-500 cursor-pointer pb-1 ${
              activeTab === "inactive" ? "border-b-2 border-red-500" : ""
            }`}
            onClick={() => setActiveTab("inactive")}
          >
            <span>Inactive</span>
            <FaRegThumbsDown className="h-5 w-5" />
          </div>
        </div>
        {!isFetching ? (
          <>
            {activeTab === "active" ? (
              <CustomerList
                list={activeCustomerList}
                handleOnclickEditCustomer={handleOnclickEditCustomer}
                handleOnclickDeleteCustomer={handleOnclickDeleteCustomer}
                setIsCustomerStatusChanged={setIsCustomerStatusChanged}
                activeTab={activeTab}
              />
            ) : (
              <CustomerList
                list={inActiveCustomerList}
                handleOnclickEditCustomer={handleOnclickEditCustomer}
                handleOnclickDeleteCustomer={handleOnclickDeleteCustomer}
                setIsCustomerStatusChanged={setIsCustomerStatusChanged}
                activeTab={activeTab}
              />
            )}
          </>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <GridLoader className="text-white mt-28" color="blue" size={8} />
          </div>
        )}
      </div>
      <AddCustomerModal
        open={showAddCustomerModal.openAddModal}
        handleOnclickAddCustomer={handleOnclickAddCustomer}
      />
      <EditCustomerModal
        open={showEditCustomerModal.id !== ""}
        id={showEditCustomerModal.id}
        handleOnclickEditCustomer={handleOnclickEditCustomer}
      />
      <DeleteCustomerModal
        open={showDeleteCustomerModal.id !== ""}
        id={showDeleteCustomerModal.id}
        handleOnclickDeleteCustomer={handleOnclickDeleteCustomer}
      />
    </div>
  );
};

export default AdminDashboard;
