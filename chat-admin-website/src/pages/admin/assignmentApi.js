import axios from "axios";
const API_BASE = import.meta.env.VITE_NODE_BASE_URL + "/api/assigned";

// Fetch all assigned pairs for chatbot
export const fetchAssignedPairs = async (chatbotId) => {
  try {
    const res = await axios.get(`${API_BASE}/${chatbotId}/assigned-pairs`);
    return res.data;
  } catch (err) {
    console.error("[ERROR] fetchAssignedPairs:", err);
    return { success: false, data: [] };
  }
};

// Assign agent to customer
export const assignAgentToCustomer = async (chatbotId, payload) => {
  try {
    const res = await axios.post(
      `${API_BASE}/${chatbotId}/assign-agent`,
      payload
    );
    return res.data;
  } catch (err) {
    console.error("[ERROR] assignAgentToCustomer:", err);
    return { success: false };
  }
};

// Delete assigned pair
export const deleteAssignedPair = async (chatbotId, conversationId) => {
  try {
    const res = await axios.delete(
      `${API_BASE}/${chatbotId}/delete-assigned/${conversationId}`
    );
    return res.data;
  } catch (err) {
    console.error("[ERROR] deleteAssignedPair:", err);
    return { success: false };
  }
};
