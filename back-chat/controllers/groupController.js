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

// delete group
export const deleteGroup = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;
    if (!groupId || !chatbotId) {
      return res.status(400).json({ message: "Missing groupId or chatbotId" });
    }
    await db.query("DELETE FROM groups WHERE id = ? AND chatbot_id = ?", [
      groupId,
      chatbotId,
    ]);
    res.json({ success: true, message: "Group deleted successfully" });
  } catch (err) {
    console.error("deleteGroup ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// edit group name
export const editGroupName = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;
    const { group_name } = req.body;
    if (!groupId || !chatbotId || !group_name) {
      return res.status(400).json({ message: "Missing data" });
    }
    await db.query(
      "UPDATE groups SET group_name = ? WHERE id = ? AND chatbot_id = ?",
      [group_name, groupId, chatbotId]
    );
    res.json({ success: true, message: "Group name updated successfully" });
  } catch (err) {
    console.error("editGroupName ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
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

/* ================= SEND OWNER MESSAGE ================= */
export const sendOwnerMessage = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;
    const sender_id = req.user?.id;
    const sender_role = req.user?.role;

    const message = req.body?.message;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!sender_id) return res.status(401).json({ message: "Invalid token" });
    if (!message && !image)
      return res.status(400).json({ message: "Message or image required" });

    const [userRows] = await db.query(
      "SELECT id, name FROM users WHERE id = ?",
      [sender_id]
    );
    if (!userRows.length)
      return res.status(404).json({ message: "Sender not found" });
    const sender_name = userRows[0].name;

    // Insert message with status = "sent"
    const [result] = await db.query(
      `INSERT INTO group_messages
       (chatbot_id, group_id, sender_id, sender_name, sender_role, message, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        chatbotId,
        Number(groupId),
        sender_id,
        sender_name,
        sender_role,
        message || "",
        image,
        "sent",
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
      status: "sent",
      created_at: new Date(),
    };

    // Emit to group socket
    const io = getIO();
    io.to(`group_${groupId}`).emit("receive_group_message", newMessage);

    // Update status to delivered
    await db.query("UPDATE group_messages SET status='delivered' WHERE id=?", [
      result.insertId,
    ]);
    io.to(`group_${groupId}`).emit("update_message_status", {
      messageId: result.insertId,
      status: "delivered",
    });

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("sendOwnerMessage ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Edit owner message
export const editownerMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = req.body?.message;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!message && !image)
      return res.status(400).json({ message: "Message or image required" });

    await db.query(`UPDATE group_messages SET message=?, image=? WHERE id=?`, [
      message || "",
      image,
      messageId,
    ]);

    const updatedMsg = {
      id: parseInt(messageId),
      message,
      image,
    };

    const io = getIO();
    io.emit("update_group_message", updatedMsg);

    res.json({ success: true, message: updatedMsg });
  } catch (err) {
    console.error("editownerMessage ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Delete owner message
export const deleteOwnerMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    await db.query(`DELETE FROM group_messages WHERE id=?`, [messageId]);

    const io = getIO();
    io.emit("delete_group_message", { messageId: parseInt(messageId) });

    res.json({ success: true, message: "Message deleted successfully" });
  } catch (err) {
    console.error("deleteOwnerMessage ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* ================= SEND AGENT MESSAGE ================= */
export const sendAgentMessage = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;
    const sender_id = req.user.id;
    const sender_role = req.user.role;

    const message = req.body?.message;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!message && !image)
      return res.status(400).json({ message: "Message or image required" });

    const [userRows] = await db.query("SELECT name FROM users WHERE id = ?", [
      sender_id,
    ]);
    if (!userRows.length)
      return res.status(404).json({ message: "Sender not found" });
    const sender_name = userRows[0].name;

    const [result] = await db.query(
      `INSERT INTO group_messages
       (chatbot_id, group_id, sender_id, sender_name, sender_role, message, image, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        chatbotId,
        Number(groupId),
        sender_id,
        sender_name,
        sender_role,
        message || "",
        image,
        "sent",
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
      status: "sent",
      created_at: new Date(),
    };

    const io = getIO();
    io.to(`group_${groupId}`).emit("receive_group_message", newMessage);

    // Update status to delivered
    await db.query("UPDATE group_messages SET status='delivered' WHERE id=?", [
      result.insertId,
    ]);
    io.to(`group_${groupId}`).emit("update_message_status", {
      messageId: result.insertId,
      status: "delivered",
    });

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("sendAgentMessage ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* ================= MARK MESSAGE AS SEEN ================= */
export const markMessageSeen = async (req, res) => {
  try {
    const { messageId, groupId } = req.body;

    await db.query("UPDATE group_messages SET status='seen' WHERE id=?", [
      messageId,
    ]);

    const io = getIO();
    io.to(`group_${groupId}`).emit("update_message_status", {
      messageId,
      status: "seen",
    });

    res.json({ success: true });
  } catch (err) {
    console.error("markMessageSeen ERROR:", err);
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

    // Fetch messages with sender info and status
    const [rows] = await db.query(
      `SELECT id, chatbot_id, group_id, sender_id, sender_name, sender_role, message, image, status, created_at
       FROM group_messages
       WHERE chatbot_id = ?
       AND group_id = ?
       ORDER BY created_at ASC`,
      [chatbotIdStr, groupIdNum]
    );

    // Optionally: Mark all messages as "delivered" for this user if they are not sender
    const myUserId = req.user?.id;
    if (myUserId) {
      const messagesToUpdate = rows.filter(
        (msg) => msg.sender_id !== myUserId && msg.status === "sent"
      );
      for (const msg of messagesToUpdate) {
        await db.query(
          "UPDATE group_messages SET status='delivered' WHERE id=?",
          [msg.id]
        );
      }
    }

    res.json({ success: true, messages: rows });
  } catch (err) {
    console.error("Error in getGroupMessages:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;

    if (!groupId || !chatbotId) {
      return res.status(400).json({ message: "Missing groupId or chatbotId" });
    }

    // Fetch group members JSON from groups table
    const [groupRows] = await db.query(
      `SELECT members
       FROM groups
       WHERE id = ? AND chatbot_id = ?`,
      [groupId, chatbotId]
    );

    if (!groupRows.length) {
      return res.status(404).json({ message: "Group not found" });
    }

    const memberIds = JSON.parse(groupRows[0].members || "[]");

    if (!memberIds.length) {
      return res.json({ success: true, members: [] });
    }

    // Fetch user details for members
    const [userRows] = await db.query(
      `SELECT id, name, role, status
       FROM users
       WHERE id IN (?) AND chatbot_id = ?`,
      [memberIds, chatbotId]
    );

    res.json({ success: true, members: userRows });
  } catch (err) {
    console.error("Error fetching group members:", err);
    res.status(500).json({ message: err.message });
  }
};

// Send voice message
export const sendVoiceMessage = async (req, res) => {
  try {
    const { groupId, chatbotId } = req.params;
    const sender_id = req.user.id;
    const sender_role = req.user.role;

    if (!req.file)
      return res.status(400).json({ message: "Audio file required" });

    const audioPath = `/uploads/${req.file.filename}`;

    const [userRows] = await db.query("SELECT name FROM users WHERE id = ?", [
      sender_id,
    ]);
    if (!userRows.length)
      return res.status(404).json({ message: "Sender not found" });
    const sender_name = userRows[0].name;

    const [result] = await db.query(
      `INSERT INTO group_messages
       (chatbot_id, group_id, sender_id, sender_name, sender_role, message, audio, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        chatbotId,
        Number(groupId),
        sender_id,
        sender_name,
        sender_role,
        "",
        audioPath,
        "sent",
      ]
    );

    const newMessage = {
      id: result.insertId,
      chatbot_id: chatbotId,
      group_id: Number(groupId),
      sender_id,
      sender_name,
      sender_role,
      message: "",
      audio: audioPath,
      status: "sent",
      created_at: new Date(),
    };

    const io = getIO();
    io.to(`group_${groupId}`).emit("receive_group_message", newMessage);

    await db.query("UPDATE group_messages SET status='delivered' WHERE id=?", [
      result.insertId,
    ]);
    io.to(`group_${groupId}`).emit("update_message_status", {
      messageId: result.insertId,
      status: "delivered",
    });

    res.json({ success: true, message: newMessage });
  } catch (err) {
    console.error("sendVoiceMessage ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
