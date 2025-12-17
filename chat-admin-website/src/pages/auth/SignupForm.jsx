import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/digi-logo.png'

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
      className="w-[50%] bg-white h-18 mx-auto p-2 rounded-full"
     src={logo} alt="" />

      <h2 className="login-title text-white">Create Form</h2>

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

        <button type="submit" className="w-full py-2 rounded-lg bg-[#ff2828] hover:bg-blue-700 transition text-white font-medium shadow-md mt-3 cursor-pointer">
          Create Account
        </button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => setActivePanel("admin")}
            className=" text-white hover:underline text-base cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
