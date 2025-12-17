// // backend/sockets/initChatSocket.js
// import { Server } from "socket.io";
// import db from "../config/db.js";

// let io;

// export const getIO = () => io;

// export const initChatSocket = (server) => {
//   io = new Server(server, {
//     cors: { origin: "*", methods: ["GET", "POST"] },
//     transports: ["websocket"],
//   });

//   const onlineCustomers = {}; // temp_user_id -> { name, socketId, status, chatbot_id }
//   const onlineAgents = {}; // agent_id -> { name, socketId, status, chatbot_id }

//   io.on("connection", (socket) => {
//     console.log("[SOCKET CONNECTED]", socket.id);

//     // Agent join conversation room
//     socket.on("join_agent", ({ conversation_id }) => {
//       socket.join(`room_${conversation_id}`);
//       console.log("Agent JOINED CHAT ROOM:", `room_${conversation_id}`);
//     });

//     // Customer join room
//     socket.on("join_customer", ({ conversation_id }) => {
//       socket.join(`room_${conversation_id}`);
//       console.log("Customer JOINED CHAT ROOM:", `room_${conversation_id}`);
//     });
//     //  Disconnect
//     socket.on("customer_disconnect", async (data) => {
//       console.log("SOCKET: customer disconnected:", data.temp_user_id);

//       await db.query(
//         "UPDATE customers SET status='inactive' WHERE temp_user_id=?",
//         [data.temp_user_id]
//       );

//       io.emit("customer_offline", { temp_user_id: data.temp_user_id });
//     });
//   });
// };

// backend/sockets/initChatSocket.js
import { Server } from "socket.io";
import db from "../config/db.js";

let io;
export const getIO = () => io;

export const initChatSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
    transports: ["websocket"],
  });

  // in-memory maps for debugging/quick lookup (persist if you want)
  const onlineCustomers = {}; // temp_user_id => socketId
  const onlineAgents = {}; // agent_id => socketId

  io.on("connection", (socket) => {
    console.log("[SOCKET CONNECTED]", socket.id);

    // --- AGENT joins their "agent room" for admin->agent notifications
    socket.on("agent_join", ({ agent_id }) => {
      try {
        socket.join(`agent_${agent_id}`);
        onlineAgents[agent_id] = socket.id;

        console.log(` agent_join: agent_${agent_id} (socket ${socket.id})`);

        io.emit("agent_online", {
          agent_id,
          socketId: socket.id,
        });
      } catch (e) {
        console.error("agent_join error:", e);
      }
    });

    // --- CUSTOMER joins their "customer room" for admin->customer notifications
    socket.on("customer_join", (tempUserId) => {
      try {
        socket.join(`customer_${tempUserId}`);
        onlineCustomers[tempUserId] = socket.id;
        console.log(
          ` customer_join: customer_${tempUserId} (socket ${socket.id})`
        );
        io.emit("customer_online", {
          temp_user_id: tempUserId,
          socketId: socket.id,
        });
      } catch (e) {
        console.error("customer_join error:", e);
      }
    });

    socket.on("admin_join", ({ chatbot_id }) => {
      socket.join(`admin_${chatbot_id}`);
      console.log(`Admin joined room admin_${chatbot_id}`);
    });

    // --- Join conversation room (both agent and customer will call this)
    // Payload: { conversation_id }
    socket.on("join_conversation", ({ conversation_id }) => {
      try {
        const roomName = `conversation_${conversation_id}`;
        socket.join(roomName);
        console.log(
          ` socket ${socket.id} joined conversation room: ${roomName}`
        );
      } catch (e) {
        console.error("join_conversation error:", e);
      }
    });

    // --- Customer sends message to conversation
    // Payload: { conversation_id, temp_user_id, message, file?, sender: 'customer' }
    socket.on("customer_message", async (payload) => {
      try {
        console.log("[RECV] customer_message:", payload);
        const room = `conversation_${payload.conversation_id}`;

        // OPTIONAL: save message to DB here if you want
        // await db.query(...)

        // Emit to all sockets in that conversation room (agents listening)
        io.to(room).emit("customer_message_to_agent", {
          ...payload,
          created_at: new Date().toISOString(),
        });

        console.log(`➡ Emitted customer_message_to_agent to room ${room}`);
      } catch (err) {
        console.error("customer_message handler error:", err);
      }
    });

    /* ================= GROUP CHAT (🔥 ADDED HERE) ================= */

    socket.on("join_group", (groupId) => {
      socket.join(`group_${groupId}`);
      console.log(`👥 joined group_${groupId}`);
    });

    socket.on("leave_group", (groupId) => {
      socket.leave(`group_${groupId}`);
    });

    socket.on("send_group_message", (payload) => {
      io.to(`group_${payload.groupId}`).emit("receive_group_message", payload);
    });

    // --- Agent sends message to conversation
    // Payload: { conversation_id, agent_id, message, file?, sender: 'agent' }
    socket.on("agent_message", async (payload) => {
      try {
        console.log("[RECV] agent_message:", payload);
        const room = `conversation_${payload.conversation_id}`;

        // OPTIONAL: save to DB

        // Emit to conversation room so the customer receives it
        io.to(room).emit("agent_message_to_customer", {
          ...payload,
          created_at: new Date().toISOString(),
        });

        console.log(`➡ Emitted agent_message_to_customer to room ${room}`);
      } catch (err) {
        console.error("agent_message handler error:", err);
      }
    });

    socket.on("agent_leave", async ({ agent_id }) => {
      try {
        // Update DB to mark inactive
        await db.query(
          "UPDATE users SET status='inactive' WHERE id=? AND role='agent'",
          [agent_id]
        );

        // Remove from onlineAgents map
        delete onlineAgents[agent_id];

        // Notify admin clients
        io.emit("agent_offline", { agent_id });

        console.log("Agent offline (leave):", agent_id);
      } catch (err) {
        console.error("agent_leave error:", err);
      }
    });

    // --- Disconnect handlers (basic)
    socket.on("disconnect", (reason) => {
      console.log(`[SOCKET DISCONNECT] ${socket.id} reason:`, reason);

      // try to find and remove from online lists
      for (const [agent_id, sId] of Object.entries(onlineAgents)) {
        if (sId === socket.id) {
          delete onlineAgents[agent_id];
          io.emit("agent_offline", { agent_id: agent_id });
          console.log("Agent offline:", agent_id);
          break;
        }
      }
      for (const [tempId, sId] of Object.entries(onlineCustomers)) {
        if (sId === socket.id) {
          delete onlineCustomers[tempId];
          io.emit("customer_offline", { temp_user_id: tempId });
          console.log("Customer offline:", tempId);
          break;
        }
      }
    });

    // Extra debug helper endpoints if needed
    socket.on("whoami", () => {
      socket.emit("whoami_response", { socketId: socket.id });
    });
  });

  console.log(" initChatSocket complete");
};
