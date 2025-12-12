import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, setUser } from "../../redux/auth/authSlice";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";

import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import axios from "axios";

const LoginSystem = ({ initialPanel = "admin" }) => {
  const [activePanel, setActivePanel] = useState(initialPanel);
  const [panelErrors, setPanelErrors] = useState({
    admin: "",
    signup: "",
    forgot: "",
  });
  const flipWrapperRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const loading = status === "loading";

  const API_URL = import.meta.env.VITE_NODE_BASE_URL;

  const [adminForm, setAdminForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  useEffect(() => {
    const wrapper = flipWrapperRef.current;
    if (!wrapper) return;
    wrapper.classList.remove("rotate-y", "rotate-x-up");
    wrapper.classList.add(activePanel === "admin" ? "rotate-y" : "rotate-x-up");
  }, [activePanel]);

  // =================== Google Login ===================
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();

      const res = await axios.post(`${API_URL}/api/auth/google-login`, {
        token: firebaseToken,
      });

      if (res.data.token) {
        const userData = {
          token: res.data.token,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          chatbot_id: res.data.chatbot_id,
        };

        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("chatbotId", res.data.chatbot_id);

        toast.success("Logged in with Google");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Google login error", error);
      toast.error("Google login failed");
    }
  };

  // =================== Facebook Login ===================
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      if (!credential) throw new Error("No credential returned from Facebook login");

      const token = credential.accessToken;
      const user = result.user;

      console.log("Facebook user:", user);
      console.log("Access token:", token);

      // Optional: send Firebase token to your backend
      const firebaseToken = await user.getIdToken();
      const res = await axios.post(`${API_URL}/api/auth/facebook-login`, { token: firebaseToken });

      if (res.data.token) {
        const userData = {
          token: res.data.token,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          chatbot_id: res.data.chatbot_id,
        };

        dispatch(setUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("chatbotId", res.data.chatbot_id);

        toast.success("Logged in with Facebook");
        navigate("/admin-dashboard");
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("You closed the popup before completing login.");
      } else {
        console.error("Facebook login error:", error);
        toast.error(error.message);
      }
    }
  };

  // =================== Normal Login ===================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await dispatch(loginUser(adminForm)).unwrap();
      toast.success(payload.message);
      localStorage.setItem("token", payload.token);

      if (payload.role === "admin") navigate("/admin-dashboard");
      else navigate("/agent-dashboard");
    } catch (err) {
      setPanelErrors((prev) => ({ ...prev, admin: err }));
      toast.error(err);
    }
  };

  // =================== Signup ===================
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = signupForm;

    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const payload = await dispatch(
        registerUser({ name, email, password, role: "admin" })
      ).unwrap();
      toast.success(payload.message || "Signup successful");
      setActivePanel("admin");
    } catch (err) {
      setPanelErrors((prev) => ({ ...prev, signup: err }));
      toast.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 p-4">
      <div className="login-system-container">
        <div ref={flipWrapperRef} className="flip-wrapper">
          <LoginForm
            activePanel={activePanel}
            adminForm={adminForm}
            setAdminForm={setAdminForm}
            handleSubmit={handleSubmit}
            loading={loading}
            panelErrors={panelErrors}
            setActivePanel={setActivePanel}
            setPanelErrors={setPanelErrors}
            handleGoogleLogin={handleGoogleLogin}
            handleFacebookLogin={handleFacebookLogin} // Pass Facebook handler
            API_URL={API_URL}
          />

          <SignupForm
            activePanel={activePanel}
            signupForm={signupForm}
            setSignupForm={setSignupForm}
            handleSignupSubmit={handleSignupSubmit}
            panelErrors={panelErrors.signup}
            setActivePanel={setActivePanel}
          />

          <ForgotPassword
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;
