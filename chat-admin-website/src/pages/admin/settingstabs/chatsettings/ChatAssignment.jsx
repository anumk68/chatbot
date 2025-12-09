import React, { useState } from "react";

const ChatAssignment = () => {
  const [selected, setSelected] = useState("auto");

  return (
    <div className="min-h-screen bg-white p-6">
     
      <h2 className="text-lg font-medium text-gray-800 mb-6">
        Chat assignment
      </h2>

      
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Choose how chats are distributed
        </h3>
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          
          <div
            onClick={() => setSelected("auto")}
            className={`cursor-pointer border rounded-lg p-4 transition ${
              selected === "auto"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                checked={selected === "auto"}
                onChange={() => setSelected("auto")}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-gray-800">Auto assignment</p>
                <p className="text-sm text-gray-600 mt-1">
                  Chats are evenly distributed among agents with accepting chats
                  status. When all agents hit their limit, new visitors are
                  queued.
                </p>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                >
                  Set each agent’s chat limit in their profile details
                </a>
              </div>
            </div>
          </div>

      
          <div
            onClick={() => setSelected("manual")}
            className={`cursor-pointer border rounded-lg p-4 transition ${
              selected === "manual"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                checked={selected === "manual"}
                onChange={() => setSelected("manual")}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-gray-800">Manual selection</p>
                <p className="text-sm text-gray-600 mt-1">
                  All agents get notified about a customer waiting in the queue.
                  Chat will be assigned to the first agent who picks it up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Shortcuts to helpful stuff
        </h3>
        <div className="flex gap-4 flex-wrap">
          
          <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-white shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-yellow-500 text-lg">🎓</span>
            <p className="text-sm text-gray-700">
              Read our chat assignment guide to learn more
            </p>
          </div>

        
          <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-white shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-yellow-500 text-lg">👥</span>
            <p className="text-sm text-gray-700">
              Route chats to groups with Routing rules
            </p>
          </div>

          <div className="border rounded-lg px-4 py-3 flex items-center gap-2 bg-white shadow-sm hover:shadow-md cursor-pointer">
            <span className="text-yellow-500 text-lg">🤖</span>
            <p className="text-sm text-gray-700">
              Learn how ChatBot can boost team productivity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAssignment;