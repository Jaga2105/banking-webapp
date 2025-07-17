import React, { ChangeEvent, FormEvent } from "react";
import { RxCross2 } from "react-icons/rx";
import { sendAdminRequest } from "../../api/loanAPI";
import { toast } from "react-toastify";

const SendRequestModal = ({ setShowSendRequestModal, id }: any) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminRequest = true; // Assuming this is the request you want to send
    const adminRequestComment = "Please send your property files"; // Example comment
    const res = await sendAdminRequest(id, adminRequest, adminRequestComment);
    console.log(res);
    if (!res.error) {
      setShowSendRequestModal("");
      toast.success("Request sent successfully!");
    } else {
      toast.error(res.message || "Failed to send request");
      // console.error("Error sending request:", res.message);
      setShowSendRequestModal("");
    }
  };
  console.log("Send Request loan appliaction rendered!!");
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30">
      {/*Modal Backdrop */}
      <div
        className="fixed h-[100vh] w-full top-0 left-0 backdrop-contrast-50 bg-[#595959]/40 justify-center items-center"
        onClick={() => setShowSendRequestModal("")}
      >
        <form
          className="w-full h-[100vh] flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div
            className="relative h-[200px] w-[400px] bg-white rounded-md flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 right-3 z-50 cursor-pointer text-gray-500">
              <RxCross2
                className="h-8 w-8"
                onClick={() => setShowSendRequestModal("")}
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-xl font-semibold">
                Please send your property files
              </div>
              <button
                type="submit"
                className="mt-10 mx-auto px-4 py-1 bg-violet-400 text-white rounded-md hover:bg-violet-500 transition-colors cursor-pointer font-semibold"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendRequestModal;
