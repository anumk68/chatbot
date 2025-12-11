import express from "express";
import {
  getCampaigns,
  createCampaign,
  updateCampaignStatus,
  duplicateCampaign,
  deleteCampaign
} from "../controllers/campaignController.js";

const router = express.Router();

// chatbot specific routes:
router.get("/:chatbotId", getCampaigns);
router.post("/", createCampaign);
router.put("/:chatbotId/:id/status", updateCampaignStatus);
router.post("/:chatbotId/:id/duplicate", duplicateCampaign);
router.delete("/:chatbotId/:id", deleteCampaign);

export default router;
