import express from "express";
import {
  getChatboxColor,
  chatBoxColorUpdate,
} from "../controllers/chatBoxController.js";

const router = express.Router();

router.get("/:chatbotId/chatbox/color", getChatboxColor);
router.post("/:chatbotId/chatbox/color/update", chatBoxColorUpdate);

export default router;
