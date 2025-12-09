import axios from "axios";

const BASE_URL = import.meta.env.VITE_NODE_BASE_URL + "/auth/api"; 

// Toggle form enable/disable
export const toggleFormStatus = async (chatbotId, status) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/${chatbotId}/form-status/update`,
      {
        chatbot_id: chatbotId,
        status: status ? "enabled" : "disabled",
      }
    );
    return { success: res.data.success, status: res.data.status };
  } catch (err) {
    console.error("toggleFormStatus error:", err);
    return { success: false, status: null, message: "Server error" };
  }
};

// Save form fields
export const saveFormFields = async (chatbotId, formData) => {
  try {
    const fields = [...formData.defaultFields, ...formData.extraFields].map(
      (f, i) => ({
        type: f.type || "text",
        label: f.label?.trim() || `Field ${i + 1}`,
        placeholder: f.placeholder || "",
        required: !!f.required,
        options: f.options || [],
        order: i + 1,
      })
    );

    const payload = {
      chatbot_id: chatbotId,
      info: formData.info,
      button_text: formData.buttonText,
      fields,
    };

    const res = await axios.post(`${BASE_URL}/${chatbotId}/form-fields`, payload);
    return res.data;
  } catch (err) {
    console.error("saveFormFields error:", err);
    return { success: false, message: "Server error" };
  }
};

// Delete a field
export const deleteField = async (chatbotId, fieldId) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${chatbotId}/field/${fieldId}`);
    return res.data;
  } catch (err) {
    console.error("deleteField error:", err);
    return { success: false, message: "Server error" };
  }
};
