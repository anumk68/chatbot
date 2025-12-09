import jwt from 'jsonwebtoken';

const generateToken = (id, role, chatbotId, adminChatbotId) => {
  return jwt.sign(
    { id, role, chatbotId, adminChatbotId },
    process.env.SECRET_KEY || 'SECRET_KEY', // login/auth secret
    { expiresIn: '7d' }
  );
};

export default generateToken;
