import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const AgentLoginForm = ({
  activePanel,
  loginForm = { email: "", password: "" },
  setLoginForm,
  setActivePanel,
  setPanelErrors,
  handleLogin,
  loading,
  panelErrors = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = loginForm;

  const handleAgentDisconnect = async () => {
    if (!agentId) return;

    await fetch(`${API_URL}/agent/${agentId}/disconnect`, {
      method: "POST",
    });

    emitAgentDisconnect(agentId);

    localStorage.removeItem("agent_data");
    setAgent(null);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        activePanel === "agent-login"
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
            alt="Logo"
            className="mx-auto w-20 h-20 mb-2"
          />
          <h2 className="text-2xl font-bold text-gray-800"> Login Form</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Error Message */}
          {panelErrors?.agentLogin && (
            <p className="text-red-500 text-sm">{panelErrors.agentLogin}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {loading && (
            <p className="text-sm text-blue-600 mt-2 text-center">
              Please wait...
            </p>
          )}
        </form>

        {/* Footer Links */}
        <div className="flex justify-between mt-6 text-sm text-gray-600">
          <button
            type="button"
            onClick={() => {
              setActivePanel("forgot-agent");
              setPanelErrors((prev) => ({ ...prev, forgotAgent: "" }));
            }}
            className="hover:underline"
          >
            Forgot Password?
          </button>

          <button
            type="button"
            onClick={() => {
              setActivePanel("agent-signup");
              setPanelErrors((prev) => ({ ...prev, signupAgent: "" }));
            }}
            className="hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentLoginForm;
