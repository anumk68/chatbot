import React, { useEffect, useState, useRef } from "react";
import { Search, MessageSquare, ChevronLeft } from "lucide-react";
import axios from "axios";

export default function AllMessages() {
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);

  const messagesEndRef = useRef(null);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";
  const chatbotId = localStorage.getItem("chatbotId");

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Fetch assigned
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/assigned/${chatbotId}/assigned-pairs`
        );
        setMessages(res.data.data || []);
      } catch (e) {
        console.log(e);
      }
    };
    getAll();
  }, [chatbotId]);

  // Fetch chat
  const openChat = async (conversationId) => {
    setActiveChat(conversationId);
    setLoadingChat(true);
    setChatHistory([]);

    try {
      const res = await axios.get(`${API_URL}/messages/${conversationId}`);
      setChatHistory(res.data.messages || []);
    } catch (err) {
      console.log(err);
    }
    setLoadingChat(false);
  };

  const filteredMessages = messages.filter((msg) =>
    msg.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex md:flex-row flex-col bg-gray-50">
  {/* LEFT SIDEBAR */}
  <div
    className={`md:w-1/3 w-full h-full md:h-auto bg-white border-r shadow-2xl flex flex-col transition-transform duration-300 ${
      activeChat ? "translate-x-[-100%] md:translate-x-0" : "translate-x-0"
    }`}
  >
    {/* Header */}
    <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
      <h1 className="text-xl md:text-xl font-bold flex items-center gap-2">
        <MessageSquare size={20} /> Conversations
      </h1>
    </div>

    {/* Search Box */}
    <div className="p-3">
      <div className="relative">
        <Search
          size={16}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2 rounded-xl border bg-gray-100 shadow focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>

    {/* Conversation List */}
    <div className="flex-1 h-full overflow-y-auto custom-scroll">
      {filteredMessages.map((msg) => (
        <div
          key={msg.conversation_id}
          onClick={() => openChat(msg.conversation_id)}
          className={`flex items-center gap-3 px-4 py-4 cursor-pointer transition-all duration-200 rounded-xl ${
            activeChat === msg.conversation_id
              ? "bg-gradient-to-r from-blue-100 to-purple-100 shadow-inner border-l-4 border-blue-600"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="h-12 w-12 bg-blue-600 text-white text-lg font-bold rounded-full flex items-center justify-center shadow">
            {msg.customer_name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-semibold text-sm md:text-base truncate">
              {msg.customer_name}
            </h3>
            <p className="text-gray-500 text-xs md:text-sm truncate">
              Assigned to: {msg.agent_name}
            </p>
          </div>
        </div>
      ))}
      {filteredMessages.length === 0 && (
        <div className="p-6 text-center text-gray-400">No conversation found</div>
      )}
    </div>
  </div>

  {/* RIGHT CHAT PANEL */}
  <div className="md:w-2/3 w-full h-full flex flex-col">
    {!activeChat ? (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-lg md:text-xl">
        Select a conversation
      </div>
    ) : (
      <>
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex items-center justify-between shadow-md">
          <button
            className="md:hidden p-2 cursor-pointer hover:bg-gray-200 rounded-md transition"
            onClick={() => setActiveChat(null)}
          >
            <ChevronLeft size={22} />
          </button>
          <h2 className="text-lg md:text-xl uppercase truncate font-semibold text-gray-800">
            {messages.find((m) => m.conversation_id === activeChat)?.customer_name}
          </h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50 custom-scroll">
          {loadingChat ? (
            <div className="text-center text-gray-400 py-4 animate-pulse">
              Loading chat...
            </div>
          ) : (
            chatHistory.map((chat, index) => {
              const isAgent = chat.sender_type === "agent";
              return (
                <div
                  key={index}
                  className={`flex w-full ${isAgent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm border transition ${
                      isAgent
                        ? "bg-blue-600 text-white border-blue-500 rounded-br-none"
                        : "bg-gray-200 text-gray-900 border-gray-300 rounded-bl-none"
                    }`}
                  >
                    <p className={`text-xs font-semibold ${isAgent ? "text-blue-100" : "text-gray-600"} mb-1`}>
                      {chat.sender}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                    <p className={`text-[10px] mt-2 text-right ${isAgent ? "text-blue-100" : "text-gray-500"}`}>
                      {new Date(chat.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Message Input */}
        <div className="p-3 md:p-4 bg-white border-t flex gap-2 md:gap-3">
          <input
            type="text"
            disabled
            placeholder="Admin cannot send messages"
            className="flex-1 p-3 rounded-full bg-gray-100 border text-gray-500 text-sm md:text-base"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full opacity-50 cursor-not-allowed text-sm md:text-base">
            Send
          </button>
        </div>
      </>
    )}
  </div>
</div>

  );
}
