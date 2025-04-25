import React from 'react'
import { RxCross2 } from 'react-icons/rx';

interface Props{
    handleShowSendMoneyModal:(flag:boolean)=>void
}
const SendMoney = ({handleShowSendMoneyModal}:Props) => {
    const handleClose = () =>{
        handleShowSendMoneyModal(false)
    }
  return (
    <div className="absolute inset-0 flex items-center justify-center z-40">
          {/* Close button */}
          <div
            className="absolute top-5 right-5 z-10 cursor-pointer"
              onClick={handleClose}
          >
            <RxCross2
              className="h-8 w-8 text-white"
            //   onClick={() => handleOnclickDeleteCustomer("")}
            />
          </div>
          {/*Modal Backdrop */}
          <div
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            onMouseDown={handleClose}
          ></div>
          <form
            className={`absolute flex flex-col gap-2 h-[450px] sm:h-[420px] w-[360px] sm:w-[450px] px-6 pt-6 pb-2 bg-white rounded-xl`}
            //   onSubmit={handleSubmit}
          >
            <div className='text-xl text-blue-400 font-semibold mx-auto'>Enter details to send Money</div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name" className='text-lg'>Account Holder Name</label>
              <input type="text" name='name' placeholder='Enter Account holder name..'  className='outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1'/>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="accountNo" className='text-lg'>Account Number</label>
              <input type="number" name='accountNo' placeholder='Enter 11-digit account number'  className='outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1'/>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="amount" className='text-lg'>Amount ( &#8377; )</label>
              <input type="number" name='amount' placeholder='Enter amount '  className='outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1'/>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="remark" className='text-lg'>Remarks</label>
              <input type="text" name='remark' placeholder='Enter remarks '  className='outline-none border-1 border-blue-200 shadow-md rounded-md px-2 py-1'/>
            </div>
            <button className='bg-blue-300 py-1 px-2 mt-4 rounded-sm cursor-pointer'>Send</button>
          </form>
        </div>
  )
}

export default SendMoney;