import React, { useState, useEffect } from "react";
import { Plus, MoreVertical, Edit, Copy, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CreateCampaignModal from "./CreateCampaignModal";
import { motion } from "framer-motion";
import axios from "axios";

export default function Campaign() {
  const navigate = useNavigate();
  const chatbotId = localStorage.getItem("chatbotId");

  const [campaigns, setCampaigns] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const API_URI = import.meta.env.VITE_NODE_BASE_URL + "/api";

  const loadCampaigns = async () => {
    try {
      const { data } = await axios.get(`${API_URI}/campaigns/${chatbotId}`);
      if (data.success) setCampaigns(data.campaigns);
    } catch (e) {
      console.log("Load error:", e);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const toggleStatus = async (campaign) => {
    setSelectedCampaign(campaign);
    setShowPopup(true);
  };

  const saveStatusChange = async () => {
    try {
      await axios.put(
        `${API_URI}/campaigns/${chatbotId}/${selectedCampaign.id}/status`,
        { status: !selectedCampaign.active }
      );
      loadCampaigns();
      setShowPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await axios.delete(`${API_URI}/campaigns/${chatbotId}/${id}`);
      loadCampaigns();
      setMenuOpenId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const duplicateCampaign = async (campaign) => {
    try {
      await axios.post(
        `${API_URI}/campaigns/${chatbotId}/${campaign.id}/duplicate`
      );
      loadCampaigns();
      setMenuOpenId(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your campaigns and optimize customer engagement
          </p>
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl 
            shadow-md hover:shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus size={18} /> New Campaign
        </button>
      </div>

      {/* CAMPAIGN CARDS FOR MOBILE */}
      <div className="flex flex-col md:hidden gap-4">
        {campaigns.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                  {c.description}
                </p>
              </div>
              <button
                onClick={() =>
                  setMenuOpenId(menuOpenId === c.id ? null : c.id)
                }
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <MoreVertical className="text-gray-600" />
              </button>

              {menuOpenId === c.id && (
                <div className="absolute right-4 top-12 bg-white shadow-xl rounded-xl w-44 border z-50">
                  <button
                    onClick={() =>
                      navigate("/admin/engage/edit", { state: c })
                    }
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <Edit size={16} /> Edit
                  </button>

                  <button
                    onClick={() => duplicateCampaign(c)}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <Copy size={16} /> Duplicate
                  </button>

                  <button
                    onClick={() => deleteCampaign(c.id)}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={c.active}
                  onChange={() => toggleStatus(c)}
                  className="peer sr-only"
                />
                <div className="h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition"></div>
                <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
              </label>

              <div className="text-xs text-gray-500 flex gap-4">
                <span>Displayed: {c.displayed}</span>
                <span>Chats: {c.chats}</span>
                <span>Conversion: {c.conversion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE FOR DESKTOP */}
      <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-100/60 text-gray-700 text-sm md:text-lg font-medium">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Displayed</th>
              <th className="py-3 px-4 text-center">Chats</th>
              <th className="py-3 px-4 text-center">Conversion</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b hover:bg-gray-50 transition duration-200 text-sm md:text-base"
              >
                <td className="py-3 px-4">
                  <p className="font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-gray-500 text-xs mt-1 truncate">
                    {c.description}
                  </p>
                </td>

                <td className="py-3 px-4">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={c.active}
                      onChange={() => toggleStatus(c)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-blue-500 transition"></div>
                    <div className="dot absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></div>
                  </label>
                </td>

                <td className="py-3 px-4 text-center">{c.displayed}</td>
                <td className="py-3 px-4 text-center">{c.chats}</td>
                <td className="py-3 px-4 text-center">{c.conversion}</td>

                <td className="py-3 px-4 text-center relative">
                  <button
                    onClick={() =>
                      setMenuOpenId(menuOpenId === c.id ? null : c.id)
                    }
                    className="p-2 hover:bg-gray-200 rounded-full"
                  >
                    <MoreVertical className="text-gray-600" />
                  </button>

                  {menuOpenId === c.id && (
                    <div className="absolute right-0 top-8 bg-white shadow-xl rounded-xl w-44 border z-50">
                      <button
                        onClick={() =>
                          navigate("/admin/engage/edit", { state: c })
                        }
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <Edit size={16} /> Edit
                      </button>

                      <button
                        onClick={() => duplicateCampaign(c)}
                        className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        <Copy size={16} /> Duplicate
                      </button>

                      <button
                        onClick={() => deleteCampaign(c.id)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {openCreateModal && (
        <CreateCampaignModal
          onClose={() => setOpenCreateModal(false)}
          onSelectTemplate={(template) => {
            navigate("/admin/engage/create-campaign-form", {
              state: { ...template },
            });
            setOpenCreateModal(false);
          }}
        />
      )}

      {/* STATUS CHANGE POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, type: "spring" }}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Save Changes?
            </h2>
            <div className="flex justify-center mt-6 gap-4 flex-wrap">
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={saveStatusChange}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
