import React from "react";
import notfoundImg from "../assets/404.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={notfoundImg} alt="Not Found" className="h-100 w-100" />
      <Link to={'/'} className="p-2 bg-violet-700 text-white rounded-md">Back to Home</Link>
    </div>
  );
};

export default NotFound;
