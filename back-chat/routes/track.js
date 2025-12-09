import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, page, chatbot_id, meta } = req.body;

  try {
    await db.query(
      "INSERT INTO events (type, page, chatbot_id, meta) VALUES (?, ?, ?, ?)",
      [type, page, chatbot_id, JSON.stringify(meta || null)]
    );

    res.json({ success: true });
  } catch (error) {
    console.log("TRACK ERROR:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
