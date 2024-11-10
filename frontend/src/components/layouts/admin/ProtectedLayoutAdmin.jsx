import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("access_Token");

  if (!token) {
    // Arahkan ke halaman beranda jika pengguna belum login
    return <Navigate to="/" />;
  }

  if (Cookies.get("user_Role") === "ADMIN") {
    return <Navigate to="/admin/dashboard" />;
  } else if (Cookies.get("user_Role") === "USER") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
