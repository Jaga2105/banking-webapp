import { IoMenu, IoNotifications } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import { getAllLoanApplicationForms } from "../api/loanAPI";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RootState } from "../store/store";
import { fetchLoanApplications } from "../store/reducers/loanApplicationsReducer";
import { fetchRouteName } from "../helpers/fetchRouteName";

const NavBar = () => {
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const [notifications, setNotifications] = useState<any>([]);
  const location = useLocation();
  const routeName: any = fetchRouteName(location.pathname.substring(1));

  const dispatch = useAppDispatch();
  const { loanApplications } = useAppSelector(
    (state: RootState) => state.loanApplications
  );

  const handleOpenMenuBar = (status: boolean) => {
    setOpenMenuBar(status);
  };

  useEffect(() => {
    dispatch(fetchLoanApplications());
  }, [dispatch]);

  return (
    <div className="flex justify-between items-center w-full px-8">
      <Link to={"/"} className="text-2xl font-extrabold text-gray-600">
        FinEase
      </Link>
      <div className="flex items-center space-x-8">
        <Link
          to={"/aboutUs"}
          className="hidden sm:block px-2 py-1 rounded-sm hover:bg-gray-200"
        >
          About Us
        </Link>
        <Link
          to={"/contactUs"}
          className="hidden sm:block px-2 py-1 rounded-sm hover:bg-gray-200"
        >
          Contact Us
        </Link>
        {!(routeName === "admin" || routeName === "loan-applications") && (
          <Link
            to="/notifications"
            className="hidden sm:block relative px-2 py-1 rounded-sm hover:bg-gray-200"
          >
            <IoNotifications className="h-6 w-6" />
            {loanApplications.length > 0 && (
              <span className="absolute -top-1 right-1 h-2 w-2 bg-violet-500 text-white text-sm p-2 flex justify-center items-center font-bold rounded-full">
                {loanApplications.length}
              </span>
            )}
          </Link>
        )}

        <IoMenu
          className="h-8 w-8 cursor-pointer hover:text-gray-600"
          onClick={() => handleOpenMenuBar(true)}
        />
      </div>
      {openMenuBar && (
        <MenuBar open={openMenuBar} handleOpenMenuBar={handleOpenMenuBar} />
      )}
    </div>
  );
};

export default NavBar;
