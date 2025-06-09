import React from "react";
import HeroSectionBillPayents from "../../assets/HeroSectionBillPayments.png";
import { TbDeviceMobileCharging } from "react-icons/tb";
import { FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {};

const BillPayments = (props: Props) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="h-[calc(100vh-80px)] w-4/5 md:w-[700px] lg:w-[800px] flex flex-col gap-2 bg-white shadow-md rounded-b-md px-2 py-2  ">
        <div className="flex justify-around h-[160px] w-9/10 bg-blue-50 rounded-md mx-auto my-4">
          <div className="font-bold text-2xl text-blue-400 font-mono flex justify-center items-center h-full w-1/2 px-4">
            Recharge and Pay bills on one click
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img
              src={HeroSectionBillPayents}
              alt="Bill Payments Hero sctionImg"
              className="h-32 w-60 rounded-md"
            />
          </div>
        </div>
        <div className="w-9/10 flex gap-8 flex-wrap mx-auto">
          <Link
            to={"/mobileRecharge"}
            className="w-[200px] flex flex-col items-center bg-violet-100 hover:bg-violet-200 py-2 rounded-md cursor-pointer"
          >
            <TbDeviceMobileCharging className="text-3xl text-violet-400" />
            <span className="text-lg font-semibold font-mono text-violet-400">
              Mobile Recharge
            </span>
          </Link>
          <Link
            to={"/electricityBill"}
            className="w-[200px] flex flex-col items-center bg-violet-100 hover:bg-violet-200 py-2 rounded-md cursor-pointer"
          >
            <FaLightbulb className="text-3xl text-violet-400" />
            <span className="text-lg font-semibold font-mono text-violet-400">
              Electricity Bill
            </span>
          </Link>
          {/* <div className="w-[200px] flex flex-col items-center bg-violet-100 py-2 rounded-md">
            <TbDeviceMobileCharging className="text-3xl text-violet-400"/>
            <span className="text-lg font-semibold font-mono text-violet-400">Mobile Recharge</span>
          </div>
          <div className="w-[200px] flex flex-col items-center bg-violet-100 py-2 rounded-md">
            <FaLightbulb className="text-3xl text-violet-400"/>
            <span className="text-lg font-semibold font-mono text-violet-400">Electricity Bill</span>
          </div>
          <div className="w-[200px] flex flex-col items-center bg-violet-100 py-2 rounded-md">
            <TbDeviceMobileCharging className="text-3xl text-violet-400"/>
            <span className="text-lg font-semibold font-mono text-violet-400">Mobile Recharge</span>
          </div>
          <div className="w-[200px] flex flex-col items-center bg-violet-100 py-2 rounded-md">
            <FaLightbulb className="text-3xl text-violet-400"/>
            <span className="text-lg font-semibold font-mono text-violet-400">Electricity Bill</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BillPayments;
