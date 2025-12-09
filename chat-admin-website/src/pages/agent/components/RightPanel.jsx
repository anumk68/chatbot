import React, { useState } from "react";
import {
  UserRound,
  Mail,
  Circle,
  Calendar,
  Copy,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  UserCheck,
} from "lucide-react";

const AccordionItem = ({ title, children, isOpenDefault = true }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  return (
    <div className="bg-white rounded-lg shadow mb-3">
      <button
        className="flex justify-between items-center w-full px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="px-4 py-3 border-t border-gray-100">{children}</div>}
    </div>
  );
};

const RightPanel = ({ activeConversation }) => {
  if (!activeConversation)
    return (
      <div className="w-full md:w-1/4 border-l border-gray-200 bg-gray-50 p-4 text-gray-600 flex items-center justify-center">
        Select a chat to view customer details.
      </div>
    );

  const copyEmail = () => {
    if (activeConversation.customer_email) {
      navigator.clipboard.writeText(activeConversation.customer_email);
      alert("Email copied to clipboard!");
    }
  };

  return (
    <div className="w-full md:w-1/4 border-l border-gray-200 bg-gray-50 p-5 flex flex-col">
      <h3 className="font-semibold text-gray-700 mb-5 text-lg">Customer Info</h3>

      {/* Avatar & Name */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200">
          <UserRound size={36} />
        </div>
        <h4 className="mt-3 text-gray-900 font-bold text-xl truncate text-center">
          {activeConversation.user_one || "Guest"}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <Circle
            size={10}
            className={
              activeConversation.customer_status === "online"
                ? "text-green-500 animate-pulse"
                : "text-gray-400"
            }
          />
          <span className="text-gray-600 capitalize font-medium">
            {activeConversation.customer_status}
          </span>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition">
          <MessageSquare size={16} />
          Message
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition"
          onClick={copyEmail}
        >
          <Mail size={16} />
          Email
        </button>
      </div>

      {/* Accordion Sections */}
      <div className="flex flex-col">
        {/* Description / Bio */}
        {activeConversation.description && (
          <AccordionItem title="Description / Bio" isOpenDefault={true}>
            <p className="text-gray-700 text-sm">{activeConversation.description}</p>
          </AccordionItem>
        )}

        {/* Contact Info */}
        <AccordionItem title="Contact Info" isOpenDefault={true}>
          {activeConversation.customer_email && (
            <div
              className="flex items-center justify-between bg-gray-50 p-2 rounded cursor-pointer"
              onClick={copyEmail}
            >
              <div className="flex items-center gap-2 text-gray-700">
                <Mail size={16} className="text-blue-500" />
                <p className="truncate">{activeConversation.customer_email}</p>
              </div>
              <Copy size={16} className="text-gray-400" />
            </div>
          )}
          {activeConversation.phone && (
            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <UserCheck size={16} className="text-green-500" />
              <p>{activeConversation.phone}</p>
            </div>
          )}
        </AccordionItem>

        {/* Activity / Status */}
        <AccordionItem title="Activity / Status" isOpenDefault={false}>
          <div className="flex items-center gap-2 text-gray-700">
            <Circle
              size={10}
              className={
                activeConversation.customer_status === "online"
                  ? "text-green-500 animate-pulse"
                  : "text-gray-400"
              }
            />
            <p className="capitalize">{activeConversation.customer_status}</p>
          </div>
          {activeConversation.joined_at && (
            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <Calendar size={16} className="text-gray-500" />
              <p>Joined: {new Date(activeConversation.joined_at).toLocaleDateString()}</p>
            </div>
          )}
          {activeConversation.last_seen && (
            <div className="flex items-center gap-2 text-gray-700 mt-2">
              <Circle size={10} className="text-gray-400" />
              <p>Last Seen: {new Date(activeConversation.last_seen).toLocaleString()}</p>
            </div>
          )}
        </AccordionItem>

        {/* Tags / Labels */}
        {activeConversation.tags && activeConversation.tags.length > 0 && (
          <AccordionItem title="Tags / Labels" isOpenDefault={false}>
            <div className="flex flex-wrap gap-2">
              {activeConversation.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AccordionItem>
        )}
      </div>
    </div>
  );
};

export default RightPanel;
