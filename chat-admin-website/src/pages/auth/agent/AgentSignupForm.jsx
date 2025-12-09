import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import jwt_decode from "jwt-decode"; // Correct way to import jwt-decode
import { useLocation, useNavigate } from "react-router-dom";

const AgentSignupForm = ({
  activePanel,
  signupForm,
  setSignupForm,
  handleSignupSubmit,
  setActivePanel,
  panelErrors,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  // Grab token from URL query and decode it
  useEffect(() => {
    const params = new URLSearchParams(location.search); // Extract query params from the URL
    const token = params.get("token");
    const chatbotId = params.get("chatbotId");
    const adminChatbotId = params.get("adminChatbotId");

    if (token && chatbotId && adminChatbotId) {
      try {
        const decoded = jwt_decode(token); // Decode the token
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token is expired
        if (decoded.exp < currentTime) {
          setPanelErrors("Invite link has expired.");
          return;
        }

        setSignupForm({
          name: "",
          email: decoded.email || "",
          password: "",
          token: token,
          chatbot_id: chatbotId,
          admin_chatbot_id: adminChatbotId,
        });
      } catch (err) {
        console.error("Invalid token", err);
        setPanelErrors("Invalid or malformed token.");
      }
    } else {
      setPanelErrors("Missing token or chatbot details.");
    }
  }, [location.search]);

  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
        activePanel === "agent-signup"
          ? "opacity-100 scale-100 z-10"
          : "opacity-0 scale-95 pointer-events-none z-0"
      } flex flex-col justify-center items-center bg-white rounded-xl p-6 shadow-lg`}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="Agent Logo"
            className="w-16 mb-2"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Agent Sign Up
          </h2>
        </div>

        <form onSubmit={handleSignupSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              className="flex-1 focus:outline-none"
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm({ ...signupForm, name: e.target.value })
              }
              required
              autoFocus
            />
          </div>

          {/* Email Input (Read-only) */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 focus:outline-none bg-gray-100 cursor-not-allowed"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border rounded-lg px-3 py-2 relative">
            <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 focus:outline-none"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition"
          >
            Sign Up
          </button>

          {panelErrors && (
            <p className="text-sm text-red-500 mt-2 text-center">{panelErrors}</p>
          )}
        </form>

        <div className="flex justify-center mt-4 text-sm text-blue-600">
          <button
            type="button"
            onClick={() => setActivePanel("agent-login")}
            className="hover:underline"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentSignupForm;
