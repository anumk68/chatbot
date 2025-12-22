import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { inviteAgents } from "../../api/agentAuth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/authSlice.js";

import GroupChatPanel from "./groupchat/GroupChatPanel.jsx";

const chatbotId = localStorage.getItem("chatbotId");

const API_BASE = import.meta.env.VITE_NODE_BASE_URL + "/api";
const API = import.meta.env.VITE_NODE_BASE_URL;

export default function TeamPage() {
  const [owner, setOwner] = useState(null);
  const [agents, setAgents] = useState([]);
  const [chatbots, setChatbots] = useState([]);
  const [groups, setGroups] = useState([]);
  const [suspendedAgents, setSuspendedAgents] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("Agents");
  const [groupsAccordionOpen, setGroupsAccordionOpen] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmails, setInviteEmails] = useState([""]);
  const [selectedRoleForInvite, setSelectedRoleForInvite] = useState("Agent");
  const [selectedGroupForInvite, setSelectedGroupForInvite] = useState("");

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);

  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // modal input states
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [roleInput, setRoleInput] = useState("Agent");
  const [groupInput, setGroupInput] = useState("");

  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([null]);

  const [agentsList, setAgentsList] = useState([]);

  // groups state
  const [groupActionMenu, setGroupActionMenu] = useState(null);
  const [editGroupModal, setEditGroupModal] = useState(false);
  const [editGroupName, setEditGroupName] = useState("");
  const [groupToEdit, setGroupToEdit] = useState(null);

  const [showInviteSettings, setShowInviteSettings] = useState(false);

  const handleEditGroup = (group) => {
    setGroupToEdit(group);
    setEditGroupName(group.name);
    setEditGroupModal(true);
  };

  const handleUpdateGroup = async () => {
    if (!editGroupName.trim()) return toast.error("Group name required");

    try {
      await axios.put(`${API_BASE}/groups/update/${groupToEdit.id}`, {
        group_name: editGroupName,
      });

      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupToEdit.id ? { ...g, name: editGroupName } : g
        )
      );

      toast.success("Group updated");
      setEditGroupModal(false);
    } catch (err) {
      toast.error("Failed to update group");
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (!window.confirm("Delete this group permanently?")) return;

    try {
      await axios.delete(`${API}/api/delete/${groupId}/${chatbotId}`);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      setSelectedGroup(null);
      toast.success("Group deleted");
      console.log("Deleted group:", groupId);
      console.log("Updated groups list:", groups);
      console.log("Current selected group:", selectedGroup);
      console.log("Chatbot ID:", chatbotId);
    } catch (err) {
      toast.error("Failed to delete group");
    }
  };

  // fetch agents for selection in modal
  useEffect(() => {
    const chatbotId = localStorage.getItem("chatbotId");

    const fetchAgents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/agents/chatbot/${chatbotId}`);
        setAgentsList(res.data.agents || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load agents");
      }
    };

    fetchAgents();
  }, []);

  // sync modal inputs when agentToEdit changes
  useEffect(() => {
    if (agentToEdit) {
      setNameInput(agentToEdit.name);
      setEmailInput(agentToEdit.email);
      setRoleInput(agentToEdit.role);
      setGroupInput(agentToEdit.groups[0] || "");
    }
  }, [agentToEdit]);

  const getInitials = (name = "") => {
    if (!name) return "--";
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const normalizeAgent = (a) => {
    return {
      id: a.id ?? a._id ?? null,
      name: a.name || a.full_name || "Unnamed",
      email: a.email || "",
      role: a.role || "Agent",
      groups: a.groups
        ? Array.isArray(a.groups)
          ? a.groups
          : tryParseJSON(a.groups)
        : [],
      status: a.status || (a.is_invited ? "Pending" : "Offline"),
      statusColor:
        a.statusColor ||
        (a.status === "Accepting chats"
          ? "green"
          : a.status === "Invited" || a.status === "Pending"
          ? "yellow"
          : "gray"),

      chatLimit: a.chat_limit ?? a.chatLimit ?? 0,
      lastSeen: a.last_seen ?? a.lastSeen ?? "-",
      isCurrentUser: a.is_current_user || a.isCurrent || false,
      isInvited: a.is_invited || false,
    };
  };

  function tryParseJSON(str) {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  const filteredAgents = agents.filter((a) => {
    const term = searchText.toLowerCase();
    if (!term) return true;
    return (
      (a.name || "").toLowerCase().includes(term) ||
      (a.email || "").toLowerCase().includes(term) ||
      (getInitials(a.name) || "").toLowerCase().includes(term)
    );
  });

  const filteredChatbots = chatbots.filter((b) =>
    (b.name || "").toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setOwner({
          id: parsed.id ?? parsed._id ?? "owner",
          name: parsed.name ?? parsed.full_name ?? parsed.email ?? "You",
          email: parsed.email ?? "",
          role: "Owner",
          initials: getInitials(parsed.name ?? parsed.email ?? ""),
          isCurrentUser: true,
        });
      }
    } catch (e) {}

    const chatbotId = localStorage.getItem("chatbotId");
    if (!chatbotId) return;

    const fetchAll = async () => {
      try {
        // Agents
        const res = await axios.get(`${API_BASE}/agents/${chatbotId}`);
        const serverAgents = res.data?.agents ?? res.data ?? [];
        const normalized = serverAgents
          .map(normalizeAgent)
          .filter((a) => !a.isCurrentUser && a.status !== "blocked");
        setAgents(normalized);

        // Groups
        try {
          const gRes = await axios.get(`${API_BASE}/groups/${chatbotId}`);
          console.log("GROUP API RAW ", gRes.data);

          const serverGroups = Array.isArray(gRes.data?.data)
            ? gRes.data.data
            : [];

          const normalizedGroups = serverGroups.map((g) => ({
            id: g.group_id,
            name: g.group_name,
            members: Array.isArray(g.members)
              ? g.members
              : JSON.parse(g.members || "[]"),
            activeMembers: g.total_members || 0,
          }));

          console.log("NORMALIZED GROUPS ", normalizedGroups);
          setGroups(normalizedGroups);

          if (normalizedGroups.length && !selectedGroupForInvite) {
            setSelectedGroupForInvite(normalizedGroups[0].name);
          }
        } catch (e) {}

        // Chatbots
        try {
          // const bRes = await axios.get(`${API_BASE}/chatbots/${chatbotId}`);
          setChatbots(bRes.data?.chatbots ?? []);
        } catch (e) {}

        // Owner from server
        const serverOwner = serverAgents.find(
          (a) => a.is_current_user || a.isCurrent || a.is_current
        );
        if (serverOwner) {
          setOwner({
            id: serverOwner.id ?? serverOwner._id ?? "owner",
            name: serverOwner.name || serverOwner.full_name || "You",
            email: serverOwner.email || "",
            role: "Owner",
            initials: getInitials(serverOwner.name || serverOwner.email || ""),
            isCurrentUser: true,
          });
          setAgents((prev) =>
            prev.filter((a) => a.email !== serverOwner.email)
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  const handleDetailsToggle = () => setIsDetailsOpen(!isDetailsOpen);

  const handleOpenEditAgent = (agent) => {
    setAgentToEdit(agent);
    setEditPopupOpen(true);
  };
  const handleCloseEditAgent = () => {
    setAgentToEdit(null);
    setEditPopupOpen(false);
  };

  const handleSaveEdit = async (agentId, updatedData) => {
    try {
      const res = await axios.put(
        `${API_BASE}/agents/edit/${agentId}`,
        updatedData
      );
      toast.success(res.data.message);
      setAgents((prev) =>
        prev.map((a) => (a.id === agentId ? { ...a, ...updatedData } : a))
      );
      handleCloseEditAgent();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update agent");
    }
  };

  const handleLogoutAgent = async (id) => {
    const agent = agents.find((a) => a.id === id);
    if (!agent) return;

    if (agent.isCurrentUser) {
      toast.error("You cannot remove yourself.");
      return;
    }

    if (
      window.confirm(
        `Suspend ${agent.name}? They cannot login again until unblocked.`
      )
    ) {
      setAgents((prev) => prev.filter((a) => a.id !== id));
      setSuspendedAgents((prev = []) => [...prev, agent]);
      if (selectedAgent?.id === id) {
        setSelectedAgent(null);
        setIsDetailsOpen(false);
      }
      try {
        const res = await axios.put(`${API_BASE}/agents/suspend/${id}`);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Error suspending agent");
      }
      toast.success(`${agent.name} has been suspended.`);
    }
  };

  const handleRemoveSuspendedAgent = (id) => {
    const agent = suspendedAgents.find((a) => a.id === id);
    if (!agent) return;
    if (window.confirm(`Permanently remove suspended agent ${agent.name}?`)) {
      setSuspendedAgents((prev) => prev.filter((a) => a.id !== id));
      if (selectedAgent?.id === id) {
        setSelectedAgent(null);
        setIsDetailsOpen(false);
      }
      toast.error(`${agent.name} removed permanently.`);
    }
  };

  const handleRestoreSuspendedAgent = async (id) => {
    const agent = suspendedAgents.find((a) => a.id === id);
    if (!agent) return;

    if (window.confirm(`Restore suspended agent ${agent.name}?`)) {
      setSuspendedAgents((prev) => prev.filter((a) => a.id !== id));
      setAgents((prev) => [...prev, agent]);

      try {
        const res = await axios.put(`${API_BASE}/agents/restore/${id}`);
        console.log(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Error restoring agent in DB");
        return;
      }

      toast.success(`${agent.name} restored & activated.`);
      loadSuspendedAgents();
    }
  };

  const fetchSuspendedAgents = async () => {
    try {
      const chatbotId = localStorage.getItem("chatbotId");
      const res = await axios.get(`${API_BASE}/agents/suspended/${chatbotId}`);
      return res.data;
    } catch (err) {
      return { success: false };
    }
  };

  const loadSuspendedAgents = async () => {
    const res = await fetchSuspendedAgents();
    if (res.success) setSuspendedAgents(res.suspendedAgents || []);
  };

  useEffect(() => {
    loadSuspendedAgents();
  }, []);

  const handleSelectItem = (item) => {
    if (currentTab === "Agents" || currentTab === "Suspended") {
      setSelectedAgent(item);
      setSelectedChatbot(null);
      setSelectedGroup(null);
      if (currentTab === "Suspended") loadSuspendedAgents();
    } else if (currentTab === "Chatbots") {
      setSelectedChatbot(item);
      setSelectedAgent(null);
      setSelectedGroup(null);
    } else if (currentTab === "Groups") {
      setSelectedGroup(item);
      setSelectedAgent(null);
      setSelectedChatbot(null);
    }
    setIsDetailsOpen(true);
  };

  const tabBtnClass = (tab) =>
    `cursor-pointer py-2 border-b-2 ${
      currentTab === tab
        ? "border-blue-600 text-blue-600 font-semibold"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  const handleSendInvites = async () => {
    const validEmails = inviteEmails.map((e) => e.trim()).filter(Boolean);
    if (!validEmails.length) {
      return toast.error("Please enter at least one email.");
    }

    const chatbot = localStorage.getItem("chatbotId");

    // 🔢 TOTAL AGENTS (existing + new)
    const totalAgentsAfterInvite = agents.length + validEmails.length;

    // 🔐 1 agent free, >1 paid
    if (totalAgentsAfterInvite > 1) {
      try {
        // 👉 ICICI PAYMENT INIT
        const payRes = await axios.post(`${API_BASE}/icici/create-payment`, {
          agentCount: validEmails.length,
          chatbotId: chatbot,
          emails: validEmails, // save for post-payment invite
          role: selectedRoleForInvite,
          group: selectedGroupForInvite,
        });

        // 🔁 REDIRECT TO ICICI PAYMENT PAGE
        window.location.href = payRes.data.paymentUrl;
        return;
      } catch (err) {
        console.error(err);
        return toast.error("Unable to redirect to payment gateway");
      }
    }

    // ✅ FREE FLOW (ONLY 1 AGENT)
    const payload = {
      emails: validEmails,
      role: selectedRoleForInvite,
      group: selectedGroupForInvite,
      chatbotId: chatbot,
      adminChatbotId: chatbot,
    };

    try {
      const res = await inviteAgents(payload);

      const added = validEmails.map((email, i) => ({
        id: `invited-${Date.now()}-${i}`,
        name: email.split("@")[0],
        email,
        role: selectedRoleForInvite,
        groups: [selectedGroupForInvite],
        status: "Invited",
        statusColor: "yellow",
        isInvited: true,
      }));

      setAgents((prev) => [...added, ...prev]);
      toast.success(res?.data?.message || "Invites sent successfully!");
      setShowInviteModal(false);
      setInviteEmails([""]);
      setSelectedRoleForInvite("Agent");
      setSelectedGroupForInvite(groups[0]?.name || "");
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to send invites: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  const handlegroupModalOpen = () => setGroupModal(true);

  // GROUP FUNCTIONS
  const handleMemberChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleAddMember = () => setMembers([...members, null]);
  const handleRemoveMember = (index) =>
    setMembers(members.filter((_, i) => i !== index));

  // Fetch all groups for the current chatbot
const fetchGroups = async () => {
  try {
    const chatbotId = localStorage.getItem("chatbotId");
    const res = await axios.get(`${API_BASE}/groups/${chatbotId}`);
    const serverGroups = res.data?.data ?? []; // <-- use 'data' from backend

    setGroups(
      serverGroups.map((g) => ({
        id: g.group_id,
        name: g.group_name,
        description: g.description ?? "",
        members: g.members || [],
        activeMembers: g.activeMembers || 0,
        totalChats: g.total_chats || 0,
        goals: g.goals || 0,
        satisfaction: g.satisfaction ?? "n/a",
      }))
    );
  } catch (err) {
    toast.error("Failed to fetch groups");
    console.error(err);
  }
};


  // Create group submit
  const handleSubmit = async () => {
    if (!groupName.trim()) return toast.error("Group name is required");

    const chatbotId = localStorage.getItem("chatbotId");
    const payload = {
      group_name: groupName,
      members: members.filter(Boolean),
      chatbot_id: chatbotId,
    };

    try {
      const res = await axios.post(`${API_BASE}/create/${chatbotId}`, payload);
      toast.success("Group created");

      // Add new group at top
      const newGroup = {
        id: res.data?.group?.id ?? `new-${Date.now()}`,
        name: groupName,
        description: res.data?.group?.description || "",
        members: members.filter(Boolean),
        activeMembers: members.filter(Boolean).length,
        totalChats: 0,
        goals: 0,
        satisfaction: "n/a",
      };

      setGroups((prev) => [newGroup, ...prev]);

      // Reset form
      setGroupModal(false);
      setGroupName("");
      setMembers([null]);

      // Sync with server
      fetchGroups();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create group");
    }
  };

  // Helper to convert member IDs to names
  const getAgentNameById = (id) => {
    const agent = agentsList.find((a) => a.id === id);
    return agent ? agent.name : id;
  };

  // ======= JSX RETURN =======
  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white relative overflow-hidden">
      {/* Left Panel */}
      <div className="flex-1 p-4 md:p-6 flex flex-col">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-2 md:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-500">
            Digi Rush Chat Team
          </h1>
          <button
            onClick={() => setShowInviteSettings(true)}
            className="text-sm sm:text-lg text-blue-600 hover:underline"
          >
            Invite settings ↗
          </button>
          {showInviteSettings && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                  onClick={() => setShowInviteSettings(false)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold mb-2">Invite via Link</h2>
                <p className="text-sm text-gray-500 mb-4">
                  Share this link to invite agents to your chatbot
                </p>

                {/* URL Box */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}`}
                    className="flex-1 border rounded-md p-2 text-sm bg-gray-50"
                  />

                  <button
                    onClick={() => {
                      const url = `${window.location.origin}`;
                      navigator.clipboard.writeText(url);
                      toast.success("Invite link copied!");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Anyone with this link can request access.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap md:flex-nowrap space-x-2 md:space-x-6 border-b pb-2 mb-4 select-none">
          {["Agents", "Chatbots", "Groups", "Suspended"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
                setIsDetailsOpen(false);
                setSelectedAgent(null);
                setSelectedChatbot(null);
                setSelectedGroup(null);
                setSearchText("");
                if (tab === "Suspended") loadSuspendedAgents();
              }}
              className={tabBtnClass(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search + Invite */}
        {(currentTab === "Agents" || currentTab === "Chatbots") && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
            <div className="relative w-full sm:w-1/3">
              <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${currentTab.toLowerCase()}`}
                className="w-full pl-8 pr-3 py-2 border rounded-md text-sm"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                if (currentTab === "Agents") {
                  setShowInviteModal(true);
                  setInviteEmails([""]);
                  setSelectedRoleForInvite("Agent");
                  setSelectedGroupForInvite(groups[0]?.name || "");
                } else {
                  toast.success(`Add new ${currentTab.toLowerCase()}`);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              + Invite {currentTab.toLowerCase()}
            </button>
          </div>
        )}

        {/* Groups New Button */}
        {currentTab === "Groups" && (
          <button
            className="new-group bg-blue-600 cursor-pointer w-full sm:w-[200px] text-white px-5 py-3 flex items-center gap-2 font-semibold text-lg rounded hover:bg-blue-700 transition mb-5"
            onClick={handlegroupModalOpen}
          >
            <Plus className="w-5 h-5" /> New Group
          </button>
        )}

        {/* Content List */}
        <div className="overflow-auto flex-1">
          {/* Agents / Chatbots Add New */}
          {(currentTab === "Agents" || currentTab === "Chatbots") && (
            <div
              className="grid grid-cols-1 items-center py-3 hover:bg-gray-50 cursor-pointer border-b mb-2"
              onClick={() => {
                if (currentTab === "Agents") {
                  setShowInviteModal(true);
                  setInviteEmails([""]);
                  setSelectedRoleForInvite("Agent");
                  setSelectedGroupForInvite(groups[0]?.name || "");
                } else {
                  toast.error(`Add new ${currentTab.toLowerCase()}`);
                }
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-400 rounded-full">
                  <Plus className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-gray-700 text-lg font-medium">
                  Add new {currentTab === "Agents" ? "agent" : "chatbot"}
                </span>
              </div>
            </div>
          )}

          {currentTab === "Agents" && (
            <>
              {owner && (
                <AgentItem
                  key={owner.id}
                  agent={{ ...owner, status: "active", statusColor: "green" }}
                  onSelect={() => handleSelectItem(owner)}
                  onLogout={() => toast.error("You cannot remove yourself.")}
                  onEdit={() =>
                    toast.error("Owner profile editing is disabled.")
                  }
                  isSelected={selectedAgent?.id === owner.id}
                  getInitials={getInitials}
                />
              )}

              {filteredAgents.map((agent) => (
                <AgentItem
                  key={agent.id}
                  agent={agent}
                  onSelect={() => handleSelectItem(agent)}
                  onLogout={() => handleLogoutAgent(agent.id)}
                  onEdit={() => handleOpenEditAgent(agent)}
                  isSelected={selectedAgent?.id === agent.id}
                  getInitials={getInitials}
                />
              ))}
            </>
          )}

          {currentTab === "Chatbots" &&
            filteredChatbots.map((bot) => (
              <ChatbotItem
                key={bot.id}
                chatbot={bot}
                onSelect={() => handleSelectItem(bot)}
                isSelected={selectedChatbot?.id === bot.id}
              />
            ))}

          {currentTab === "Groups" &&
            groups.map((group) => (
              <div
                key={group.id}
                className={`group-card flex justify-between items-center p-4 rounded-lg mb-3 border hover:shadow transition cursor-pointer ${
                  selectedGroup?.id === group.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleSelectItem(group)}
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold text-gray-800 text-lg capitalize">
                    {group.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {group.members.length} members
                  </p>
                </div>

                {/* RIGHT */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroupActionMenu(
                        groupActionMenu === group.id ? null : group.id
                      );
                    }}
                    className="p-2 rounded hover:bg-gray-200"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {groupActionMenu === group.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditGroup(group);
                          setGroupActionMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id);
                          setGroupActionMenu(null);
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

          {editGroupModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Group</h3>

                <input
                  value={editGroupName}
                  onChange={(e) => setEditGroupName(e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                  placeholder="Group name"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditGroupModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateGroup}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Group modal */}
          {groupModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4">Create New Group</h3>
                <input
                  type="text"
                  placeholder="Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                {members.map((m, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <select
                      className="flex-1 p-2 border rounded"
                      value={m || ""}
                      onChange={(e) => handleMemberChange(idx, e.target.value)}
                    >
                      <option value="">Select Agent</option>
                      {agentsList.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleRemoveMember(idx)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  className="text-blue-500 mb-4"
                  onClick={handleAddMember}
                >
                  + Add Member
                </button>
                <div className="flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => setGroupModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentTab === "Suspended" &&
            Array.isArray(suspendedAgents) &&
            suspendedAgents.map((agent) => (
              <SuspendedAgentItem
                key={agent.id}
                agent={agent}
                onSelect={() => handleSelectItem(agent)}
                onRemove={() => handleRemoveSuspendedAgent(agent.id)}
                onRestore={() => handleRestoreSuspendedAgent(agent.id)}
                isSelected={selectedAgent?.id === agent.id}
              />
            ))}

          {groupModal && (
            <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-[450px] p-6 relative">
                {/* FIXED CLOSE BUTTON */}
                <button
                  onClick={() => setGroupModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold mb-4">
                  Create a New Group
                </h2>

                {/* Group Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Support team"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm"
                  />
                </div>

                {/* Members */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Add members
                  </label>

                  <div className="space-y-2">
                    {members.map((memberId, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <select
                          value={memberId || ""}
                          onChange={(e) =>
                            handleMemberChange(idx, e.target.value)
                          }
                          className="flex-1 border rounded-md p-2 text-sm"
                        >
                          <option value="">Select agent</option>
                          {agentsList.map((agent) => (
                            <option key={agent.id} value={agent.id}>
                              {agent.name} {agent.email}
                            </option>
                          ))}
                        </select>

                        {members.length > 1 && (
                          <button
                            onClick={() => handleRemoveMember(idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {members.length < 10 && (
                    <button
                      onClick={handleAddMember}
                      className="mt-2 text-blue-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add another member
                    </button>
                  )}
                </div>

                {/* Create Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  Create Group
                </button>
              </div>
            </div>
          )}

          {((currentTab === "Agents" && (agents?.length || 0) === 0) ||
            (currentTab === "Chatbots" && (chatbots?.length || 0) === 0) ||
            (currentTab === "Groups" && (groups?.length || 0) === 0) ||
            (currentTab === "Suspended" &&
              (suspendedAgents?.length || 0) === 0)) && (
            <div className="text-center text-gray-400 mt-20">
              No {currentTab.toLowerCase()} found.
            </div>
          )}
        </div>
      </div>

      {/* Right Detail Panel */}
      <div
        className={`fixed md:relative top-0 right-0 h-full p-6 overflow-y-auto transition-all duration-300 shadow-lg bg-white md:bg-transparent z-20 ${
          isDetailsOpen
            ? "w-full md:w-1/3 opacity-100"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        style={{ backdropFilter: isDetailsOpen ? "blur(6px)" : "none" }}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 z-9 cursor-pointer "
          onClick={handleDetailsToggle}
        >
          <X className="w-6 h-6" />
        </button>
        {isDetailsOpen && (
          <>
            {currentTab === "Agents" && selectedAgent && (
              <AgentProfile
                agent={selectedAgent}
                groupsAccordionOpen={groupsAccordionOpen}
                setGroupsAccordionOpen={setGroupsAccordionOpen}
                getInitials={getInitials}
              />
            )}
            {currentTab === "Chatbots" && selectedChatbot && (
              <ChatbotProfile chatbot={selectedChatbot} />
            )}
            {currentTab === "Groups" && selectedGroup && (
              <GroupChatPanel
                group={selectedGroup}
                currentUser={owner || user}
                chatbotId={localStorage.getItem("chatbotId")}
              />
            )}
            {currentTab === "Suspended" && selectedAgent && (
              <SuspendedAgentProfile agent={selectedAgent} />
            )}
          </>
        )}
        {!isDetailsOpen && (
          <div className="text-center text-gray-400 mt-20">
            Select an item to see details
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Invite New Agents</h2>

            {/* Email Inputs */}
            <div className="space-y-3 mb-4">
              {inviteEmails.map((email, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder={`Agent ${idx + 1} Email`}
                    value={email}
                    onChange={(e) => {
                      const updated = [...inviteEmails];
                      updated[idx] = e.target.value;
                      setInviteEmails(updated);
                    }}
                    className="flex-1 border rounded-md p-2 text-sm"
                  />
                  {inviteEmails.length > 1 && (
                    <button
                      onClick={() =>
                        setInviteEmails(
                          inviteEmails.filter((_, i) => i !== idx)
                        )
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {inviteEmails.length < 6 && (
                <button
                  onClick={() => setInviteEmails([...inviteEmails, ""])}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add another email
                </button>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={selectedRoleForInvite}
                onChange={(e) => setSelectedRoleForInvite(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              >
                <option value="Agent">Agent</option>
                <option value="Owner">Owner</option>
              </select>
            </div>

            {/* Group Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign to Group
              </label>
              <select
                value={selectedGroupForInvite}
                onChange={(e) => setSelectedGroupForInvite(e.target.value)}
                className="w-full border rounded-md p-2 text-sm"
              >
                {groups.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.group_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendInvites}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Send Invites
            </button>
          </div>
        </div>
      )}

      {/* Edit Agent Modal */}
      {editPopupOpen && agentToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] relative">
            <button
              onClick={handleCloseEditAgent}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Agent</h2>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <select
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            >
              <option value="Agent">Agent</option>
              <option value="Owner">Owner</option>
            </select>
            <select
              value={groupInput}
              onChange={(e) => setGroupInput(e.target.value)}
              className="w-full border rounded-md p-2 mb-6"
            >
              {groups.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-600 text-white px-5 py-3 rounded"
              onClick={() =>
                handleSaveEdit(agentToEdit.id, {
                  name: nameInput,
                  email: emailInput,
                  role: roleInput,
                  groups: [groupInput],
                })
              }
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Sub Components ---------- */

function AgentItem({
  agent,
  onSelect,
  onLogout,
  onEdit,
  isSelected,
  getInitials,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const statusColors = {
    green: "bg-green-500",
    gray: "bg-gray-400",
    yellow: "bg-yellow-400",
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      onClick={onSelect}
      className={`grid grid-cols-12 items-center py-3 px-2 rounded-md hover:bg-gray-100 transition cursor-pointer ${
        isSelected ? "bg-blue-50 border-blue-400 border" : ""
      }`}
    >
      <div className="col-span-5 flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full ${
            statusColors[agent.statusColor] || "bg-gray-300"
          } flex items-center justify-center text-white text-xl font-semibold`}
        >
          {agent.initials || getInitials(agent.name)}
        </div>
        <div>
          <p className="font-medium text-lg text-gray-800">{agent.name}</p>
          <p className="text-sm text-gray-500">{agent.email}</p>
        </div>
      </div>
      <div className="col-span-3 text-center">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded ${
            agent.role === "Owner"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {agent.role}
        </span>
      </div>
      <div className="col-span-3 flex items-center space-x-2">
        <span
          className={`w-2 h-2 rounded-full ${
            statusColors[agent.statusColor] || "bg-gray-400"
          }`}
        ></span>
        <span className="text-sm text-gray-700">{agent.status}</span>
      </div>
      <div className="col-span-1 flex justify-end relative" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1 rounded hover:bg-gray-200"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-6 w-40 bg-white border shadow-lg rounded-md z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Edit Profile
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
            >
              Log out / Suspend
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatbotItem({ chatbot, onSelect, isSelected }) {
  const statusColors = { green: "bg-green-500", gray: "bg-gray-400" };
  return (
    <div
      onClick={onSelect}
      className={`grid grid-cols-12 items-center py-3 px-2 rounded-md hover:bg-gray-100 transition cursor-pointer ${
        isSelected ? "bg-blue-50 border-blue-400 border" : ""
      }`}
    >
      <div className="col-span-6 font-medium text-gray-800">{chatbot.name}</div>
      <div className="col-span-4 flex items-center space-x-2">
        <span
          className={`w-2 h-2 rounded-full ${
            statusColors[chatbot.statusColor] || "bg-gray-400"
          }`}
        ></span>
        <span className="text-sm text-gray-700">{chatbot.status}</span>
      </div>
      <div className="col-span-2 text-right text-xs text-gray-500 italic">
        {chatbot.description}
      </div>
    </div>
  );
}

function GroupItem({ group, onSelect, isSelected, getAgentNameById }) {
  const displayedMembers = (group.members || []).slice(0, 3);
  const remainingCount = (group.members || []).length - displayedMembers.length;

  return (
    <div
      onClick={onSelect}
      className={`py-3 px-4 cursor-pointer rounded-md hover:bg-gray-100 transition ${
        isSelected ? "bg-blue-50 border-blue-400 border" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-gray-800">{group.name}</p>
          <p className="text-xs text-gray-500">
            {group.activeMembers}/{group.members.length} accepting chats
          </p>
        </div>
        <div className="flex items-center -space-x-2">
          {displayedMembers.map((id) => (
            <div
              key={id}
              className="w-6 h-6 rounded-full bg-gray-300 border border-white flex items-center justify-center text-xs text-white font-semibold"
              title={getAgentNameById(id)}
            >
              {getAgentNameById(id)
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="w-6 h-6 rounded-full bg-gray-400 border border-white flex items-center justify-center text-xs text-white font-semibold">
              +{remainingCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuspendedAgentItem({ agent, onSelect, onRestore, isSelected }) {
  return (
    <div
      onClick={onSelect}
      className={`grid grid-cols-12 items-center py-3 px-2 rounded-md hover:bg-gray-100 transition cursor-pointer ${
        isSelected ? "bg-blue-50 border-blue-400 border" : ""
      }`}
    >
      <div className="col-span-5 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
          {agent.initials}
        </div>
        <div>
          <p className="font-medium text-gray-800">{agent.name}</p>
          <p className="text-xs text-gray-500">{agent.email}</p>
        </div>
      </div>
      <div className="col-span-3 text-center">
        <span className="px-3 py-1 text-xs font-semibold rounded bg-gray-300 text-gray-700">
          Suspended
        </span>
      </div>
      <div className="col-span-4 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRestore();
          }}
          className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
        >
          Restore
        </button>
      </div>
    </div>
  );
}

/* ---------- Profile Panels ---------- */
function AgentProfile({ agent, getInitials }) {
  const [groupsAccordionOpen, setGroupsAccordionOpen] = useState(false);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-2">Agent Details</h2>

      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          {agent.initials || getInitials(agent.name)}
        </div>
        <div>
          <p className="text-lg font-semibold capitalize">{agent.name}</p>
          <p className="text-sm text-gray-500">{agent.email}</p>
        </div>
      </div>

      <p>
        <strong className="capitalize">Role:</strong> {agent.role}
      </p>
      <p>
        <strong className="capitalize">Status:</strong> {agent.status}
      </p>
      <p>
        <strong className="capitalize">Chat Limit:</strong> {agent.chatLimit}
      </p>
      <p>
        <strong className="capitalize">Last Seen:</strong> {agent.lastSeen}
      </p>

      {/* Groups Accordion */}
      <div className="mt-4">
        <button
          className="flex items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-md text-left"
          onClick={() => setGroupsAccordionOpen(!groupsAccordionOpen)}
        >
          <span className="font-medium">Groups</span>
          {groupsAccordionOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {groupsAccordionOpen && (
          <ul className="mt-2 ml-4 list-disc">
            {(agent.groups || []).map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ChatbotProfile({ chatbot }) {
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        className="flex items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-md text-left"
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <span className="font-semibold">Chatbot Details</span>
        {detailsOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {detailsOpen && (
        <div className="mt-2 ml-2 space-y-1">
          <p>
            <strong>Name:</strong> {chatbot.name}
          </p>
          <p>
            <strong>Status:</strong> {chatbot.status}
          </p>
          <p>
            <strong>Description:</strong> {chatbot.description}
          </p>
        </div>
      )}
    </div>
  );
}

function GroupProfile({ group, getAgentNameById }) {
  const [membersAccordionOpen, setMembersAccordionOpen] = useState(false);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-2">Group Details</h2>
      <p>
        <strong>Name:</strong> {group.name}
      </p>
      <p>
        <strong>Description:</strong> {group.description}
      </p>

      {/* Members Accordion */}
      <div className="mt-2">
        <button
          className="flex items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-md text-left"
          onClick={() => setMembersAccordionOpen(!membersAccordionOpen)}
        >
          <span className="font-medium">Members</span>
          {membersAccordionOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {membersAccordionOpen && (
          <ul className="mt-2 ml-4 list-disc">
            {(group.members || []).map((m) => (
              <li key={m}>{getAgentNameById(m)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SuspendedAgentProfile({ agent }) {
  const [detailsOpen, setDetailsOpen] = useState(true);

  return (
    <div className="space-y-3">
      <button
        className="flex items-center justify-between w-full px-2 py-1 bg-gray-100 rounded-md text-left"
        onClick={() => setDetailsOpen(!detailsOpen)}
      >
        <span className="font-semibold">Suspended Agent</span>
        {detailsOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {detailsOpen && (
        <div className="mt-2 ml-2 space-y-1">
          <p>
            <strong>Name:</strong> {agent.name}
          </p>
          <p>
            <strong>Email:</strong> {agent.email}
          </p>
          <p>
            <strong>Status:</strong> Suspended
          </p>
        </div>
      )}
    </div>
  );
}
