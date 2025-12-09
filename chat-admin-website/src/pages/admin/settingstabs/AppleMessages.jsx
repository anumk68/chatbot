import React from "react";
import { Apple } from "lucide-react";
import appleMessagesVideo from "../../../assets/appleMessages.mp4"; //  video import

const AppleMessages = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Apple className="w-5 h-5 text-gray-800" />
        <span className="text-sm font-medium text-gray-800">
          Apple Messages
        </span>
      </div>

      {/* Content */}
      <div className="px-6 py-6 flex flex-col md:flex-row items-start gap-10 max-w-5xl">
        {/* Left side text */}
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">
            Available in Business & Enterprise Plans
          </p>
          <h1 className="text-lg font-semibold text-gray-900 mb-3">
            Be right where communication happens
          </h1>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Let over 1.65 billion Apple users connect with you just as they
            would with friends in iMessage. Your customer service team will chat
            with Apple users directly from the LiveChat Agent App.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
              View pricing plans
            </button>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Right side video */}
        <div className="flex-1 flex justify-center">
          <video
            src={appleMessagesVideo}
            autoPlay
            loop
            muted
            playsInline
            className="max-w-sm rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default AppleMessages;
