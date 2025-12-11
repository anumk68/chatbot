// backend/routes/agentRoutes.js
import express from "express";
const router = express.Router();

import db from "../config/db.js";

// Example route
router.get("/chatbot/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT id AS id, name, status, chatbot_id , agent_id FROM users WHERE role='agent' AND chatbot_id=? AND status='active'",
      [chatbotId]
    );
    res.json({ success: true, agents: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


export default router;
