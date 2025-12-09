import React, { useState } from "react";
import { Clock, Users } from "lucide-react";

const Availability = () => {
  const [option, setOption] = useState("always");

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Left-aligned container with fixed width */}
      <div className="max-w-4xl">
        {/* Heading */}
        <h1 className="text-lg font-medium text-gray-800 mb-6">Availability</h1>

        {/* Customers can start a chat */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            Customers can start a chat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option 1 */}
            <div
              onClick={() => setOption("always")}
              className={`border rounded-md p-4 cursor-pointer h-full ${
                option === "always"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  checked={option === "always"}
                  onChange={() => setOption("always")}
                  className="mt-1 mr-2"
                />
                <div>
                  <p className="font-medium text-gray-900">Always</p>
                  <ul className="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-1">
                    <li>Customers can send messages even if you’re away.</li>
                    <li>You’ll see their messages as unassigned chats.</li>
                    <li>Customers will get an email with your reply.</li>
                    <li>
                      Chat history is available for both agents and customers.
                    </li>
                  </ul>
                </div>
              </label>
            </div>

            {/* Option 2 */}
            <div
              onClick={() => setOption("agents")}
              className={`border rounded-md p-4 cursor-pointer h-full ${
                option === "agents"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  checked={option === "agents"}
                  onChange={() => setOption("agents")}
                  className="mt-1 mr-2"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    Only when agents are accepting chats
                  </p>
                  <ul className="text-sm text-gray-600 list-disc ml-5 mt-1 space-y-1">
                    <li>Customers can’t start a chat when you’re away.</li>
                    <li>
                      With HelpDesk, customers will be able to leave tickets
                      that you can handle once you’re available.
                    </li>
                  </ul>
                  <span className="inline-block text-xs text-green-600 mt-1">
                    Available with HelpDesk
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* What happens when */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-3">
            What happens when
          </h2>

          {/* Agents are away */}
          <div className="border rounded-md mb-4">
            <div className="p-4">
              <p className="flex items-center text-gray-800 font-medium mb-2">
                <Clock className="w-4 h-4 mr-2" /> Agents are away
              </p>
              <div className="flex justify-between items-center border-t py-2">
                <span className="text-sm text-gray-700">
                  Customers will see offline status info
                </span>
                <button className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Customize
                </button>
              </div>
              <div className="flex justify-between items-center border-t py-2">
                <span className="text-sm text-gray-700">
                  Customers will be asked to leave their email address
                </span>
                <button className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Customize
                </button>
              </div>
            </div>
          </div>

          {/* Customers get in a queue */}
          <div className="border rounded-md">
            <div className="p-4">
              <p className="flex items-center text-gray-800 font-medium mb-2">
                <Users className="w-4 h-4 mr-2" /> Customers get in a queue
              </p>
              <div className="flex justify-between items-center border-t py-2">
                <span className="text-sm text-gray-700">
                  Customers will see queue info
                </span>
                <button className="px-3 py-1 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
