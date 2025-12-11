import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const templates = [
  {
    id: 1,
    title: "Offer instant help",
    desc: "Quickly connect visitors with support through clickable options.",
  },
  {
    id: 2,
    title: "Welcome visitors",
    desc: "Send a friendly message and encourage visitors to start a chat.",
  },
  {
    id: 3,
    title: "Share important updates",
    desc: "Let visitors know about announcements or alerts.",
  },
];

export default function CreateCampaignModal({ onClose, onSelectTemplate }) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white w-[90%] max-w-[90%] h-[90%] rounded-2xl shadow-2xl p-6 relative border flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-600 hover:text-black"
          >
            <X size={26} />
          </button>

          <h2 className="text-2xl font-semibold">Create Campaign</h2>
          <p className="text-gray-600 mt-1">What's your campaign goal?</p>

          {/* Template List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pr-2">
            {templates.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => onSelectTemplate(item)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="border rounded-xl p-5 cursor-pointer bg-gray-50 
                  hover:bg-white hover:border-blue-500 transition shadow-sm 
                  hover:shadow-xl group relative"
              >
                <div className="h-28 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-sm">
                  Image Preview
                </div>

                <h3 className="font-semibold text-lg group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
