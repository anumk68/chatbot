import db from "../config/db.js";

const FormModel = {
  // Get form by chatbot_id
  async getFormByChatbotId(chatbotId) {
    try {
      const [forms] = await db.query(
        "SELECT * FROM prechat_forms WHERE chatbot_id = ?",
        [chatbotId]
      );

      if (!forms.length) {
        console.log(`Form not found for chatbotId: ${chatbotId}`);
        return null;
      }

      const form = forms[0];

      // Fetch the associated fields for this form
      const [fields] = await db.query(
        "SELECT * FROM prechat_fields WHERE form_id = ? ORDER BY field_order ASC",
        [form.id]
      );

      // Attach dropdown options if any
      for (let f of fields) {
        if (f.type === "dropdown") {
          const [options] = await db.query(
            "SELECT value FROM prechat_options WHERE field_id = ?",
            [f.id]
          );
          f.options = options.map((o) => o.value);
        }
      }

      return { ...form, fields };
    } catch (err) {
      console.error("Error in getFormByChatbotId:", err);
      throw err;
    }
  },

  // Create or update form + fields
  async saveForm({ chatbot_id, info, button_text, fields }) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Check if form exists
      let [forms] = await connection.query(
        "SELECT * FROM prechat_forms WHERE chatbot_id = ?",
        [chatbot_id]
      );

      let formId;

      if (!forms.length) {
        // Insert new form
        const [result] = await connection.query(
          "INSERT INTO prechat_forms (chatbot_id, info, button_text) VALUES (?, ?, ?)",
          [chatbot_id, info, button_text]
        );
        formId = result.insertId;
        console.log(`New form created for chatbotId: ${chatbot_id}`);
      } else {
        // Update existing form
        formId = forms[0].id;
        await connection.query(
          "UPDATE prechat_forms SET info = ?, button_text = ? WHERE id = ?",
          [info, button_text, formId]
        );
        // Delete old fields & options before inserting new ones
        await connection.query("DELETE FROM prechat_fields WHERE form_id = ?", [
          formId,
        ]);
        console.log(`Form updated for chatbotId: ${chatbot_id}`);
      }

      // Insert new fields and options
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i];
        const [fieldResult] = await connection.query(
          "INSERT INTO prechat_fields (form_id, type, label, placeholder, required, field_order) VALUES (?, ?, ?, ?, ?, ?)",
          [formId, f.type, f.label, f.placeholder, f.required ? 1 : 0, i + 1]
        );

        if (f.type === "dropdown" && f.options) {
          for (let opt of f.options) {
            await connection.query(
              "INSERT INTO prechat_options (field_id, value) VALUES (?, ?)",
              [fieldResult.insertId, opt]
            );
          }
        }
      }

      await connection.commit();
      return { success: true, message: "Form saved/updated successfully" };
    } catch (err) {
      console.error("Error in saveForm:", err);
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  },

  // Update form status (enabled/disabled)
  async updateFormStatus(chatbot_id, status) {
    try {
      await db.query(
        "UPDATE prechat_forms SET status = ? WHERE chatbot_id = ?",
        [status, chatbot_id]
      );
      console.log(`Form status updated for chatbotId: ${chatbot_id} to ${status ? 'enabled' : 'disabled'}`);
      return { success: true, status };
    } catch (err) {
      console.error("Error in updateFormStatus:", err);
      throw err;
    }
  },
};

export default FormModel;
