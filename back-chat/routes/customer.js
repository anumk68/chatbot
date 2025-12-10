// routes/customer.js
import express from "express";
const router = express.Router();

// No DB, just a placeholder if needed
router.get("/check/:chatbotId/:tempUserId", (req, res) => {
  // Not needed anymore because online customers tracked via socket
  res.json({ success: false, message: "Use Socket.IO for real-time data" });
});

// all customers of chatbot
router.get("/customers/all/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT temp_user_id, name, email, phone, created_at 
       FROM customers 
       WHERE chatbot_id = ? 
       ORDER BY created_at DESC`,
      [chatbotId]
    );

    return res.json({
      success: true,
      customers: rows,
    });
  } catch (err) {
    console.error("Customer fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
