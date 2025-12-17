import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Send, Image as ImageIcon, X } from "lucide-react";

const API = import.meta.env.VITE_NODE_BASE_URL + "/api";
const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

const GroupChatModule = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const messagesEndRef = useRef(null);

  const chatbotId = localStorage.getItem("chatbotId");
  const token = localStorage.getItem("token");

  /* ================= CURRENT USER ================= */
  let currentUser = null;
  if (token) {
    try {
      currentUser = jwt_decode(token); // { id, name, role }
    } catch {
      console.error("Invalid token");
    }
  }

  if (!currentUser) {
    return <div className="p-4 text-red-500">User not logged in</div>;
  }

  /* ================= FETCH GROUPS ================= */
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/groups/${chatbotId}`);
      const data = res.data.data || [];
      setGroups(
        data.map((g) => ({
          group_id: g.group_id,
          name: g.group_name || "Unnamed Group",
          members: Array.isArray(g.members)
            ? g.members
            : JSON.parse(g.members || "[]"),
        }))
      );
    } catch (err) {
      console.error("Fetch groups error:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [chatbotId]);

  /* ================= FETCH MESSAGES ================= */
  const fetchMessages = async (groupId) => {
    try {
      const res = await axios.get(`${API}/messages/${groupId}/${chatbotId}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= GROUP CLICK ================= */
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    fetchMessages(group.group_id);
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = async () => {
    if (!newMessage.trim() && !imageFile) return;
    if (!selectedGroup) return;

    try {
      const formData = new FormData();
      formData.append("message", newMessage);
      if (imageFile) formData.append("image", imageFile);

      await axios.post(
        `${API}/messages/agent/${selectedGroup.group_id}/${chatbotId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewMessage("");
      setImageFile(null);
      fetchMessages(selectedGroup.group_id);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };

  /* ================= UI ================= */
  return (
  <div className="flex h-full rounded-xl overflow-hidden bg-white shadow-lg">

    {/* ================= GROUP LIST ================= */}
    <div className="w-72 border-r bg-gray-50 overflow-y-auto">
      <h2 className="p-4 font-bold border-b text-gray-700">Groups</h2>

      {groups.map((group) => (
        <div
          key={group.group_id}
          onClick={() => handleGroupClick(group)}
          className={`px-4 py-3 cursor-pointer transition ${
            selectedGroup?.group_id === group.group_id
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="font-medium text-sm">{group.name}</div>
          <div className="text-xs text-gray-500">
            {group.members.length} members
          </div>
        </div>
      ))}
    </div>

    {/* ================= CHAT PANEL ================= */}
    <div className="flex-1 flex flex-col bg-[#f0f2f5]">

      {!selectedGroup ? (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a group to start chatting
        </div>
      ) : (
        <>
          {/* ================= HEADER ================= */}
          <div className="sticky top-0 z-10 px-4 py-3 bg-white border-b flex items-center">
            <div className="font-semibold text-gray-800">
              {selectedGroup.name}
            </div>
          </div>

          {/* ================= MESSAGES ================= */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, idx) => {
              const isMine =
                Number(msg.sender_id) === Number(currentUser.id);

              return (
                <div
                  key={idx}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative px-3 py-2 rounded-lg max-w-[70%] text-sm shadow
                      ${
                        isMine
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white text-gray-900 rounded-bl-none"
                      }`}
                  >
                    <div className="text-[11px] font-semibold opacity-70 mb-1">
                      {isMine ? "You" : msg.sender_name}
                    </div>

                    {msg.message && <div>{msg.message}</div>}

                    {msg.image && (
                      <img
                        src={`${BASE_URL}${msg.image}`}
                        onClick={() =>
                          setPreviewImage(`${BASE_URL}${msg.image}`)
                        }
                        className="mt-2 rounded-lg max-w-[220px] cursor-pointer hover:opacity-90 shadow"
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* ================= IMAGE PREVIEW (SEND) ================= */}
          {imageFile && (
            <div className="px-4 py-2 bg-gray-100 flex items-center gap-3">
              <img
                src={URL.createObjectURL(imageFile)}
                className="h-14 rounded-lg shadow"
              />
              <button
                onClick={() => setImageFile(null)}
                className="text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* ================= INPUT ================= */}
          <div className="px-4 py-3 bg-white border-t flex items-center gap-3">
            <input
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <label className="cursor-pointer text-gray-500 hover:text-gray-700">
              <ImageIcon size={20} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>

            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-full"
            >
              <Send size={18} />
            </button>
          </div>
        </>
      )}
    </div>

    {/* ================= FULLSCREEN IMAGE ================= */}
    {previewImage && (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <div className="relative">
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute -top-10 right-0 text-white"
          >
            <X size={28} />
          </button>

          <img
            src={previewImage}
            className="max-h-[90vh] rounded-xl"
          />

          <a
            href={previewImage}
            download
            className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded shadow"
          >
            Download
          </a>
        </div>
      </div>
    )}
  </div>
);

};

export default GroupChatModule;
