import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import crypto from "crypto";
import generateToken from "../helpers/generateToken.js";
import { sendInviteMail, sendEmail } from "../utils/mailer.js";
import { getIO } from "../sockets/chatSocket.js";

const API_URL = process.env.CORS_ORIGIN

// ---- REGISTER AGENT ----
export const registerAgent = async (req, res) => {
  try {
    const { name, password, token } = req.body;

    if (!name || !password || !token) {
      return res
        .status(400)
        .json({ message: "All fields and token are required" });
    }

    console.log(`Registering agent: ${name}`);
    console.log("Invite token received:", token);

    // Verify invite token using INVITE_SECRET
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.INVITE_SECRET || "INVITE_SECRET");
    } catch (err) {
      console.error("JWT Error:", err);
      return res
        .status(400)
        .json({ message: "Invalid or expired token", error: err.message });
    }

    const { email, role, chatbotId, adminChatbotId } = decoded;

    console.log(
      `Token decoded successfully: email=${email}, role=${role}, chatbotId=${chatbotId}`
    );

    const [exist] = await db.execute("SELECT id FROM users WHERE email=?", [
      email,
    ]);
    if (exist.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const agent_id = crypto.randomBytes(16).toString("hex");
    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (name, email, password, role, chatbot_id, admin_chatbot_id, agent_id, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'inactive')`,
      [name, email, hash, role, chatbotId, adminChatbotId, agent_id]
    );

    // Update invite status
    await db.execute(
      `UPDATE agent_invites SET status='accepted' WHERE token=?`,
      [token]
    );

    // Generate login token
    const agentToken = generateToken(
      result.insertId,
      role,
      chatbotId,
      adminChatbotId,
      agent_id
    );

    res.json({
      message: "Agent registered successfully and invite accepted",
      token: agentToken,
      agent: {
        id: result.insertId,
        name,
        email,
        role,
        chatbotId,
        adminChatbotId,
        agent_id,
        status: "inactive",
      },
    });
  } catch (err) {
    console.error("Error during agent registration:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// ---- LOGIN AGENT ----
export const loginAgent = async (user) => {
  try {
    const socket = getIO();

    // 1) Update DB status to active
    const [resDB] = await db.execute(
      "UPDATE users SET status = 'active' WHERE id = ?",
      [user.id]
    );

    console.log("[DEBUG] Agent status updated to active in DB:", resDB);

    // 2) Emit online event to sockets
    socket.emit("agent_online", {
      agent_id: user.agent_id,
      name: user.name,
      chatbot_id: user.chatbot_id,
      status: "active",
    });

    return { success: true, message: "Agent logged in and active" };
  } catch (err) {
    console.error("[ERROR] loginAgent:", err);
    throw err;
  }
};

// ---- LOGOUT AGENT ----
export const logoutAgent = async (user) => {
  try {
    const socket = getIO();

    // 1) Update DB status to inactive
    const [resDB] = await db.execute(
      "UPDATE users SET status = 'inactive' WHERE id = ?",
      [user.id]
    );
    console.log("[DEBUG] Agent status updated to inactive in DB:", resDB);

    // 2) Emit offline event to sockets
    socket.emit("agent_offline", { agent_id: user.agent_id });

    return { success: true, message: "Agent logged out and inactive" };
  } catch (err) {
    console.error("[ERROR] logoutAgent:", err);
    throw err;
  }
};


// ---- GET AGENT PROFILE ----
export const getAgentProfile = async (req, res) => {
  try {
    const [agent] = await db.execute(
      "SELECT id, name, email, chatbot_id, admin_chatbot_id, status FROM users WHERE id=?",
      [req.user.id]
    );
    res.json(agent[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- FORGOT / RESET PASSWORD ----
export const forgotAgentPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email=? AND role="agent"',
      [email]
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Agent not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const resetExpire = Date.now() + 15 * 60 * 1000;

    await db.execute(
      "UPDATE users SET reset_token=?, reset_expire=? WHERE id=?",
      [token, resetExpire, rows[0].id]
    );

    const resetLink = `${API_URL}/reset-agent/${token}`;
    await sendEmail(
      email,
      "Reset Password",
      `Click here to reset password: ${resetLink}`
    );

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetAgentPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;

    const [rows] = await db.execute(
      'SELECT * FROM users WHERE reset_token=? AND reset_expire > ? AND role="agent"',
      [token, Date.now()]
    );

    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hash = await bcrypt.hash(password, 10);
    await db.execute(
      "UPDATE users SET password=?, reset_token=NULL, reset_expire=NULL WHERE id=?",
      [hash, rows[0].id]
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- INVITE AGENTS ----
export const inviteAgents = async (req, res) => {
  try {
    const { emails, role, group, chatbotId, adminChatbotId } = req.body;

    if (!chatbotId || !adminChatbotId) {
      return res
        .status(400)
        .json({ message: "chatbotId and adminChatbotId are required" });
    }

    for (const email of emails) {
      const token = jwt.sign(
        { email, role, group, chatbotId, adminChatbotId },
        process.env.INVITE_SECRET || "INVITE_SECRET",
        { expiresIn: "1d" }
      );

      const inviteLink = `${API_URL}/agent-signup?token=${token}&chatbotId=${chatbotId}&adminChatbotId=${adminChatbotId}`;
      await sendInviteMail(email, inviteLink);

      await db.query(
        `INSERT INTO agent_invites (email, chatbot_id, role, group_name, token, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [email, chatbotId, role, group, token, "pending"]
      );
    }

    res.json({ message: "Invitations sent successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send invites", error: err.message });
  }
};

export const inviteAgentsAfterPayment = async (req, res) => {
  const { referenceNo } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM payments WHERE reference_no=? AND status='SUCCESS'",
    [referenceNo]
  );

  if (!rows.length) {
    return res.status(403).json({ message: "Payment not verified" });
  }

  const payment = rows[0];
  const emails = JSON.parse(payment.emails);

  for (const email of emails) {
    const token = jwt.sign(
      {
        email,
        role: payment.role,
        chatbotId: payment.chatbot_id
      },
      process.env.INVITE_SECRET,
      { expiresIn: "1d" }
    );

    const link = `${process.env.FRONTEND_URL}/agent-signup?token=${token}`;
    await sendInviteMail(email, link);

    await db.query(
      `INSERT INTO agent_invites
      (email, chatbot_id, role, group_name, token, status)
      VALUES (?, ?, ?, ?, ?, 'pending')`,
      [
        email,
        payment.chatbot_id,
        payment.role,
        payment.group_name,
        token
      ]
    );
  }

  res.json({ message: "Agents invited after payment" });
};


// fetch all agent by chatbotid
export const getAgentsByChatbot = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId) {
      return res.status(400).json({
        success: false,
        message: "chatbotId required",
      });
    }

    const [rows] = await db.query(
      `
      SELECT 
        id,
        name,
        email,
        role,
        status,
        chatbot_id
      FROM users
      WHERE chatbot_id = ? 
        AND role = 'agent'
      ORDER BY name ASC
      `,
      [chatbotId]
    );

    const formatted = rows.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.status,
      chatbotId: u.chatbot_id,

      // UI fields
      initials: (u.name || "?")
        .split(" ")
        .map((n) => n[0]?.toUpperCase())
        .join("")
        .slice(0, 2),

      chatLimit: null,
      groups: [],
      isCurrentUser: false,
    }));

    res.json({
      success: true,
      agents: formatted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// suspended agent
export const suspendAgent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("[DEBUG] Suspend request for agent:", id);

    const [rows] = await db.query(
      "SELECT id, name, role, status FROM users WHERE id = ? AND role = 'agent'",
      [id]
    );

    if (rows.length === 0) {
      console.log("[DEBUG] Agent not found");
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });
    }

    // Already blocked?
    if (rows[0].status === "blocked") {
      console.log("[DEBUG] Agent already blocked");
      return res.json({ success: true, message: "Agent already blocked" });
    }

    const [result] = await db.query(
      "UPDATE users SET status = 'blocked' WHERE id = ? AND role = 'agent'",
      [id]
    );

    console.log("[DEBUG] Agent status updated to blocked:", result);

    return res.json({
      success: true,
      message: "Agent suspended (blocked) successfully",
    });
  } catch (err) {
    console.error("[ERROR] suspendAgent:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// restore agent
export const restoreAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, name FROM users WHERE id = ? AND role = 'agent'",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    await db.query(
      "UPDATE users SET status = 'inactive' WHERE id = ? AND role = 'agent'",
      [id]
    );

    return res.json({
      success: true,
      message: "Agent restored successfully",
    });
  } catch (err) {
    console.error("[ERROR] restoreAgent:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// get suspended agents
export const getSuspendedAgents = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    if (!chatbotId) {
      return res.status(400).json({
        success: false,
        message: "chatbotId is required",
      });
    }

    const [rows] = await db.query(
      `
      SELECT 
        id,
        name,
        email,
        status,
        chatbot_id
      FROM users
      WHERE role = 'agent'
      AND chatbot_id = ?
      AND (status = 'blocked')
      ORDER BY name ASC
      `,
      [chatbotId]
    );

    return res.json({
      success: true,
      suspendedAgents: rows,
    });
  } catch (err) {
    console.error("[ERROR] getSuspendedAgents:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// edit agent profile by admin
export const editAgentProfile = async (req, res) => {
  const agentId = req.params.id;
  const { name, email, role, status } = req.body;

  if (!name || !email || !role || !status) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    // Check if agent exists
    const [existing] = await pool.query("SELECT * FROM users WHERE id = ?", [
      agentId,
    ]);
    if (!existing.length) {
      return res
        .status(404)
        .json({ success: false, message: "Agent not found" });
    }

    // Update user
    await pool.query(
      "UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?",
      [name, email, role, status, agentId]
    );

    return res.json({
      success: true,
      message: "Agent profile updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
