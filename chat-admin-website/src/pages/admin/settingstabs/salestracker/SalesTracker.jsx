import React from "react";
import { Plus } from "lucide-react";

const SalesTracker = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header Section */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-gray-900 font-medium">Sales tracker</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow">
          New sales tracker
        </button>
      </div>

      {/* Description */}
      <div className="px-4 py-3 text-sm text-gray-600">
        Track which chats end with sales and measure how much revenue you get from chats.{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Learn more
        </a>
      </div>

      {/* Table Header */}
      <div className="px-4 py-2 text-xs font-medium text-gray-500 flex items-center border-b border-gray-200">
        <div className="flex-1">Tracker name</div>
        <div className="w-32 text-center">Status</div>
        <div className="w-32 text-center">Actions</div>
      </div>

      {/* Empty State */}
      <div className="px-4 py-6 flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-50">
        <Plus className="w-5 h-5 text-gray-500" />
        <span className="text-sm font-medium">Add new sales tracker</span>
      </div>
    </div>
  );
};

export default SalesTracker;
