import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Send, Image as ImageIcon, X } from "lucide-react";
import { joinGroup, onGroupMessage } from "../../sockets/groupSocket";
import notificationSound from "../../assets/notification.mp3";

const API = import.meta.env.VITE_NODE_BASE_URL + "/api";
const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

const GroupChatModule = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingMsgId, setEditingMsgId] = useState(null);

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const chatbotId = localStorage.getItem("chatbotId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
  }, []);

  /* ================= CURRENT USER ================= */
  let currentUser = null;
  if (token) {
    try {
      currentUser = jwt_decode(token);
    } catch {
      console.error("Invalid token");
    }
  }

  if (!currentUser) {
    return <div className="p-4 text-red-500">User not logged in</div>;
  }

  /* ================= FETCH GROUPS ================= */
  const fetchGroups = async () => {
    const res = await axios.get(`${API}/groups/${chatbotId}`);
    const data = res.data.data || [];
    setGroups(
      data.map((g) => ({
        group_id: g.group_id,
        name: g.group_name,
        members: JSON.parse(g.members || "[]"),
      }))
    );
  };

  useEffect(() => {
    fetchGroups();
  }, [chatbotId]);

  /* ================= FETCH MESSAGES ================= */
  const fetchMessages = async (groupId) => {
    const res = await axios.get(`${API}/messages/${groupId}/${chatbotId}`);
    setMessages(res.data.messages || []);
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= GROUP CLICK ================= */
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    fetchMessages(group.group_id);
    joinGroup(group.group_id);
  };

  /* ================= SOCKET LISTENER ================= */
  useEffect(() => {
    if (!selectedGroup) return;

    const unsubscribe = onGroupMessage((msg) => {
      if (Number(msg.group_id) !== Number(selectedGroup.group_id)) return;

      setMessages((prev) => [...prev, msg]);

      if (Number(msg.sender_id) !== Number(currentUser.id)) {
        audioRef.current?.play().catch((err) => console.log("Audio play error:", err));
      }
    });

    return unsubscribe;
  }, [selectedGroup, currentUser.id]);

  /* ================= SEND / EDIT MESSAGE ================= */
  const handleSend = async () => {
    if (!newMessage.trim() && !imageFile) return;
    if (!selectedGroup) return;

    if (editingMsgId) {
      // Editing existing message
      await axios.put(
        `${API}/messages/owner/${editingMsgId}`,
        { message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === editingMsgId ? { ...m, message: newMessage, edited: true } : m
        )
      );
      setEditingMsgId(null);
    } else {
      // Sending new message
      const formData = new FormData();
      formData.append("message", newMessage);
      if (imageFile) formData.append("image", imageFile);

      await axios.post(
        `${API}/messages/${currentUser.role}/${selectedGroup.group_id}/${chatbotId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImageFile(null);
    }

    setNewMessage("");
  };

  const startEditMessage = (msg) => {
    setNewMessage(msg.message);
    setEditingMsgId(msg.id);
  };

  /* ================= UI ================= */
  return (
    <div className="flex h-full rounded-xl overflow-hidden bg-white shadow-lg">

      {/* ================= GROUP LIST ================= */}
      <div className="w-72 border-r bg-gray-50 overflow-y-auto">
        <h2 className="p-4 font-bold border-b">Groups</h2>
        {groups.map((g) => (
          <div
            key={g.group_id}
            onClick={() => handleGroupClick(g)}
            className={`px-4 py-3 cursor-pointer ${
              selectedGroup?.group_id === g.group_id
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-medium">{g.name}</div>
            <div className="text-xs text-gray-500">{g.members.length} members</div>
          </div>
        ))}
      </div>

      {/* ================= CHAT ================= */}
      <div className="flex-1 flex flex-col bg-[#f0f2f5]">
        {!selectedGroup ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a group
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="px-4 py-3 bg-white border-b font-semibold">
              {selectedGroup.name}
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => {
                const isMine = Number(msg.sender_id) === Number(currentUser.id);
                return (
                  <div
                    key={i}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg max-w-[70%] text-sm shadow ${
                        isMine ? "bg-blue-600 text-white" : "bg-white text-gray-900"
                      }`}
                    >
                      <div className="text-xs opacity-70 mb-1 flex justify-between items-center">
                        <span>{isMine ? "You" : msg.sender_name}</span>
                        <span className="ml-2 text-[10px] opacity-50">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div>
                        {msg.message}{" "}
                        {msg.edited && <span className="text-[10px] text-gray-400 ml-1">(edited)</span>}
                      </div>

                      {msg.image && (
                        <img
                          src={`${BASE_URL}${msg.image}`}
                          className="mt-2 rounded-lg max-w-[220px] cursor-pointer"
                          onClick={() => setPreviewImage(`${BASE_URL}${msg.image}`)}
                        />
                      )}

                      {isMine && (
                        <div className="flex justify-end gap-2 mt-1 text-[10px] opacity-50">
                          <button onClick={() => startEditMessage(msg)}>Edit</button>
                        </div>
                      )}

                      {/* Message status for own messages */}
                      {isMine && (
                        <div className="text-[10px] opacity-50 mt-1 flex justify-end gap-1">
                          {msg.status === "sent" && <span>✓</span>}
                          {msg.status === "delivered" && <span>✓✓</span>}
                          {msg.status === "seen" && <span className="text-blue-400">✓✓</span>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* ================= IMAGE PREVIEW BEFORE SEND ================= */}
            {imageFile && (
              <div className="px-4 py-2 bg-gray-100 flex items-center gap-3 border-t">
                <img
                  src={URL.createObjectURL(imageFile)}
                  className="h-14 w-14 object-cover rounded-lg"
                />
                <div className="flex-1 text-sm truncate">{imageFile.name}</div>
                <button
                  onClick={() => setImageFile(null)}
                  className="text-red-500"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* INPUT */}
            <div className="px-4 py-3 bg-white border-t flex items-center gap-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
                placeholder={editingMsgId ? "Editing message..." : "Type a message"}
              />

              <label className="cursor-pointer flex items-center justify-center p-2 hover:bg-gray-200 rounded-full transition">
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </label>

              <button
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ================= FULL IMAGE PREVIEW ================= */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img src={previewImage} className="max-h-[90vh]" />
        </div>
      )}
    </div>
  );
};

export default GroupChatModule;
