import { useEffect, useRef } from "react";

const MessageList = ({ messages = [], userType = "customer" }) => {
  const bottomRef = useRef(null);
  const API_URL = import.meta.env.VITE_NODE_BASE_URL;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessageContent = (msg) => {
    if (msg.file_url) {
      const isImage = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(msg.file_url);
      if (isImage) {
        return (
          <img
            src={msg.file_url.startsWith("/") ? `${API_URL}/${msg.file_url}` : msg.file_url}
            alt="uploaded"
            className="w-[200px] rounded-lg"
          />
        );
      } else {
        return (
          <a
            href={msg.file_url.startsWith("/") ? `${API_URL}/${msg.file_url}` : msg.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download File
          </a>
        );
      }
    }
    return msg.message;
  };

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto h-full bg-gray-100">
      {messages.length === 0 && <p className="text-center text-gray-400 mt-5">No messages yet.</p>}

      {messages.map((msg, idx) => {
        const isOwn = msg.sender === userType;
        const alignment = isOwn ? "justify-end" : "justify-start";
        const bubbleColor = isOwn ? "bg-blue-500 text-white" : "bg-white text-gray-800";
        const bubbleTail = isOwn
          ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
          : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

        return (
          <div key={idx} className={`flex ${alignment}`}>
            <div className={`max-w-[70%] px-4 py-2 shadow-sm break-words ${bubbleColor} ${bubbleTail}`}>
              <div className="whitespace-pre-wrap">{renderMessageContent(msg)}</div>
              {msg.created_at && (
                <div className="text-xs mt-1 text-gray-200 text-right">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
