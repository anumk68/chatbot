// controllers/customerMessageController.js
import db from "../config/db.js";

import { getIO } from "../sockets/chatSocket.js";


/**  * Save or update pre-chat customer data to DB (customers table)   */
export const saveCustomerData = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const { name, email, phone, message, custom_json, website_url } = req.body;

    if (!chatbotId) {
      return res.status(400).json({
        success: false,
        message: "chatbotId required",
      });
    }

    const temp_user_id = "temp_" + Date.now() + Math.floor(Math.random() * 1000);
    const jsonString = JSON.stringify(custom_json || {});

    const [result] = await db.query(
      `INSERT INTO customers
      (chatbot_id, temp_user_id, name, email, phone, message, custom_json, website_url, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW())`,
      [
        chatbotId,
        temp_user_id,
        name || null,
        email || null,
        phone || null,
        message || null,
        jsonString,
        website_url || null,
      ]
    );

    // Correct socket emit
    const io = getIO();
    io.to(`admin_${chatbotId}`).emit("customer_online", {
      temp_user_id,
      name,
      chatbot_id: chatbotId,
      status: "active",
    });

    console.log("customer_online emitted for temp_user_id:", temp_user_id);
    console.log("Emitting customer_online to room:", `admin_${chatbotId}`);

    return res.json({
      success: true,
      message: "Customer saved",
      data: {
        id: result.insertId,
        chatbot_id: chatbotId,
        temp_user_id,
        name,
        email,
        phone,
        message,
        custom_json,
        website_url,
      },
    });
  } catch (err) {
    console.error("saveCustomerData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// Get online customers (status = 'active')
export const getOnlineCustomers = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    if (!chatbotId) {
      return res
        .status(400)
        .json({ success: false, message: "chatbotId required" });
    }

    const [rows] = await db.query(
      `SELECT id, chatbot_id, temp_user_id, name, email, phone, message, custom_json, website_url, status, created_at 
       FROM customers 
       WHERE chatbot_id=? AND status='active' 
       ORDER BY created_at DESC`,
      [chatbotId]
    );

    rows.forEach((c) => {
      if (c.custom_json) {
        try {
          c.custom_json = JSON.parse(c.custom_json);
        } catch {
          c.custom_json = {};
        }
      }
    });

    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error("getOnlineCustomers error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all customer data for a chatbot
 */
export const getCustomerData = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    const [customers] = await db.query(
      `SELECT * FROM customers WHERE chatbot_id = ? ORDER BY created_at DESC`,
      [chatbotId]
    );

    // Parse JSON for frontend
    customers.forEach((c) => {
      if (c.custom_json) {
        try {
          c.custom_json = JSON.parse(c.custom_json);
        } catch {
          c.custom_json = {};
        }
      }
    });

    res.json({ success: true, data: customers });
  } catch (err) {
    console.error("getCustomerData error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/customers/:temp_user_id/disconnect
export const CustomerDisconnect = async (req, res) => {
  try {
    const { temp_user_id } = req.params;
    console.log("CustomerDisconnect called for:", temp_user_id);

    await db.query(
      "UPDATE customers SET status='inactive' WHERE temp_user_id=?",
      [temp_user_id]
    );

    const socket = getIO();
    socket.emit("customer_offline", { temp_user_id });

    return res.json({ success: true, message: "Customer marked inactive" });
  } catch (err) {
    console.error("disconnectCustomer error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/agent/:agent_id/disconnect
export const agentDisconnect = async (req, res) => {
  try {
    const { agent_id } = req.params;
    console.log("agentDisconnect called for:", agent_id);

    await db.query(
      "UPDATE users SET status='inactive' WHERE id=? AND role='agent'",
      [agent_id]
    );
    console.log(`Agent ${agent_id} marked inactive in DB`);

    const socket = getIO();
    socket.emit("agent_offline", { agent_id });

    return res.json({ success: true, message: "Agent marked inactive" });
  } catch (err) {
    console.error("disconnectAgent error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
