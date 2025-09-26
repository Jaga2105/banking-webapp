import React, { useState } from "react";
import { MdSend } from "react-icons/md";

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

const CustomerChatsPage = (props: Props) => {
  // const [currentUserComment, setCurrentUserComment] = useState("");

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
    <div className="h-full w-full px-6 sm:px-0 flex justify-center items-center">
      <div className="w-full sm:w-[600px] h-[calc(100vh-120px)] bg-zinc-200 mt-6 rounded-md">
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
        <div className="sticky bottom-0 w-full flex  bg-gray-200 rounded-b-md ">
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
            <div className="p-2  rounded-full hover:bg-gray-300"><MdSend className="h-6 w-6"/></div></div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default CustomerChatsPage;
