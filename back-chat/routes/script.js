import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const API_URL = process.env.CORS_ORIGIN;

// Route: /generate-script/:chatbotId
router.get("/generate-script/:chatbotId", (req, res) => {
  const { chatbotId } = req.params;

  const script = `
<!-- Start of DigiChat widget -->
<link
  rel="stylesheet"
  href="${API_URL}/widget/chat-admin-website.css"
/>

<script>
  window.DigiChatConfig = { chatbot_id: "${chatbotId}" };
  (function () {
    const s = document.createElement("script");
    s.src = "${API_URL}/widget/widget.js";
    s.async = true;
    document.head.appendChild(s);
  })();
</script>
<!-- End of DigiChat widget -->
`;

  res.type("text/html").send(script);
});

export default router;
