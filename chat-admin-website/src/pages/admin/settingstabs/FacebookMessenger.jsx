import React from "react";
import { Facebook } from "lucide-react";

const FacebookMessenger = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-gray-200">
        <Facebook className="w-5 h-5 text-blue-600" />
        <span className="text-sm font-medium text-gray-800">
          Facebook Messenger
        </span>
      </div>

      {/* Content aligned left */}
      <div className="px-6 py-6 max-w-2xl">
        {/* Title */}
        <h1 className="text-base font-medium text-gray-900 mb-4">
          Accept chats from Facebook Messenger
        </h1>

        {/* Upgrade Banner */}
        <div className="bg-blue-500 text-white px-6 py-4 rounded-md flex flex-col md:flex-row items-center justify-between gap-4 shadow mb-6">
          <div>
            <p className="font-semibold">
              Reply Longer, Reach Further – go PRO today!
            </p>
            <p className="text-sm opacity-90">
              Get a 7-day response window, $10 for marketing campaigns, and a
              custom welcome screen.{" "}
              <a href="#" className="underline">
                Learn more
              </a>
            </p>
          </div>
          <button className="bg-yellow-400 text-gray-900 font-medium px-5 py-2 rounded-md hover:bg-yellow-500 transition">
            Upgrade for $39/month
          </button>
        </div>

        {/* Connect Box */}
        <div className="bg-blue-50 border border-blue-100 px-6 py-6 rounded-md flex flex-col md:flex-row items-center justify-between gap-4 shadow">
          <div className="text-gray-700">
            <p className="font-medium">Connect your Facebook page</p>
            <p className="text-sm text-gray-500">
              See and reply to your Facebook page messages directly in LiveChat.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">
            Connect to Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookMessenger;
