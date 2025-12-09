import React from "react";

const Users = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <h2 className="text-base font-medium">Team</h2>
        <button className="text-sm text-gray-600 hover:underline flex items-center space-x-1">
          <span>Invite settings</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 px-6 border-b text-sm font-medium">
        <button className="py-3 text-blue-600 border-b-2 border-blue-600">
          Agents
        </button>
        <button className="py-3 text-gray-600 hover:text-black">
          Chatbots
        </button>
        <button className="py-3 text-gray-600 hover:text-black">Groups</button>
        <button className="py-3 text-gray-600 hover:text-black">
          Suspended agents
        </button>
      </div>

      {/* Search + Actions */}
      <div className="flex justify-between items-center px-6 py-3 border-b">
        <input
          type="text"
          placeholder="Search agent"
          className="border rounded px-3 py-2 text-sm w-64 focus:outline-none"
        />
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border rounded text-sm hover:bg-gray-50">
            <span className="mr-1"></span> Add new chatbot
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
            + Invite agents
          </button>
        </div>
      </div>

      {/* Agents Section */}
      <div className="px-6 py-4 text-sm flex-1 overflow-y-auto">
        <h3 className="text-gray-600 mb-2">Active (1)</h3>

        {/* Table Header */}
        <div className="grid grid-cols-3 text-xs font-medium text-gray-500 border-b pb-2 mb-2">
          <div>Name</div>
          <div>Role</div>
          <div>Status</div>
        </div>

        {/* Add new agent button */}
        <div className="flex items-center space-x-2 py-3 border-b cursor-pointer hover:bg-gray-50">
          <div className="flex items-center justify-center w-8 h-8 border rounded-full text-lg">
            +
          </div>
          <span className="text-sm">Add new agent</span>
        </div>

        {/* User row */}
        <div className="grid grid-cols-3 items-center bg-gray-100 hover:bg-gray-200 p-3 rounded mt-2">
          {/* Left - name + email */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
              L
            </div>
            <div>
              <p className="font-medium">Lakshitadigirush (You)</p>
              <p className="text-xs text-gray-500">
                lakshitadigirush@gmail.com
              </p>
            </div>
          </div>

          {/* Middle - Role */}
          <div>
            <span className="px-2 py-1 bg-black text-white rounded text-xs">
              Owner
            </span>
          </div>

          {/* Right - Status */}
          <div className="flex items-center space-x-1 text-sm text-gray-700">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>Accepting chats</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
