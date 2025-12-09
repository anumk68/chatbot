// src/sockets/adminSocket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;
console.log("Admin Socket URL:", SOCKET_URL); 

// Create a singleton socket instance
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false, 
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

export const onCustomersUpdate = (callback) => {
  if (socket) {
    socket.on("update_online_customers", (data) => {
      console.log("[DEBUG] update_online_customers:", data); // <--- DEBUG
      callback(data);
    });
  }
};


export default socket;
