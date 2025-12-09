import axios from "axios";

// 🔹 Base URL of your Node.js backend
const BASE_URL = import.meta.env.VITE_NODE_BASE_URL ;

/**
 * 1️⃣ Get all conversations assigned to a specific agent
 * Example: GET /api/conversations/agent/:agentId
 */
export const getConversations = async (agentId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/conversations/agent/${agentId}`);
    return res.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 2️⃣ Get all messages of a conversation
 * Example: GET /api/messages/:conversationId
 */
export const getMessages = async (conversationId) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/messages/${conversationId}`);
    return res.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 3️⃣ Create a new conversation
 * Example: POST /api/conversations/start
 */
export const createConversation = async (customer_id, agent_id) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/conversations/start`, {
      customer_id,
      agent_id,
    });
    return res.data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 4️⃣ Send a new message inside a conversation
 * Supports text or file
 * Example: POST /api/messages/send
 */
export const sendMessage = async (
  conversation_id,
  message,
  sender_id,
  sender_type,
  file = null
) => {
  try {
    const formData = new FormData();
    formData.append("conversation_id", conversation_id);
    formData.append("message", message);
    formData.append("sender_id", sender_id);
    formData.append("sender_type", sender_type);

    if (file) formData.append("file", file);

    const res = await axios.post(`${BASE_URL}/api/messages/send`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
