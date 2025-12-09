import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import axios from "axios";

const Customization = ({ chatbotId }) => {
  const [theme, setTheme] = useState("light");
  const [align, setAlign] = useState("Right");
  const [sideSpacing, setSideSpacing] = useState(0);
  const [bottomSpacing, setBottomSpacing] = useState(0);
  const [visibility, setVisibility] = useState("always");
  const [loading, setLoading] = useState(false);

  const [colors, setColors] = useState({
    primary_color: "#0088cc",
    secondary_color: "#ffffff",
  });
  const [originalColors, setOriginalColors] = useState({
    primary_color: "#0088cc",
    secondary_color: "#ffffff",
  });

  const API_URL = import.meta.env.VITE_NODE_BASE_URL;  

  // Fetch current theme + colors from backend
  useEffect(() => {
    if (!chatbotId) return;
    const fetchCurrentTheme = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/${chatbotId}/chatbox/color`
        );
        if (res.data.success && Array.isArray(res.data.data)) {
          const botData = res.data.data.find(
            (item) => item.chatbot_id === chatbotId
          );
          if (botData) {
            const {
              primary_color,
              secondary_color,
              theme: savedTheme,
            } = botData;
            const detectedTheme = savedTheme
              ? savedTheme
              : primary_color === "#000000"
              ? "dark"
              : "light";

            setColors({ primary_color, secondary_color });
            setOriginalColors({ primary_color, secondary_color });
            setTheme(detectedTheme);
          }
        }
      } catch (err) {
        console.error("Error fetching theme:", err);
      }
    };

    fetchCurrentTheme();
  }, [chatbotId]);

  // Save to backend (theme + colors)
  const updateChatboxColors = async (primary, secondary, mode) => {
    if (!chatbotId) return alert("Chatbot ID missing");
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/${chatbotId}/chatbox/color/update`,
        {
          chatbot_id: chatbotId,
          primary_color: primary,
          secondary_color: secondary,
          theme: mode,
        }
      );

      if (response.data.success) {
        setOriginalColors({
          primary_color: primary,
          secondary_color: secondary,
        });
        alert("Theme and colors saved successfully!");
      } else {
        alert("Failed to save colors: " + (response.data.message || ""));
      }
    } catch (error) {
      console.error("Error updating colors:", error);
      alert("Failed to save colors. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    updateChatboxColors(colors.primary_color, colors.secondary_color, theme);
  };

  const handleCancel = () => {
    setColors(originalColors);
    const isDark = originalColors.primary_color === "#000000";
    setTheme(isDark ? "dark" : "light");
    alert("Changes discarded.");
  };

  // Auto adjust preview colors when theme changes
  useEffect(() => {
    if (theme === "light") {
      setColors({
        primary_color: "#ffffff",
        secondary_color: "#000000",
      });
    } else {
      setColors({
        primary_color: "#000000",
        secondary_color: "#ffffff",
      });
    }
  }, [theme]);

  const isChanged =
    colors.primary_color !== originalColors.primary_color ||
    colors.secondary_color !== originalColors.secondary_color ||
    theme !== (originalColors.primary_color === "#000000" ? "dark" : "light");

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-full md:w-1/2 p-6 space-y-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800">Customization</h2>
        <p className="text-sm text-gray-600">Customize your chat widget</p>
        <p className="text-xs text-gray-500 mb-4">
          Decide how the chat widget on your website will look, behave and what
          information it will offer.
        </p>

        {/* 🎨 Appearance Section */}
        <div className="border rounded-lg p-4 bg-white shadow-sm space-y-4">
          <h3 className="font-medium text-gray-800">🎨 Appearance</h3>

          {/* Theme */}
          <div>
            <p className="text-sm font-medium mb-2">Theme and colors</p>
            <div className="flex gap-4">
              <button
                className={`border rounded-lg px-4 py-2 transition ${
                  theme === "light"
                    ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setTheme("light")}
              >
                ☀️ Light
              </button>
              <button
                className={`border rounded-lg px-4 py-2 transition ${
                  theme === "dark"
                    ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setTheme("dark")}
              >
                🌙 Dark
              </button>
            </div>
          </div>
        </div>

        {/* 📍 Position Section */}
        <div className="border rounded-lg p-4 bg-white shadow-sm space-y-4">
          <h3 className="font-medium text-gray-800">📍 Position</h3>
          <div>
            <p className="text-sm font-medium mb-2">Widget position</p>
            <div className="flex items-center gap-4">
              <select
                value={align}
                onChange={(e) => setAlign(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option>Right</option>
                <option>Left</option>
              </select>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">Side spacing:</label>
                <input
                  type="number"
                  value={sideSpacing}
                  onChange={(e) => setSideSpacing(e.target.value)}
                  className="w-12 border rounded px-1 py-1 text-sm"
                />
                <span className="text-xs">px</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">Bottom spacing:</label>
                <input
                  type="number"
                  value={bottomSpacing}
                  onChange={(e) => setBottomSpacing(e.target.value)}
                  className="w-12 border rounded px-1 py-1 text-sm"
                />
                <span className="text-xs">px</span>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <p className="text-sm font-medium mb-2">Visibility</p>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="always"
                  checked={visibility === "always"}
                  onChange={() => setVisibility("always")}
                />
                The chat widget is always visible
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="untilActivated"
                  checked={visibility === "untilActivated"}
                  onChange={() => setVisibility("untilActivated")}
                />
                Hide widget until it gets activated ℹ️
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  value="hidden"
                  checked={visibility === "hidden"}
                  onChange={() => setVisibility("hidden")}
                />
                Always hide minimized widget icon ℹ️
              </label>
            </div>
          </div>
        </div>

        {isChanged && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        )}

        <div className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center mt-6">
          <span className="text-sm font-medium text-gray-800">
            📱 Mobile chat widget
          </span>
          <ChevronRight className="text-gray-400 w-4 h-4" />
        </div>

        <div className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center">
          <span className="text-sm font-medium text-gray-800">
            ⚙️ Additional tweaks
          </span>
          <ChevronRight className="text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Live Preview */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-6 transition">
        <div
          className={`w-72 h-[560px] rounded-2xl shadow-lg flex flex-col overflow-hidden transition-all duration-300 ${
            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
          }`}
        >
          <div
            className={`flex items-center justify-between p-3 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm">•••</span>
          </div>

          <div
            className={`p-3 flex items-center gap-3 border-b ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-gray-100 border-gray-300 text-black"
            }`}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
              B
            </div>
            <div>
              <p className="text-sm font-medium">Bhagya Digirushsolutions</p>
              <p className="text-xs opacity-70">Product Expert</p>
            </div>
          </div>

          <div className="flex-1 p-4 text-sm space-y-3 overflow-y-auto">
            <p
              className={`px-3 py-2 rounded max-w-[75%] ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Hello. How may I help you?
            </p>
            <div className="flex justify-end">
              <p
                className="px-3 py-2 rounded max-w-[75%] text-white"
                style={{
                  backgroundColor: colors.primary_color,
                }}
              >
                I’d like to ask something
                <span className="block text-[10px] text-right opacity-80">
                  Read
                </span>
              </p>
            </div>
            <p
              className={`px-3 py-2 rounded max-w-[75%] ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              Go ahead
            </p>
          </div>

          <div
            className={`p-3 border-t flex items-center gap-2 text-sm ${
              theme === "dark"
                ? "border-gray-700 text-gray-400 bg-gray-800"
                : "border-gray-300 text-gray-600 bg-gray-100"
            }`}
          >
            <input
              type="text"
              placeholder="Write a message..."
              className={`flex-1 bg-transparent outline-none ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            />
            <span>😊</span>
            <span>📎</span>
            <button className="text-blue-500">➤</button>
          </div>

          <div
            className={`text-center text-xs py-2 ${
              theme === "dark"
                ? "bg-gray-900 text-gray-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Powered by{" "}
            <span className="text-red-500 font-semibold">LiveChat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
