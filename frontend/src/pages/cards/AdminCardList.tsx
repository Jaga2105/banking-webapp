import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FcSimCardChip } from "react-icons/fc";
import AddCardModal from "../../components/modals/AddCardModal";
import {
  deleteCardById,
  getAllCardApplications,
  getAllCards,
} from "../../api/cardsAPI";
import { toast } from "react-toastify";
import { getAllCustomers } from "../../api/customerAPI";
import { PiIdentificationCardDuotone } from "react-icons/pi";
import CardList from "../../components/constants/CardList";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminCardList = () => {
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  // const [cards, setCards] = useState<any[]>([]);
  const [cardApplications, setCardApplications] = useState<any[]>([]);
  const [customerList, setCustomerList] = useState<any[]>([]);
  // const [isFetching, setIsFetching] = useState(true);
  // const [isChangeDetected, setIsChangeDetected] = useState(false);
  const isChangeDetected = useSelector(
    (state: any) => state.card.isChangeDetected
  );

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const handleOnclickAddCard = () => {
    setShowAddCardModal((prev) => !prev);
  };

  // const fetchCardList = async () => {
  //   if (!loggedInUser) return;
  //   // setIsFetching(true);
  //   // const response: any = await getCardsById(loggedInUser._id);
  //   const response: any = await getAllCards();
  //   if (!response.error) {
  //     setIsFetching(false);
  //     setCards(response);
  //   } else {
  //     console.error("Error fetching cards:", response.message);
  //     return;
  //   }
  // };
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
  // const handleDelete = async (cardId: string) => {
  //   if (!loggedInUser) return;
  //   const res: any = deleteCardById(cardId);
  //   console.log("Delete Response:", res);
  //   console.log(isChangeDetected);
  //   if (!res.error) {
  //     setIsChangeDetected((prev: boolean) => !prev);
  //     setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
  //     toast.success(res.message);
  //   } else {
  //     toast.error("Somrthing went wrong!!");
  //   }
  // };

  const fetchCustomerList = async () => {
    const response: any = await getAllCustomers();
    if (!response.error) {
      // setIsFetching(false);
      setCustomerList(response);
    } else {
      console.error("Error fetching cards:", response.message);
      return;
    }
  };

  useEffect(() => {
    // fetchCardList();
    fetchCardApplicationList();
  }, [isChangeDetected]);
  useEffect(() => {
    fetchCustomerList();
  }, []);
  console.log(isChangeDetected);
  return (
    <div className="w-4/5 bg-gray-200 rounded-md min-h-[450px] mx-auto p-4 mt-8 overflow-y-auto">
      <div className="sticky flex justify-between">
        <Link to={"/admin/cards"} className="text-2xl font-semibold">Card List</Link>
        <div className="flex gap-8">
          <Link
            to={"/admin/cards/card-applications"}
            className="relative hover:bg-gray-100 rounded-md h-10 p-1 cursor-pointer flex justify-center items-center"
          >
            <PiIdentificationCardDuotone className="h-8 w-8" />
            {cardApplications.length > 0 && (
              <div className="absolute h-4 w-4 text-white text-sm font-semibold -top-1 right-0 p-2.5 rounded-full bg-violet-400 flex justify-center items-center">
                {cardApplications.length}
              </div>
            )}
          </Link>
          <button
            className="h-8 text-md text-white font-semibold bg-blue-400 flex gap-1 items-center px-2 rounded-sm cursor-pointer"
            onClick={handleOnclickAddCard}
          >
            <CiCirclePlus className="h-6 w-6 " />
            Add New
          </button>
        </div>
      </div>
      {/* <div className="">
        {isFetching ? (
          <div className="text-center text-gray-500 mt-4">Loading...</div>
        ) : (
          <div className="mt-8 px-8">
            {cards.length > 0 ? (
              <ul className="space-y-2 flex flex-wrap items-center gap-8">
                {cards.map((card, index) => (
                  <li
                    key={index}
                    className="relative bg-[#2a769c] h-[160px] w-[250px] p-3 rounded-md shadow-sm flex flex-col gap-1 group"
                  >
                    <MdDelete
                      className="hidden group-hover:block transition-colors absolute right-2 h-6 w-6 text-white font-bold hover:text-gray-300 cursor-pointer"
                      onClick={() => handleDelete(card._id)}
                    />
                    <div className="text-white font-semibold">
                      {card.bankName || "Unknown Bank"}
                    </div>
                    <div className="absolute right-4 top-16 flex flex-col gap-1">
                      <FcSimCardChip className=" h-10 w-10" />
                      <div className="text-white font-semibold">
                        {card?.cardType}
                      </div>
                    </div>
                    <div className="text-white font-semibold">
                      XXXX XXXX XXXX {card.cardNumber.substring(14)}
                    </div>
                    <div className="text-white font-semibold">
                      {card.cardHolderName}
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col text-white text-sm">
                        <div>Expiry</div>
                        <div>{card.expiryDate}</div>
                      </div>
                      <div className="flex flex-col text-white text-sm">
                        <div>CVV</div>
                        <div>XX{card.cvv.substring(2)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 mt-4">
                No cards found.
              </div>
            )}
          </div>
        )}
      </div> */}
      <Outlet />
      {/* <CardList /> */}
      {showAddCardModal && (
        <AddCardModal
          setShowAddCardModal={setShowAddCardModal}
          // setIsChangeDetected={setIsChangeDetected}
          customerList={customerList}
        />
      )}
    </div>
  );
};

export default AdminCardList;
