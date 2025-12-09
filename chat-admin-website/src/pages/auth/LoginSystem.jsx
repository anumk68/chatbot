import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/auth/authSlice";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";

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
  const { status, user, error } = useSelector((state) => state.auth);
  const loading = status === "loading";

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

  //  LOGIN 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPanelErrors((prev) => ({ ...prev, admin: "" }));

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

  //  SIGNUP 
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setPanelErrors((prev) => ({ ...prev, signup: "" }));

    const { name, email, password, confirmPassword } = signupForm;
    if (!name.trim()) return toast.error("Name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    if (!confirmPassword.trim())
      return toast.error("Confirm password is required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const payload = await dispatch(
        registerUser({ name, email, password, role: "admin" })
      ).unwrap();
      toast.success(payload.message || "Signup successful");
      setSignupForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      });
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
