import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const token = Cookies.get("access_Token");

  return token ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
