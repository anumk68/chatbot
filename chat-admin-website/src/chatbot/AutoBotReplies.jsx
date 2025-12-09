import { useEffect, useRef } from "react";

const AutoBotReplies = ({ onSendBotMessage, trigger }) => {
  const hasReplied = useRef(false);

  useEffect(() => {
    if (!trigger || hasReplied.current) return;
    hasReplied.current = true;

    const botReplies = [
      "Hi there! 👋",
      "Welcome to Digirush Support.",
      "How can I help you today?",
      "Are you looking for pricing info or technical help?",
      "Please select one below 👇",
    ];

    botReplies.forEach((msg, index) => {
      setTimeout(() => {
        onSendBotMessage({
          message: msg,
          sender: "bot",
          created_at: new Date().toISOString(),
        });
      }, (index + 1) * 1500);
    });
  }, [trigger, onSendBotMessage]);

  return null;
};

export default AutoBotReplies;
