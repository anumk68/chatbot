import express from "express";
import { createGroup,getGroupsByChatbot } from "../controllers/groupController.js";

const router = express.Router();

router.post("/create/:chatbotId", createGroup);

router.get("/groups/:chatbotId", getGroupsByChatbot);

export default router;
