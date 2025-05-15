import React, { useEffect, useState } from "react";
import { formattedTime } from "../helpers/FormattedTime";
import { CiMenuKebab } from "react-icons/ci";
import { calculateCreationTime } from "../helpers/CalculateCreationTime";

const PayeeDetails = ({ payee }: any) => {
  console.log(calculateCreationTime(payee.createdAt) > 30 && "above 30");
  const [payeeStatus, setPayeeStatus] = useState(false);
  // let payeeStatus;
  const checkValidPayee = () => {
    if (calculateCreationTime(payee.createdAt) > 30) {
      setPayeeStatus(true);
    } else {
      setPayeeStatus;
    }
  };
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
        <div className="flex flex-col justify-center gap-2 items-center">
          <CiMenuKebab className="h-6 w-6 cursor-pointer mt-2" />
          {/* <div className="text-sm text-gray-500">
                      {formattedTime(payee.createdAt)}
                    </div> */}
        </div>
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
