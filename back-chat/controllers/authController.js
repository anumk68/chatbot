import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import db from "../config/db.js";
import UserModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import { loginAgent, logoutAgent } from "./agentController.js";
import admin from "../firebaseAdmin.js";

const API_URL = process.env.CORS_ORIGIN;

// =============== SIGNUP ===============
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await UserModel.findByEmail(db, email);
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const chatbot_id = `CHAT_${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    await UserModel.createUser(db, {
      name,
      email,
      password: hashedPassword,
      role,
      chatbot_id,
      status: "inactive",
    });

    res.status(201).json({
      message: "Signup successful",
      chatbot_id,
      email,
      name,
      role,
    });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =============== LOGIN ===============
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(db, email);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === "blocked") {
      return res
        .status(403)
        .json({ message: "Your account is blocked. Contact admin." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    // Set active on login
    await db.query("UPDATE users SET status = 'active' WHERE id = ?", [
      user.id,
    ]);

    const token = jwt.sign(
      { id: user.id, role: user.role, chatbot_id: user.chatbot_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (user.role === "agent") {
      await loginAgent(user);
    }

    res.json({
      message: "Login successful",
      token,
      email: user.email,
      name: user.name,
      role: user.role,
      chatbot_id: user.chatbot_id,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// =============== LOGOUT ===============
export const logout = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await UserModel.findById(db, userId);

    // Set inactive on logout
    await db.query("UPDATE users SET status = 'inactive' WHERE id = ?", [
      userId,
    ]);

    if (user.role === "agent") {
      logoutAgent(user);
    }

    res.json({ message: "Logout successful!" });
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// google login
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const decoded = await admin.auth().verifyIdToken(token);

    const email = decoded.email;
    const name = decoded.name;

    let user = await UserModel.findByEmail(db, email);

    // If user does not exist → auto create account
    if (!user) {
      const chatbot_id = `CHAT_${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;

      const randomPass = crypto.randomBytes(20).toString("hex");

      await UserModel.createUser(db, {
        name,
        email,
        password: randomPass,
        role: "admin",
        chatbot_id,
        status: "active",
      });

      user = await UserModel.findByEmail(db, email);
    }

    const jwtToken = jwt.sign(
      { id: user.id, role: user.role, chatbot_id: user.chatbot_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      name: user.name,
      email: user.email,
      role: user.role,
      chatbot_id: user.chatbot_id,
    });
  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    res.status(500).json({ message: "Google login failed" });
  }
};

// FACEBOOK LOGIN
export const facebookLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);
    const email = decoded.email;
    const name = decoded.name || "Facebook User";

    let user = await UserModel.findByEmail(db, email);

    // If user does not exist → auto-create account
    if (!user) {
      const chatbot_id = `CHAT_${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
      const randomPass = crypto.randomBytes(20).toString("hex");

      await UserModel.createUser(db, {
        name,
        email,
        password: randomPass,
        role: "admin",
        chatbot_id,
        status: "active",
      });

      user = await UserModel.findByEmail(db, email);
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user.id, role: user.role, chatbot_id: user.chatbot_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Facebook login successful",
      token: jwtToken,
      name: user.name,
      email: user.email,
      role: user.role,
      chatbot_id: user.chatbot_id,
    });
  } catch (err) {
    console.error("FACEBOOK LOGIN ERROR:", err);
    res
      .status(500)
      .json({ message: "Facebook login failed", error: err.message });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findByEmail(db, email);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpire = Date.now() + 1000 * 60 * 60 * 24; // 24h

    await db.query(
      "UPDATE users SET reset_token = ?, reset_expire = ? WHERE id = ?",
      [resetToken, resetExpire, user.id]
    );

    const resetLink = `${API_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(
      user.email
    )}`;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Link",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });

    res.json({ success: true, message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT id, reset_token, reset_expire FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0]; 
    console.log("User fetched from DB:", user);

    if (!user) {
      console.log("No user found with this email");
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const dbToken = user.reset_token?.trim();
    const incomingToken = token?.trim();

    console.log("DB Token:", dbToken);

    if (!dbToken || dbToken !== incomingToken) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    if (Number(user.reset_expire) < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Token expired. Request a new link." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_expire = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    console.log("Password reset successful for user:", user.id);

    res.json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

