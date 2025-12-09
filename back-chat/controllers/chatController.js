import db from "../config/db.js"; // your DB connection

export const saveCustomerForm = async (req, res) => {
  const { chatbot_id, temp_user_id, responses } = req.body;

  try {
    await db.query(
      "INSERT INTO customer_prechat (chatbot_id, temp_user_id, responses, created_at) VALUES (?, ?, ?, NOW())",
      [chatbot_id, temp_user_id, JSON.stringify(responses)]
    );

    res.json({ success: true, message: "Customer data saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

