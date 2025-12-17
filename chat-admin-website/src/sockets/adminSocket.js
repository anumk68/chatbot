// src/sockets/adminSocket.js
import { io } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = (callback) => {
  if (!socket.connected) {
    socket.connect();
    socket.on("connect", () => {
      console.log("[admin socket] connected:", socket.id);
      if (callback) callback();
    });
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("[admin socket] disconnected");
  }
};

export const onAgentOnline = (callback) => {
  socket.on("agent_online", (data) => {
    console.log("[admin socket] agent_online:", data);
    callback(data);
  });
};
export const onAgentOffline = (callback) => {
  socket.on("agent_offline", (data) => {
    console.log("[admin socket] agent_offline:", data);
    callback(data);
  });
};

export const onCustomerOnline = (callback) => {
  socket.on("customer_online", (data) => {
    console.log("[admin socket] customer_online:", data);
    callback(data);
  });
};
export const onCustomerOffline = (callback) => {
  socket.on("customer_offline", (data) => {
    console.log("[admin socket] customer_offline:", data);
    callback(data);
  });
};

export const onNewAssignment = (callback) => {
  socket.on("new_assignment", (data) => {
    console.log("[admin socket] new_assignment:", data);
    callback(data);
  });
};

// Handle tab/window close
window.addEventListener("beforeunload", () => {
  if (socket.connected) {
    const agentId = localStorage.getItem("agent_id");
    socket.emit("agent_leave", { agent_id: agentId });
    socket.disconnect();
  }
});

export default socket;
