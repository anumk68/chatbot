import { useState, useEffect, useRef } from "react";

const ChatHeader = ({ onClose, onBack }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionType, setActionType] = useState(null);
  const confirmRef = useRef(null);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowConfirm(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (confirmRef.current && !confirmRef.current.contains(e.target)) {
        setShowConfirm(false);
      }
    };
    if (showConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showConfirm]);

  // Confirm action
  const handleConfirm = () => {
    if (actionType === "close") {
      onClose?.();
    } else if (actionType === "back") {
      // Remove customer chat from localStorage
      localStorage.removeItem("chat_customer");
      onBack?.();
    }
    setShowConfirm(false);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-3 bg-[rgb(246,246,247)] shadow-sm">
      {/* Left Side Icons */}
      <div className="flex items-center gap-4 text-gray-700">
        {/* Back Icon */}
        <button
          onClick={() => {
            setActionType("back");
            setShowConfirm(true);
          }}
          aria-label="Go back"
          className="hover:text-gray-900 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Menu Icon */}
        <button
          aria-label="Menu"
          className="hover:text-gray-900 cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Center Agent Info */}
      <div className="flex items-center gap-3 bg-white rounded-full shadow-md p-2">
       <img
  src={`https://api.dicebear.com/7.x/personas/svg?seed=${Math.random()}&gender=male`}
  alt="Boy Avatar"
  className="w-5 h-5 rounded-full"
/>

        <div className="text-xs">
          <div className="font-bold text-gray-900">AI Assistant</div>
        </div>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-3 text-gray-700 cursor-pointer relative">
        {/* Close Icon */}
        <button
          onClick={() => {
            setActionType("close");
            setShowConfirm(true);
          }}
          aria-label="Close chat"
          className="hover:text-red-500 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Confirmation Box */}
        {showConfirm && (
          <div
            ref={confirmRef}
            className="absolute right-0 top-8 bg-white border border-gray-300 rounded-lg shadow-lg w-64 p-3 z-50 transition-opacity duration-200 animate-fadeIn"
          >
            <p className="text-sm font-semibold text-gray-700 mb-3 text-center">
              {actionType === "back"
                ? "Go back from this chat?"
                : "Close this chat?"}
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="text-sm px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
