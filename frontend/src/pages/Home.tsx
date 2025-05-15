import React, { useEffect, useState } from "react";
import { getUserDetails } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/heroImg.jpg";
import { getCustomer } from "../api/customerAPI";

const Home = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const navigate = useNavigate();

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const fetchUserDetails = async () => {
    const res: any = await getCustomer(loggedInUser._id);
    console.log(res);
    setUserDetails(res);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  // useEffect(()=>{
  //   userDetails.firstTimeLogin && navigate("/reset-password")
  // },[loggedInUser])
  // console.log(userDetails.firstTimeLogin)
  return (
    <div className="flex flex-col-reverse sm:flex-row h-[calc(100vh-50px)] w-full px-8 mt-[180px] sm:mt-0">
      <div className="w-full sm:w-1/2 h-full bg-gray-100 flex flex-col gap-8 justify-center px-4">
        <h6 className="flex flex-col text-5xl text-[#ff907f] font-bold">
          {`Payment made
           Easy`}
        </h6>
        <h6 className="flex flex-col text-4xl text-[#ff907f] font-bold">
          Welcome <span> {userDetails.name}</span>
        </h6>
        <div className="flex flex-col gap-3 text-lg bg-[#f4e6e4] text-[#ff735c] p-2 w-[300px] rounded-md">
          <div className="text-2xl">
            <span>A/c No. -</span>
            <span>{userDetails.accountNo}</span>
          </div>
          <div className="text-2xl">
            <span>Avl Balance- &#8377;</span>
            <span>{userDetails.accountBalance}  /-</span>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex items-center justify-center h-full">
        <img src={heroImg} alt="Hero Image" className="w-4/5 h-4/5" />
      </div>
    </div>
  );
};

export default Home;
