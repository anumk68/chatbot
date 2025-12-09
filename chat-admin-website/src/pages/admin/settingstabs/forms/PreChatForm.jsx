import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormField } from "../../../../redux/form/actions";
import RichTextField from "../../../../components/RichTextField";
import ChatContainer from "../../../../chatbot/Chatcontainer";
import { Trash2, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

import {
  toggleFormStatus,
  saveFormFields,
  deleteField,
} from "./services/preChatFormApi.js";

const PreChatForm = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const admin = useSelector((state) => state.auth.user);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL;

  const chatbotId = localStorage.getItem("chatbotId");

  const [localForm, setLocalForm] = useState({
    chatbot_id: chatbotId,
    info: "",
    buttonText: "Start Chat",
    defaultFields: [
      {
        id: 1,
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: 2,
        type: "text",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
      },
    ],
    extraFields: [],
    ...formData,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(localForm));
  }, [formData, localForm]);

  // Fetch form data
  // Fetch form data & status
  useEffect(() => {
    if (!chatbotId) return;

    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/prechat/form/${chatbotId}`
        );
        if (res.data.success && res.data.form) {
          const form = res.data.form;
          const fields = form.fields.map((f) => ({
            ...f,
            required: f.required === 1 || f.required === true,
          }));

          const defaultFields = fields.filter(
            (f) => f.label === "Name" || f.label === "Email"
          );
          const extraFields = fields.filter(
            (f) => f.label !== "Name" && f.label !== "Email"
          );

          setLocalForm({
            chatbot_id: chatbotId,
            info: form.info,
            buttonText: form.button_text || "Start Chat",
            defaultFields,
            extraFields,
          });

          // Set form status safely
          setIsEnabled(String(form.status).toLowerCase() === "enabled");
        } else {
          setLocalForm((prev) => ({
            ...prev,
            defaultFields: prev.defaultFields,
            extraFields: [],
          }));
          setIsEnabled(false);
        }
      } catch (err) {
        console.error("Error fetching form:", err);
        setIsEnabled(false);
        setLocalForm((prev) => ({
          ...prev,
          defaultFields: prev.defaultFields,
          extraFields: [],
        }));
      }
    };

    fetchForm();
  }, [chatbotId]);

  // Fetch form status
  useEffect(() => {
    if (!chatbotId) return;

    const fetchFormStatus = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/prechat/form/${chatbotId}/status`
        );
        if (res.data.status === "enabled" || res.data.status === true) {
          const res = await toggleFormStatus(chatbotId, !isEnabled);
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      } catch (err) {
        console.error(err);
        setIsEnabled(false);
      }
    };

    fetchFormStatus();
  }, [chatbotId]);

  const handleToggleEnable = async () => {
    if (!chatbotId) return;
    try {
      const res = await toggleFormStatus(chatbotId, !isEnabled);
      if (res.success) setIsEnabled(!isEnabled);
      toast.success(`Form ${!isEnabled ? "enabled" : "disabled"}`);
    } catch (err) {
      console.error(err);
      toast.error("Error updating form status");
    }
  };

  // Field change handlers
  const handleFieldChange = (field, value) =>
    setLocalForm({ ...localForm, [field]: value });
  const handleEditField = (id, key, value) => {
    const update = (fields) =>
      fields.map((f) => (f.id === id ? { ...f, [key]: value } : f));
    setLocalForm({
      ...localForm,
      defaultFields: update(localForm.defaultFields),
      extraFields: update(localForm.extraFields),
    });
  };
  const handleAddField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label:
        type === "dropdown"
          ? "Select Option"
          : type === "phone"
          ? "Phone Number"
          : "New Field",
      placeholder:
        type === "dropdown"
          ? "Choose an option"
          : type === "phone"
          ? "Enter phone number"
          : "Enter text",
      options: type === "dropdown" ? ["Option 1"] : [],
      required: false,
    };
    setLocalForm((prev) => ({
      ...prev,
      extraFields: [...prev.extraFields, newField],
    }));
    toast.info(`${type} field added`);
  };
  const handleRemoveField = async (id) => {
    if (!window.confirm("Delete this field?")) return;
    try {
      await deleteField(chatbotId, id);
      setLocalForm((prev) => ({
        ...prev,
        defaultFields: prev.defaultFields.filter((f) => f.id !== id),
        extraFields: prev.extraFields.filter((f) => f.id !== id),
      }));
      toast.success("Field deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete field");
    }
  };
  const handleSaveChanges = async () => {
    if (!chatbotId) return toast.warn("Chatbot ID missing!");
    try {
      setSaving(true);
      const res = await saveFormFields(chatbotId, localForm);
      if (res.success) {
        toast.success("Pre-chat form saved!");
        Object.keys(localForm).forEach((key) =>
          dispatch(updateFormField(key, localForm[key]))
        );
        setIsChanged(false);
      } else toast.error(res.message || "Failed to save form");
    } catch (err) {
      console.error(err);
      toast.error("Error saving form");
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    setLocalForm(formData);
    setIsChanged(false);
    toast.info("Changes canceled");
  };

  if (isEnabled === null) return <div>Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white relative">
      {/* Left Panel */}
      <div className="w-full lg:w-[60%] p-6 border-b lg:border-b-0 lg:border-r border-gray-300 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium text-gray-700">
            Enable Pre-Chat Form
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              disabled={isEnabled === null}
              checked={isEnabled}
              onChange={handleToggleEnable}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                isEnabled ? "translate-x-5" : ""
              }`}
            ></div>
          </label>
        </div>

        {isEnabled && (
          <>
            <RichTextField
              label="Information"
              value={localForm.info}
              onChange={(html) => handleFieldChange("info", html)}
            />

            {[...localForm.defaultFields, ...localForm.extraFields].map(
              (field) => (
                <div
                  key={field.id}
                  className="border border-gray-300 rounded-lg p-4 mt-4 bg-white mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      className="p-1 w-full focus:outline-none font-medium"
                      value={field.label}
                      onChange={(e) =>
                        handleEditField(field.id, "label", e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleRemoveField(field.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {field.type === "dropdown" ? (
                    <div className="space-y-2">
                      {field.options.map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => {
                              const newOpt = [...field.options];
                              newOpt[i] = e.target.value;
                              handleEditField(field.id, "options", newOpt);
                            }}
                            className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                          />
                          <button
                            onClick={() =>
                              handleEditField(
                                field.id,
                                "options",
                                field.options.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          handleEditField(field.id, "options", [
                            ...field.options,
                            `Option ${field.options.length + 1}`,
                          ])
                        }
                        className="mt-1 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        + Add Option
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field.type === "phone" ? "tel" : "text"}
                      value={field.placeholder}
                      onChange={(e) =>
                        handleEditField(field.id, "placeholder", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    />
                  )}
                </div>
              )
            )}

            <div className="mt-4 border-t pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => handleAddField("text")}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} /> Text
              </button>
              <button
                onClick={() => handleAddField("phone")}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} /> Phone
              </button>
              <button
                onClick={() => handleAddField("dropdown")}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
              >
                <PlusCircle size={16} /> Dropdown
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Button Text
              </label>
              <input
                type="text"
                value={localForm.buttonText}
                onChange={(e) =>
                  handleFieldChange("buttonText", e.target.value)
                }
                className="border-gray-300 rounded-md p-2 text-sm w-full"
              />
            </div>

            {isChanged && (
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Panel Preview */}
      {isEnabled && (
        <div className="w-full lg:w-[40%] p-6 flex justify-center items-start mt-6 lg:mt-0">
          <div className="bg-gray-200 p-4 rounded-3xl shadow-lg border-4 border-gray-300 w-full max-w-[320px] h-[550px] flex flex-col items-center relative">
            <div className="w-24 h-2 bg-black rounded-full absolute top-2"></div>
            <div className="mt-6 bg-white w-full h-full rounded-2xl overflow-y-auto p-4">
              <h2 className="text-center text-lg font-semibold mb-4">
                Chat Preview
              </h2>
              <div className="text-sm">
                <p className="text-gray-600 mb-2">
                  <strong>Info:</strong> {localForm.info}
                </p>
                {[...localForm.defaultFields, ...localForm.extraFields].map(
                  (field) => (
                    <p key={field.id} className="text-gray-600 mb-2">
                      <strong>{field.label}:</strong> {field.placeholder}
                    </p>
                  )
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 text-sm shadow">
                  {localForm.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ChatContainer formData={localForm} previewMode={true} />
    </div>
  );
};

export default PreChatForm;
