import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";

const Root: React.FC = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  
  const location = useLocation();
  const routeName: any = location.pathname.substring(1,6);
  console.log(routeName)
  useEffect(() => {
    if(routeName==="admin"){
      navigate("/admin")
    }else if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    // <div className="h-screen bg-gray-50 relative">
    //   <NavBar/>
    //   <div className="">
    //   <Outlet/>
    //   </div>
    // </div>
    <div className="h-screen bg-gray-50 relative">
      <div className="h-12 flex justify-between items-center w-full shadow-lg fixed bg-white z-10">
        <NavBar />
      </div>
      <div className="pt-12">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
