import React from "react";
import TambahEventAdminLayout from "../../layouts/admin/TambahEventAdminLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function TambahEventAdmin() {
  return (
    <ProtectedRoute>
      <TambahEventAdminLayout />
    </ProtectedRoute>
  );
}
