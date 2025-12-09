import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signup, login, logoutUserAPI } from "../../api/auth/authApi";

// --------------- LOGIN 
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password }); // res.data from backend

      if (!data.token) {
        return rejectWithValue("Invalid login response: token missing");
      }

      const userData = {
        token: data.token,
        email: data.email,
        name: data.name,
        role: data.role,
        chatbot_id: data.chatbot_id,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

// --------------- SIGNUP 
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await signup({
        name,
        email,
        password,
        role: "admin",
        status: "inactive",
      });
      return response; // { message, chatbot_id }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed.");
    }
  }
);

// --------------- LOGOUT 
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) throw new Error("Token missing");

      await logoutUserAPI(token); // call backend to set status inactive

      // Clear localStorage + Redux state
      localStorage.removeItem("user");
      dispatch(logout());
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// --------------- SLICE 
const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    status: "idle",
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
