import React, { useState, useEffect } from "react";
import ChatIcon from "./ChatIcon";
import ChatDashboard from "./ChatDashboard";
import Form from "./Form";
import axios from "axios";

export default function ChatContainer({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [formEnabled, setFormEnabled] = useState(null);
  const [formData, setFormData] = useState(null);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api"; 
  const chatbotId = localStorage.getItem("chatbotId");

  // Load safe customer session
  useEffect(() => {
    const saved = localStorage.getItem("chat_customer");
    if (saved && saved !== "undefined" && saved !== "null") {
      const parsed = JSON.parse(saved);
      if (parsed?.temp_user_id) setCustomerData(parsed);
    }
  }, []);

  // Fetch prechat form
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(`${API_URL}/prechat/form/${chatbotId}`);

        if (res.data.success && res.data.form) {
          const enabled = res.data.form.status === "enabled";
          setFormEnabled(enabled);
          setFormData(res.data.form);

          const saved = localStorage.getItem("chat_customer");

          if (!saved && !enabled) {
            const temp = {
              chatbot_id: chatbotId,
              temp_user_id: "temp_" + Date.now(),
              name: "Guest",
              website_url: window.location.origin,
              responses: [],
            };
            localStorage.setItem("chat_customer", JSON.stringify(temp));
            setCustomerData(temp);
          }
        } else {
          setFormEnabled(false);
        }
      } catch (err) {
        console.error(err);
        setFormEnabled(false);
      }
    };

    fetchForm();
  }, [chatbotId]);

  const handleChatStart = (data) => {
    setCustomerData(data);
    localStorage.setItem("chat_customer", JSON.stringify(data));
  };

  const handleBack = () => {
    localStorage.removeItem("chat_customer");
    localStorage.removeItem("chat_messages");
    localStorage.removeItem("chat_conversation_id");
    setCustomerData(null);
  };

  if (formEnabled === null) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">

      {/* ICON always visible */}
      {!isOpen && <ChatIcon onClick={() => setIsOpen(true)} />}

      {/* POPUP */}
      {isOpen && (
        <div className="w-[360px] h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {!customerData && formEnabled ? (
            <Form
              preloadedForm={formData}
              onChatStart={handleChatStart}
              chatbotId={chatbotId}
            />
          ) : (
            <ChatDashboard
              customer={customerData}
              chatbotId={chatbotId}
              onClose={() => setIsOpen(false)}
              onBack={handleBack}
            />
          )}
        </div>
      )}
    </div>
  );
}
