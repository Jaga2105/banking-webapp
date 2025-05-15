import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCustomer } from "../../api/customerAPI";
import { GridLoader } from "react-spinners";
import { formattedTime } from "../../helpers/FormattedTime";
// import { RelativeTime } from "../../helpers/RelativeTime";

const CustomerProfile = () => {
  const [customerDetails, setCustomerDetails] = useState<any>(null);
  const params: any = useParams();
  const id = params.id;

  const location = useLocation();
  console.log(location.pathname)
  console.log(id)
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const res = await getCustomer(id);
      console.log(res);
      setCustomerDetails(res);
    };
    fetchCustomerDetails();
  }, []);
  return (
    <div className="h-[calc(100vh-48px)] flex justify-center items-center">
      {customerDetails ? (
        <div className="w-[600px] h-[450px] bg-gray-200 rounded-sm ">
          <div className="relative h-1/4 bg-violet-400 rounded-t-sm">
            <div
              className={`absolute w-20 flex justify-center items-center right-2 top-2 px-2 py-1 rounded-full bg-white ${
                customerDetails.active ? "text-green-600" : "text-red-600"
              }}`}
            >
              {customerDetails.active ? "Active" : "Inactive"}
            </div>
            <img
              src={customerDetails.profilePic}
              alt="Profile Image"
              className="absolute h-24 w-24 rounded-full top-1/2 left-1/2 -translate-x-1/2 object-cover"
            />
          </div>
          <div className="h-3/4 mt-12 flex flex-col gap-1 items-center">
            <div className="mx-auto text-xl font-bold mb-2">
              {customerDetails.name}
            </div>
            {/* <div className="w-[70%] sm:w-1/2 flex justify-between items-center border-b-1 pb-2 border-violet-600">
              <span className="text-md font-thin">Name: </span>
              <span className="text-md font-bold">{customerDetails.name}</span>
            </div> */}
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Email: </span>
              <span className="text-md font-bold">
                {customerDetails.email}
              </span>
            </div>
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Phone: </span>
              <span className="text-md font-bold">{customerDetails.phone}</span>
            </div>
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Aadhaar: </span>
              <span className="text-md font-bold">
                {customerDetails.aadhaar}
              </span>
            </div>
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Account No: </span>
              <span className="text-md font-bold">
                {customerDetails.accountNo}
              </span>
            </div>
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Address: </span>
              <span className="text-md font-bold">
                {customerDetails.address}
              </span>
            </div>
            <div className="w-[70%] sm:w-2/3 flex justify-around items-center border-b-1 pb-2 border-violet-600 bg-violet-200 px-1 rounded-sm">
              <span className="text-md font-thin">Created: </span>
              <span className="text-md font-bold">
                {formattedTime(customerDetails.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        // <div>
        <GridLoader color="blue" size={8} />
        // </div>
      )}
    </div>
  );
};

export default CustomerProfile;
