import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  connectSocket,
  disconnectSocket,
  onAgentOnline,
  onAgentOffline,
  onCustomerOnline,
  onCustomerOffline,
  onNewAssignment,
} from "../../sockets/adminSocket.js";

import assignCustomer from "../../sockets/agentSocket.js";

import axios from "axios";
import {
  fetchAssignedPairs,
  assignAgentToCustomer,
  deleteAssignedPair as apiDeleteAssignedPair,
} from "../admin/assignmentApi.js";

import socket from "../../sockets/adminSocket.js";


const AssignCustomers = () => {
  const [agents, setAgents] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [assignedPairs, setAssignedPairs] = useState([]);

  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const adminChatbotId = localStorage.getItem("chatbotId");
  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

  // Fetch Assigned
  const fetchAssigned = async () => {
    try {
      const res = await fetchAssignedPairs(adminChatbotId);
      if (res.success) setAssignedPairs(res.data);
    } catch {
      toast.error("Failed to fetch assigned pairs");
    }
  };

  // Fetch online customers
  const fetchOnlineCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/${adminChatbotId}/online-customers`);
      if (res.data.success) setCustomers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
  connectSocket(() => {
    const chatbotId = localStorage.getItem("chatbotId");

    console.log("Sending admin_join for:", chatbotId);

    socket.emit("admin_join", { chatbot_id: chatbotId });
  });
}, []);

  // Fetch Agents
  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${API_URL}/agents/chatbot/${adminChatbotId}`);
      if (res.data.success) setAgents(res.data.agents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssigned();
    fetchOnlineCustomers();
    fetchAgents();

    connectSocket(() => {

      // Agent Online
      onAgentOnline((newAgent) => {
        if (newAgent.chatbot_id !== adminChatbotId) return;
        setAgents((prev) => [
          ...prev.filter((a) => a.agent_id !== newAgent.agent_id),
          newAgent,
        ]);
      });

      // Agent Offline
      onAgentOffline((oldAgent) => {
        setAgents((prev) =>
          prev.filter((a) => a.agent_id !== oldAgent.agent_id)
        );
      });

      // Customer Online
      onCustomerOnline((newCustomer) => {
        setCustomers((prev) => [
          ...prev.filter((c) => c.temp_user_id !== newCustomer.temp_user_id),
          newCustomer,
        ]);
      });

      // Customer Offline
      onCustomerOffline((oldCustomer) => {
        setCustomers((prev) =>
          prev.filter((c) => c.temp_user_id !== oldCustomer.temp_user_id)
        );
      });

      // New assignment update
      onNewAssignment((assignment) => {
        if (assignment.chatbot_id === adminChatbotId) {
          fetchAssigned();
        }
      });
    });

    return () => disconnectSocket();
  }, [adminChatbotId]);

  // Assign Customer
  const handleAssign = async () => {
    if (!selectedAgentId || !selectedCustomerId) {
      return toast.error("Select agent and customer");
    }

    try {
      const customer = customers.find(
        (c) => c.temp_user_id === selectedCustomerId
      );

      const res = await assignAgentToCustomer(adminChatbotId, {
        agent_id: selectedAgentId,
        temp_user_id: selectedCustomerId,
        customer_name: customer?.name,
      });

      if (res.success) {
        toast.success("Customer assigned successfully!");
        fetchAssigned();

        // socket emit
        assignCustomer({
          agent_id: selectedAgentId,
          temp_user_id: selectedCustomerId,
          conversation_id: res.data.conversation_id,
        });

        setSelectedAgentId("");
        setSelectedCustomerId("");
      } else {
        toast.error(res.message || "Failed to assign");
      }
    } catch {
      toast.error("Error assigning customer");
    }
  };

  // Delete assigned
  const handleDelete = async (conversationId) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await apiDeleteAssignedPair(adminChatbotId, conversationId);
      if (res.success) {
        toast.success("Assignment deleted");
        fetchAssigned();
      } else toast.error("Failed to delete assignment");
    } catch (err) {
      toast.error("Failed");
    }
  };
  return (
   <div className="p-6 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Agents & Customers Dashboard
  </h1>

  {/* Top Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Agents Online */}
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition">
      <h2 className="font-semibold text-blue-600 text-lg mb-4 flex items-center justify-between">
        Agents Online
        <span className="text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1 rounded-full shadow">
          {agents.length}
        </span>
      </h2>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {agents.length ? (
          agents.map((a) => (
            <div
              key={a.agent_id}
              className="flex justify-between items-center p-3 border rounded-xl hover:bg-blue-50 transition"
            >
              <span className="font-medium text-gray-700">{a.name}</span>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  a.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-3">
            No agents online
          </p>
        )}
      </div>
    </div>

    {/* Customers Online */}
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition">
      <h2 className="font-semibold text-green-600 text-lg mb-4 flex items-center justify-between">
        Customers Online
        <span className="text-sm bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1 rounded-full shadow">
          {customers.length}
        </span>
      </h2>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {customers.length ? (
          customers.map((c) => (
            <div
              key={c.temp_user_id}
              className="flex justify-between items-center p-3 border rounded-xl hover:bg-green-50 transition"
            >
              <span className="font-medium text-gray-700">
                {c.name || "Guest"}{" "}
                <span className="ml-2 text-red-400 text-xs">
                  {c.temp_user_id}
                </span>
              </span>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  c.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-3">
            No customers online
          </p>
        )}
      </div>
    </div>

    {/* Assign Customer */}
    <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition">
      <h2 className="font-semibold text-purple-600 text-lg mb-4">
        Assign Customer
      </h2>
      <div className="flex flex-col gap-4">
        <select
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 hover:shadow-md transition"
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
        >
          <option value="">Select Agent</option>
          {agents.map((a) => (
            <option key={a.agent_id} value={a.agent_id}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 hover:shadow-md transition"
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.temp_user_id} value={c.temp_user_id}>
              {c.name || "Guest"}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg transition"
        >
          Assign
        </button>
      </div>
    </div>
  </div>

  {/* Assigned Customers */}
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
      Assigned Customers
    </h2>
    {assignedPairs.length ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignedPairs.map((pair) => (
          <div
            key={pair.conversation_id}
            className="flex flex-col p-4 rounded-2xl shadow-md border border-indigo-100 hover:shadow-xl transition bg-indigo-50"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-800 text-lg">
                {pair.customer_name || "Guest"}
              </span>
              <span className="text-sm text-gray-500">→ {pair.agent_name}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-600">
                Customer ID: {pair.temp_user_id}
              </span>
              <button
                onClick={() => handleDelete(pair.conversation_id)}
                className="px-3 py-1 text-sm text-white bg-red-600 rounded-xl hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-400 text-center py-8 text-lg">
        No customers assigned yet
      </p>
    )}
  </div>
</div>

  );
};

export default AssignCustomers;

