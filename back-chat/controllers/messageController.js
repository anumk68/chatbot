import db from "../config/db.js";
import fs from "fs";
import path from "path";

import { getIO } from "../sockets/chatSocket.js";

const UPLOAD_DIR = path.join(process.cwd(), "uploads/messages");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

export const CustomersaveMessage = async (req, res) => {
  try {
    const { chatbot_id, sender, temp_user_id, message } = req.body;

    if (!chatbot_id || !sender || !temp_user_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (!req.file && (!message || message.trim() === "")) {
      return res.status(400).json({
        success: false,
        message: "Message or file is required",
      });
    }

    const [convRows] = await db.query(
      `SELECT conversation_id 
       FROM assigned_customers 
       WHERE chatbot_id=? AND temp_user_id=?`,
      [chatbot_id, temp_user_id]
    );

    if (convRows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer not assigned yet",
      });
    }

    const convId = convRows[0].conversation_id;

    // File
    let file_url = null;
    let type = "text";

    if (req.file) {
      const filename = Date.now() + "_" + req.file.originalname;
      const filepath = path.join(UPLOAD_DIR, filename);

      fs.writeFileSync(filepath, req.file.buffer);

      file_url = `/uploads/messages/${filename}`;
      type = "file";
    }

    const finalMessage = message || "";

    const [result] = await db.query(
      `INSERT INTO messages
       (chatbot_id, conversation_id, sender, temp_user_id, message, type, file_url, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [chatbot_id, convId, sender, temp_user_id, finalMessage, type, file_url]
    );

    const savedMsg = {
      id: result.insertId,
      chatbot_id,
      conversation_id: convId,
      sender,
      temp_user_id,
      message: finalMessage,
      type,
      file_url,
    };

    const io = getIO();

    // FIXED: Emit only to that agent room
    io.to(`conv_${convId}`).emit("customer_message_to_agent", savedMsg);
    console.log("customer message emitted" , savedMsg


      
    )

    res.json({ success: true, message: "Message saved", data: savedMsg });

  } catch (err) {
    console.error("Customer Send Message Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const AgentsaveMessage = async (req, res) => {
  try {
    const { chatbot_id, conversation_id, sender, agent_id, temp_user_id } =
      req.body;
    let message = req.body.message;
    if (!chatbot_id || !sender || !temp_user_id || !agent_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const convId = conversation_id;

    let file_url = null;
    let type = "text";
    if (req.file) {
      const filename = Date.now() + "_" + req.file.originalname;
      const filepath = path.join(UPLOAD_DIR, filename);
      fs.writeFileSync(filepath, req.file.buffer);
      file_url = `/uploads/messages/${filename}`;
      type = "file";
    }

    const [result] = await db.query(
      `INSERT INTO messages
      (chatbot_id, conversation_id, sender, temp_user_id, agent_id, message, type, file_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        chatbot_id,
        convId,
        sender,
        temp_user_id,
        agent_id,
        message,
        type,
        file_url,
      ]
    );

    const savedMsg = {
      id: result.insertId,
      chatbot_id,
      conversation_id: convId,
      sender,
      temp_user_id,
      agent_id,
      message,
      type,
      file_url,
    };
    console.log("Agent message saved:", savedMsg);

    // emit agent send message to customer via socket
    const socket = getIO();
    // socket
    //   .to(`conv_${convId}`)
    //   .emit("agent_send_message_to_customer", savedMsg);

    // when agent sends message, emit to only that customer whose temp_user_id matches
    socket.emit("agent_send_message_to_customer", savedMsg);
    console.log("Emitted agent_send_message_to_customer:", savedMsg);

    // socket.emit("agent_send_message_to_customer", savedMsg);

    res.json({
      success: true,
      message: "Message saved",
      data: savedMsg,
    });
  } catch (err) {
    console.error("Agent Send Message Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch messages by conversation
export const getMessages = async (req, res) => {
  try {
    const { conversation_id } = req.params;
    if (!conversation_id)
      return res
        .status(400)
        .json({ success: false, message: "conversation_id is required" });

    const [rows] = await db.query(
      `SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC`,
      [conversation_id]
    );

    res.json({ success: true, messages: rows });
  } catch (err) {
    console.error("Get Messages Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { temp_user_id } = req.params;
    if (!temp_user_id)
      return res
        .status(400)
        .json({ success: false, message: "temp_user_id required" });

    const [rows] = await db.query(
      `SELECT * FROM messages WHERE temp_user_id=? ORDER BY created_at ASC`,
      [temp_user_id]
    );

    res.json({ success: true, messages: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
