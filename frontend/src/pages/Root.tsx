import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {useEffect} from 'react';

const Root: React.FC = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/login")
    }  }, [user])
  
  return (
    <div className="h-screen bg-gray-50">
      <NavBar/>
      <Outlet/>
    </div>
  );
};

export default Root;
