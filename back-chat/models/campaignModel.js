export default {
  getAll: async (db, chatbotId) => {
    const [rows] = await db.query(
      "SELECT * FROM campaigns WHERE chatbot_id = ? ORDER BY id DESC",
      [chatbotId]
    );
    return rows;
  },

  create: async (db, data) => {
    const { chatbot_id, name, description } = data;
    await db.query(
      "INSERT INTO campaigns (chatbot_id, name, description) VALUES (?, ?, ?)",
      [chatbot_id, name, description]
    );
  },

  updateStatus: async (db, id, status, chatbotId) => {
    await db.query(
      "UPDATE campaigns SET active = ? WHERE id = ? AND chatbot_id = ?",
      [status, id, chatbotId]
    );
  },

  duplicate: async (db, id, chatbotId) => {
    await db.query(
      `INSERT INTO campaigns (chatbot_id, name, description, active)
       SELECT chatbot_id, CONCAT(name, ' (Copy)'), description, 0
       FROM campaigns WHERE id = ? AND chatbot_id = ?`,
      [id, chatbotId]
    );
  },

  delete: async (db, id, chatbotId) => {
    await db.query(
      "DELETE FROM campaigns WHERE id = ? AND chatbot_id = ?",
      [id, chatbotId]
    );
  },
};
