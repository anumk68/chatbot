import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Send,
  Image as ImageIcon,
  X,
  Check,
  Edit,
  Trash2,
  Video,
  PhoneCall,
  Mic,
} from "lucide-react";
import GroupMembersPanel from "./GroupMembersPanel.jsx";
import {
  joinGroup,
  onGroupMessage,
  socket,
  startCall,
  onIncomingCall,
  onSignal,
  sendSignal,
  endCall,
} from "../../../sockets/groupSocket.js";
import jwtDecode from "jwt-decode";
import notificationSound from "../../../assets/notification.mp3";

const API = import.meta.env.VITE_NODE_BASE_URL + "/api";
const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

export default function GroupChatPanel({ group }) {
  const chatbotId = localStorage.getItem("chatbotId");
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [editingMsgId, setEditingMsgId] = useState(null);

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const bottomRef = useRef(null);

  let currentUserId = null;
  try {
    if (token) {
      const decoded = jwtDecode(token);
      currentUserId = decoded.id;
    }
  } catch {}

  const groupId = group?.group_id || group?.id;

  // --- CALL STATE ---
  const [inCall, setInCall] = useState(false);
  const [callType, setCallType] = useState(null); // "video" or "voice"
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState({}); // { socketId: MediaStream }
  const peerConnections = useRef({}); // { socketId: RTCPeerConnection }

  // --- AUDIO RECORDING ---
  const startRecording = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasMic = devices.some((device) => device.kind === "audioinput");
      if (!hasMic) return alert("No microphone found!");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const file = new File([blob], `voice_${Date.now()}.webm`, {
          type: "audio/webm",
        });
        const formData = new FormData();
        formData.append("audio", file);
        try {
          await axios.post(
            `${API}/messages/voice/${groupId}/${chatbotId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        } catch (err) {
          console.error("Voice message upload failed:", err);
        }
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      alert("Unable to access microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // --- FETCH MESSAGES ---
  const fetchMessages = async () => {
    if (!groupId || !chatbotId) return;
    try {
      const res = await axios.get(`${API}/messages/${groupId}/${chatbotId}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
    }
  };

  // --- JOIN GROUP ---
  useEffect(() => {
    if (!groupId) return;
    joinGroup(groupId);
  }, [groupId]);

  // --- SOCKET LISTENERS ---
  useEffect(() => {
    audioRef.current = new Audio(notificationSound);

    const unsubscribeReceive = onGroupMessage((msg) => {
      if (String(msg.group_id) !== String(groupId)) return;
      setMessages((prev) => [...prev, msg]);
      if (String(msg.sender_id) !== String(currentUserId))
        audioRef.current?.play().catch(console.log);
    });

    socket.on("update_group_message", (updatedMsg) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === updatedMsg.id ? { ...m, ...updatedMsg } : m))
      );
    });

    socket.on("delete_group_message", ({ messageId }) => {
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    });

    socket.on("update_message_status", ({ messageId, status }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, status } : m))
      );
    });

    // --- CALL SIGNAL HANDLING ---
    onIncomingCall(async ({ groupId: incomingGroupId, type, callerId }) => {
      if (incomingGroupId !== groupId) return;
      const accept = confirm(
        `${type.toUpperCase()} call from ${callerId}. Accept?`
      );
      if (!accept) return;

      const stream = await getLocalStream(type);
      setCallType(type);
      setInCall(true);

      socket.emit("call:accept", { groupId: incomingGroupId });
    });

    onSignal(async ({ from, data }) => {
      let pc = peerConnections.current[from];
      if (!pc) {
        pc = createPeerConnection(from, localStream);
      }

      if (data.sdp) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (data.sdp.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          sendSignal({ groupId, to: from, data: { sdp: answer } });
        }
      } else if (data.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    socket.on("call:user-joined", ({ socketId }) => {
      if (!localStream) return;
      const pc = createPeerConnection(socketId, localStream);
      pc.createOffer().then(async (offer) => {
        await pc.setLocalDescription(offer);
        sendSignal({ groupId, to: socketId, data: { sdp: offer } });
      });
    });

    socket.on("call:end", () => {
      endCurrentCall();
    });

    return () => {
      unsubscribeReceive();
      socket.off("update_group_message");
      socket.off("delete_group_message");
      socket.off("update_message_status");
      socket.off("call:user-joined");
      socket.off("call:end");
    };
  }, [groupId, currentUserId, localStream]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [groupId]);

  // --- SEND MESSAGE ---
  const sendMessage = async () => {
    if (!text.trim() && !imageFile) return;
    const formData = new FormData();
    formData.append("message", text);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingMsgId) {
        await axios.put(
          `${API}/messages/owner/${editingMsgId}`,
          { message: text },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessages((prev) =>
          prev.map((m) =>
            m.id === editingMsgId ? { ...m, message: text, edited: true } : m
          )
        );
        setEditingMsgId(null);
      } else {
        await axios.post(
          `${API}/messages/owner/${groupId}/${chatbotId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setText("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (msgId) => {
    try {
      await axios.delete(`${API}/messages/owner/${msgId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m.id !== msgId));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditMessage = (msg) => {
    setText(msg.message);
    setEditingMsgId(msg.id);
  };

  // --- MARK SEEN ---
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.sender_id !== currentUserId && msg.status !== "seen") {
        socket.emit("mark-seen", { groupId, messageId: msg.id });
        msg.status = "seen";
      }
    });
  }, [messages]);

  // --- WEBRTC FUNCTIONS ---
  const getLocalStream = async (type) => {
    try {
      const constraints =
        type === "video"
          ? { video: true, audio: true }
          : { video: false, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      return stream;
    } catch (err) {
      console.error("Failed to access media devices:", err);
      if (err.name === "NotAllowedError") {
        alert("Permission denied: Please allow access to camera/microphone.");
      } else if (err.name === "NotFoundError") {
        alert("No camera/microphone found. Please connect one.");
      } else {
        alert(`Error accessing media devices: ${err.message}`);
      }
    }
  };

  const createPeerConnection = (socketId, stream) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    const remoteStream = new MediaStream();
    setRemoteStreams((prev) => ({ ...prev, [socketId]: remoteStream }));

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((t) => remoteStream.addTrack(t));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate)
        sendSignal({
          groupId,
          to: socketId,
          data: { candidate: event.candidate },
        });
    };

    peerConnections.current[socketId] = pc;
    return pc;
  };

  const initiateCall = async (type) => {
    const stream = await getLocalStream(type);
    setCallType(type);
    setInCall(true);
    startCall({ groupId, type, callerId: currentUserId });
  };

  const endCurrentCall = () => {
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    localStream?.getTracks().forEach((t) => t.stop());
    setInCall(false);
    setCallType(null);
    setLocalStream(null);
    setRemoteStreams({});
  };

  // --- JSX ---
  return (
    <div className="relative flex h-full rounded-xl overflow-hidden shadow">
      {editingMsgId && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      <div className="flex-1 flex flex-col relative z-00 bg-gray-100">
        {/* HEADER */}
        <div className="px-4 py-3 bg-white border-b flex justify-between items-center sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateBack()}
              className="p-1 rounded-full hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex flex-col">
              <h2 className="font-semibold text-gray-900 text-lg">
                {group?.name || "Group"}
              </h2>
              <p
                className="text-xs text-gray-500 cursor-pointer hover:underline"
                onClick={() => setShowMembers(true)}
              >
                {group?.members?.length || 0} members
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => initiateCall("video")}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="Video Call"
            >
              <Video size={20} />
            </button>
            <button
              onClick={() => initiateCall("voice")}
              className="p-2 rounded-full hover:bg-gray-200 transition"
              title="Voice Call"
            >
              <PhoneCall size={20} />
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => {
            const senderId = msg.sender_id?.id || msg.sender_id;
            const isMine = String(senderId) === String(currentUserId);

            return (
              <div
                id={`msg-${msg.id}`}
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[70%] px-4 py-2 rounded-2xl break-words shadow-sm ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none"
                  }`}
                >
                  {!isMine && (
                    <div className="text-[14px] font-semibold mb-1 text-gray-700">
                      {msg.sender_name}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">
                    {msg.message}{" "}
                    {msg.edited && (
                      <span className="text-[10px] text-gray-400 ml-1">
                        (edited)
                      </span>
                    )}
                  </div>
                  {msg.image && (
                    <img
                      src={`${BASE_URL}${msg.image}`}
                      onClick={() => setPreviewImage(`${BASE_URL}${msg.image}`)}
                      className="mt-2 rounded-lg max-w-[220px] cursor-pointer hover:scale-105 transition-transform"
                    />
                  )}
                  {isMine && (
                    <div className="flex gap-2 mt-1 justify-end text-[12px] opacity-70">
                      <button
                        onClick={() => startEditMessage(msg)}
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="px-4 py-3 bg-white border-t flex items-center gap-3 sticky bottom-0 z-50">
          <button
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={() => recording && stopRecording()}
            className={`p-3 rounded-full ${
              recording ? "bg-red-500" : "bg-gray-200"
            }`}
            title="Hold to Record"
          >
            <Mic size={20} />
          </button>
          <input
            className={`flex-1 rounded-full px-4 py-2 text-sm focus:outline-none ${
              editingMsgId ? "border-2 border-blue-500 bg-white" : "bg-gray-100"
            }`}
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <label className="cursor-pointer">
            <ImageIcon size={20} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white p-2 rounded-full"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* MEMBERS PANEL */}
      {showMembers && (
        <GroupMembersPanel
          chatbotId={chatbotId}
          groupId={groupId}
          onClose={() => setShowMembers(false)}
        />
      )}

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={30} />
          </button>
          <img src={previewImage} className="max-h-[90vh] rounded-lg" />
        </div>
      )}

      {/* VIDEO CALL UI */}
      {inCall && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center gap-2 p-4">
          <div className="flex gap-2 flex-wrap">
            {localStream && (
              <video
                autoPlay
                muted
                playsInline
                ref={(el) => el && (el.srcObject = localStream)}
                className="w-48 h-48 rounded-lg"
              />
            )}
            {Object.entries(remoteStreams).map(([id, stream]) => (
              <video
                key={id}
                autoPlay
                playsInline
                ref={(el) => el && (el.srcObject = stream)}
                className="w-48 h-48 rounded-lg"
              />
            ))}
          </div>
          <button
            onClick={endCurrentCall}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}
