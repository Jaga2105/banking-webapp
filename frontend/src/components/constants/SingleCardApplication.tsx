import React, { useEffect, useState } from "react";
import { getCustomer } from "../../api/customerAPI";

type Props = {};

const SingleCardApplication = ({ application }: any) => {
  const [cardAuthor, setCardAuthor] = useState({});
  const fetchAuthorDetails = async () => {
    const res: any = await getCustomer(application.author);
    console.log(res);
    if (res) {
      setCardAuthor(res);
    }
  };
  useEffect(() => {
    fetchAuthorDetails();
  }, []);
  console.log(application);
  return (
    <div>
      {cardAuthor && (
        <div className="bg-gray-100 rounded-md p-2 hover:bg-gray-300">
          <div className="text-lg font-semibold">{cardAuthor?.name}</div>
          <div className="flex gap-4">
            <div>
              <span className="font-medium">Bank Name:</span> <span>{application.bankName}</span>
            </div>
            <div>
              <span className="font-medium">Card Type:</span> <span>{application.cardType==="credit" ? "Credit":"Debit"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCardApplication;
