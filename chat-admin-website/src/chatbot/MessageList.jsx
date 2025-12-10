import { useEffect, useRef } from "react";

const MessageList = ({ messages = [], userType = "customer" }) => {
  const bottomRef = useRef(null);
  const API_URL = import.meta.env.VITE_NODE_BASE_URL;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessageContent = (msg) => {
    // If there's a file, render the file
    if (msg.file_url) {
      const isImage = /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(msg.file_url);
      const fileSrc = msg.file_url.startsWith("/") ? `${API_URL}${msg.file_url}` : msg.file_url;
      console.log("filesrc",fileSrc)

      if (isImage) {
        return (
          <img
            src={fileSrc}
            alt="uploaded"
            className="w-[200px] rounded-lg"
          />
        );
      } else {
        return (
          <a
            href={fileSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Download File
          </a>
        );
      }
    }

    // Otherwise render normal text (skip "Uploaded" placeholder)
    return msg.message && msg.message !== "Uploaded" ? msg.message : null;
  };

  return (
    <div className="h-[400px] flex flex-col gap-3 p-4 overflow-y-auto bg-gray-100">
      {messages.length === 0 && <p className="text-center text-gray-400 mt-5">No messages yet.</p>}

      {messages.map((msg, idx) => {
        const isOwn = msg.sender === userType;
        const alignment = isOwn ? "justify-end" : "justify-start";
        const bubbleColor = isOwn ? "bg-blue-500 text-white" : "bg-white text-gray-800";
        const bubbleTail = isOwn
          ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
          : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl";

        const content = renderMessageContent(msg);
        if (!content) return null; // Skip empty "Uploaded" messages

        return (
          <div key={idx} className={`flex ${alignment}`}>
            <div className={`max-w-[70%] px-4 py-2 shadow-sm break-words ${bubbleColor} ${bubbleTail}`}>
              <div className="whitespace-pre-wrap">{content}</div>
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
