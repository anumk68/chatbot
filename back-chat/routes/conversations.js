// backend/routes/conversations.js
import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/agent/:agent_id", async (req, res) => {
  const { agent_id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT 
         CONCAT(temp_user_id, '_', agent_id) AS conversation_id,
         temp_user_id,
         agent_id,
         customer_name,
         chatbot_id
       FROM assigned_customers
       WHERE agent_id=?`,
      [agent_id]
    );

    // If no rows, send empty array
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

export default router;
