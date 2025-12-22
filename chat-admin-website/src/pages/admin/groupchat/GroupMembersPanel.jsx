import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function GroupMembersPanel({ onClose, chatbotId, groupId }) {
  const [members, setMembers] = useState([]);
  const API_URI = import.meta.env.VITE_NODE_BASE_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      if (!chatbotId || !groupId) return;

      try {
        console.log("Fetching members for group:", groupId, "chatbot:", chatbotId);
        const res = await axios.get(`${API_URI}/api/group-members/${groupId}/${chatbotId}`);
        console.log("API response:", res.data);
        if (res.data.success) setMembers(res.data.members);
      } catch (err) {
        console.error("Error fetching members:", err);
      }
    };

    fetchMembers();
  }, [chatbotId, groupId]);

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg border-l flex flex-col z-50">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-semibold">Group Members</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {members.length === 0 && <p className="text-gray-400">No members</p>}
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
              {member.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{member.name}</span>
              <span className="text-xs text-gray-500">{member.role} | {member.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
