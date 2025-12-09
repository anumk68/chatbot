import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import axios from "axios";
import { motion } from "framer-motion";
const SOCKET_URL = import.meta.env.VITE_NODE_BASE_URL;

const Form = ({ chatbotId, onChatStart }) => {
  const [fields, setFields] = useState([]);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [tempUserId, setTempUserId] = useState("");
  const socketRef = useRef(null);

  // Generate/load temp user ID
  useEffect(() => {
    let id = localStorage.getItem("tempUserId");
    if (!id) {
      id = "temp_" + Date.now();
      localStorage.setItem("tempUserId", id);
    }
    setTempUserId(id);
    console.log("[DEBUG] tempUserId:", id);
  }, []);

  // Load pre-chat form and check existing customer
  useEffect(() => {
    if (!chatbotId || !tempUserId) return;

    const loadFormAndCheckCustomer = async () => {
      try {
        const formRes = await axios.get(
          `${SOCKET_URL}/api/prechat/form/${chatbotId}`
        );
        if (formRes.data.success) setFields(formRes.data.form.fields || []);

        const checkRes = await axios.get(
          `${SOCKET_URL}/api/customer/check/${chatbotId}/${tempUserId}`
        );

        if (checkRes.data.success && checkRes.data.hasConversation) {
          setShowForm(false);
          setValues(checkRes.data.customerData || {});
          onChatStart?.(
            checkRes.data.conversation || [],
            checkRes.data.customerData
          );
        }
      } catch (err) {
        console.error("[ERROR] loadFormAndCheckCustomer:", err);
        toast.error("Failed to load pre-chat form");
      } finally {
        setLoading(false);
      }
    };

    loadFormAndCheckCustomer();
  }, [chatbotId, tempUserId, onChatStart]);

  // Start chat for new customer
  const startChat = async () => {
    try {
      const customerData = {
        temp_user_id: tempUserId,
        name: "",
        email: "",
        phone: "",
        message: "",
        custom_json: { ...values },
        website_url: window.location.origin,
      };

      // Map default fields to main properties
      fields.forEach((f) => {
        const value = values[f.id] || "";
        if (f.label.toLowerCase() === "name") customerData.name = value;
        else if (f.label.toLowerCase() === "email") customerData.email = value;
        else if (f.label.toLowerCase() === "phone") customerData.phone = value;
        else if (f.label.toLowerCase() === "message")
          customerData.message = value;
      });

      const res = await axios.post(
        `${SOCKET_URL}/api/${chatbotId}/customer-data`,
        customerData
      );

      if (!res.data.success) throw new Error("Backend failed to save customer");

      const savedCustomer = res.data.data;

      const welcomeMessage = {
        id: Date.now(),
        sender_type: "bot",
        sender_id: "bot",
        message: "Hello! How can I help you today?",
        created_at: new Date().toISOString(),
      };

      setShowForm(false);
      onChatStart?.([welcomeMessage], savedCustomer);

      console.log("[DEBUG] Customer data saved:", savedCustomer);
    } catch (err) {
      console.error("[ERROR] startChat:", err);
      toast.error("Failed to start chat");
    }
  };

  if (loading) return <div>Loading…</div>;
  if (!showForm) return null;

  return (
    <motion.div
      key="form-wrapper"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: 40,
        scale: 0.9,
        transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
      }}
      transition={{
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="max-w-md mx-auto"
    >
      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          if (fields.some((f) => f.required && !values[f.id])) {
            toast.warn("Please fill all required fields");
            return;
          }
          startChat();
        }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 bg-white rounded-3xl border-gray-200"
      >
        {fields.map((f, idx) => (
          <motion.div
            key={f.id}
            className="relative mb-6"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: 0.2 + idx * 0.06,
              duration: 0.35,
              ease: "easeOut",
            }}
          >
            {/* Floating Label */}
            <label className="absolute -top-2 left-4 bg-white px-1 text-gray-600 text-sm font-medium pointer-events-none z-10">
              {f.label} {f.required && <span className="text-red-500">*</span>}
            </label>

            {f.type === "dropdown" ? (
              <select
                value={values[f.id] || ""}
                onChange={(e) =>
                  setValues((p) => ({ ...p, [f.id]: e.target.value }))
                }
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              >
                <option value="">Select an option</option>
                {f.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type || "text"}
                value={values[f.id] || ""}
                onChange={(e) =>
                  setValues((p) => ({ ...p, [f.id]: e.target.value }))
                }
                required={f.required}
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            )}
          </motion.div>
        ))}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="w-full py-3 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 text-white font-semibold rounded-xl shadow-lg"
        >
          Start Chat
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Form;
