import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SettingsSidebar = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation(); // 

  // Toggle collapsible sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Check if a path is active
  const isActive = (path) => location.pathname === path;

    

  // Auto-open parent sections if a child route is active
  useEffect(() => {
    if (
      location.pathname.startsWith("/settings/install-livechat") ||
      location.pathname.startsWith("/settings/email-by-livechat") ||
      location.pathname.startsWith("/settings/facebook-messenger") ||
      location.pathname.startsWith("/settings/apple-messages")
    ) {
      setOpenSections((prev) => ({ ...prev, channels: true }));
    }

    if (location.pathname.startsWith("/settings/widget")) {
      setOpenSections((prev) => ({ ...prev, widget: true }));
    }

    if (location.pathname.startsWith("/settings/forms")) {
      setOpenSections((prev) => ({ ...prev, forms: true }));
    }

    if (location.pathname.startsWith("/settings/engagement")) {
      setOpenSections((prev) => ({ ...prev, engagement: true }));
    }

    if (location.pathname.startsWith("/settings/chatsettings")) {
      setOpenSections((prev) => ({ ...prev, chatsettings: true }));
    }

    if (location.pathname.startsWith("/settings/security")) {
      setOpenSections((prev) => ({ ...prev, security: true }));
    }
  }, [location.pathname]);

  return (
    <aside
      className={`
         fixed top-15.5 left-14 h-[calc(100%-56px)] w-64 bg-gradient-to-b from-[#cf4047] from-60% to-blue-500 border-r shadow-lg z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-xl border-gray-700">
        <h2 className="font-bold text-white">Settings</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 text-lg"
        >
          <X />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-2 text-lg text-white overflow-y-auto h-[calc(100%-56px)] scrollbar-hide ">
        {/* Channels */}
        <div>
          <button
            onClick={() => toggleSection("channels")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.channels ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Channels</span>
          </button>
          {openSections.channels && (
            <div className="ml-6 flex flex-col text-white-500">
              <div
                className={`flex items-center justify-between px-2 py-1 cursor-pointer text-white ${
                  isActive("/settings/install-livechat")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/install-livechat")}
              >
                <span>Install LiveChat</span>
                <span className="text-xs text-gray-400">OFF</span>
              </div>

              <div
                className={`flex items-center justify-between px-2 py-1 cursor-pointer text-white ${
                  isActive("/settings/email-by-livechat")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/email-by-livechat")}
              >
                <span>Email by HelpDesk</span>
                <span className="text-xs text-gray-400">OFF</span>
              </div>

              <div
                className={`flex items-center justify-between px-2 py-1 cursor-pointer text-white ${
                  isActive("/settings/facebook-messenger")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/facebook-messenger")}
              >
                <span>Facebook Messenger</span>
                <span className="text-xs text-gray-400">OFF</span>
              </div>

              <div
                className={`flex items-center justify-between px-2 py-1 cursor-pointer text-white ${
                  isActive("/settings/apple-messages")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/apple-messages")}
              >
                <span>Apple Messages</span>
                <span className="text-xs text-gray-400">OFF</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat page */}
        <button
          onClick={() => navigate("/settings/chat-page")}
          className={`ml-6 px-3 py-2 rounded text-left ${
            isActive("/settings/chat-page")
              ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
              : "hover:bg-gray-800"
          }`}
        >
          Chat page
        </button>

        {/* Website Widget */}
        <div>
          <button
            onClick={() => toggleSection("widget")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.widget ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Website Widget</span>
          </button>
          {openSections.widget && (
            <div className="ml-6 flex flex-col text-white-500">
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/websitewidget/customization")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/websitewidget/customization")}
              >
                Customization
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/websitewidget/language")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/websitewidget/language")}
              >
                Language
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/websitewidget/availability")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/websitewidget/availability")}
              >
                Availability
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/websitewidget/welcome-screen")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/websitewidget/welcome-screen")}
              >
                Welcome screen
              </button>
            </div>
          )}
        </div>

        {/* Forms */}
        <div>
          <button
            onClick={() => toggleSection("forms")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.forms ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Forms</span>
          </button>
          {openSections.forms && (
            <div className="ml-6 flex flex-col text-white-500">
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/forms/pre-chat")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/forms/pre-chat")}
              >
                Pre-chat form
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/forms/ask-email")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/forms/ask-email")}
              >
                Ask for email
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/forms/post-chat")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/forms/post-chat")}
              >
                Post-chat form
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/forms/ticket")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/forms/ticket")}
              >
                Ticket form
              </button>
            </div>
          )}
        </div>

        {/* Engagement */}
        <div>
          <button
            onClick={() => toggleSection("engagement")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.engagement ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Engagement</span>
          </button>
          {openSections.engagement && (
            <div className="ml-6 flex flex-col text-white-500">
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/engagement/eye-catcher")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/engagement/eye-catcher")}
              >
                Eye-Catcher
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/engagement/chat-button")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/engagement/chat-button")}
              >
                Chat button
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/engagement/quality-showcase")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/engagement/quality-showcase")}
              >
                Quality Showcase
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <button
          onClick={() => navigate("/settings/tags")}
          className={`ml-6 px-3 py-2 rounded text-left ${
            isActive("/settings/tags")
              ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
              : "hover:bg-gray-800"
          }`}
        >
          Tags
        </button>

        {/* Sales tracker */}
        <button
          onClick={() => navigate("/settings/sales-tracker")}
          className={`ml-6 px-3 py-2 rounded text-left ${
            isActive("/settings/sales-tracker")
              ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
              : "hover:bg-gray-800"
          }`}
        >
          Sales tracker
        </button>

        {/* Chat Settings */}
        <div>
          <button
            onClick={() => toggleSection("chatsettings")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.chatsettings ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Chat settings</span>
          </button>
          {openSections.chatsettings && (
            <div className="ml-6 flex flex-col text-white-500">
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/chatsettings/chat-assignment")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/chatsettings/chat-assignment")}
              >
                Chat assignment
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/chatsettings/transcript-forwarding")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/chatsettings/transcript-forwarding")}
              >
                Transcript forwarding
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/chatsettings/file-sharing")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/chatsettings/file-sharing")}
              >
                File sharing
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/chatsettings/inactivity-timeouts")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/chatsettings/inactivity-timeouts")}
              >
                Inactivity timeouts
              </button>
            </div>
          )}
        </div>

        {/* Security */}
        <div>
          <button
            onClick={() => toggleSection("security")}
            className="w-full flex items-center px-3 py-2 rounded hover:bg-gray-800 text-left gap-2"
          >
            {openSections.security ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span>Security</span>
          </button>
          {openSections.security && (
            <div className="ml-6 flex flex-col text-white-500">
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/security/trusted-domains")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/security/trusted-domains")}
              >
                Trusted domains
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/security/banned-customers")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/security/banned-customers")}
              >
                Banned customers
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/security/credit-card-masking")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/security/credit-card-masking")}
              >
                Credit card masking
              </button>
              <button
                className={`px-2 py-1 text-left ${
                  isActive("/settings/security/login-settings")
                    ? "bg-gray-800 text-white font-semibold border-l-4 border-blue-500"
                    : "hover:text-white"
                }`}
                onClick={() => navigate("/settings/security/login-settings")}
              >
                Login settings
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
