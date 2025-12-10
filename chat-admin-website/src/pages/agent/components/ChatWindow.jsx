  // ChatWindow.jsx - Fully Working Version
  import React, { useEffect, useRef, useState } from "react";
  import { File as FileIcon, X, Download } from "lucide-react";

  const ChatWindow = ({ activeConversation, messages, socket }) => {
    const bottomRef = useRef();
    const [customerStatus, setCustomerStatus] = useState("offline");

    // Fullscreen preview
    const [previewImage, setPreviewImage] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);

    const API_URL = import.meta.env.VITE_NODE_BASE_URL;

    // Scroll to bottom when messages update
    useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // CUSTOMER ONLINE / OFFLINE
    useEffect(() => {
      if (!socket || !activeConversation) return;

      const handleOnline = (data) => {
        if (data.temp_user_id === activeConversation.user_one_id) {
          setCustomerStatus("online");
        }
      };

      const handleOffline = (data) => {
        if (data.temp_user_id === activeConversation.user_one_id) {
          setCustomerStatus("offline");
        }
      };

      socket.on("customer_online", handleOnline);
      socket.on("customer_offline", handleOffline);

      return () => {
        socket.off("customer_online", handleOnline);
        socket.off("customer_offline", handleOffline);
      };
    }, [socket, activeConversation]);

    const formatTime = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    if (!activeConversation)
      return (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation
        </div>
      );

    return (
      <div className="flex-1 flex flex-col bg-gray-100 overflow-hidden">

        {/* Header */}
        <div className="p-4 border-b bg-white flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              {activeConversation.user_one}
            </h4>
            <p className="text-sm flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  customerStatus === "online" ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              {customerStatus === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar relative">
          {messages.map((msg, idx) => {
            const isAgent = msg.sender === "agent";
            const align = isAgent ? "justify-end" : "justify-start";
            const bubble =
              isAgent
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 border border-gray-200";

            const fullUrl = msg.file_url
              ? `${API_URL}${msg.file_url}`
              : null;

            const isImage =
              msg.file_url &&
              ["jpg", "jpeg", "png", "gif"].some((ext) =>
                fullUrl.toLowerCase().endsWith(ext)
              );

            return (
              <div key={idx} className={`flex ${align} animate-fadeIn`}>
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-2xl ${bubble} shadow transition-all duration-200 hover:scale-[1.01]`}
                >
                  {/* IMAGE */}
                  {isImage && (
                    <img
                      src={fullUrl}
                      className="rounded-lg mb-2 max-h-60 object-cover cursor-pointer hover:opacity-90 transition"
                      onClick={() => {
                        setPreviewImage(fullUrl);
                        setPreviewFile(msg.file_url);
                      }}
                    />
                  )}

                  {/* FILE (non-image) */}
                  {msg.file_url && !isImage && (
                    <div
                      className="cursor-pointer text-blue-600 underline flex items-center gap-1 mb-1 font-medium"
                      onClick={() => {
                        setPreviewImage(null);
                        setPreviewFile(msg.file_url);
                      }}
                    >
                      <FileIcon size={16} /> View File
                    </div>
                  )}

                  {/* MESSAGE */}
                  {msg.message && (
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                  )}

                  {/* TIME */}
                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isAgent ? "text-blue-200" : "text-gray-400"
                    }`}
                  >
                    {formatTime(msg.created_at)}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>

        {/* FULLSCREEN PREVIEW */}
        {(previewImage || previewFile) && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="relative flex flex-col items-center">

              {/* IMAGE */}
              {previewImage && (
                <img
                  src={previewImage}
                  className="max-w-[90vw] max-h-[85vh] rounded-lg shadow-lg"
                />
              )}

              {/* FILE ONLY */}
              {!previewImage && previewFile && (
                <div className="bg-white p-6 rounded-xl shadow-lg text-black text-center">
                  <FileIcon size={40} className="mx-auto mb-3" />
                  <p className="font-medium text-lg mb-3">Download File</p>
                </div>
              )}

              {/* DOWNLOAD BUTTON */}
              <a
                href={`${API_URL}/download?file=${previewFile}`}
                download
                className="mt-4 bg-white text-black px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-200"
              >
                <Download size={18} />
                Download
              </a>

              {/* CLOSE BUTTON */}
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setPreviewFile(null);
                }}
                className="absolute -top-3 -right-3 bg-white text-black p-2 rounded-full shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ChatWindow;
