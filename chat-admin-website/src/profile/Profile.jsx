import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/auth/authSlice"; // make sure path is correct
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);

  // Logout function
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // calls backend + clears Redux/localStorage
      navigate("/"); // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Redirect to reset password page
  const handleResetPassword = () => {
    navigate("/reset-password"); // make sure this route exists
  };

  // Get first letter of user name or role
  const getInitial = (text) => {
    return text ? text.charAt(0).toUpperCase() : "?";
  };

  return (
    <div
      className="absolute left-0 top-0 transform translate-x-12 -translate-y-[380px] transition-all duration-300 z-50 bg-white shadow-lg border border-gray-300 rounded-md w-80 p-4"
      role="dialog"
    >
      {/* User Info */}
      <ul className="space-y-4">
        <li className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white text-lg font-semibold">
            {getInitial(user?.name || user?.role)}
          </div>
          <div className="flex flex-col items-start justify-center">
            <h3 className="text-base font-semibold text-gray-800">
              {user?.name}
            </h3>
            <span className="text-sm text-gray-600">{user?.email}</span>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Role:</span> {user?.role}
            </p>
          </div>
        </li>
      </ul>

      <div className="my-2 border-t"></div>

      {/* Example setting */}
      <ul className="space-y-2" role="menu">
        <li>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-800">Accept chats</span>
            <input type="checkbox" className="sr-only" checked readOnly />
            <div className="relative inline-block w-10 h-5 bg-green-500 rounded-full">
              <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform transform translate-x-5"></span>
            </div>
          </label>
        </li>
      </ul>

      <div className="my-2 border-t"></div>

      {/* Actions */}
      <ul className="text-sm text-gray-800 space-y-2">
        {/* <li>
          <button
            onClick={handleResetPassword}
            className="text-left w-full hover:text-blue-500 cursor-pointer"
          >
            Reset Password
          </button>
        </li> */}
        <li>
          <button
            onClick={handleLogout}
            className="text-left w-full hover:text-red-500 cursor-pointer"
            disabled={status === "loading"} // prevent multiple clicks
          >
            {status === "loading" ? "Logging out..." : "Log out"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
