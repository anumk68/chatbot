import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import ChatList from "./components/ChatList.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import ChatInput from "./components/ChatInput.jsx";
import RightPanel from "./components/RightPanel.jsx";

import { fetchAgentInfo } from "../../../src/redux/auth/agentAuthSlice.js";

import agentSocket, {
  joinAgentRoom,
  joinConversation,
  onCustomerAssigned,
  onCustomerMessage,
} from "../../sockets/agentSocket.js";

import notifySound from "../../assets/notification.mp3";

const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

const AgentChats = () => {
  const dispatch = useDispatch();
  const agent = useSelector((state) => state.agent);
  const { agentId, chatbotId } = agent;
  console.log("AgentChats Rendered. AgentId:", agentId);

  const [ready, setReady] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const audioRef = useRef(null);

  // Load notification audio
  useEffect(() => {
    audioRef.current = new Audio(notifySound);
  }, []);

  // 1️⃣ Load Agent Info
  useEffect(() => {
    const storedChatbotId = chatbotId || localStorage.getItem("chatbotId");

    if (!agentId && storedChatbotId) {
      dispatch(fetchAgentInfo(storedChatbotId)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setReady(true);
        } else {
          toast.error("Failed to load agent info");
        }
      });
    } else if (agentId) {
      setReady(true);
    }
  }, [agentId, chatbotId, dispatch]);

  // 2️⃣ Join Agent Room
  useEffect(() => {
    if (agentId) {
      // join agent room so backend can target events to this agent
      joinAgentRoom(agentId);
      console.log("Agent asked to join agent room:", `agent_${agentId}`);
    }
  }, [agentId]);

  // listen assigned customer
  useEffect(() => {
    const unsub = onCustomerAssigned((data) => {
      console.log("New customer assigned (component):", data);
      // add to conversations
      setConversations((prev) => {
        // avoid duplicates
        if (prev.some((p) => p.conversation_id === data.conversation_id))
          return prev;
        return [
          ...prev,
          {
            conversation_id: data.conversation_id,
            temp_user_id: data.temp_user_id,
            user_one: data.customer_name || "Guest",
            customer_status: "online",
            last_message: "",
            chatbot_id: data.chatbot_id,
          },
        ];
      });

      // join conversation room (so agent receives messages in that room)
      joinConversation(data.conversation_id);
    });

    return () => unsub && unsub();
  }, []);

  // 4️⃣ Listen → Customer Messages
  useEffect(() => {
    const unsub = onCustomerMessage((msg) => {
      console.log("Customer message:", msg);

      if (
        activeConversation &&
        msg.conversation_id === activeConversation.conversation_id
      ) {
        setMessages((prev) => [...prev, msg]);
        audioRef.current.play();
      }
    });

    return () => unsub && unsub();
  }, [activeConversation]);

  // 5️⃣ Fetch Assigned Customers (When agent logs in)
  useEffect(() => {
    const fetchAssigned = async () => {
      if (!agentId) return;

      try {
        const res = await axios.get(
          `${API_URL}/assigned/${chatbotId}/assigned-pairs/${agentId}`
        );

        if (res.data.success) {
          const updated = res.data.data.map((item) => ({
            conversation_id: item.conversation_id,
            temp_user_id: item.temp_user_id,
            user_one: item.customer_name,
            customer_status: "online",
            last_message: "",
            chatbot_id: item.chatbot_id,
          }));

          setConversations(updated);
        }
      } catch (err) {
        console.error("Fetch assigned error:", err);
      }
    };

    fetchAssigned();
  }, [agentId, chatbotId]);

  // 6️⃣ Fetch Messages for Selected Conversation
  const fetchMessages = async (conversation_id) => {
    try {
      const res = await axios.get(`${API_URL}/messages/${conversation_id}`);
      if (res.data.success) {
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      toast.error("Failed to load messages");
    }
  };

  // 7️⃣ Sending Agent Message
  const handleSend = async (text, file = null) => {
    if (!activeConversation) return;

    const formData = new FormData();
    formData.append("chatbot_id", chatbotId);
    formData.append("conversation_id", activeConversation.conversation_id);
    formData.append("temp_user_id", activeConversation.temp_user_id);
    formData.append("agent_id", agentId);
    formData.append("sender", "agent");
    formData.append("message", text || "");
    if (file) formData.append("file", file);

    try {
      const res = await axios.post(`${API_URL}/agent/save_message`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const msg = {
          ...res.data.data,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, msg]);
      }
    } catch (err) {
      toast.error("Message sending failed");
    }
  };

  if (!ready) return <div>Loading agent info...</div>;

  return (
    <section className="flex h-full bg-white text-gray-800">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* LEFT: Chat List */}
      <ChatList
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={(conv) => {
          setActiveConversation(conv);
          fetchMessages(conv.conversation_id);
        }}
      />

      {/* CENTER: Chat Window */}
      <div className="flex flex-col flex-1 border-x border-gray-200">
        {activeConversation ? (
          <>
            <ChatWindow
              activeConversation={activeConversation}
              messages={messages}
            />
            <ChatInput handleSend={handleSend} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-500">
            Select a chat to start conversation
          </div>
        )}
      </div>

      {/* RIGHT: Customer Info */}
      <RightPanel activeConversation={activeConversation} />
    </section>
  );
};

export default AgentChats;
