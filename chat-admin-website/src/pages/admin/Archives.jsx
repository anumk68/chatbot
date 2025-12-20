import React from "react";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Archives = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/messages");
  };

  return (
    <div className="flex flex-col md:flex-row h-full md:min-h-screen w-full">

      {/* Left Sidebar */}
      <div className="hidden md:block md:w-1/4 border-r p-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-14 bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <Calendar className="w-12 h-12 text-gray-400 mb-4" />

        <h2 className="text-lg md:text-xl font-semibold">
          Nothing in your Archives yet
        </h2>

        <p className="text-sm md:text-base text-gray-500 max-w-sm mt-1">
          Archives organize and hold all your finished chats. To start receiving
          chats, first install your LiveChat.
        </p>

        <button
          className="bg-blue-600 text-white px-5 py-2 rounded mt-4 cursor-pointer hover:bg-blue-700 transition"
          onClick={handleNavigate}
        >
          Install LiveChat
        </button>

        <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
          Or invite developer
        </p>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/4 border-l p-4 space-y-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Archives;
