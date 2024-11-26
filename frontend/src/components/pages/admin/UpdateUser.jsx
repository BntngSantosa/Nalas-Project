import React from "react";
import UpdateUserLayout from "../../layouts/admin/UpdateUserLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function UpdateUser() {
  return (
    // <ProtectedRoute>
      <UpdateUserLayout />
    // </ProtectedRoute>
  );
}
