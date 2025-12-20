import React from "react";
import engage from "../../../assets/engage.png";
import { Navigate } from "react-router-dom";

const Traffic = () => {
  const installlivechat = ()=>{
    Navigate("/messages")
  }
  return (
    <div className="p-4 text-white overflow-hidden">
      <div className="flex flex-col gap-4">
        <img
          src={engage}
          alt="Install Code"
          className="w-[1000px] m-auto h-auto rounded"
        />

        <div className="flex-1 flex flex-col items-center justify-center text-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-calendar w-12 h-12 text-gray-400 mb-4"
          >
            <path d="M8 2v4"></path>
            <path d="M16 2v4"></path>
            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
            <path d="M3 10h18"></path>
          </svg>

          <h2 className="text-lg md:text-xl text-black font-semibold">
            Install chat widget to see visitors
          </h2>

          <p className="text-sm md:text-base text-gray-500 max-w-sm mt-1">
            There are visitors waiting on your website. Install the chat widget
            to connect with visitors browsing your site.
          </p>

          <div className="flex items-center justify-center gap-6 mt-4">
            <button onClick={installlivechat} className="bg-blue-600 text-white px-5 py-2 rounded cursor-pointer hover:bg-blue-700 transition">
              Install LiveChat
            </button>

            <p className="bg-[#f5f5f5] text-black border px-5 py-2 rounded cursor-pointer hover:bg-[#f8f8f8] transition">
              Or invite developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;
