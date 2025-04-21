import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../api/userAPI'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [userDetails, setUserDetails] = useState<any>({})
  const navigate = useNavigate();

  const storedUser: any = localStorage.getItem("user");
  let loggedInUser: any;
  if (storedUser) {
    // Parse the string into a JavaScript object
    loggedInUser = JSON.parse(storedUser);
  }
  const fetchUserDetails = async() =>{
    const res:any = await getUserDetails(loggedInUser._id);
    // console.log(res.others)
    setUserDetails(res.others);
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])
  // useEffect(()=>{
  //   userDetails.firstTimeLogin && navigate("/reset-password")
  // },[loggedInUser])
  // console.log(userDetails.firstTimeLogin)
  return (
    <div className='h-100 w-full flex justify-center items-center text-3xl'>This is Home Page</div>
  )
}

export default Home