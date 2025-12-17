import express from "express";
import {
  registerAgent,
  loginAgent,
  logoutAgent,
  getAgentProfile,
  forgotAgentPassword,
  resetAgentPassword,
  inviteAgents,getAgentsByChatbot,suspendAgent,restoreAgent,getSuspendedAgents,editAgentProfile,inviteAgentsAfterPayment
} from "../controllers/agentController.js";
import protect from "../middleware/agentAuth.js"; // Middleware to protect routes

const router = express.Router();

// Forgot password routes
router.post("/forgot-password", forgotAgentPassword);
router.post("/reset-password/:token", resetAgentPassword);

// Invite agent route
router.post("/invite", inviteAgents);

router.post("/invite-after-payment", inviteAgentsAfterPayment);


// Register agent route
router.post("/register", registerAgent);

// Login agent route
router.post('/', loginAgent);

// Get agent profile (protected)
router.get("/me", protect, getAgentProfile);

// Logout agent route
// router.post('/logout', verifyToken, logoutAgent);

router.get("/:chatbotId" , getAgentsByChatbot)

router.put("/suspend/:id", suspendAgent);

router.put("/restore/:id", restoreAgent);

router.get("/suspended/:chatbotId", getSuspendedAgents);

// Edit agent profile
router.put("/edit/:id", editAgentProfile);

export default router;
