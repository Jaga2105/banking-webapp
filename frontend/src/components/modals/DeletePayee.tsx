import React, { FormEvent, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { deleteCustomer } from "../api/customerAPI";
import { toast } from "react-toastify";
import { deletePayee } from "../../api/payeeAPI";

interface DeletePayeeProps {
  id: string;
  handleShowDeletePayee: (id: string) => void;
}

const DeletePayee: React.FC<DeletePayeeProps> = ({
  id,
  handleShowDeletePayee,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await deletePayee(id);
    if (result) {
      toast.success("Payee deleted successfully");
      handleShowDeletePayee("");
    }
  };
  return (
    <>
      {/* {open && ( */}
      <div className="absolute inset-0 flex items-center justify-center z-40">
        {/* Close button */}
        <div
          className="absolute top-5 right-5 z-10 cursor-pointer"
          //   onClick={handleClose}
        >
          <RxCross2
            className="h-8 w-8 text-white"
            onClick={() => handleShowDeletePayee("")}
          />
        </div>
        {/*Modal Backdrop */}
        <div
          className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40"
          onMouseDown={() => handleShowDeletePayee("")}
        ></div>
        <form
          className={`absolute flex flex-col gap-2 h-[160px] sm:h-[160px] w-[360px] sm:w-[450px] px-4 py-4 bg-white rounded-xl overflow-y-auto`}
          onSubmit={handleSubmit}
        >
          <div className="text-xl font-semibold text-gray-600 mx-auto mb-4">
            Are you sure to delete this payee?
          </div>
          <div className="flex gap-6 absolute left-1/2 transform -translate-x-1/2 bottom-6">
            <button
              className="px-2 py-1 bg-green-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
              onClick={() => handleShowDeletePayee("")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-red-500 text-white font-semibold  rounded-sm cursor-pointer w-[100px]"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      {/* )} */}
    </>
  );
};

export default DeletePayee;
