import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/authRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import prechatRoutes from "./routes/preChatFormRoutes.js";
import customerMessageRoutes from "./routes/customerMessageRoutes.js";
import assignRoutes from "./routes/assignRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import agentAuthRoutes from "./routes/agentRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import customerRoutes from "./routes/customer.js";

import CustomerMessage from "./routes/customerMessageRoutes.js";

import conversationsRouter from "./routes/conversations.js";
import messageRoutes from "./routes/messages.js";

import scriptRoutes from "./routes/script.js";
import groupRoutes from './routes/groupRoutes.js'


// import TrackRoutes from "./routes/track.js";

import analyticsRouter from "./routes/analytics.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: "*",
  credentials: false
}));
app.use(express.json());

import activeCustomersRoutes from "./routes/active-cust.js";
import activeAgentsRoutes from "./routes/active-agents.js";

// Routes
app.use("/api/assigned", assignRoutes);
app.use("/auth/api", formRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", prechatRoutes);
app.use("/api", customerMessageRoutes);
app.use("/api", chatRoutes);
app.use("/api/agents", agentAuthRoutes);
app.use("/api", uploadRoute);
app.use("/api/customer", customerRoutes);
app.use("/api/customers", activeCustomersRoutes);
app.use("/api/agents", activeAgentsRoutes);

app.use("/api", CustomerMessage);

app.use("/api", messageRoutes);

app.use("/api/conversations", conversationsRouter);

// create group 
app.use("/api", groupRoutes);


// script route
app.use("/api", scriptRoutes);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// app.use(express.static("frontend/dist"));

// serve public folder
app.use(express.static(path.join(__dirname, "public")));

// optional: a simple health route
app.get("/ping", (req, res) => res.send("ok"));

app.get("/download", (req, res) => {
  const filePath = req.query.file;

  if (!filePath) {
    return res.status(400).send("File path required");
  }

  const fullPath = path.join(process.cwd(), filePath);

  res.download(fullPath, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Failed to download");
    }
  });
});

//  GET All Messages of a Conversation
app.get("/api/messages/:conversation_id", async (req, res) => {
  const { conversation_id } = req.params;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversation_id]
    );

    return res.json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    console.error("ERROR fetching messages:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


app.use("/api/analytics", analyticsRouter);

// health
app.get("/api/health", (req, res) => res.json({ ok: true }));


export default app;
