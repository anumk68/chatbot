
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  reconnection: true,
});



export default socket;
