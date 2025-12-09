// // src/sockets/agentSocket.js
// import { io } from "socket.io-client";

// const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

// // INIT SOCKET
// const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
//   reconnection: true,
// });

// // Join agent room
// export const joinConversation = (conversation_id) => {
//   socket.emit("join_agent", { conversation_id });
//   console.log("Agent joined room:", conversation_id);
// };

// // Listen: customer → agent
// export const onCustomerMessage = (callback) => {
//   socket.on("customer_message_to_agent", callback);
//   return () => socket.off("customer_message_to_agent", callback);
// };

// // Listen: admin assigns customer → agent
// export const onCustomerAssigned = (callback) => {
//   socket.on("customer_assigned", callback);
//   return () => socket.off("customer_assigned", callback);
// };

// // SAME AS ABOVE, alias
// export const assignCustomer = (callback) => {
//   socket.on("customer_assigned", callback);
//   return () => socket.off("customer_assigned", callback);
// };

// export const disconnectAgent = () => socket.disconnect();

// // DEFAULT EXPORT
// export default socket;


// src/sockets/agentSocket.js

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});

// 1️⃣ Agent joins agent room
export const joinAgentRoom = (agent_id) => {
  socket.emit("agent_join", { agent_id: agent_id });
  console.log(" agent_join emitted:", agent_id);
};

// 2️⃣ Agent joins conversation room
export const joinConversation = (conversation_id) => {
  socket.emit("join_conversation", { conversation_id });
  console.log(" join_conversation:", conversation_id);
};

// 3️⃣ Listen → customer assigned to agent
// export const assignCustomer = (callback) => {
//   const listener = (data) => {
//     console.log("📩 Event Received → customer_assigned:", data);
//     callback(data);
//   };

//   socket.on("customer_assigned", listener);

//   return () => socket.off("customer_assigned", listener);
// };

export const onCustomerAssigned = (callback) => {
  socket.on("customer_assigned", (data) => {
    console.log("📩 customer_assigned RECEIVED:", data);
    callback(data);
  });
};

// 4️⃣ Listen → customer messages
export const onCustomerMessage = (callback) => {
  const listener = (msg) => {
    console.log("📩 customer_message_to_agent:", msg);
    callback(msg);
  };

  socket.on("customer_message_to_agent", listener);

  return () => socket.off("customer_message_to_agent", listener);
};

export default socket;
