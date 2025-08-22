import React, { useEffect, useState } from "react";
import { FcSimCardChip } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { deleteCardById, getAllCards } from "../../api/cardsAPI";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CardList = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [cards, setCards] = useState<any[]>([]);

  const isChangeDetected = useSelector(
    (state: any) => state.card.isChangeDetected
  );

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const fetchCardList = async () => {
    if (!loggedInUser) return;
    // setIsFetching(true);
    // const response: any = await getCardsById(loggedInUser._id);
    const response: any = await getAllCards();
    if (!response.error) {
      setIsFetching(false);
      setCards(response);
    } else {
      console.error("Error fetching cards:", response.message);
      return;
    }
  };
  const handleDelete = async (cardId: string) => {
    if (!loggedInUser) return;
    const res: any = deleteCardById(cardId);
    console.log("Delete Response:", res);
    //   console.log(isChangeDetected);
    if (!res.error) {
      // setIsChangeDetected((prev: boolean) => !prev);
      setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
      toast.success(res.message);
    } else {
      toast.error("Somrthing went wrong!!");
    }
  };
  useEffect(() => {
    fetchCardList();
    // fetchCardApplicationList();
  }, [isChangeDetected]);
  return (
    <div className="">
      {isFetching ? (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      ) : (
        <div className="mt-8 px-8">
          {cards.length > 0 ? (
            <ul className="space-y-2 flex flex-wrap items-center gap-8">
              {cards.map((card: any, index: any) => (
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
    </div>
  );
};

export default CardList;
