import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  FiMessageCircle,
  FiHome,
  FiBarChart2,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { motion } from "framer-motion";

const ChatsPage = () => {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatbotId = localStorage.getItem("chatbotId");
  const API_URL = import.meta.env.VITE_NODE_BASE_URL;
  const navigate = useNavigate();

  // Generate script THEN fetch pre-chat form
  const generateScript = async () => {
    try {
      setLoading(true);

      // Generate script API
      const scriptRes = await axios.get(
        `${API_URL}/api/generate-script/${chatbotId}`
      );

      setScript(scriptRes.data);

      // Fetch prechat form only after script is generated
      const formRes = await axios.get(
        `${API_URL}/api/prechat/form/${chatbotId}`
      );

      if (formRes.data.success && formRes.data.form?.fields) {
        setFormFields(formRes.data.form.fields);
      }

      toast.success("Script generated!");
    } catch (err) {
      toast.error("Failed to generate script.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyScript = () =>
    navigator.clipboard
      .writeText(script)
      .then(() => toast.success("Copied!"))
      .catch(() => toast.error("Failed to copy"));

  return (
    <div className="min-h-screen flex bg-gray-100">
      <ToastContainer />

      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md z-40 flex items-center justify-between px-5 py-4">
        <h1 className="text-xl font-bold text-gray-800">DigiChat Installer</h1>
        <FiMenu
          className="text-2xl text-gray-700"
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      <aside
        className={`fixed md:relative z-50 md:z-auto inset-0 md:inset-auto w-64 bg-white shadow-xl border-r p-6 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between mb-6 md:hidden">
          <h2 className="font-semibold text-gray-800 text-lg">Menu</h2>
          <FiX
            className="text-xl cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <ul className="space-y-4">
          {["Dashboard", "Installer", "Analytics"].map((item, i) => (
            <li
              key={i}
              onClick={() => {
                if (item === "Dashboard") navigate("/admin-dashboard");
                if (item === "Analytics") navigate("/admin-dashboard");
              }}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition hover:bg-gray-100 ${
                item === "Installer"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                  : ""
              }`}
            >
              {item === "Dashboard" && (
                <FiHome className="mr-3 text-blue-500" />
              )}
              {item === "Installer" && <FiMessageCircle className="mr-3" />}
              {item === "Analytics" && (
                <FiBarChart2 className="mr-3 text-purple-600" />
              )}
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center md:text-left">
              Install DigiChat On Your Website
            </h1>
            <p className="mt-3 text-gray-600 text-sm md:text-base">
              Paste this script before{" "}
              <span className="font-mono">&lt;/body&gt;</span>.
            </p>

            <textarea
              readOnly
              value={script}
              rows={10}
              className="w-full mt-5 p-5 rounded-2xl bg-gray-50 border border-gray-200 shadow-inner font-mono resize-none text-sm focus:ring-2 focus:ring-blue-400 transition"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
                onClick={generateScript}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Script"}
              </button>

              <button
                className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
                onClick={handleCopyScript}
                disabled={!script}
              >
                Copy Script
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col"
          >
            <h3 className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold mb-4">
              Live Preview
            </h3>

            {formFields.length > 0 ? (
              <form className="space-y-6">
                {formFields.map((f, i) => (
                  <div key={i} className="relative flex flex-col">
                    {/* Floating label */}
                    <label className="static top-0 left-4 bg-white px-1 text-gray-500 text-lg mb-1 font-medium pointer-events-none">
                      {f.label} {f.required && "*"}
                    </label>

                    {f.type === "textarea" ? (
                      <textarea
                        className="border border-gray-300 rounded-2xl p-4 pt-6 text-sm w-full bg-gray-50 shadow-sm disabled:opacity-80 transition focus:ring-2 focus:ring-blue-400"
                        disabled
                        rows={3}
                      />
                    ) : (
                      <input
                        type={f.type}
                        className="border border-gray-300 rounded-2xl p-4 pt-6 text-sm w-full bg-gray-50 shadow-sm disabled:opacity-80 transition focus:ring-2 focus:ring-blue-400"
                        disabled
                      />
                    )}
                  </div>
                ))}
                <a
                  type="text"
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition"
                >
                  Start Chat
                </a>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                {/* Loader dots with gradient */}
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-sm w-[280px] text-center">
                  First Click "Generate Script" to see live preview here.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChatsPage;
