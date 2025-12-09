import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({
  activePanel,
  adminForm,
  setAdminForm,
  handleSubmit,
  loading,
  setPanelErrors,
  setActivePanel,
}) => {
  return (
    <div
      className={`form-panel admin-panel ${
        activePanel === "admin"
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
        <h2 className="login-title"> Login Form</h2>

        <form onSubmit={(e) => handleSubmit(e, "admin")}>
          <div className="login-input-group">
            <FontAwesomeIcon icon={faEnvelope} className="login-input-icon" />
            <input
              type="email"
              placeholder="Email address"
              className="login-input"
              value={adminForm.email}
              onChange={(e) =>
                setAdminForm({ ...adminForm, email: e.target.value })
              }
              required
            />
          </div>

          <div className="login-input-group">
            <FontAwesomeIcon icon={faLock} className="login-input-icon" />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={adminForm.password}
              onChange={(e) =>
                setAdminForm({ ...adminForm, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="login-btn login-btn-white">
            Login
          </button>

          {loading && (
            <p className="text-sm text-blue-600 mt-2">Logging in...</p>
          )}
        </form>
      </div>

      <div className="flex justify-between px-2 mt-4">
        <button
          type="button"
          onClick={() => {
            setActivePanel("forgot");
            setPanelErrors((prev) => ({ ...prev, forgot: "" }));
          }}
          className="flex items-center justify-center gap-2 text-white hover:underline text-sm"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => {
            setActivePanel("signup");
            setPanelErrors((prev) => ({ ...prev, signup: "" }));
          }}
          className="flex items-center justify-center gap-2 text-white hover:underline text-sm"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
