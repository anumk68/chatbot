import nodemailer from "nodemailer";

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
    secure: false,
});

// Send invite email
export const sendInviteMail = async (email, inviteLink) => {
  try {
    const mailOptions = {
      from: '"Live Chat" <no-reply@livechat.com>',
      to: email,
      subject: "You are invited as an Agent",
      html: `
        <h2>You’ve been invited!</h2>
        <p>Click below to join the workspace:</p>
        <a href="${inviteLink}"
           style="background:#2563EB;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;">
           Accept Invitation
        </a>
        <p>This link is valid for 24 hours.</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending invite email:", err);
    throw new Error("Failed to send invite email");
  }
};

//  Generic email sender
export const sendEmail = async (email, subject, html) => {
  await transporter.sendMail({
    from: '"Live Chat" <no-reply@livechat.com>',
    to: email,
    subject,
    html,
  });
};
