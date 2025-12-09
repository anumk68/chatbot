import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const AgentForgotPasswordForm = ({
  activePanel,
  forgotForm,
  setForgotForm,
  handleSubmit,
  loading,
  setPanelErrors,
  setActivePanel,
}) => {
  return (
    <div
      className={`form-panel forgot-agent-panel ${
        activePanel === "forgot-agent"
          ? "opacity-100 z-10"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
          alt="Logo"
          className="login-logo"
        />
        <h2 className="login-title">Forgot Password</h2>

        <form onSubmit={(e) => handleSubmit(e, "forgot-agent")}>
          <div className="login-input-group">
            <FontAwesomeIcon icon={faEnvelope} className="login-input-icon" />
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={forgotForm.email}
              onChange={(e) =>
                setForgotForm({ ...forgotForm, email: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="login-btn login-btn-white">
            Send Reset Link
          </button>

          {loading && (
            <p className="text-sm text-blue-600 mt-2">Processing...</p>
          )}
        </form>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={() => {
            setActivePanel("agent");
            setPanelErrors((prev) => ({ ...prev, forgotAgent: "" }));
          }}
          className="text-white hover:underline text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default AgentForgotPasswordForm;
