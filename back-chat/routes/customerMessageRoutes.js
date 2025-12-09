import express from "express";
import {
  saveCustomerData,
  CustomerDisconnect,
  getOnlineCustomers,
  agentDisconnect
} from "../controllers/customerMessageController.js";

const router = express.Router();

// Save customer pre-chat data
router.post("/:chatbotId/customer-data", saveCustomerData);

// customer disconnect
router.post("/customers/:temp_user_id/disconnect", CustomerDisconnect);
router.post("/agent/:agent_id/disconnect", agentDisconnect);

// Get online customers
router.get("/:chatbotId/online-customers", getOnlineCustomers);

export default router;
