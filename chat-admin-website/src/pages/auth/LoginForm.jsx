import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "../../firebase";

const LoginForm = ({
  activePanel,
  adminForm,
  setAdminForm,
  handleSubmit,
  loading,
  setPanelErrors,
  setActivePanel,
  handleGoogleLogin,
}) => {
  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const token = await result.user.getIdToken();

      // Send token to your backend
      const res = await fetch(`${API_URL}/api/auth/facebook-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = "/admin-dashboard";
      }
    } catch (err) {
      console.error("Facebook login error:", err);
      alert("Facebook login failed");
    }
  };

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

        <form onSubmit={handleSubmit}>
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

          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition border"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:shadow-lg transition "
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                className="w-5 h-5"
              />
              <span className="text-white font-medium">
                Continue with Facebook
              </span>
            </button>
          </div>

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
