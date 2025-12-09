import React from "react";
import { Mail } from "lucide-react";
import promoBanner from "../../../assets/promoBanner.png"
const EmailByHelpDesk = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Mail className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-800">
          Email by HelpDesk
        </span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center px-6 py-12">
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3 text-center">
          Transform your email experience
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-2xl mb-6">
          Effortlessly convert emails to manageable tickets and solve them on an
          individual, team, or automatic basis. Amaze your customers with timely
          and organized messaging.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mb-10">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Try 14-day HelpDesk trial
          </button>
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Learn more
          </button>
        </div>

        {/* Illustration */}
        <div className="max-w-4xl w-full">
          <img
            src={promoBanner}
            alt="HelpDesk Email Illustration"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default EmailByHelpDesk;
