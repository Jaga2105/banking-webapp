import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { getUserDetails } from "../../api/userAPI";
import { IoPersonSharp } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { TbFilterSearch } from "react-icons/tb";
import { RiArrowRightUpLine } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import SendMoney from "../../components/modals/SendMoney";
import { GridLoader } from "react-spinners";
import { formatDate } from "../../helpers/FormattedLogics";
import { RxCross2 } from "react-icons/rx";
import { createPortal } from "react-dom";

export const Portal = ({ children }: { children: ReactNode }) => {
  return createPortal(children, document.body);
};

const Transactions = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [showSendMoneyModal, setShowSendMoneyModal] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);

  const dropdownRef: any = useRef<HTMLDivElement>(null);

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filteredTransactions = userDetails.transactions.filter(
      (transaction: any) => {
        console.log(transaction);
        return transaction.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      }
    );
    console.log(filteredTransactions);
    setTransactions(filteredTransactions);
  };

  const handleShowSendMoneyModal = (flag: boolean) => {
    setShowSendMoneyModal(flag);
  };

  const handleCloseSearchBar = () => {
    setSearchQuery("");
    setShowSearchBar(false);
    setTransactions(userDetails.transactions);
  };
  const fetchUserDetails = async (userId: any) => {
    // console.log(loggedInUser?._id);
    const userResponse: any = await getUserDetails(userId);
    console.log(userResponse);
    setUserDetails(userResponse.others);
    setTransactions(userResponse.others.transactions);
  };
  // useEffect(() => {
  //   fetchUserDetails();
  // }, [loggedInUser?._id]);

  // Helper to check if a transaction is from the current month
  const isCurrentMonth = (dateString: string) => {
    const currentDate: any = new Date();
    const transactionDate: any = new Date(dateString); // ISO format

    // Current date (IST)
    const currentYear = currentDate.getFullYear(); // 2025
    const currentMonth = currentDate.getMonth(); // 5 (June, 0-indexed)

    // Transaction date (UTC)
    const transactionYear = transactionDate.getUTCFullYear(); // 2025
    const transactionMonth = transactionDate.getUTCMonth(); // 4 (May, 0-indexed)

    const monthDifference =
      (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);
    // For May 2025 vs June 2025: (2025-2025)*12 + (5-4) = 1 month apart
    const isCurrentMonth =
      currentYear === transactionYear && currentMonth === transactionMonth; // Same month/year
    return isCurrentMonth;
  };

  // Helper to check if a transaction is from the last month
  const isLastMonth = (dateString: string) => {
    const currentDate: any = new Date();
    const transactionDate: any = new Date(dateString); // ISO format

    // Current date (IST)
    const currentYear = currentDate.getFullYear(); // 2025
    const currentMonth = currentDate.getMonth(); // 5 (June, 0-indexed)

    // Transaction date (UTC)
    const transactionYear = transactionDate.getUTCFullYear(); // 2025
    const transactionMonth = transactionDate.getUTCMonth(); // 4 (May, 0-indexed)

    const monthDifference =
      (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);
    // For May 2025 vs June 2025: (2025-2025)*12 + (5-4) = 1 month apart

    const isLastMonth =
      (currentYear === transactionYear &&
        currentMonth - transactionMonth === 1) ||
      (currentYear - transactionYear === 1 &&
        currentMonth === 0 &&
        transactionMonth === 11); // Han

    return isLastMonth;
  };

  // Helper to check if a transaction is from the last 3 months
  const isLast3Months = (dateString: string) => {
    const currentDate: any = new Date();
    const transactionDate: any = new Date(dateString); // ISO format

    // Current date (IST)
    const currentYear = currentDate.getFullYear(); // 2025
    const currentMonth = currentDate.getMonth(); // 5 (June, 0-indexed)

    // Transaction date (UTC)
    const transactionYear = transactionDate.getUTCFullYear(); // 2025
    const transactionMonth = transactionDate.getUTCMonth(); // 4 (May, 0-indexed)

    const monthDifference =
      (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);
    // For May 2025 vs June 2025: (2025-2025)*12 + (5-4) = 1 month apart
    const isLast3Months = monthDifference >= 1 && monthDifference <= 3; // 1-3 months ago
    return isLast3Months;
  };

  // Helper to check if a transaction is from the last 6 months
  const isLast6Months = (dateString: string) => {
    const currentDate: any = new Date();
    const transactionDate: any = new Date(dateString); // ISO format

    // Current date (IST)
    const currentYear = currentDate.getFullYear(); // 2025
    const currentMonth = currentDate.getMonth(); // 5 (June, 0-indexed)

    // Transaction date (UTC)
    const transactionYear = transactionDate.getUTCFullYear(); // 2025
    const transactionMonth = transactionDate.getUTCMonth(); // 4 (May, 0-indexed)

    const monthDifference =
      (currentYear - transactionYear) * 12 + (currentMonth - transactionMonth);
    // For May 2025 vs June 2025: (2025-2025)*12 + (5-4) = 1 month apart

    const isLast6Months = monthDifference >= 1 && monthDifference <= 6; // 1-6 months ago
    return isLast6Months;
  };
  const currentMonthTransactions = () => {
    setFilterDropdown(false);
    setTransactions(userDetails.transactions);
    const filteredTransactions = userDetails.transactions.filter(
      (transaction: any) => {
        if (isCurrentMonth(transaction.createdAt)) {
          return transaction;
        }
      }
    );
    setTransactions(filteredTransactions);
  };
  const lastMonthTransactions = () => {
    setFilterDropdown(false);
    // setTransactions(userDetails.transactions)
    const filteredTransactions = userDetails.transactions.filter(
      (transaction: any) => {
        if (isLastMonth(transaction.createdAt)) {
          console.log("test");
          return transaction;
        }
      }
    );
    setTransactions(filteredTransactions);
  };
  const lastThreeMonthTransactions = () => {
    setFilterDropdown(false);
    const filteredTransactions = userDetails.transactions.filter(
      (transaction: any) => {
        if (isLast3Months(transaction.createdAt)) {
          return transaction;
        }
      }
    );
    setTransactions(filteredTransactions);
  };
  const lastSixMonthTransactions = () => {
    setFilterDropdown(false);
    const filteredTransactions = userDetails.transactions.filter(
      (transaction: any) => {
        if (isLast6Months(transaction.createdAt)) {
          return transaction;
        }
      }
    );
    setTransactions(filteredTransactions);
  };

  const manageFilter = (filterType: string) => {
    console.log(filterType);
    // const filteredTransactions = transactions.filter((transaction) => {
    switch (filterType) {
      case "currentMonth":
        return currentMonthTransactions();
      case "lastMonth":
        return lastMonthTransactions();
      case "3Months":
        return lastThreeMonthTransactions();
      case "6Months":
        return lastSixMonthTransactions();
      default:
        return true; // Show all
    }
    // });
    // console.log(filteredTransactions)
    // setTransactions(filteredTransactions);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) && // Not the trigger button
        !e.target.closest(".dropdown-menu")
      ) {
        setFilterDropdown(false); // Not inside the dropdown
      } // Not inside the dropdown
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterDropdown]);
  useEffect(() => {
    console.log("useEffect");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?._id) {
        console.log(parsedUser._id);
        fetchUserDetails(parsedUser._id);
      }
    }
  }, [showSendMoneyModal]); // Runs once on component mount
  return (
    <>
      {userDetails ? (
        <div className="flex flex-col justify-center items-center">
          <div className="h-[180px] w-[90%] md:w-[700px] lg:w-[800px] flex justify-center items-center bg-blue-200 mt-6 rounded-t-md">
            <div className="flex gap-10 justify-center items-center">
              <div className="flex justify-center items-center">
                {userDetails?.profilePic ? (
                  // <motion.img
                  <img
                    //   initial={{ scale: 0 }}
                    //   animate={{ scale: 1 }}
                    src={userDetails?.profilePic}
                    alt="Profile Image"
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-full shadow-lg"
                  />
                ) : (
                  // <motion.div
                  //   initial={{ scale: 0 }}
                  //   animate={{ scale: 1 }}
                  <div className="h-28 w-28 bg-gray-200 rounded-full flex justify-center items-center">
                    <IoPersonSharp className="h-24 w-24 cursor-pointer relative text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="">
                  {userDetails && (
                    // <motion.span
                    //   initial={{ opacity: 0 }}
                    //   animate={{ opacity: 1 }}
                    <span className="text-lg sm:text-xl font-semibold text-gray-600">
                      {`${userDetails.name}`}
                    </span>
                  )}
                </div>
                <div className="">
                  {userDetails && (
                    // <motion.span
                    //   initial={{ opacity: 0 }}
                    //   animate={{ opacity: 1 }}
                    <span className="text-lg sm:text-xl font-semibold text-gray-600">
                      {`A/c - ${userDetails.accountNo}`}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-semibold text-gray-600">
                    Avl. Balance -
                  </span>
                  <span className="text-lg sm:text-xl font-semibold">
                    &#8377; {userDetails.accountBalance}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[calc(100vh-255px)] w-[90%] md:w-[700px] lg:w-[800px] flex flex-col gap-2 bg-white shadow-md rounded-b-md px-2 py-2  ">
            <div className="relative flex justify-between items-center mb-4 px-4">
              <span className="text-lg sm:text-2xl font-semibold">
                Transactions
              </span>

              {showSearchBar && (
                <div className="absolute h-[30px] flex justify-center items-center gap-2 border-1 px-2 border-gray-300 rounded-md bg-white">
                  {/* <LuSearch /> */}
                  <div className="relative flex items-center justify-center">
                    <input
                      type="text"
                      name="searchQuery"
                      placeholder="Search Here"
                      onChange={handleSearchQuery}
                      value={searchQuery}
                      className="border-r-1 border-gray-300 focus:outline-none"
                    />
                    {/* <div className="w-full h-full"> */}
                    <div className="absolute right-0.5 z-10 p-1 bg-white/90 backdrop-blur-sm cursor-pointer">
                      <RxCross2
                        className=" h-4 w-4 "
                        onClick={handleCloseSearchBar}
                      />
                    </div>
                  </div>
                  <LuSearch className="" />
                  {/* </div> */}
                </div>
              )}

              <div className="relative flex justify-center items-center gap-6">
                <IoSearchSharp
                  className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
                  onClick={() => setShowSearchBar(true)}
                />
                <TbFilterSearch
                  className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer"
                  onClick={() => setFilterDropdown((prev) => !prev)}
                />
                {filterDropdown && (
                  // <Portal>
                  <div
                    className="absolute top-0 left-20 z-50 mt-2 bg-white shadow-lg rounded-md border border-gray-200 dropdown-menu"
                    // style={{
                    //   top:
                    //     dropdownRef.current?.getBoundingClientRect().bottom +
                    //     window.scrollY -
                    //     20,
                    //   right:
                    //     window.innerWidth -
                    //     (dropdownRef.current?.getBoundingClientRect().right ||
                    //       0),
                    // }}
                    // ref={el => dropdownRef.current.portalNode = el}
                    // ref={dropdownRef}
                  >
                    <div className="py-1">
                      <button
                        className="w-full flex gap-2 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => manageFilter("currentMonth")}
                      >
                        {/* <AiFillEdit className="h-5 w-5" /> */}
                        <span className="text-sm">Current Month</span>
                      </button>
                      <button
                        className="w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => manageFilter("lastMonth")}
                      >
                        <span className="text-sm">Last Month</span>
                      </button>
                      <button
                        className="w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => manageFilter("3Months")}
                      >
                        <span className="text-sm">Last 3 Months</span>
                      </button>
                      <button
                        className="w-full flex gap-1 items-center text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => manageFilter("6Months")}
                      >
                        <span className="text-sm">Last 6 Months</span>
                      </button>
                    </div>
                  </div>
                  // </Portal>
                )}
                <button
                  className="px-2 sm:py-1 bg-green-400 rounded-md flex gap-1 items-center justify-center cursor-pointer"
                  onClick={() => handleShowSendMoneyModal(true)}
                >
                  <span className="text-md sm:text-lg text-gray-600">
                    Send Money
                  </span>{" "}
                  <RiArrowRightUpLine className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>
            {transactions.length <= 0 ? (
              <div className="flex justify-center items-center h-full">
                <span className="text-xl font-semibold text-gray-500">
                  No Transactions Found
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {transactions?.map((transaction: any) => (
                  <div
                    className="flex justify-between items-center px-4 py-1 rounded-md border-1 border-gray-100 shadow-sm hover:bg-gray-100"
                    key={transaction?._id}
                  >
                    <div className="flex flex-col">
                      <div className="text-lg sm:text-xl font-semibold">
                        {transaction?.name ? transaction?.name : transaction?.phoneNo ? `XXXXXX${transaction?.phoneNo.substring(6)}` : `XXXXXX${transaction?.consumerNo.substring(6)}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction?.description}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div
                        className={`text-lg sm:text-xl font-semibold ${
                          transaction?.type === "credit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {transaction?.type === "credit" ? "+" : "-"}
                        &#8377; {transaction?.amount}
                      </div>
                      <div className="text-sm text-gray-500">
                        {/* {transaction.createdAt} */}
                        {formatDate(transaction?.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </div>
            )}
          </div>
          {showSendMoneyModal && (
            <SendMoney
              handleShowSendMoneyModal={handleShowSendMoneyModal}
              userDetails={userDetails}
            />
          )}
        </div>
      ) : (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <GridLoader size={8} color="blue" />
        </div>
      )}
    </>
  );
};

export default Transactions;
