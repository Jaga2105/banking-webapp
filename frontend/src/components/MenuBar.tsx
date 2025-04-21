import React from "react";
import { RxCross2 } from "react-icons/rx";

const MenuBar = ({ open }) => {
  return (
    <>
      {open && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          {/* Close button */}
          <div
            className="absolute top-5 right-5 z-10 cursor-pointer"
            //   onClick={handleClose}
          >
            <RxCross2
              className="h-8 w-8 text-white"
              //   onClick={() => handleOnclickDeleteCustomer("")}
            />
          </div>
          {/*Modal Backdrop */}
          <div
            className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
            // onMouseDown={() => handleOnclickDeleteCustomer("")}
          ></div>
          <form
            className={`absolute flex flex-col gap-2 h-[160px] sm:h-[160px] w-[360px] sm:w-[450px] px-4 py-4 bg-white rounded-xl overflow-y-auto`}
            //   onSubmit={handleSubmit}
          ></form>
        </div>
      )}
    </>
  );
};

export default MenuBar;
