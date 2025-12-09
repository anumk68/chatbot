import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const EyeCatcher = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex h-screen bg-white">
      {/* Left Section */}
      <div className="w-[60%] p-6 border-r border-gray-200">
        {/* Title */}
        <h1 className="text-lg font-medium mb-4">Eye-catcher</h1>
 
        {/* Description */}
        <p className="text-sm text-gray-500 mb-6 max-w-[95%]">
          Grab your website visitors’ attention and encourage them to start a
          chat by showing an eye-catcher. Eye-catchers are only shown on desktop.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn more
          </a>
        </p>

        {/* Toggle Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium text-gray-900">
              Show eye-catcher
            </h2>
            <p className="text-sm text-gray-500">
              Draw your visitors attention to a captivating visual to get more
              chats.
            </p>
          </div>

          {/* Toggle */}
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-blue-600" : "bg-gray-300"
            } relative inline-flex h-5 w-10 items-center rounded-full transition`}
          >
            <span
              className={`${
                enabled ? "translate-x-5" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[40%] flex flex-col p-6 relative bg-gray-50">
        {/* Reset button */}
        <div className="flex justify-end mb-6">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100">
            Reset position
          </button>
        </div>

        {/* Preview box */}
        <div className="flex-1 flex items-center justify-center">
          <div className="border border-dashed border-gray-300 rounded-lg px-10 py-16 text-center text-sm text-gray-500">
            Turn on eye-catchers to grab your visitor’s attention.
          </div>
        </div>

        {/* Blue chat bubble */}
        <div className="absolute bottom-16 right-6 bg-blue-600 p-3 rounded-full shadow-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z" />
          </svg>
        </div>

        {/* Orange chat bubble */}
        <div className="absolute bottom-4 right-4 bg-orange-500 p-3 rounded-full shadow-md cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EyeCatcher;
