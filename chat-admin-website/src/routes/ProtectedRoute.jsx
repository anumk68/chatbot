import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useSelector((state) => state.auth);

  // check Redux or fallback to localStorage
  const storedUser = localStorage.getItem("user");
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

  // not logged in at all
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // role mismatch
  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (currentUser.role === "agent") {
      return <Navigate to="/agent-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  //  allowed — render child component
  return children;
};

export default ProtectedRoute;
