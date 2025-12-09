import { useSearchParams } from "react-router-dom";
import { useState } from "react";

import ChatIcon from "../chatbot/ChatIcon.jsx";
import ChatDashboard from "../chatbot/ChatDashboard.jsx";

export default function WidgetApp() {
  const [params] = useSearchParams();
  const chatbotId =new URLSearchParams(window.location.search).get("chatbot_id");

  const [showChat, setShowChat] = useState(true); // iframe me icon ki need nahi

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {showChat && (
        <ChatDashboard
          chatbotId={chatbotId}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}

