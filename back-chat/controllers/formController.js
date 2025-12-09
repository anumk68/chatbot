// controllers/formController.js
import db from "../config/db.js";

// GET: Get form by chatbot ID
export const getForm = async (req, res) => {
  try {
    const { chatbotId } = req.params;

    const [forms] = await db.query(
      "SELECT * FROM prechat_forms WHERE chatbot_id = ?",
      [chatbotId]
    );

    if (!forms.length)
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });

    const form = forms[0];

    const [fields] = await db.query(
      "SELECT * FROM prechat_fields WHERE form_id = ? ORDER BY field_order ASC",
      [form.id]
    );

    // Attach dropdown options
    for (let f of fields) {
      if (f.type === "dropdown") {
        const [options] = await db.query(
          "SELECT value FROM prechat_options WHERE field_id = ?",
          [f.id]
        );
        f.options = options.map((o) => o.value);
      }
    }

    res.json({ success: true, form: { ...form, fields } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST: Save / Update form fields
export const updateFormFields = async (req, res) => {
  const { info, button_text, fields,status } = req.body;
  const { chatbotId } = req.params; // <--- use route param
console.log("Updating form status to:", status, "for chatbotId:", chatbotId);

  try {
    let [forms] = await db.query(
      "SELECT * FROM prechat_forms WHERE chatbot_id = ?",
      [chatbotId]
    );

    let formId;

    if (!forms.length) {
      // Create new form
      const [result] = await db.query(
        "INSERT INTO prechat_forms (chatbot_id, info, button_text, status) VALUES (?, ?, ?, 'enabled')",
        [chatbotId, info, button_text,status]
      );
      formId = result.insertId;
    } else {
      // Update existing form
      formId = forms[0].id;
      await db.query(
        "UPDATE prechat_forms SET info = ?, button_text = ? WHERE id = ?",
        [info, button_text, formId]
      );

      // Delete old fields & options
      await db.query("DELETE FROM prechat_fields WHERE form_id = ?", [formId]);
      await db.query(
        "DELETE o FROM prechat_options o JOIN prechat_fields f ON o.field_id = f.id WHERE f.form_id = ?",
        [formId]
      );
    }

    // Insert new fields
    // Insert new fields
    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];

      if (!f.type || !f.label) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Field type and label are required",
          });
      }

      const [fieldResult] = await db.query(
        "INSERT INTO prechat_fields (form_id, type, label, placeholder, required, field_order) VALUES (?, ?, ?, ?, ?, ?)",
        [
          formId,
          f.type,
          f.label,
          f.placeholder || "",
          f.required ? 1 : 0,
          i + 1,
        ]
      );

      if (f.type === "dropdown" && f.options) {
        for (let opt of f.options) {
          await db.query(
            "INSERT INTO prechat_options (field_id, value) VALUES (?, ?)",
            [fieldResult.insertId, opt]
          );
        }
      }
    }

    res.json({ success: true, message: "Form saved/updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// POST: Toggle form status
export const updateFormStatus = async (req, res) => {
  const { status } = req.body;
  const { chatbotId } = req.params; // <--- use route param

  try {
    await db.query("UPDATE prechat_forms SET status = ? WHERE chatbot_id = ?", [
      status,
      chatbotId,
    ]);
    res.json({ success: true, status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE: Delete single field
export const deleteField = async (req, res) => {
  const { chatbotId, fieldId } = req.params;
  try {
    // Get form
    const [forms] = await db.query(
      "SELECT * FROM prechat_forms WHERE chatbot_id = ?",
      [chatbotId]
    );
    if (!forms.length)
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });

    // Delete options for this field if any
    await db.query("DELETE FROM prechat_options WHERE field_id = ?", [fieldId]);

    // Delete the field itself
    await db.query("DELETE FROM prechat_fields WHERE id = ?", [fieldId]);

    res.json({ success: true, message: "Field deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
