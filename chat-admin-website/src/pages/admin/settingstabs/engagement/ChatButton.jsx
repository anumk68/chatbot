import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const ChatButton = () => {
  return (
    <div className="h-screen bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Chat buttons</h1>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Create chat button
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-6">
        Use chat buttons to draw extra attention to your LiveChat.
        <br />
        Allow your customers to start a chat anywhere on your website.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </p>

      {/* Table */}
      <div className="border border-gray-200 rounded-md">
        {/* Header row */}
        <div className="grid grid-cols-5 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 border-b">
          <span className="col-span-2">Online state</span>
          <span>Offline state</span>
          <span>Type</span>
          <span>Actions</span>
        </div>

        {/* Create button row */}
        <div className="grid grid-cols-5 items-center px-4 py-3 border-b text-sm">
          <span className="text-gray-700 flex items-center gap-2">
            <span className="text-lg font-bold">＋</span> Create chat button
          </span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* First Chat Button */}
        <div className="grid grid-cols-5 items-center px-4 py-3 border-b text-sm">
          <div className="flex items-center">
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1">
              Start Chat Now
            </button>
          </div>
          <div className="flex items-center">
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm">
              LEAVE MESSAGE
            </button>
          </div>
          <span>Image</span>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 cursor-pointer">Install</span>
            <Pencil className="h-4 w-4 text-gray-600 cursor-pointer" />
            <Trash2 className="h-4 w-4 text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Second Chat Button */}
        <div className="grid grid-cols-5 items-center px-4 py-3 border-b bg-gray-50 text-sm">
          <div className="flex items-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm flex items-center gap-1">
              CHAT NOW!
            </button>
          </div>
          <div className="flex items-center">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
              LEAVE MESSAGE
            </button>
          </div>
          <span>Image</span>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 cursor-pointer">Install</span>
            <Pencil className="h-4 w-4 text-gray-600 cursor-pointer" />
            <Trash2 className="h-4 w-4 text-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Text-only Row */}
        <div className="grid grid-cols-5 items-center px-4 py-3 text-sm">
          <span className="text-blue-600 cursor-pointer">Live chat now</span>
          <span className="text-blue-600 cursor-pointer">
            Leave us a message
          </span>
          <span>Text</span>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 cursor-pointer">Install</span>
            <Pencil className="h-4 w-4 text-gray-600 cursor-pointer" />
            <Trash2 className="h-4 w-4 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
