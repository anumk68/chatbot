import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const AgentResetPasswordForm = ({
  activePanel,
  resetForm,
  setResetForm,
  handleSubmit,
  loading,
  setPanelErrors,
  setActivePanel,
}) => {
  return (
    <div
      className={`form-panel reset-agent-panel ${
        activePanel === "reset-agent"
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
        <h2 className="login-title">Reset Password</h2>

        <form onSubmit={(e) => handleSubmit(e, "reset-agent")}>
          <div className="login-input-group">
            <FontAwesomeIcon icon={faLock} className="login-input-icon" />
            <input
              type="password"
              placeholder="New Password"
              className="login-input"
              value={resetForm.password}
              onChange={(e) =>
                setResetForm({ ...resetForm, password: e.target.value })
              }
              required
            />
          </div>

          <div className="login-input-group">
            <FontAwesomeIcon icon={faLock} className="login-input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="login-input"
              value={resetForm.confirmPassword}
              onChange={(e) =>
                setResetForm({ ...resetForm, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="login-btn login-btn-white">
            Reset Password
          </button>

          {loading && (
            <p className="text-sm text-blue-600 mt-2">Updating...</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AgentResetPasswordForm;
