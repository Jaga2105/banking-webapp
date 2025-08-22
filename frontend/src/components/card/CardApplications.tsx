import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCardApplications } from "../../api/cardsAPI";
import SingleCardApplication from "../constants/SingleCardApplication";

type Props = {};

const CardApplications = () => {
  const [cardApplications, setCardApplications] = useState<any[]>([]);
  const isChangeDetected = useSelector(
    (state: any) => state.card.isChangeDetected
  );

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const fetchCardApplicationList = async () => {
    if (!loggedInUser) return;
    // setIsFetching(true);
    // const response: any = await getCardsById(loggedInUser._id);
    const response: any = await getAllCardApplications();
    if (!response.error) {
      // setIsFetching(false);
      setCardApplications(response);
    } else {
      console.error("Error fetching cards:", response.message);
      return;
    }
  };
  useEffect(() => {
    // fetchCardList();
    fetchCardApplicationList();
  }, [isChangeDetected]);
  return (
    <div className="h-full overflow-y-scroll">
      {cardApplications.length > 0 ? (
        <div className="flex flex-col">
          {cardApplications.map((application: any) => (
            <SingleCardApplication key={application._id} application={application} />
            // <div key={application._id} className="p-4 border-b">
            //   <h3 className="text-lg font-semibold">
            //     {application.customerName}
            //   </h3>
            //   <p>Card Type: {application.cardType}</p>
            //   <p>Status: {application.status}</p>
            //   <p>
            //     Applied On:{" "}
            //     {new Date(application.appliedOn).toLocaleDateString()}
            //   </p>
            // </div>
          ))}
        </div>
      ) : (
        <div className="h-[300px] w-full flex items-center justify-center text-lg font-medium">No applications for Card approval</div>
      )}
    </div>
  );
};

export default CardApplications;
