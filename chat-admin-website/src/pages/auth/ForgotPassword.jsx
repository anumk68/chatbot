import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { forgotPasswordAPI } from "../../api/auth/authApi.js"; // Correct import

const ForgotPassword = ({ activePanel, setActivePanel }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await forgotPasswordAPI(email); // Pass email directly
      if (res.success) {
        setMessage(res.message || "Password reset link sent to your email!");
      } else {
        setError(res.message || "Failed to send reset link.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please check your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`form-panel forgot-panel ${
        activePanel === "forgot"
          ? "opacity-100 z-10"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/906/906343.png"
        alt="Logo"
        className="login-logo"
      />
      <h2 className="login-title text-cyan-600">Forgot Password</h2>

      <form onSubmit={handleSendResetLink}>
        <div className="login-input-group">
          <FontAwesomeIcon icon={faEnvelope} className="login-input-icon" />
          <input
            type="email"
            placeholder="Enter your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="login-btn login-btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="text-green-600 mt-3 text-center">{message}</p>}
      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setActivePanel("admin")}
          className="login-link text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
