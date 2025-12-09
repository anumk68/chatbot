import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api";

// Async thunk to fetch agent info by chatbotId
export const fetchAgentInfo = createAsyncThunk(
  "agent/fetchAgentInfo",
  async (chatbotId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/agents/chatbot/${chatbotId}`);
      if (res.data.success && res.data.agents.length > 0) {
        return res.data.agents[0]; 
      } else {
        return thunkAPI.rejectWithValue("No agents found");
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  agentId: null,
  agentName: null,
  chatbotId: null,
  email: "",
  role: "",
  status: "idle",
  error: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    loginAgent: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.agentId = user.agent_id;
      state.agentName = user.name;
      state.chatbotId = user.chatbot_id;
      state.email = user.email;
      state.role = user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("agentId", user.agent_id);
      localStorage.setItem("agentName", user.name);
      localStorage.setItem("chatbotId", user.chatbot_id);
    },
    logoutAgent: (state) => {
      state.token = null;
      state.agentId = null;
      state.agentName = null;
      state.chatbotId = null;
      state.email = "";
      state.role = "";
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("agentId");
      localStorage.removeItem("agentName");
      localStorage.removeItem("chatbotId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgentInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        const user = action.payload;
        state.agentId = user.agent_id;
        state.agentName = user.name;
        state.chatbotId = user.chatbot_id;
        state.email = user.email || "";
        state.role = user.role || "";
      })
      .addCase(fetchAgentInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { loginAgent, logoutAgent } = agentSlice.actions;
export default agentSlice.reducer;
