import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL ;
export const socket = io(SOCKET_URL, { transports: ["websocket"] });

export const joinGroup = (groupId) => socket.emit("join_group", groupId);
export const onGroupMessage = (cb) => {
  socket.on("receive_group_message", cb);
  return () => socket.off("receive_group_message", cb);
};

export const startCall = ({ groupId, type, callerId }) => socket.emit("call:start", { groupId, type, callerId });
export const onIncomingCall = (cb) => socket.on("call:incoming", cb);
export const onSignal = (cb) => socket.on("webrtc:signal", cb);
export const sendSignal = ({ groupId, to, data }) => socket.emit("webrtc:signal", { groupId, to, data });
export const endCall = (groupId) => socket.emit("call:end", { groupId });
