// back-chat/controllers/groupController.js
import db  from "../config/db.js";

// Create a group
export const createGroup = async (req, res) => {
  try {
    let { group_name, chatbot_id, members = [] } = req.body;

    if (!group_name || !chatbot_id) {
      return res.status(400).json({ message: "Group name & chatbot_id required" });
    }

    // If no members provided, insert NULL
    if (members.length === 0) members = [null];

    const values = members.map(agentId => [group_name, chatbot_id, agentId]);

    const [result] = await db.query(
      "INSERT INTO groups (group_name, chatbot_id, agent_id) VALUES ?",
      [values]
    );

    res.json({ success: true, message: "Group created successfully", insertedRows: result.affectedRows });
  } catch (err) {
    console.error("[ERROR] createGroup:", err);
    res.status(500).json({ message: "Failed to create group", error: err.message });
  }
};

// Get groups by chatbotId
export const getGroupsByChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId) return res.status(400).json({ message: "chatbotId required" });

    const [rows] = await db.query(
      "SELECT * FROM groups WHERE chatbot_id = ? ORDER BY created_at DESC",
      [chatbotId]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("[ERROR] getGroupsByChatbot:", err);
    res.status(500).json({ message: "Failed to fetch groups", error: err.message });
  }
};
