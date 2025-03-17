import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const routeName: any = location.pathname.substring(1);
  console.log(routeName);
  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const handleOnMouseEnter = () => {
    setShowDropdown(true);
  };
  const handleOnMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("useExpiry");
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    // <div className="h-12 flex justify-between items-center px-8 w-full shadow-lg fixed z-10">
    <div className="flex justify-between items-center w-full px-8">
      <Link to={"/"} className="text-2xl font-extrabold text-gray-600">
        FinEase
      </Link>

      {routeName === "admin" ? (
        <div
          className="flex gap-2 items-center bg-gray-200 hover:bg-gray-300 px-4 py-2 cursor-pointer rounded-md"
          onClick={handleLogout}
        >
          <LuLogOut className="h-4 w-4 cursor-pointer" />
          <span className="text-md font-semibold">Logout</span>
        </div>
      ) : (
        <div className="">
          <div
            className="flex gap-1"
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          >
            <span className="text-xl font-semibold text-gray-600">{`${
              loggedInUser ? loggedInUser.name : "Someone"
            }'s`}</span>
            {loggedInUser?.profilePic ? (
              <img src={loggedInUser?.profileImg} alt="Profile Image" />
            ) : (
              <IoPersonSharp
                className="h-6 w-6 cursor-pointer relative text-gray-600"
                // onClick={() => setShowDropdown((prev) => !prev)}
                // onMouseEnter={handleOnMouseEnter}
                // onMouseLeave={handleOnMouseLeave}
              />
            )}
          </div>
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
            </div>
          )}
        </div>
      )}
      {/* <div className="">
        <div
          className="flex gap-1"
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        >
          <span className="text-xl font-semibold text-gray-600">{`${loggedInUser ?loggedInUser.name:"Someone"}'s`}</span>
          {loggedInUser?.profilePic ? (
              <img src={loggedInUser?.profileImg} alt="Profile Image" />
          ):(
            <IoPersonSharp
              className="h-6 w-6 cursor-pointer relative text-gray-600"
              // onClick={() => setShowDropdown((prev) => !prev)}
              // onMouseEnter={handleOnMouseEnter}
              // onMouseLeave={handleOnMouseLeave}
            />)}
        </div>
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
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NavBar;
