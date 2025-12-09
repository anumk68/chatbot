// // src/sockets/customerSocket.js
// import { io } from "socket.io-client";

// const SOCKET_URL =
//   import.meta.env.VITE_NODE_BASE_URL;
// export const socket = io(SOCKET_URL, {
//   transports: ["websocket"],
//   reconnection: true,
// });

// export const joinConversation = (conversation_id) => {
//   if (!socket || !conversation_id) return;
//   socket.emit("join_customer", { conversation_id });
//   console.log("Customer joined room:", conversation_id);
// };

// // customer receive agent message
// export const onAgentSendMessage = (callback) => {
//   if (!socket) return;
//   socket.on("agent_send_message_to_customer", callback);
//   return () => socket.off("agent_send_message_to_customer");
// };
// export const onUpdateOnlineCustomers = (callback) => {
//   if (!socket) return;
//   socket.on("update_online_customers", callback);
// };

// export const emitCustomerDisconnect = (temp_user_id) => {
//   if (!socket) return;
//   socket.emit("customer_disconnect", { temp_user_id });
// };


// src/sockets/customerSocket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL || "http://localhost:6001";

const socket = io(SOCKET_URL, { 
  transports: ["websocket"], 
  reconnection: true 
});

/* ---------------------------------------------------
   JOIN CUSTOMER ROOM
----------------------------------------------------*/
export const joinCustomerRoom = (temp_user_id) => {
  socket.emit("customer_join", temp_user_id);
  console.log("[customerSocket] customer_join:", temp_user_id);
};

/* ---------------------------------------------------
   LISTEN → ASSIGNMENT
----------------------------------------------------*/
export const onAssignment = (cb) => {
  socket.on("customer_assigned", (payload) => {
    console.log("[customerSocket] customer_assigned:", payload);
    cb(payload);
  });
};

/* ---------------------------------------------------
   JOIN CONVERSATION ROOM (customer + agent private room)
----------------------------------------------------*/
export const joinConversation = (conversation_id) => {
  socket.emit("join_conversation", { conversation_id });
  console.log("[customerSocket] join_conversation:", conversation_id);
};

/* ---------------------------------------------------
   SEND CUSTOMER MESSAGE
----------------------------------------------------*/
export const sendCustomerMessage = (payload) => {
  console.log("[customerSocket] sendCustomerMessage:", payload);
  socket.emit("customer_message_to_agent", payload);
};

/* ---------------------------------------------------
   LISTEN → AGENT MESSAGE
----------------------------------------------------*/
export const onAgentSendMessage = (payload) => {
  if (!socket) return;
  socket.on("agent_send_message_to_customer", payload);
  return () => socket.off("agent_send_message_to_customer" ,payload);
};


  //  SEND CUSTOMER DISCONNECT EVENT 
export const emitCustomerDisconnect = (temp_user_id) => {
  console.log("[customerSocket] customer_disconnect:", temp_user_id);
  socket.emit("customer_disconnect", { temp_user_id });
};

export const emitAgentDisconnect = (agent_id) => {
  console.log("[customerSocket] agent_disconnect:", agent_id);
  socket.emit("agent_disconnect", { agent_id });
};

export default socket;
