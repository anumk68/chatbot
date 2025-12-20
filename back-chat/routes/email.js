import express from "express";
import { SendEmail } from "../controllers/email.js";

const router = express.Router();

// POST /api/send
router.post("/send", async (req, res) => {
  console.log("[EmailRoute] POST /send called");
  try {
    await SendEmail(req, res); // call your controller
  } catch (err) {
    console.error("[EmailRoute] Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
