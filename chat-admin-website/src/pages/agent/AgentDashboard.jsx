import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatDashboard from "../../../src/chatbot/ChatDashboard.jsx";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  onCustomerAssigned,
  joinConversation,
} from "../../sockets/agentSocket.js";

// Import socket function correctly

const AgentDashboard = ({ agent }) => {
  const [expandedItem, setExpandedItem] = useState("item1");
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");

  // Fetch user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name || "User");
    }
  }, []);

  const agentId = agent?.id;

  const toggleExpand = (item) => {
    setExpandedItem((prev) => (prev === item ? null : item));
  };

  const toggleChat = () => setShowChat((prev) => !prev);

  useEffect(() => {
    if (!agentId) return;

    const handleAssignment = (assignment) => {
      console.log(" Customer Assigned to you:", assignment);

      toast.info(`${assignment.customer_name} assigned to you`);

      joinConversation(assignment.conversation_id);

      setShowChat(true);

      localStorage.setItem("assigned_chat", JSON.stringify(assignment));
    };

    onCustomerAssigned(handleAssignment);
  }, [agentId]);

  return (
    <div className="relative min-h-screen flex justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex flex-col md:flex-row w-full md:w-11/12 lg:w-3/4 h-screen p-4 mx-auto gap-4">
        {/* LEFT SIDE */}
        <div className="flex-1 bg-gray-50 rounded-2xl md:rounded-l-2xl p-4 flex flex-col overflow-y-auto relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black-400">
                Hello {userName}!
              </h1>
              <p className="text-lg sm:text-xl text-black mt-1">
                Let’s get you started with LiveChat
              </p>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto pb-20">
            {[
              "Try out your chat workspace in a sample chat",
              "Explore automated responses",
              "Check assigned customers",
              "Review chat analytics",
            ].map((title, idx) => (
              <div
                key={idx}
                className="pb-5 border-b border-gray-200 bg-white p-5 rounded-2xl shadow-sm"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 mr-3 mt-0.5 mb-2 sm:mb-0">
                    <div className="flex items-center justify-center w-5 h-5 bg-green-600 rounded-full">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-semibold text-gray-900">
                        {title}
                      </h3>
                      <button
                        onClick={() => toggleExpand(`item${idx}`)}
                        className="text-gray-400 hover:text-gray-500 ml-2 transition-transform duration-200"
                        style={{
                          transform:
                            expandedItem === `item${idx}`
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                    {expandedItem === `item${idx}` && (
                      <>
                        <p className="text-sm text-gray-600 mt-2 mb-3">
                          {`Description for "${title}". Explore this feature to improve your workflow.`}
                        </p>
                        <span className="text-[#0066FF] text-sm font-medium cursor-pointer hover:underline">
                          Go to {title.split(" ")[0].toLowerCase()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex items-center justify-center md:justify-start bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-2xl md:rounded-r-2xl p-6 relative">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <div className="absolute w-64 h-72 bg-blue-300 rounded-2xl left-12 top-0 shadow-md hidden sm:block"></div>
            <div className="relative z-10 bg-gradient-to-tr from-purple-100 via-white to-blue-100 rounded-2xl shadow-2xl p-6 w-full">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white mb-4"></div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                Hello, nice to see you back!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3">
                Let us know if you have any questions about the product.
              </p>
              <button className="w-full py-2 bg-black text-white rounded-lg text-sm mb-3">
                Chat now
              </button>
              <div className="space-y-2">
                <button className="w-full py-2 border rounded-lg text-sm text-gray-700">
                  Follow us on Instagram
                </button>
                <button className="w-full py-2 border rounded-lg text-sm text-gray-700">
                  Follow us on Facebook
                </button>
              </div>
            </div>

            <div className="absolute bottom-6 -right-10 w-64 bg-white rounded-2xl shadow-2xl p-4 z-20">
              <div className="flex items-center gap-2 border-b pb-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <span className="font-semibold text-sm">Joe</span>
              </div>

              <div className="space-y-2 text-sm max-h-40 overflow-auto">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    Hi, Tina! 👋 How can I help you today?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-500 text-white p-2 rounded-lg max-w-[75%]">
                    Hi! Do you have any 100,000mAh power banks available?
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="bg-gray-100 p-2 rounded-lg">
                    Sure! Do you have any preferences for brand or speed?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      {!showChat && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
        >
          <MessageCircle size={24} />
        </button>
      )} */}

      {/* <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 right-6 w-full sm:w-[350px] h-[500px] bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 z-50"
          >
            <ChatDashboard onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default AgentDashboard;
