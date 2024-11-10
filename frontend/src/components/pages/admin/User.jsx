import React from "react";
import UsersLayout from "../../layouts/admin/UsersLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function User() {
  return (
    <ProtectedRoute>
      <UsersLayout />
    </ProtectedRoute>
  );
}
