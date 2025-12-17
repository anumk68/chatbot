import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Send, Image as ImageIcon, X } from "lucide-react";
import GroupMembersPanel from "./GroupMembersPanel.jsx";

const API = import.meta.env.VITE_NODE_BASE_URL + "/api";
const BASE_URL = import.meta.env.VITE_NODE_BASE_URL;

export default function GroupChatPanel({ group, currentUser }) {
  const chatbotId = localStorage.getItem("chatbotId");
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showMembers, setShowMembers] = useState(false);

  const bottomRef = useRef(null);

  const groupId = group?.group_id || group?.id;

  /* ================= FETCH MESSAGES ================= */
  const fetchMessages = async () => {
    if (!groupId || !chatbotId) return;

    try {
      const res = await axios.get(`${API}/messages/${groupId}/${chatbotId}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Fetch messages error:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [groupId, chatbotId]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= SEND MESSAGE ================= */
  const sendMessage = async () => {
    if (!text.trim() && !imageFile) return;

    try {
      const formData = new FormData();
      formData.append("message", text);
      if (imageFile) formData.append("image", imageFile);

      await axios.post(
        `${API}/messages/owner/${groupId}/${chatbotId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      setImageFile(null);
      fetchMessages();
    } catch (err) {
      console.error("Send message failed:", err);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex h-full relative bg-white rounded-xl overflow-hidden shadow">
      {/* ================= CHAT ================= */}
      <div className="flex-1 flex flex-col bg-[#f0f2f5]">
        {/* HEADER */}
        <div className="sticky top-0 z-10 px-4 py-3 bg-white border-b flex justify-between">
          <div>
            <h2 className="font-semibold">{group?.name || "Group"}</h2>
            <p
              className="text-xs text-gray-500 cursor-pointer hover:underline"
              onClick={() => setShowMembers(true)}
            >
              {group?.members?.length || 0} members
            </p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg, idx) => {
            const isMine =
              String(msg.sender_id) ===
              String(currentUser?.id || currentUser?.user_id);

            return (
              <div
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow
      ${
        isMine
          ? "bg-blue-600 text-white rounded-br-none ml-auto"
          : "bg-white text-gray-900 rounded-bl-none"
      }`}
                >
                  <div className="text-[11px] font-semibold opacity-70 mb-1">
                    {isMine ? "You" : msg.sender_name || "Unknown"}
                  </div>

                  {msg.message && <div>{msg.message}</div>}

                  {msg.image && (
                    <img
                      src={`${BASE_URL}${msg.image}`}
                      onClick={() => setPreviewImage(`${BASE_URL}${msg.image}`)}
                      className="mt-2 rounded-lg max-w-[220px] cursor-pointer hover:opacity-90 shadow"
                    />
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* IMAGE PREVIEW (SEND) */}
        {imageFile && (
          <div className="px-4 py-2 bg-gray-100 flex items-center gap-3">
            <img
              src={URL.createObjectURL(imageFile)}
              className="h-14 rounded-lg shadow"
            />
            <button onClick={() => setImageFile(null)} className="text-red-500">
              <X size={18} />
            </button>
          </div>
        )}

        {/* INPUT */}
        <div className="px-4 py-3 bg-white border-t flex items-center gap-3">
          <input
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <label className="cursor-pointer text-gray-500 hover:text-gray-700">
            <ImageIcon size={20} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                e.target.value = null;
              }}
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

      {/* ================= MEMBERS PANEL ================= */}
      {showMembers && (
        <GroupMembersPanel
          members={group?.members || []}
          onClose={() => setShowMembers(false)}
        />
      )}

      {/* ================= FULL IMAGE PREVIEW ================= */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={28} />
            </button>

            <img src={previewImage} className="max-h-[90vh] rounded-xl" />

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
}
