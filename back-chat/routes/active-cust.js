import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET /api/customers/active/:chatbotId
router.get("/active/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;

  if (!chatbotId) {
    return res
      .status(400)
      .json({ success: false, message: "chatbotId required" });
  }

  try {
    // Use actual status saved by socket = 'online'
    const [rows] = await db.query(
      `SELECT temp_user_id AS id, name, status
       FROM online_customers
       WHERE chatbot_id = ? AND status = 'online'`,
      [chatbotId]
    );

    res.json({ success: true, customers: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "DB error" });
  }
});


export default router;
