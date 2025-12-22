import express from "express";
import multer from "multer";
import {
  createGroup,
  getGroupsByChatbot,
  getGroupMessages,
  getGroupMembers,
  sendOwnerMessage,
  sendAgentMessage,
  deleteGroup,
  editGroupName,
  editownerMessage,
  deleteOwnerMessage,
  sendVoiceMessage,
} from "../controllers/groupController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for image uploads
const imageUpload = multer({ dest: "uploads/" });

// Multer setup for audio uploads
const audioUpload = multer({ dest: "uploads/" });

/* ================= GROUPS ================= */
router.post("/create/:chatbotId", verifyToken, createGroup);
router.get("/groups/:chatbotId", getGroupsByChatbot);
router.get("/group-members/:groupId/:chatbotId", getGroupMembers);
router.delete("/delete/:groupId/:chatbotId", verifyToken, deleteGroup);
router.put("/groups/:groupId/:chatbotId", verifyToken, editGroupName);

/* ================= MESSAGES ================= */
router.get("/messages/:groupId/:chatbot_id", getGroupMessages);

/* Owner messages */
router.post(
  "/messages/owner/:groupId/:chatbotId",
  verifyToken,
  imageUpload.single("image"),
  sendOwnerMessage
);
router.put(
  "/messages/owner/:messageId",
  verifyToken,
  imageUpload.single("image"),
  editownerMessage
);
router.delete("/messages/owner/:messageId", verifyToken, deleteOwnerMessage);

/* Agent messages */
router.post(
  "/messages/agent/:groupId/:chatbotId",
  verifyToken,
  imageUpload.single("image"),
  sendAgentMessage
);

/* Voice messages */
router.post(
  "/messages/voice/:groupId/:chatbotId",
  verifyToken,
  audioUpload.single("audio"),
  sendVoiceMessage
);

export default router;
