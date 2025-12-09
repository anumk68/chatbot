// controllers/prechatFormController.js
import FormModel from "../models/Form.js";

// GET /api/prechat/form/:chatbotId
export const getPreChatForm = async (req, res) => {
  const { chatbotId } = req.params;
  try {
    const form = await FormModel.getFormByChatbotId(chatbotId);
    if (!form)
      return res
        .status(404)
        .json({ success: false, message: "Chatbot not found" });

    res.json({
      success: true,
      form: {
        info: form.info || "",
        button_text: form.button_text || "Start Chat",
        status: form.status === 1 ? "enabled" : "disabled",
        fields:
          typeof form.fields === "string"
            ? JSON.parse(form.fields)
            : form.fields,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/prechat/form/:chatbotId/save
export const savePreChatForm = async (req, res) => {
  const { chatbotId } = req.params;
  const { info, button_text, fields } = req.body;

  try {
    const result = await FormModel.saveForm({
      chatbot_id: chatbotId,
      info,
      button_text,
      fields,
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST /api/prechat/form/:chatbotId/status
export const togglePreChatStatus = async (req, res) => {
  const { chatbotId } = req.params;
  const { status } = req.body; // expects true/false

  try {
    const statusValue = status ? "enabled" : "disabled";

    await FormModel.updateFormStatus(chatbotId, statusValue);

    res.json({
      success: true,
      message: `Form ${statusValue}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/prechat/form/:chatbotId/status
export const getPreChatFormStatus = async (req, res) => {
  const { chatbotId } = req.params;

  try {
    const form = await FormModel.getFormByChatbotId(chatbotId);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Convert 'enabled'/'disabled' to boolean
    res.json({
      success: true,
      status: form.status === "enabled" ? true : false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};