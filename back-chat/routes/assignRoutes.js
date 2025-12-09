import express from "express";
import { getAssignedPairs, assignAgent, deleteAssigned,assignPairsbyId } from "../controllers/conversationController.js";

const router = express.Router();

router.get("/:chatbotId/assigned-pairs", getAssignedPairs);
router.post("/:chatbotId/assign-agent", assignAgent);
router.delete("/:chatbotId/delete-assigned/:id", deleteAssigned);

// get assignment pair by agent_id
router.get("/:chatbotId/assigned-pairs/:agentId", assignPairsbyId);


export default router;
