import { IoMenu } from "react-icons/io5";
import { Link  } from "react-router-dom";
import { useState } from "react";
import MenuBar from "./MenuBar";

const NavBar = () => {
  const [openMenuBar, setOpenMenuBar] = useState(false);
  const handleOpenMenuBar = (status: boolean) => {
    setOpenMenuBar(status);
  };
  return (
    <div className="flex justify-between items-center w-full px-8">
      <Link to={"/"} className="text-2xl font-extrabold text-gray-600">
        FinEase
      </Link>
      <Link to={"/aboutUs"}>About Us</Link>
      <Link to={"/contactUs"}>Contact Us</Link>
      <IoMenu
        className="h-8 w-8 cursor-pointer hover:text-gray-600"
        onClick={() => handleOpenMenuBar(true)}
      />
      {openMenuBar && (
        <MenuBar open={openMenuBar} handleOpenMenuBar={handleOpenMenuBar} />
      )}
    </div>
  );
};

export default NavBar;
