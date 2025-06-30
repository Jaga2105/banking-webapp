import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import LoansHeroSection from "../assets/LoanHeroSection.jpg";
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

type Props = {}

const Loans = (props: Props) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="h-[calc(100vh-80px)] w-4/5 md:w-[700px] lg:w-[800px] flex flex-col gap-2 bg-white shadow-md rounded-b-md px-2 py-2  ">
        <div className="flex justify-around h-[160px] w-9/10 bg-gray-100 rounded-md mx-auto my-4">
          <div className="font-bold text-2xl text-blue-400 font-mono flex justify-center items-center h-full w-1/2 px-4">
            Get Loans and Manage Your Finances
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img
              src={LoansHeroSection}
              alt="Bill Payments Hero sctionImg"
              className="h-32 w-60 rounded-md"
            />
          </div>
        </div>
        <div className="w-9/10 flex gap-8 flex-wrap mx-auto">
          <Link
            to={"/car-loan"}
            className="w-[200px] flex flex-col items-center bg-violet-100 hover:bg-violet-200 py-2 rounded-md cursor-pointer"
          >
            <FaCar className="text-3xl text-violet-400" />
            <span className="text-lg font-semibold font-mono text-violet-400">
              Car Loan
            </span>
          </Link>
          <Link
            to={"/home-loan"}
            className="w-[200px] flex flex-col items-center bg-violet-100 hover:bg-violet-200 py-2 rounded-md cursor-pointer"
          >
            <IoHome className="text-3xl text-violet-400" />
            <span className="text-lg font-semibold font-mono text-violet-400">
              Home Loan
            </span>
          </Link>
        </div>
      </div>
      {/* <Outlet/> */}
    </div>
  )
}

export default Loans