import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiMenuKebab } from "react-icons/ci";
import { getUserDetails } from "../api/userAPI";
import { formatDate } from "../helpers/FormattedLogics";
import { GridLoader } from "react-spinners";
import AddPayee from "../components/modals/AddPayee";
import { getAllPayee } from "../api/payeeAPI";
import { formattedTime } from "../helpers/FormattedTime";
import PayeeDetails from "../components/PayeeDetails";
import EditPayee from "../components/modals/EditPayee";
import DeletePayee from "../components/modals/DeletePayee";

type Props = {};

const Payees = (props: Props) => {
  const [payees, setPayees] = useState<any>([]);
  const [showAddPayeeModal, setShowAddPayeeModal] = useState<boolean>(false);

  const [showEditPayeeId, setShowEditPayeeId] = useState<string>("");
  const [showDeletePayeeId, setShowDeletePayeeId] = useState<string>("");

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const handleShowAddPayee = (flag: boolean) => {
    setShowAddPayeeModal(flag);
  };

  const handleShowDeletePayee = (id: string) => {
    setShowDeletePayeeId(id);
  };
  const handleShowEditPayee = (id: string) => {
    console.log("Edit Payee ID:", id);
    setShowEditPayeeId(id);
  };

  const fetchPayees = async () => {
    // console.log(loggedInUser?._id);
    const userResponse: any = await getAllPayee(loggedInUser._id);
    console.log(userResponse);
    setPayees(userResponse);
  };
  useEffect(() => {
    fetchPayees();
  }, [showAddPayeeModal, showEditPayeeId, showDeletePayeeId]);
  console.log(showEditPayeeId);
  return (
    <div className="flex justify-center items-center mt-8">
      {!payees ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <GridLoader size={8} color="blue" />
        </div>
      ) : (
        <div className="h-[calc(100vh-80px)] w-4/5 md:w-[700px] lg:w-[800px] flex flex-col gap-2 bg-white shadow-md rounded-b-md px-2 py-2  ">
          <div className="flex justify-between items-center mb-4 px-4">
            <span className="text-2xl font-semibold">Payee List</span>

            <div className="flex justify-center items-center gap-6">
              {/* <TbFilterSearch className="h-6 w-6 " onClick={()=>setShowSearchBar(true)} /> */}
              <button
                className="px-2 py-1 bg-blue-200 rounded-md flex gap-1 items-center justify-center cursor-pointer hover:bg-blue-300"
                onClick={() => handleShowAddPayee(true)}
              >
                <span className="text-lg text-blue-700">Add Payee</span>{" "}
                <CiCirclePlus className="h-6 w-6 text-blue-700" />
              </button>
            </div>
          </div>
          {!payees ? (
            <div className="h-[100vh] w-full flex justify-center items-center">
              <GridLoader size={8} color="blue" />
            </div>
          ) : (
            <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-4">
              {payees.map((payee: any) => {
                return (
                  <div key={payee._id}>
                    <PayeeDetails
                      payee={payee}
                      handleShowEditPayee={handleShowEditPayee}
                      handleShowDeletePayee={handleShowDeletePayee}
                    />
                    {showEditPayeeId === payee._id && (
                      <EditPayee
                        id={payee._id}
                        handleShowEditPayee={handleShowEditPayee}
                      />
                    )}
                    {showDeletePayeeId === payee._id && (
                      <DeletePayee
                        id={payee._id}
                        handleShowDeletePayee={handleShowDeletePayee}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {showAddPayeeModal && (
        <AddPayee handleShowAddPayee={handleShowAddPayee} />
      )}
    </div>
  );
};

export default Payees;
