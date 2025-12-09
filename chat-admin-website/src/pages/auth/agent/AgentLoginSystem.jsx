import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import AgentLoginForm from "./AgentLoginForm.jsx";
import { useDispatch } from "react-redux";
import AgentSignupForm from "./AgentSignupForm.jsx";

import ForgotPassword from "../ForgotPassword.jsx";
import { agentLogin, agentSignup } from "../../../api/agentAuth.js";
import { loginAgent } from "../../../redux/auth/agentAuthSlice.js"; 

const AgentLoginSystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flipWrapperRef = useRef(null);
  const dispatch = useDispatch();


  // Read token from URL if present
  const params = new URLSearchParams(location.search);
  const tokenFromURL = params.get("token");

  // Panels: login, signup, forgot
  const [activePanel, setActivePanel] = useState(
    tokenFromURL ? "agent-signup" : "agent-login"
  );

  // Errors
  const [panelErrors, setPanelErrors] = useState({
    agentLogin: "",
    agentSignup: "",
    forgot: "",
  });

  // Loading
  const [loading, setLoading] = useState(false);

  // Forms
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    token: tokenFromURL || "",
  });

  // -------- LOGIN --------
const handleLoginSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = await agentLogin(loginForm);

    if (!payload.success) {
      setLoading(false);
      return toast.error(payload.message);
    }

    const { token, user } = payload;

    if (user.status === "blocked") {
      setLoading(false);
      return toast.error("Your account has been blocked by admin.");
    }

    // save login details to Redux
    dispatch(loginAgent({ token, user }));

    toast.success("Login successful!");

    // redirect after successful login
    navigate("/agent-dashboard", { replace: true });

  } catch (err) {
    toast.error("Login failed, try again");
  } finally {
    setLoading(false);
  }
};


  // -------- SIGNUP --------
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setPanelErrors((prev) => ({ ...prev, agentSignup: "" }));

    const { name, email, password, token } = signupForm;
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    if (!token) return toast.error("Invitation token is required");

    try {
      setLoading(true);
      const payload = await agentSignup(signupForm);
      toast.success(payload.message || "Signup successful");
      setSignupForm({ name: "", email: "", password: "", token: "" });
      setActivePanel("agent-login");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setPanelErrors((prev) => ({ ...prev, agentSignup: msg }));
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 p-4">
      <div
        ref={flipWrapperRef}
        className="relative w-[380px] h-[480px] bg-white shadow-xl rounded-xl overflow-hidden"
      >
        {/* LOGIN FORM */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
            activePanel === "agent-login"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 pointer-events-none z-0"
          }`}
        >
          <AgentLoginForm
            activePanel={activePanel}
            loginForm={loginForm}
            setLoginForm={setLoginForm}
            setActivePanel={setActivePanel}
            setPanelErrors={setPanelErrors}
            handleLogin={handleLoginSubmit}
            loading={loading}
            panelErrors={panelErrors.agentLogin}
          />
        </div>

        {/* SIGNUP FORM */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
            activePanel === "agent-signup"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 pointer-events-none z-0"
          }`}
        >
          <AgentSignupForm
            activePanel={activePanel}
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            handleSignupSubmit={handleSignupSubmit}
            panelErrors={panelErrors.agentSignup}
            setActivePanel={setActivePanel}
            loading={loading}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
            activePanel === "forgot-agent"
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-95 pointer-events-none z-0"
          }`}
        >
          <ForgotPassword
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            setPanelErrors={setPanelErrors}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentLoginSystem;
