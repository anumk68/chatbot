import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import db from "./config/db.js";
import app from "./app.js";
import { initChatSocket } from "./sockets/chatSocket.js";

const PORT = process.env.PORT || 6001;

// CREATE CONNECTED AGENTS MAP
const connectedAgents = new Map();

const server = http.createServer(app);

// INIT SOCKET HANDLERS
initChatSocket(server);


server.listen(PORT, () =>
  console.log(` Server running at PORT ${PORT}`)
);
