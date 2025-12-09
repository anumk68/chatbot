import express from "express";
import {
  registerAgent,
  loginAgent,
  logoutAgent,
  getAgentProfile,
  forgotAgentPassword,
  resetAgentPassword,
  inviteAgents,getAgentsByChatbot,suspendAgent,restoreAgent,getSuspendedAgents,editAgentProfile
} from "../controllers/agentController.js";
import protect from "../middleware/agentAuth.js"; // Middleware to protect routes

const router = express.Router();

// Get agent info by some identifier (like email, token, or user_id from session)
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await db.query(
//       "SELECT id, name FROM users WHERE id=? AND role='agent'",
//       [id]
//     );
//     if (rows.length === 0)
//       return res
//         .status(404)
//         .json({ success: false, message: "Agent not found" });
//     res.json({ success: true, agent: rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Database error" });
//   }
// });

// Forgot password routes
router.post("/forgot-password", forgotAgentPassword);
router.post("/reset-password/:token", resetAgentPassword);

// Invite agent route
router.post("/invite", inviteAgents);

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
