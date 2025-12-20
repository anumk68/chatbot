import db from "../config/db.js";

export const SendEmail = (req, res) => {
  const { email } = req.body;
  console.log("[SendEmail] Received:", email);

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const query = "INSERT INTO email_requests (email) VALUES (?)";

  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("[SendEmail] DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    console.log("[SendEmail] Email inserted with ID:", result.insertId);
    return res.json({ message: "Email saved successfully!" });
  });
};
