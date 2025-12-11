import db from "../config/db.js";
import CampaignModel from "../models/campaignModel.js";

export const getCampaigns = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const campaigns = await CampaignModel.getAll(db, chatbotId);
    res.json({ success: true, campaigns });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCampaign = async (req, res) => {
  try {
    await CampaignModel.create(db, req.body);
    res.json({ success: true, message: "Campaign created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCampaignStatus = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const { status } = req.body;

    await CampaignModel.updateStatus(db, req.params.id, status, chatbotId);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const duplicateCampaign = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    await CampaignModel.duplicate(db, req.params.id, chatbotId);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    await CampaignModel.delete(db, req.params.id, chatbotId);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
