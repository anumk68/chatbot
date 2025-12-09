import { useEffect, useState, useRef } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Form from "./Form";
import AutoBotReplies from "./AutoBotReplies";
import ChatHeader from "./ChatHeader.jsx";

import {
  emitCustomerDisconnect,
  onAgentSendMessage,
  joinConversation,
} from "../sockets/customerSocket.js";

const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

const ChatDashboard = ({ onClose, chatbotId: propChatbotId }) => {
  const chatbotId = propChatbotId || localStorage.getItem("chatbotId");

  const [customer, setCustomer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const bottomRef = useRef(null);

  /* --------------------------------------------
    AUTO SCROLL
  ---------------------------------------------*/
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* --------------------------------------------
    CHECK EXISTING CUSTOMER
  ---------------------------------------------*/
  useEffect(() => {
    const tempUserId = localStorage.getItem("tempUserId");
    if (!tempUserId) {
      setLoading(false);
      return;
    }

    const loadExisting = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/customer/check/${chatbotId}/${tempUserId}`
        );

        if (res.data.success && res.data.hasConversation) {
          const savedCustomer = res.data.customerData;

          setCustomer(savedCustomer);
          setConversationId(savedCustomer.conversation_id);
          setMessages(res.data.conversation || []);
          setIsFormOpen(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadExisting();
  }, [chatbotId]);

  /* --------------------------------------------
    JOIN SOCKET ROOM - FIXED!!!
  ---------------------------------------------*/
  useEffect(() => {
    if (!conversationId) return;

    console.log("Joining conversation room:", conversationId);

    joinConversation(conversationId);
  }, [conversationId]);

  /* --------------------------------------------
    LISTEN → AGENT MESSAGE
  ---------------------------------------------*/
  useEffect(() => {
    const unsubscribe = onAgentSendMessage((msg) => {
      console.log("Agent message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  /* --------------------------------------------
    SEND CUSTOMER MESSAGE
  ---------------------------------------------*/
  const handleSendMessage = async (text, file = null) => {
    if (!customer) return;

    const formData = new FormData();
    formData.append("chatbot_id", chatbotId);
    formData.append("conversation_id", conversationId);
    formData.append("sender", "customer");
    formData.append("temp_user_id", customer.temp_user_id);
    formData.append("message", text || "");
    if (file) formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/save_message`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessages((prev) => [...prev, res.data.data]);
      }
    } catch (err) {
      console.error("Sending failed:", err);
    }
  };

  /* --------------------------------------------
    TAB CLOSE / DISCONNECT
  ---------------------------------------------*/
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!customer) return;

      // update offline status
      navigator.sendBeacon(
        `${API_URL}/customers/${customer.temp_user_id}/disconnect`
      );

      emitCustomerDisconnect(customer.temp_user_id);

      if (isFormOpen) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [customer, isFormOpen]);

  /* --------------------------------------------
    CLOSE CHAT BUTTON
  ---------------------------------------------*/
  const handleCloseChat = async () => {
    if (isFormOpen && !window.confirm("You haven't started the chat yet, close?"))
      return;

    if (customer) {
      await fetch(`${API_URL}/customers/${customer.temp_user_id}/disconnect`, {
        method: "POST",
      });

      emitCustomerDisconnect(customer.temp_user_id);
    }

    localStorage.removeItem("chat_customer");
    setCustomer(null);
    setMessages([]);
    setConversationId(null);

    onClose?.();
  };

    // UI RENDER 
  if (loading) return <div>Loading chat...</div>;

  const isNewCustomer = !customer;

  return (
    <div className="w-[350px]  min-h-[500px] absolute bottom-[15%] right-0 flex flex-col bg-white text-black rounded-[20px] shadow-2xl overflow-hidden">
      <ChatHeader onClose={handleCloseChat} />

      <div className="flex-1 overflow-y-auto h-full">
        {isNewCustomer ? (
          <Form
            chatbotId={chatbotId}
            onChatStart={(newMessages, newCustomer) => {
              setCustomer(newCustomer);
              setConversationId(newCustomer.conversation_id);
              setMessages(newMessages);
              setIsFormOpen(false);
            }}
          />
        ) : (
          <>
            <MessageList messages={messages} userType="customer" />
            <div ref={bottomRef} />
            <AutoBotReplies
              onSendBotMessage={(msg) =>
                setMessages((prev) => [...prev, msg])
              }
            />
          </>
        )}
      </div>

      {!isNewCustomer && customer && (
        <MessageInput
          onSend={handleSendMessage}
          user={customer}
          conversationId={conversationId}
          chatbotId={chatbotId}
        />
      )}
    </div>
  );
};

export default ChatDashboard;
