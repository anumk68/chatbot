import express from "express";
import {
  CustomersaveMessage,
  getMessages,
  getAllMessages,
  AgentsaveMessage,
} from "../controllers/messageController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // memory storage

router.post("/save_message", upload.single("file"), CustomersaveMessage);
router.post("/agent/save_message", upload.single("file"), AgentsaveMessage);
router.get("/messages/:conversation_id", getMessages);


// fetch messages by temp_user_id
router.get("/messages/customer/:temp_user_id", getAllMessages);

export default router;
