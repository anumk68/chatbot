import axios from "axios";

// Define the API URL
const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api/auth";

//  SIGNUP 
export const signup = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, data);
    return res.data;
  } catch (error) {
    console.error("Signup Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

//  LOGIN 
export const login = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    
    // Store token and chatbot_id in localStorage
    localStorage.setItem("authToken", res.data.token);
    localStorage.setItem("chatbotId", res.data.chatbot_id);
    
    return res.data;  // You can use this data for further actions if needed
  } catch (error) {
    console.error("Login Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

//  LOGOUT 
export const logoutUserAPI = async (token) => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Clear localStorage upon logout
    localStorage.removeItem("authToken");
    localStorage.removeItem("chatbotId");
    localStorage.removeItem("token");
    return res.data;
  } catch (error) {
    console.error("Logout Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

//  FORGOT PASSWORD 
export const forgotPasswordAPI = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    return res.data;
  } catch (error) {
    console.error("Forgot Password Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

//  RESET PASSWORD 
export const resetPasswordAPI = async (token, new_password) => {
  try {
    const res = await axios.post(`${API_URL}/reset-password`, { token, new_password });
    return res.data;
  } catch (error) {
    console.error("Reset Password Error: ", error.response ? error.response.data : error.message);
    throw error;
  }
};

//  EXPORT ALL 
export default {
  signup,
  login,
  logoutUserAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
};
