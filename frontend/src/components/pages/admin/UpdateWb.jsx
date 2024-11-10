import React from "react";
import UpdateWbLayout from "../../layouts/admin/UpdateWbLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function UpdateWb() {
  return (
    <ProtectedRoute>
      <UpdateWbLayout />
    </ProtectedRoute>
  );
}
