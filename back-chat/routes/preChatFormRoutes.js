import express from "express";
import { getPreChatForm, togglePreChatStatus, savePreChatForm,getPreChatFormStatus } from "../controllers/preChatFormController.js";

const router = express.Router();

router.get("/prechat/form/:chatbotId", getPreChatForm);
router.post("/prechat/form/:chatbotId/save", savePreChatForm);
router.post("/prechat/form/:chatbotId/status", togglePreChatStatus);

//get toggle status
router.get("/prechat/form/:chatbotId/status", getPreChatFormStatus);

export default router;

