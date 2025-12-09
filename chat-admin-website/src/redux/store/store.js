import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../redux/auth/authSlice";
import formReducer from "../form/reducer";
import agentReducer from "../../redux/auth/agentAuthSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    agent: agentReducer,
  },
});
