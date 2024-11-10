import React from "react";
import AdminLayout from "../../layouts/admin/AdminLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function Admin() {
  return (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  );
}
