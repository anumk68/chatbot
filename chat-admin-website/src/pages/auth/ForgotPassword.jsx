import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { forgotPasswordAPI } from "../../api/auth/authApi.js"; 
import logo from '../../assets/digi-logo.png'

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
      const res = await forgotPasswordAPI(email); 
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
              src={logo}
              alt="Logo"
              className="w-[40%] h-16 mx-auto bg-white p-2 rounded-full"
            />
      <h2 className="login-title text-white">Forgot Password</h2>

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
          className="w-full py-2 rounded-lg bg-[#ff2828] hover:bg-blue-700 transition text-white font-medium shadow-md cursor-pointer"
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
          className="text-white hover:underline text-base cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
