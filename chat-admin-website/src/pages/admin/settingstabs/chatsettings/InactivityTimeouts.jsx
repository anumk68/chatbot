import React, { useState } from "react";

const InactivityTimeouts = () => {
  const [agentTimeout, setAgentTimeout] = useState(3);
  const [inactiveTimeout, setInactiveTimeout] = useState(10);
  const [closeTimeout, setCloseTimeout] = useState(15);

  return (
    <div className="p-8 bg-white">
      <h1 className="text-lg font-medium mb-6">Inactivity timeouts</h1>

      <div className="space-y-6 text-sm text-gray-800">
        {/* Option 1 */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <span>
              When the agent is not responding for{" "}
              <input
                type="number"
                value={agentTimeout}
                onChange={(e) => setAgentTimeout(e.target.value)}
                className="border border-gray-300 rounded w-14 text-center mx-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />{" "}
              minutes,{" "}
              <span className="font-semibold">
                transfer the visitor to another agent.
              </span>
              <p className="text-gray-500 text-xs mt-1">
                Applies only if the chat has just started. All following
                responses can be longer and won’t result in a transfer.
              </p>
            </span>
          </label>
        </div>

        {/* Option 2 */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <span>
              When there are no new messages in the chat for{" "}
              <input
                type="number"
                value={inactiveTimeout}
                onChange={(e) => setInactiveTimeout(e.target.value)}
                className="border border-gray-300 rounded w-14 text-center mx-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />{" "}
              minutes,{" "}
              <span className="font-semibold">make the chat inactive.</span>
              <p className="text-gray-500 text-xs mt-1">
                Inactive chats are not included in agents' concurrent chats
                limit.
              </p>
            </span>
          </label>
        </div>

        {/* Option 3 */}
        <div>
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            />
            <span>
              When there are no new messages in the chat for{" "}
              <input
                type="number"
                value={closeTimeout}
                onChange={(e) => setCloseTimeout(e.target.value)}
                className="border border-gray-300 rounded w-14 text-center mx-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />{" "}
              minutes, <span className="font-semibold">close the chat.</span>
            </span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
         
          className="bg-blue-500 text-white px-4 py-1 text-[14px] rounded-xl cursor-not-allowed"
        >
          Save changes
        </button>
        <button className="bg-white text-black border text-[14px] px-4 py-1 rounded-xl">
          Discard changes
        </button>
      </div>
    </div>
  );
};

export default InactivityTimeouts;
