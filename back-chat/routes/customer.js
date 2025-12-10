// routes/customer.js
import express from "express";
import db from "../config/db.js";

const router = express.Router();

// No DB, just a placeholder if needed
router.get("/check/:chatbotId/:tempUserId", (req, res) => {
  // Not needed anymore because online customers tracked via socket
  res.json({ success: false, message: "Use Socket.IO for real-time data" });
});

// all customers of chatbot
router.get("/customers/all/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT * FROM customers WHERE chatbot_id = ? ORDER BY created_at DESC`,
      [chatbotId]
    );

    const customers = rows.map((c) => {
      let name = c.name || "";
      let email = c.email || "";
      let phone = c.phone || "";

      // Parse custom_json safely
      let json = {};
      try {
        json = c.custom_json ? JSON.parse(c.custom_json) : {};
      } catch (e) {
        json = {};
      }

      // Extract values
      Object.values(json).forEach((value) => {
        if (!value) return;

        value = String(value).trim();

        // If value is email
        if (value.includes("@")) {
          email = value;
        }
        // If value is only digits → phone
        else if (/^[0-9]{7,15}$/.test(value)) {
          phone = value;
        }
        // If it is text → name
        else {
          name = value;
        }
      });

      // If still empty → show N/A
      if (!name) name = "N/A";
      if (!email) email = "N/A";
      if (!phone) phone = "N/A";

      return {
        ...c,
        name,
        email,
        phone,
      };
    });

    return res.json({ success: true, customers });

  } catch (err) {
    console.error("Customer fetch error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET website URLs where chatbot is embedded
router.get("/websites/:chatbotId", async (req, res) => {
  const { chatbotId } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT website_url, MIN(created_at) as first_seen
      FROM customers
      WHERE chatbot_id = ?
      AND website_url IS NOT NULL
      AND website_url != ''
      GROUP BY website_url
      ORDER BY first_seen DESC
      `,
      [chatbotId]
    );

    const websites = rows.map((row, index) => ({
      id: index + 1,
      url: row.website_url,
      added_at: row.first_seen
    }));

    return res.json({
      success: true,
      websites,
    });
  } catch (error) {
    console.error("Error fetching websites:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch website list",
      error: error.message,
    });
  }
});


export default router;
