// src/components/AdminChatbotModule.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Globe, PlusCircle } from "lucide-react"; // Icons from lucide-react

const API_BASE = import.meta.env.VITE_NODE_BASE_URL + "/api";

const AdminChatbotModule = () => {
  const [chatbots, setChatbots] = useState([]);
  const [form, setForm] = useState({
    website_url: "",
    status: "active",
  });
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  //  (comment) Get user ID from localStorage or use fallback for testing
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
    } else {
      setUserId(37); // fallback ID for testing
    }
  }, []);

  //  (comment) Fetch all chatbots from API
  const fetchChatbots = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get-websites`);
      if (res.data.success && Array.isArray(res.data.data)) {
        setChatbots(res.data.data);
      } else {
        setChatbots([]);
      }
    } catch (error) {
      console.error("Error fetching chatbots:", error);
      setChatbots([]);
    }
  };

  useEffect(() => {
    fetchChatbots();
  }, []);

  //  (comment) Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  (comment) Generate random chatbot_id
  const generateChatbotId = () => {
    return "CHAT_" + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  //  (comment) Handle form submit — add new website
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.website_url) {
      alert("Please enter website URL");
      return;
    }
    if (!userId) {
      alert("User ID not found!");
      return;
    }

    setLoading(true);
    try {
      // Check for duplicate website URL
      const res = await axios.get(`${API_BASE}/get-websites`);
      const existing = res.data.data.find(
        (bot) =>
          bot.website_url.toLowerCase() === form.website_url.toLowerCase()
      );

      if (existing) {
        alert("This website URL already exists!");
        setLoading(false);
        return;
      }

      const chatbot_id = generateChatbotId();
      const websiteData = {
        website_url: form.website_url,
        chatbot_id,
        user_id: userId,
        status: form.status,
      };

      const addRes = await axios.post(`${API_BASE}/websites`, websiteData);
      if (addRes.data.success) {
        alert("Website added successfully!");
        setForm({ website_url: "", status: "active" });
        fetchChatbots();
      } else {
        alert("Failed to add website.");
      }
    } catch (error) {
      console.error("Error adding website:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  //  (comment) Delete website
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this website?"))
      return;

    try {
      await axios.delete(`${API_BASE}/websites/${id}`);
      alert("Website deleted successfully!");
      fetchChatbots();
    } catch (error) {
      console.error("Error deleting website:", error);
      alert("Failed to delete website.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      {/*  (comment) Heading section */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Globe className="text-blue-600" size={28} />
        <h2 className="text-2xl font-semibold">Admin Chatbot Management</h2>
      </div>

      {/*  (comment) Add new website form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Website URL</label>
          <input
            type="text"
            name="website_url"
            value={form.website_url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          {loading ? "Saving..." : "Add Website"}
        </button>
      </form>

      {/*  (comment) List of websites */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Website List</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">S.No.</th>
            <th className="border p-2">Website URL</th>
            <th className="border p-2">Chatbot ID</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(chatbots) && chatbots.length > 0 ? (
            chatbots.map((bot, index) => (
              <tr key={bot.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2">{bot.website_url}</td>
                <td className="border p-2">{bot.chatbot_id}</td>
                <td className="border p-2">{bot.user_id}</td>
                <td className="border p-2">{bot.status}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(bot.id)}
                    className="flex items-center gap-1 mx-auto text-black px-2 py-1 rounded cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No websites found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminChatbotModule;
