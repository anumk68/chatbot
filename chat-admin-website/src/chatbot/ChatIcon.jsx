const ChatIcon = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="chaticon bg-blue-600 text-white rounded-full absolute right-0 bottom-1 p-4 shadow-lg w-17 h-17 cursor-pointer"
      aria-label="Open chat"
    >
      {/* SVG icon */}
      <div className="chatsvg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      {/* Animated dots */}
      <div className="chatdots">
        <span className="dot dot-1"></span>
        <span className="dot dot-2"></span>
        <span className="dot dot-3"></span>
      </div>
    </button>
  );
};

export default ChatIcon;
