import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("access_Token");
  const role = Cookies.get("user_Role");
  const location = useLocation();

  const allowedRoutes = {
    ADMIN: [
      "/admin/dashboard",
      "/admin/dashboard/user",
      "/admin/dashboard/user/update/:id",
      "/admin/dashboard/wb",
      "/admin/dashboard/wb/update/:id",
      "/admin/dashboard/event",
      "/admin/dashboard/event/update/:id",
    ],
  };

  if (!token) {
    return <Navigate to="/" />;
  }

  const currentPath = location.pathname;
  if (!allowedRoutes[role]?.includes(currentPath)) {
    return <Navigate to={role === "ADMIN" ? "/admin/dashboard" : "/"} />;
  }

  return children;
};

export default ProtectedRoute;
