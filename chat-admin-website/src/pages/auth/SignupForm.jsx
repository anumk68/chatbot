import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const SignupForm = ({
  activePanel,
  signupForm,
  setSignupForm,
  handleSignupSubmit,
  setActivePanel,
}) => {
  return (
    <div
      className={`form-panel signup-panel ${
        activePanel === "signup"
          ? "opacity-100 z-10"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
        alt="Logo"
        className="login-logo"
      />

      <h2 className="login-title text-cyan-600">Sign Up</h2>

      {/* noValidate is IMPORTANT */}
      <form onSubmit={handleSignupSubmit} noValidate>
        {/* Name */}
        <div className="login-input-group">
          <FontAwesomeIcon icon={faUser} className="login-input-icon" />
          <input
            type="text"
            placeholder="Full Name"
            className="login-input"
            value={signupForm.name}
            onChange={(e) =>
              setSignupForm({ ...signupForm, name: e.target.value })
            }
            required
          />
        </div>

        {/* Email */}
        <div className="login-input-group">
          <FontAwesomeIcon icon={faEnvelope} className="login-input-icon" />
          <input
            type="email"
            placeholder="Email address"
            className="login-input"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div className="login-input-group">
          <FontAwesomeIcon icon={faLock} className="login-input-icon" />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="login-input-group">
          <FontAwesomeIcon icon={faLock} className="login-input-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={signupForm.confirmPassword}
            onChange={(e) =>
              setSignupForm({
                ...signupForm,
                confirmPassword: e.target.value,
              })
            }
            required
          />
        </div>

        <button type="submit" className="login-btn login-btn-primary mt-3">
          Create Account
        </button>

        <div className="text-center mt-4 pt-4">
          <button
            type="button"
            onClick={() => setActivePanel("admin")}
            className="login-link text-sm"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
