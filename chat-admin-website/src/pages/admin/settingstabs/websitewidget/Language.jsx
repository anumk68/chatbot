import React, { useState } from "react";

const LanguageSettings = () => {
  const [openSection, setOpenSection] = useState("welcome");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Left Section */}
      <div className="w-1/2 border-r border-gray-200 p-8">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <span className="mr-2">📋</span> Language
        </h2>

        {/* Language Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Select language
          </label>
          <select className="mt-2 w-60 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>

        {/* Customize Phrases */}
        <h3 className="text-base font-semibold mb-4">Customize phrases</h3>

        {/* Welcome Customers */}
        <div className="border rounded-md mb-3">
          <button
            onClick={() => toggleSection("welcome")}
            className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="mr-2">👋</span>
              <p className="font-medium text-gray-800">Welcome your customers</p>
            </div>
            <span>{openSection === "welcome" ? "▲" : "▼"}</span>
          </button>
          {openSection === "welcome" && (
            <div className="px-4 pb-4">
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Welcome message
                </label>
                <input
                  type="text"
                  defaultValue="Hello. How may I help you?"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">
                  Default customer name
                </label>
                <input
                  type="text"
                  defaultValue="Visitor"
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Message placeholder
                </label>
                <input
                  type="text"
                  defaultValue="Write a message..."
                  className="w-full border rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        {/* Agents Away */}
        <div className="border rounded-md mb-3">
          <button
            onClick={() => toggleSection("away")}
            className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="mr-2">👤</span>
              <p className="font-medium text-gray-800">Agents are away</p>
            </div>
            <span>{openSection === "away" ? "▲" : "▼"}</span>
          </button>
          {openSection === "away" && (
            <div className="px-4 pb-4 text-sm text-gray-600">
              Customers can still start a chat. They’ll see offline info and{" "}
              <span className="text-blue-600 cursor-pointer">ask for email</span> form.
            </div>
          )}
        </div>

        {/* Customers in Queue */}
        <div className="border rounded-md">
          <button
            onClick={() => toggleSection("queue")}
            className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
          >
            <div className="flex items-center">
              <span className="mr-2">⏳</span>
              <p className="font-medium text-gray-800">Customers get in a queue</p>
            </div>
            <span>{openSection === "queue" ? "▲" : "▼"}</span>
          </button>
          {openSection === "queue" && (
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600 mb-2">
                If all agents hit their limit or{" "}
                <span className="text-blue-600 cursor-pointer">chat routing</span> is
                set to manual new customers will be queued.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-50 flex flex-col items-center pt-8">
        <h2 className="text-lg font-semibold mb-6">Preview</h2>

        {/* Phone Mock */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="w-72 h-[520px] bg-black rounded-xl flex flex-col justify-between">
            {/* Mock Header */}
            <div className="flex justify-start items-center px-3 py-2 text-white text-sm font-medium">
              Bhagya Digirushol...
            </div>

            {/* Chat Content */}
            <div className="flex flex-col text-sm px-3 py-2 text-white space-y-3">
              <p className="bg-gray-700 px-3 py-1 rounded-lg w-fit">
                Hello. How may I help you?
              </p>
              <p className="bg-blue-500 px-3 py-1 rounded-lg w-fit self-end">
                I’d like to ask something
              </p>
              <p className="bg-gray-700 px-3 py-1 rounded-lg w-fit">
                Go ahead
              </p>
            </div>

            {/* Chat Footer */}
            <div className="bg-gray-900 p-2 flex items-center rounded-b-xl">
              <input
                type="text"
                placeholder="Write a message..."
                className="bg-transparent flex-1 text-gray-400 text-sm outline-none"
              />
              <span className="text-white text-lg ml-2">➤</span>
            </div>
          </div>
        </div>

        <a
          href="#"
          className="mt-6 text-blue-600 text-sm font-medium hover:underline"
        >
          Test it out on the chat page
        </a>
      </div>
    </div>
  );
};

export default LanguageSettings;
