import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const AdminRoot = () => {
  const location = useLocation();
  console.log("Current route:", location.pathname);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminRoot;
