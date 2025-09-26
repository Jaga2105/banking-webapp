import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { fetchRouteName } from "../../helpers/fetchRouteName";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";

type Props = {};
const chats = [
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
  {
    message:
      "Hello! How can I assist you today? Hello! How can I assist you today? Hello! How can I assist you today? Hello! How can I assist you today? Hello! How can I assist you today? Hello! How can I assist you today?",
    sender: "1",
    timestamp: "10:00 AM",
  },
  {
    message: "Hello! How can I assist you today?",
    sender: "2",
    timestamp: "10:00 AM",
  },
];

const AdminChatPage = (props: Props) => {
  const [chatMessageTextAreaRows, setChatMessageTextAreaRows] = useState(1);
  const [messageText, setMessageText] = useState("");

  const handleChatMessage = (e: any) => {
    if (e.target.value !== "") {
      // This variable represents the height of a single line of text within the textarea
      const textAreaLineHeight = 24;
      // This expression calculates the number of rows needed to display the entire content of the textarea
      const newRow = Math.round(e.target.scrollHeight / textAreaLineHeight);
      // scrollHeight property provides the total height of the content within the textarea
      setChatMessageTextAreaRows(newRow);
      setMessageText(e.target.value);
    } else {
      setChatMessageTextAreaRows(1);
      setMessageText("");
    }
  };
  return (
    <div className="h-full w-full px-6 sm:px-0 flex ">
      <div className="min-h-[calc(100vh-76px)] hidden sm:block sm:w-1/3 md:w-1/4 mt-6 bg-gray-100 p-2 border-r-1 border-gray-300">
        <div className="flex gap-2 mb-2">
          <div className="text-xl font-bold">Chats</div>
        </div>
        <div className=" h-[30px] flex justify-center items-center gap-2 border-1 px-2 border-gray-300 rounded-md bg-white">
          {/* <LuSearch /> */}

          <div className="relative flex items-center border-r-1 border-gray-300">
            <input
              type="text"
              name="searchQuery"
              placeholder="Search Here"
              // onChange={handleSearchQuery}
              // value={searchQuery}
              className=" border-gray-300 focus:outline-none"
            />
            {/* <div className="w-full h-full"> */}
            {/* <div className="absolute right-0.5 z-10 p-1 bg-white/90 backdrop-blur-sm cursor-pointer">
              <RxCross2
                className=" h-4 w-4 "
                // onClick={handleCloseSearchBar}
              />
            </div> */}
          </div>
          <LuSearch className="" />
          {/* </div> */}
        </div>
        <div className="mt-2 flex flex-col gap-1">
          <div className="w-full h-14 bg-gray-200 rounded-md flex items-center gap-2 p-2 hover:bg-gray-300 cursor-pointer mt-2 shadow-md">
            <div className="h-12 w-12 flex justify-center items-center bg-gray-400 rounded-full font-semibold text-lg">
              J
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Jagannath Nayak</div>
              <div className="text-sm">How are you?</div>
            </div>
          </div>
          <div className="w-full h-14 bg-gray-200 rounded-md flex items-center gap-2 p-2 hover:bg-gray-300 cursor-pointer mt-2 shadow-md">
            <div className="h-12 w-12 flex justify-center items-center bg-gray-400 rounded-full font-semibold text-lg">
              A
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Amaresh Nahak</div>
              <div className="text-sm">How are you?</div>
            </div>
          </div>
          <div className="w-full h-14 bg-gray-200 rounded-md flex items-center gap-2 p-2 hover:bg-gray-300 cursor-pointer mt-2 shadow-md">
            <div className="h-12 w-12 flex justify-center items-center bg-gray-400 rounded-full font-semibold text-lg">
              S
            </div>
            <div className="flex flex-col">
              <div className="font-semibold">Sankar Behera</div>
              <div className="text-sm">How are you?</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4 h-[calc(100vh-120px)] bg-zinc-200 mt-6">
        <div className="w-full text-center text-lg font-semibold p-2">
          {" "}
          <span>Ask anything here...</span>
        </div>
        {/* <div className="mt-4"> */}
        <div className="relative h-[calc(100vh-180px)]  w-full flex flex-col gap-2 pb-2 bg-zinc-300 overflow-y-scroll custom-scrollbar">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`flex flex-col my-2 mx-4 ${
                chat.sender === "1" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-md ${
                  chat.sender === "1"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {chat.message}
              </div>
              {/* <span className="text-xs text-gray-600 mt-1">
                  {chat.timestamp}
                </span> */}
            </div>
          ))}
          {/* <div className="sticky bottom-0 w-full">
              <input type="text" className="w-full bg-gray-600 h-10" />
            </div> */}
        </div>
        <div className="sticky bottom-0 w-full flex  bg-gray-200 ">
          {/* <input type="text" className="w-full px-6  h-15 outline-0" /> */}
          <textarea
            name="comment"
            placeholder="Type your message here...."
            className="w-[90%] min-h-10 max-h-15 p-2 overflow-y-auto resize-none outline-none"
            rows={chatMessageTextAreaRows}
            // value={currentUserComment}
            onChange={handleChatMessage}
          ></textarea>
          <div className="w-[10%] h-15 flex justify-center items-center">
            <div className="p-2  rounded-full hover:bg-gray-300">
              <MdSend className="h-6 w-6" />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminChatPage;
