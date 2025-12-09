import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); //  Added this line
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_NODE_BASE_URL + "/api/auth";

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or expired reset link.");
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/reset-password`, {
        email,
        token,
        password,
        password_confirmation: confirmPassword,
      });

      if (res.data?.success) {
        setMessage("Password has been reset successfully! You can now log in.");
        setTimeout(() => {
          navigate("/"); //  Redirect after success
        }, 2000);
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(res.data?.message || "Failed to reset password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-cyan-600 mb-4">
          Reset Password
        </h2>

        {/* Show error only when no token/email */}
        {!error ? (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-cyan-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-center mt-4 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
