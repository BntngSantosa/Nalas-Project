import React from "react";
import TambahWbAdminLayout from "../../layouts/admin/TambahWbAdminLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function TambahWb() {
  return (
    // <ProtectedRoute>
      <TambahWbAdminLayout />
    // </ProtectedRoute>
  );
}
