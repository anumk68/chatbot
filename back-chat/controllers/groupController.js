import db from "../config/db.js";
import { getIO } from "../sockets/chatSocket.js";

/* ================= CREATE GROUP ================= */
export const createGroup = async (req, res) => {
  try {
    const { chatbotId } = req.params;
    const { group_name, members = [] } = req.body;

    if (!group_name || !chatbotId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const [result] = await db.query(
      "INSERT INTO groups (group_name, chatbot_id, members) VALUES (?, ?, ?)",
      [group_name, chatbotId, JSON.stringify(members)]
    );

    res.json({
      success: true,
      group_id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET GROUPS ================= */
export const getGroupsByChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    const [rows] = await db.query(
      `SELECT 
        id AS group_id,
        group_name,
        JSON_LENGTH(members) AS total_members,
        members
      FROM groups
      WHERE chatbot_id = ?
      ORDER BY created_at DESC`,
      [chatbotId]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= SEND MESSAGE ================= */
export const sendOwnerMessage = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;

    const sender_id = req.user.id;
    const sender_role = req.user.role;
    const message = req.body?.message;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!message && !image) {
      return res.status(400).json({ message: "Message or image required" });
    }

    const [userRows] = await db.query(
      "SELECT name FROM users WHERE id = ?",
      [sender_id]
    );

    if (!userRows.length) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const sender_name = userRows[0].name;

    const [result] = await db.query(
      `INSERT INTO group_messages
       (chatbot_id, group_id, sender_id, sender_name, sender_role, message, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        chatbotId,
        Number(groupId),
        sender_id,
        sender_name,
        sender_role,
        message || "",
        image,
      ]
    );

    const newMessage = {
      id: result.insertId,
      chatbot_id: chatbotId,
      group_id: Number(groupId),
      sender_id,
      sender_name,
      sender_role,
      message,
      image,
      created_at: new Date(),
    };

    // 🔥 SOCKET EMIT
    const io = getIO();
    io.to(`group_${groupId}`).emit("receive_group_message", newMessage);

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Agent sends message in group
export const sendAgentMessage = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;

    const sender_id = req.user.id;
    const sender_role = req.user.role; // Agent

    const message = req.body?.message;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!message && !image) {
      return res.status(400).json({ message: "Message or image required" });
    }

    const [userRows] = await db.query(
      "SELECT name FROM users WHERE id = ?",
      [sender_id]
    );

    if (!userRows.length) {
      return res.status(404).json({ message: "Sender not found" });
    }

    const sender_name = userRows[0].name;

    const [result] = await db.query(
      `INSERT INTO group_messages
       (chatbot_id, group_id, sender_id, sender_name, sender_role, message, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        chatbotId,
        Number(groupId),
        sender_id,
        sender_name,
        sender_role,
        message || "",
        image,
      ]
    );

    const newMessage = {
      id: result.insertId,
      chatbot_id: chatbotId,
      group_id: Number(groupId),
      sender_id,
      sender_name,
      sender_role,
      message,
      image,
      created_at: new Date(),
    };

    // 🔥 SOCKET EMIT (MISSING THA)
    const io = getIO();
    io.to(`group_${groupId}`).emit("receive_group_message", newMessage);

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("Send agent message error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= GET MESSAGES ================= */
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId, chatbot_id } = req.params;

    if (!groupId || !chatbot_id) {
      return res.status(400).json({ message: "Missing groupId or chatbot_id" });
    }

    const groupIdNum = parseInt(groupId, 10);
    const chatbotIdStr = String(chatbot_id).trim();

    const [rows] = await db.query(
      `SELECT *
       FROM group_messages
       WHERE chatbot_id = ?
       AND group_id = ?
       ORDER BY created_at ASC`,
      [chatbotIdStr, groupIdNum]
    );

    res.json({ success: true, messages: rows });
  } catch (err) {
    console.error("Error in getGroupMessages:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { chatbot_id } = req.params;

    console.log("Incoming request to getGroupMembers");
    console.log("Params:", req.params);

    if (!chatbot_id) {
      console.warn("Missing chatbot_id in params");
      return res.status(400).json({ message: "Missing chatbot_id" });
    }

    const chatbotIdStr = String(chatbot_id).trim();
    console.log("Fetching members for chatbot_id:", chatbotIdStr);

    const [rows] = await db.query(
      `SELECT id, name, role, status
       FROM users
       WHERE chatbot_id = ?`,
      [chatbotIdStr]
    );

    console.log(`SQL executed. Number of members fetched: ${rows.length}`);
    rows.forEach((r, i) => {
      console.log(
        `Member ${i + 1}: id=${r.id}, name=${r.name}, role=${r.role}, status=${
          r.status
        }`
      );
    });

    res.json({ success: true, members: rows });
  } catch (err) {
    console.error("Error fetching members:", err);
    res.status(500).json({ message: err.message });
  }
};
