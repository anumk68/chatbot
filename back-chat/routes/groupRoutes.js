import express from "express";
import multer from "multer";
import {
  createGroup,
  getGroupsByChatbot,
  getGroupMessages,
  getGroupMembers,
  sendOwnerMessage,
  sendAgentMessage,
} from "../controllers/groupController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Groups
router.post("/create/:chatbotId", createGroup);
router.get("/groups/:chatbotId", getGroupsByChatbot);
router.get("/group-members/:chatbotId", getGroupMembers);

// Messages
router.get("/messages/:groupId/:chatbot_id", getGroupMessages);

// Owner messages
router.post(
  "/messages/owner/:groupId/:chatbotId",
  verifyToken, 
  upload.single("image"),
  sendOwnerMessage
);

// Agent messages
router.post(
  "/messages/agent/:groupId/:chatbotId",
  verifyToken, 
  upload.single("image"),
  sendAgentMessage
);

export default router;
