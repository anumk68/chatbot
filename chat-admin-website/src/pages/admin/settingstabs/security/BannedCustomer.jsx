import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BannedCustomer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Page Heading */}
      <div className="absolute top-4 left-6 text-[15px] font-medium text-gray-800">
        Banned customers
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* User Icon */}
        <div className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
            />
          </svg>
        </div>

        {/* Text */}
        <p className="font-medium text-gray-800 mb-1">
          You haven't banned any customers yet
        </p>
        <p className="text-sm text-gray-500 max-w-md mb-6">
          When you ban a customer, they will not see your chat widget, appear on
          your traffic list, receive campaigns.
        </p>

        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
        >
          Ban customer
        </button>
      </div>

      {/* Modal with animation */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              className="relative bg-white rounded-md shadow-xl p-6 w-[450px] z-50"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Close */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>

              <h2 className="text-[15px] font-medium text-gray-800 mb-4">
                Ban customer
              </h2>

              {/* Inline Inputs */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Customer IP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter IP"
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Duration
                  </label>
                  <select className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>1 days</option>
                     <option>3 days</option>
                      <option>7 days</option>
                       <option>30 days</option>
                    <option>6 months</option>
                    <option>1 year</option>
                     <option>3 years</option>
                  </select>
                </div>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Note:</span> Banned customers will
                not see your chat widget, appear on your traffic list, receive
                campaigns.
              </p>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-700 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
                  Ban customer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BannedCustomer;