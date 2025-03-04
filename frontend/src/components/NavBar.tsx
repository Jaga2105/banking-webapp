import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useState,useEffect, useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);

  // let loggedInUser: any;
  // const userJSON = localStorage.getItem("user");
  // if (userJSON !== null) {
  //   loggedInUser = JSON.parse(userJSON);
  // }
  const handleOnMouseEnter = ()=>{
    setShowDropdown(true);
  }
  const handleOnMouseLeave = ()=>{
    setShowDropdown(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useExpiry");
    console.log("Navigating..");
    console.log(localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
      console.log("tested...");
      navigate("/login");
    }
  };
  const handleClickOutside = (event:MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="h-12 flex justify-between items-center px-8 w-full shadow-lg">
      <Link to={"/"} className="text-2xl font-extrabold text-gray-600">
        FinEase
      </Link>
      {/* <div className="group">
          <CgProfile className="h-8 w-8 cursor-pointer relative" />
          <div className="absolute z-1 right-10 hidden group-hover:block shadow-md rounded-md bg-gray-50 py-4">
            <Link to={`/profile`} className="flex gap-4 items-center hover:bg-gray-200 px-4 py-2 cursor-pointer" onClick={()=>console.log("profile selected")}>
              <CgProfile className="h-6 w-6 cursor-pointer" />
              <span className="text-md font-semibold">My Profile</span>
            </Link>
            <div className="flex gap-4 items-center hover:bg-gray-200 px-4 py-2 cursor-pointer" onClick={handleLogout}>
              <LuLogOut className="h-6 w-6 cursor-pointer" />
              <span className="text-md font-semibold">Logout</span>
            </div>
          </div>
        </div> */}

      <div className="">
        <CgProfile
          className="h-8 w-8 cursor-pointer relative"
          // onClick={() => setShowDropdown((prev) => !prev)}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        {showDropdown && (
          <div
            className={`absolute z-1 right-10 shadow-md rounded-md bg-gray-50 py-4`}
            ref={divRef}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <Link
              to={`/profile`}
              className="flex gap-4 items-center hover:bg-gray-200 px-4 py-2 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <CgProfile className="h-6 w-6 cursor-pointer" />
              <span className="text-md font-semibold">My Profile</span>
            </Link>
            <div
              className="flex gap-4 items-center hover:bg-gray-200 px-4 py-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LuLogOut className="h-6 w-6 cursor-pointer" />
              <span className="text-md font-semibold">Logout</span>
            </div>
          </div> )}
      </div>

      {/* <button
          className="bg-black px-2 py-1 rounded-md text-white cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button> */}
    </div>
  );
};

export default NavBar;
