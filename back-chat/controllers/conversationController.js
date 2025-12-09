import db from "../config/db.js"; // mysql2/promise connection
import { getIO } from "../sockets/chatSocket.js";
// Get all assigned pairs for a chatbot
export const getAssignedPairs = async (req, res) => {
  const { chatbotId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM assigned_customers WHERE chatbot_id = ?",
      [chatbotId]
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error fetching assigned pairs:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// controllers/assignmentController.js
export const assignAgent = async (req, res) => {
  const { chatbotId } = req.params;
  const { temp_user_id, agent_id, customer_name } = req.body;

  if (!temp_user_id || !agent_id || !customer_name) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const [exists] = await db.query(
      "SELECT * FROM assigned_customers WHERE temp_user_id = ? AND chatbot_id = ?",
      [temp_user_id, chatbotId]
    );

    if (exists.length > 0) {
      return res.json({ success: false, message: "Customer already assigned" });
    }

    const [agentRows] = await db.query(
      "SELECT id, name FROM users WHERE agent_id = ? AND role='agent'",
      [agent_id]
    );

    if (!agentRows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });
    }

    const agent_name = agentRows[0].name;
    const conversation_id = `${temp_user_id}_${agent_id}`;

    await db.query(
      `INSERT INTO assigned_customers 
       (conversation_id, temp_user_id, agent_id, agent_name, customer_name, chatbot_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        conversation_id,
        temp_user_id,
        agent_id,
        agent_name,
        customer_name,
        chatbotId,
      ]
    );

    const io = getIO();

    console.log(" Sending assignment to:", `agent_${agent_id}`);

 // Notify Agent
io.to(`agent_${agent_id}`).emit("customer_assigned", {
  conversation_id,
  temp_user_id,
  agent_id,
  agent_name,
  customer_name,
  chatbot_id: chatbotId,
});

// Notify Customer
io.to(`customer_${temp_user_id}`).emit("customer_assigned", {
  conversation_id,
  temp_user_id,
  agent_id,
  agent_name,
  customer_name,
  chatbot_id: chatbotId,
});

    // NEW: room create
    io.to(`room_${conversation_id}`).emit("room_ready", {
      conversation_id,
    });
    console.log("Room created:", `room_${conversation_id}`);
    console.log("Assigned customer:", {
      conversation_id,
      temp_user_id,
      agent_id,
      agent_name,
      customer_name,
    });

    return res.json({
      success: true,
      data: {
        conversation_id,
        temp_user_id,
        agent_id,
        agent_name,
        customer_name,
      },
    });
  } catch (err) {
    console.error("Error assigning agent:", err);
    return res.status(500).json({ success: false, message: "Database error" });
  }
};

// Delete assigned pair for a chatbot
export const deleteAssigned = async (req, res) => {
  const { chatbotId, id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "Missing conversation ID" });

  try {
    await db.query(
      "DELETE FROM assigned_customers WHERE conversation_id = ? AND chatbot_id = ?",
      [id, chatbotId]
    );
    console.log(`Deleted assigned conversation: ${id}`);
    const socket = getIO();
    socket.emit("assignment_deleted", {
      conversation_id: id,
      chatbot_id: chatbotId,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};

// get assignedpairs by id
export const assignPairsbyId = async (req, res) => {
  const { chatbotId, agentId } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT conversation_id, temp_user_id, agent_id, agent_name, customer_name, chatbot_id 
       FROM assigned_customers 
       WHERE chatbot_id = ? AND agent_id = ?`,
      [chatbotId, agentId]
    );

    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error("AssignPairsById error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
