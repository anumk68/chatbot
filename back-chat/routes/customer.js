// routes/customer.js
import express from "express";
const router = express.Router();

// No DB, just a placeholder if needed
router.get("/check/:chatbotId/:tempUserId", (req, res) => {
  // Not needed anymore because online customers tracked via socket
  res.json({ success: false, message: "Use Socket.IO for real-time data" });
});

export default router;
