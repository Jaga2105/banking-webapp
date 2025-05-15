import React, { useEffect, useState } from "react";
import { CiCirclePlus, CiMenuKebab } from "react-icons/ci";
import { getUserDetails } from "../api/userAPI";
import { formatDate } from "../helpers/FormattedLogics";
import { GridLoader } from "react-spinners";
import AddPayee from "../components/modals/AddPayee";
import { getAllPayee } from "../api/payeeAPI";
import { formattedTime } from "../helpers/FormattedTime";
import PayeeDetails from "../components/PayeeDetails";

type Props = {};

const Payees = (props: Props) => {
  const [payees, setPayees] = useState<any>([]);
  const [showAddPayeeModal, setShowAddPayeeModal] = useState<boolean>(false);

  const handleShowAddPayee = (flag: boolean) => {
    setShowAddPayeeModal(flag);
  };

  const fetchPayees = async () => {
    // console.log(loggedInUser?._id);
    const userResponse: any = await getAllPayee();
    setPayees(userResponse);
  };
  // useEffect(() => {
  //   fetchUserDetails();
  // }, [loggedInUser?._id]);
  useEffect(() => {
    // console.log("useEffect");
    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   const parsedUser = JSON.parse(storedUser);
    //   if (parsedUser?._id) {
    //     console.log(parsedUser._id);
    //     fetchUserDetails(parsedUser._id);
    //   }
    // }
    fetchPayees();
  }, [showAddPayeeModal]);
  console.log(payees);
  return (
    <div className="flex justify-center items-center mt-8">
      {!payees ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <GridLoader size={8} color="blue" />
        </div>
      ) : (
        <div className="h-[calc(100vh-80px)] md:w-[700px] lg:w-[800px] flex flex-col gap-2 bg-white shadow-md rounded-b-md px-2 py-2  ">
          <div className="flex justify-between items-center mb-4 px-4">
            <span className="text-2xl font-semibold">Payee List</span>

            <div className="flex justify-center items-center gap-6">
              {/* <TbFilterSearch className="h-6 w-6 " onClick={()=>setShowSearchBar(true)} /> */}
              <button
                className="px-2 py-1 bg-green-400 rounded-md flex gap-1 items-center justify-center cursor-pointer"
                onClick={() => handleShowAddPayee(true)}
              >
                <span className="text-lg text-gray-600">Add Payee</span>{" "}
                <CiCirclePlus className="h-6 w-6 " />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 px-4">
            {payees.map((payee: any) => (
              <PayeeDetails key={payee._id} payee={payee}/>
            ))}
          </div>
        </div>
      )}
      {showAddPayeeModal && (
        <AddPayee handleShowAddPayee={handleShowAddPayee} />
      )}
    </div>
  );
};

export default Payees;
