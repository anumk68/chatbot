import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      setError("Passwords do not match! Please re-enter.");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      setLoading(true);

      // Send email + token + password
      const res = await axios.post(`${API_URL}/reset-password`, {
        email,
        token,
        password,
      });

      if (res.data.success) {
        setMessage("Password reset successfully!");
        toast.success("Password Reset Successfully.")
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(res.data.message || "Failed to reset password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-3xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-cyan-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-cyan-100 text-sm">
            Enter your new password below to access your account.
          </p>
        </div>

        <div className="p-6">
          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-200 p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="bg-green-100 text-green-700 border border-green-200 p-3 rounded-md mb-4 text-center">
              {message}
            </div>
          )}

          {!error && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:outline-cyan-500 focus:ring-2 focus:ring-cyan-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-xl p-3 pr-12 focus:outline-cyan-500 focus:ring-2 focus:ring-cyan-400 transition"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-cyan-600 hover:underline font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} DigiRushChat. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
