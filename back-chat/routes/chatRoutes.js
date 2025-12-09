import express from "express";
import { saveCustomerForm } from "../controllers/chatController.js";

const router = express.Router();

// POST customer pre-chat submission
router.post("/chat/save-customer", saveCustomerForm);

export default router;
