import React, { useState, useEffect } from "react";
import Form from "./Form";
import ChatDashboard from "./ChatDashboard";
import "./App.css";
import ChatIcon from "./ChatIcon";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [chatStarted, setChatStarted] = useState(true);
  const [chatData, setChatData] = useState(null);

  const chatbotId =
    window?.DigiChatConfig?.chatbot_id ||
    localStorage.getItem("chatbotId") ||
    null;

  useEffect(() => {
    const saved = localStorage.getItem("chat_customer");
    if (saved) {
      setChatData(JSON.parse(saved));
      setChatStarted(true);
    }
  }, []);

  const animation = {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 40, scale: 0.9 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <ChatIcon />

      <AnimatePresence mode="wait">
        {!chatStarted ? (
          <motion.div
            key="form"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={animation.transition}
          >
            <Form
              chatbotId={chatbotId}
              onChatStart={(messages, customerData) => {
                setChatData(customerData);
                setChatStarted(true);
                localStorage.setItem(
                  "chat_customer",
                  JSON.stringify(customerData)
                );
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={animation.transition}
          >
            <ChatDashboard
              chatbotId={chatbotId}
              chatData={chatData}
              onClose={() => {
                setChatStarted(false);
                setChatData(null);
                localStorage.removeItem("chat_customer");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
