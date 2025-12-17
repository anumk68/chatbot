import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/digi-logo.png'

const LoginForm = ({
  activePanel,
  adminForm,
  setAdminForm,
  handleSubmit,
  loading,
  setPanelErrors,
  setActivePanel,
  handleGoogleLogin,
  handleFacebookLogin
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`bg-gradient-to-t from-blue-800 to-blue-500 admin-panel transition-opacity duration-500 ${
        activePanel === "admin" ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
      } p-8 rounded-xl shadow-lg max-w-md mx-auto mt-10`}
    >
      <div className="text-center mb-6">
        <img
          src={logo}
          alt="Logo"
          className="w-[40%] h-16 mx-auto bg-white p-2 rounded-full"
        />
        <h2 className="text-2xl font-bold text-white mt-2">Login With DigiChat</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={adminForm.email}
            onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
            required
          />
        </div>

        <div className="relative">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-2 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={adminForm.password}
            onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#ff2828] hover:bg-blue-700 transition text-white font-medium shadow-md cursor-pointer"
        >
          Login Now
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition border cursor-pointer"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <button
          type="button"
          onClick={handleFacebookLogin} 
          className="w-full flex items-center justify-center gap-3 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition border cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Continue with Facebook</span>
        </button>
      </div>

      {loading && <p className="text-sm text-blue-400 mt-2 text-center">Logging in...</p>}

      <div className="flex justify-between px-2 mt-6 text-sm">
        <button
          type="button"
          onClick={() => {
            setActivePanel("forgot");
            setPanelErrors((prev) => ({ ...prev, forgot: "" }));
          }}
          className="text-white-300 hover:underline text-base cursor-pointer"
        >
          Forgot Password?
        </button>
        <button
          type="button"
          onClick={() => {
            setActivePanel("signup");
            setPanelErrors((prev) => ({ ...prev, signup: "" }));
          }}
          className="text-white-300 hover:underline text-base cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
