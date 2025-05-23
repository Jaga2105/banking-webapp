import React, { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails } from "../api/userAPI";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveMenuTab } from "../store/reducers/menuReducer";
import payee from "../assets/payee.svg";
// import { div } from "framer-motion/client";

interface MenuBarProps {
  open: boolean;
  handleOpenMenuBar: (status: boolean) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ open, handleOpenMenuBar }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<any>(null);
  // const activeTab = useSelector((state: any) => state.menu.activeMenuTab);
  const location = useLocation();
  const dispatch = useDispatch();
  const routeName: any = location.pathname.substring(1);
  console.log(routeName);
  const [aciveMenuTab, setActiveMenuTab] = useState(routeName);
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useExpiry");
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  };
  const fetchUserDetails = async () => {
    const userResponse: any = await getUserDetails(loggedInUser?._id);
    setUserDetails(userResponse.others);
  };
  const handleClose = () => {
    handleOpenMenuBar(false);
  };
  const handleactiveMenuTab = (menuTab: string) => {
    if (menuTab === "logout") {
      dispatch(changeActiveMenuTab(""));
      setActiveMenuTab("");
      handleLogout();
    } else {
      dispatch(changeActiveMenuTab(menuTab));
      setActiveMenuTab(menuTab);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center z-40"
        >
          {/* Close button */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-5 z-50 cursor-pointer"
            onClick={handleClose}
          >
            <RxCross2 className="h-8 w-8 text-white" />
          </motion.div>

          {/* Modal Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            onClick={handleClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -400 }}
            animate={{ x: 0 }}
            exit={{ x: -400 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="absolute z-10 bg-white left-0 top-0 h-[100vh] w-[300px]"
          >
            {routeName === "admin" ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex gap-2 items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 cursor-pointer rounded-md"
                onClick={handleLogout}
              >
                <LuLogOut className="h-4 w-4 cursor-pointer" />
                <span className="text-md font-semibold">Logout</span>
              </motion.div>
            ) : (
              <div>
                {!userDetails ? (
                  <MenuBarPlaceholder />
                ) : (
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <div className="">
                      {userDetails?.profilePic ? (
                        <motion.img
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          src={userDetails?.profilePic}
                          alt="Profile Image"
                          className="h-16 w-16 rounded-full shadow-lg mt-6"
                        />
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-14 w-14 bg-gray-200 rounded-full flex justify-center items-center"
                        >
                          <IoPersonSharp className="h-10 w-10 cursor-pointer relative text-gray-600" />
                        </motion.div>
                      )}
                    </div>
                    <div className="">
                      {userDetails && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xl font-semibold text-gray-600 mt-2"
                        >
                          {`${userDetails.name}`}
                        </motion.span>
                      )}
                      {/* {userDetails ? (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-semibold text-gray-600 mt-2"
                      >
                        {`${userDetails.name}`}
                      </motion.span>):(
                        <div className="w-[50px] h-[10px] animate-pulse"></div>
                      )
                    } */}
                    </div>
                    <div className="">
                      {userDetails && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xl font-semibold text-gray-600 mt-2"
                        >
                          {`A/c - ${userDetails.accountNo}`}
                        </motion.span>
                      )}
                    </div>
                  </div>
                )}

                {/* Menu tabs */}
                <div className="mt-4 flex flex-col">
                  <Link
                    to={"/profile"}
                    className={`flex gap-2 items-center text-xl pl-4 pr-2 py-2 cursor-pointer ${
                      aciveMenuTab === "profile"
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleactiveMenuTab("profile")}
                  >
                    <IoPerson className="h-6 w-6" />
                    <span> Profile </span>
                  </Link>
                  <Link
                    to={"/transactions"}
                    className={`flex gap-2 items-center text-xl pl-4 pr-2 py-2 cursor-pointer ${
                      aciveMenuTab === "transactions"
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleactiveMenuTab("transactions")}
                  >
                    <GrTransaction className="h-6 w-6" />
                    <span> Transactions </span>
                  </Link>
                  <Link
                    to={"/payees"}
                    className={`flex gap-2 items-center text-xl pl-4 pr-2 py-2 cursor-pointer ${
                      aciveMenuTab === "payees"
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleactiveMenuTab("payees")}
                  >
                    {/* <GrTransaction className="h-6 w-6" /> */}
                    <img src={payee} alt="Payee Image" className="h-6 w-6" />
                    <span> Payee </span>
                  </Link>
                  <div
                    className={`flex gap-2 items-center text-xl pl-4 pr-2 py-2 cursor-pointer ${
                      aciveMenuTab === "logout"
                        ? "bg-blue-100 border-l-4 border-blue-500"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleactiveMenuTab("logout")}
                  >
                    <HiOutlineLogout className="h-6 w-6" />
                    <span> Logout </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MenuBarPlaceholder = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col gap-2 items-center py-4">
      <div className="h-[64px] w-[64px] animate-pulse bg-gray-200 rounded-full shadow-md"></div>
      <div className="h-[30px] w-4/5 animate-pulse bg-gray-200 rounded-md shadow-md"></div>
      <div className="h-[30px] w-4/5 animate-pulse bg-gray-200 rounded-md shadow-md"></div>
      {/* <div> */}
      <div className="h-[30px] bg-gray-200 w-full animate-pulse mt-1 mx-4"></div>
      <div className="h-[30px] bg-gray-200 w-full animate-pulse mt-1 mx-4"></div>
      <div className="h-[30px] bg-gray-200 w-full animate-pulse mt-1 mx-4"></div>
      <div className="h-[30px] bg-gray-200 w-full animate-pulse mt-1 mx-4"></div>
      {/* </div> */}
    </div>
  );
};

export default MenuBar;
