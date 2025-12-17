// AllMessages.jsx
import React, { useEffect, useState, useRef } from "react";
import { Search, MessageSquare, ChevronLeft } from "lucide-react";
import axios from "axios";

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 7;

  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";
  const chatbotId = localStorage.getItem("chatbotId");

  // Auto scroll to bottom on chat update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Fetch assigned conversations
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/assigned/${chatbotId}/assigned-pairs`
        );
        const sortedConversations = (res.data.data || []).sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setMessages(sortedConversations);
      } catch (e) {
        console.log(e);
      }
    };
    getAll();
  }, [chatbotId]);

  // Fetch chat messages for selected conversation
  const openChat = async (conversationId) => {
    setActiveChat(conversationId);
    setLoadingChat(true);
    setChatHistory([]);

    try {
      const res = await axios.get(`${API_URL}/messages/${conversationId}`);
      const sortedMessages = (res.data.messages || []).sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setChatHistory(sortedMessages);
    } catch (err) {
      console.log(err);
    }
    setLoadingChat(false);
  };

  // Filter and sort messages for sidebar
  const filteredMessages = messages
    .filter((msg) =>
      msg.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);

  const activeUser = messages.find((m) => m.conversation_id === activeChat);

  return (
    <div className="w-full h-full flex md:flex-row flex-col bg-gray-50">
      {/* ===== SIDEBAR (WhatsApp-style list) ===== */}
      <div
        className={`w-full md:w-1/3 h-full bg-white border-r shadow-2xl flex flex-col transition-transform duration-300 ${
          activeChat ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        }`}
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md flex items-center gap-2">
          <MessageSquare size={20} />
          <h1 className="text-lg font-bold">Chats</h1>
        </div>

        <div className="p-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search or start new chat"
              className="w-full pl-10 pr-4 py-2 rounded-xl border bg-gray-100 shadow focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scroll">
          {currentMessages.map((msg) => (
            <div
              key={msg.conversation_id}
              onClick={() => openChat(msg.conversation_id)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${
                activeChat === msg.conversation_id
                  ? "bg-gradient-to-r from-blue-100 to-purple-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="h-12 w-12 bg-blue-600 text-white text-lg font-bold rounded-full flex items-center justify-center">
                {msg.customer_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm truncate capitalize">
                    {msg.customer_name}
                  </h3>
                  <span className="text-[10px] text-gray-400">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  Assigned to: {msg.agent_name}
                </p>
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="p-6 text-center text-gray-400">
              No conversation found
            </div>
          )}
        </div>

        {filteredMessages.length > messagesPerPage && (
          <div className="flex justify-between items-center p-3 border-t">
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* ===== CHAT AREA (WhatsApp-style) ===== */}
      <div className="md:w-2/3 w-full h-full flex flex-col">
        {!activeChat ? (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
            Select a conversation
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 bg-white border-b flex items-center gap-3 shadow-md">
              <button
                className="md:hidden p-2 hover:bg-gray-200 rounded"
                onClick={() => setActiveChat(null)}
              >
                <ChevronLeft size={22} />
              </button>
              <div className="h-10 w-10 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center">
                {activeUser?.customer_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold truncate capitalize ">
                  {activeUser?.customer_name}
                </h2>
                <p className="text-xs text-gray-500">Assigned chat</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 custom-scroll">
              {loadingChat ? (
                <div className="text-center text-gray-400 animate-pulse">
                  Loading chat...
                </div>
              ) : (
                chatHistory.map((chat, index) => {
                  const isAgent = chat.sender_type?.toLowerCase() === "agent";

                  return (
                    <div
                      key={index}
                      className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-2xl shadow border relative ${
                          isAgent
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        <p className={`text-[11px] font-semibold mb-1 capitalize ${
                          isAgent ? "text-white/90" : "text-gray-600"
                        }`}>
                          {chat.sender}
                        </p>
                        <p className="text-sm whitespace-pre-wrap pr-8">
                          {chat.message}
                        </p>
                        <span
                          className={`absolute bottom-1 right-2 text-[10px] ${
                            isAgent ? "text-blue-200" : "text-gray-500"
                          }`}
                        >
                          {new Date(chat.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input (disabled – admin) */}
            <div className="p-3 bg-white border-t flex gap-2">
              <input
                type="text"
                disabled
                placeholder="Admin cannot send messages"
                className="flex-1 p-3 rounded-full bg-gray-100 border text-gray-500 text-sm"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full opacity-50 cursor-not-allowed">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
