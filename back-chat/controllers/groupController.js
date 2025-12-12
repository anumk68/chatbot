// back-chat/controllers/groupController.js
import db from "../config/db.js";

// Create a group with debugging
export const createGroup = async (req, res) => {
  try {
    // Destructure request body
    const { group_name, chatbot_id, members = [] } = req.body;
    console.log("[DEBUG] req.body:", req.body);


    // Debug: log incoming data
    console.log("[DEBUG] Incoming data:", { group_name, chatbot_id, members });

    if (!group_name || !chatbot_id) {
      console.log("[DEBUG] Missing group_name or chatbot_id");
      return res.status(400).json({ message: "Group name & chatbot_id required" });
    }

    // Convert members array to comma-separated string
    const memberNames = members.length > 0 ? members.join(", ") : null;

    // Debug: log member names string
    console.log("[DEBUG] Member Names String:", memberNames);

    // Insert into DB
    const [result] = await db.query(
      "INSERT INTO groups (group_name, chatbot_id, member_names) VALUES (?, ?, ?)",
      [group_name, chatbot_id, memberNames]
    );

    // Debug: log result from DB
    console.log("[DEBUG] Insert Result:", result);

    res.json({
      success: true,
      message: "Group created successfully",
      insertedId: result.insertId
    });
  } catch (err) {
    console.error("[ERROR] createGroup:", err);
    res.status(500).json({ message: "Failed to create group", error: err.message });
  }
};

// Get groups by chatbotId with total_members calculation
export const getGroupsByChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId) return res.status(400).json({ message: "chatbotId required" });

    const [rows] = await db.query(
      `SELECT 
          id AS group_id,
          group_name,
          chatbot_id,
          member_names,
          IF(member_names IS NULL OR member_names = '', 0, LENGTH(member_names) - LENGTH(REPLACE(member_names, ',', '')) + 1) AS total_members
       FROM groups
       WHERE chatbot_id = ?
       ORDER BY created_at DESC`,
      [chatbotId]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("[ERROR] getGroupsByChatbot:", err);
    res.status(500).json({ message: "Failed to fetch groups", error: err.message });
  }
};
