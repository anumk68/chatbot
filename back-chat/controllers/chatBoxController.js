import axios from "axios";

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

// Get chatbot colors
export const getChatboxColor = async (req, res) => {
  const { chatbotId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/${chatbotId}/chatbox/color`);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching chatbox colors:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch colors" });
  }
};

// Update chatbot colors
export const chatBoxColorUpdate = async (req, res) => {
  const { chatbotId } = req.params;
  const { primary_color, secondary_color, theme } = req.body;

  if (!primary_color || !secondary_color || !theme) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/${chatbotId}/chatbox/color/update`,
      {
        chatbot_id: chatbotId,
        primary_color,
        secondary_color,
        theme,
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error("Error updating chatbox colors:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to update colors" });
  }
};
