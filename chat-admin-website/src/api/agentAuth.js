import axios from "axios";

const API = import.meta.env.VITE_NODE_BASE_URL + "/api/agents";

const API_URL = import.meta.env.VITE_NODE_BASE_URL;

//  Signup
export const agentSignup = async (data) => {
  return await axios.post(`${API}/register`, data);
};

//  Login
export const agentLogin = async (data) => {
  return await axios.post(`${API_URL}/api/auth/login`, data);
};

//  Get Agent Profile
export const getAgentProfile = async (token) => {
  return await axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const inviteAgents = async (data) => {
  console.log("Data being sent to invite agents:", data);
  return await axios.post(`${API}/invite`, data);
};

export const verifyInviteToken = async (token) => {
  return await axios.post(`${API}/verify-token`, { token });
};
