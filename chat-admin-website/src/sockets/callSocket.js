import { socket } from "./groupSocket";

export const joinCallGroup = (groupId) => {
  socket.emit("join_group", groupId);
};

export const startCall = ({ groupId, type, callerId }) => {
  socket.emit("call:start", { groupId, type, callerId });
};

export const acceptCall = ({ groupId }) => {
  socket.emit("call:accept", { groupId });
};

export const sendSignal = ({ groupId, to, data }) => {
  socket.emit("webrtc:signal", { groupId, to, data });
};

export const onSignal = (cb) => {
  socket.on("webrtc:signal", cb);
};

export const onIncomingCall = (cb) => {
  socket.on("call:incoming", cb);
};

export const onUserJoined = (cb) => {
  socket.on("call:user-joined", cb);
};

export const onCallEnd = (cb) => {
  socket.on("call:end", cb);
};
