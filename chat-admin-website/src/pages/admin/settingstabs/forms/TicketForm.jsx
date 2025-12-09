import React from "react";

const TicketForm = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Left Section */}
      <div className="w-[60%] p-6 border-r border-gray-200">
        {/* Title */}
        <h1 className="text-lg font-medium mb-4">Ticket form</h1>

        {/* Blue Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
          <p className="text-sm font-medium text-gray-900">
            Ticket form is inactive and customers can start a chat, even if agents are away
          </p>
          <p className="text-sm text-gray-600 mt-1">
            You can change this setting in the{" "}
            <span className="font-medium">Availability</span> section, so customers can
            leave a HelpDesk ticket that you can handle in your own time.
          </p>
        </div>

        {/* HelpDesk Box */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <div className="flex items-start">
      
            <div className="mr-3">
              <span className="text-2xl">🎫</span>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-900">
                Resolve customer cases through HelpDesk tickets
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Let your customers leave tickets when you're away so you'll have more time
                to think before solving cases.
              </p>

              <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                Enable HelpDesk boosters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[40%] flex flex-col items-center justify-center text-center p-6">
        {/* Icon */}
        <div className="text-3xl mb-2">🎟️</div>
        <p className="text-sm text-gray-600">Ticket form is disabled</p>
        <a
          href="#"
          className="text-sm text-blue-600 hover:underline mt-2"
        >
          Test it out
        </a>{" "}
        <span className="text-sm text-gray-600">on the chat page</span>
      </div>
    </div>
  );
};

export default TicketForm;
