import React, { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getUserDetails } from "../api/userAPI";
import { GridLoader } from "react-spinners";

const Root: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get user from localStorage once on initial render
  const loggedInUser = React.useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);

  // Memoize the fetch function
  const fetchUserDetails = useCallback(async () => {
    if (!loggedInUser?._id) return;

    try {
      const res: any = await getUserDetails(loggedInUser._id);
      setUserDetails(res.others);

      if (res.others.firstTimeLogin) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  }, [loggedInUser?._id, navigate]);

  useEffect(() => {
    // Route guard logic
    const routeName = location.pathname.substring(1, 6);
    if (routeName === "admin") {
      navigate("/admin");
    } else if (!loggedInUser) {
      navigate("/login");
    } else {
      setLoading(true)
      fetchUserDetails();
    }
  }, [location.pathname, loggedInUser, fetchUserDetails]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <GridLoader className="text-white mt-28" color="blue" size={8} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="h-12 flex justify-between items-center w-full shadow-lg fixed bg-white z-10">
        <NavBar />
      </div>
      <div className="pt-12 min-h-[calc(100vh-3rem)]"> {/* Adjust height */}
      <Outlet />
      </div>
    </div>
  );
};

export default Root;
