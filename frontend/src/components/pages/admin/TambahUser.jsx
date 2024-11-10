import React from "react";
import TambahUserLayout from "../../layouts/admin/TambahUserLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function TambahUser() {
  return (
    <ProtectedRoute>
      <TambahUserLayout />
    </ProtectedRoute>
  );
}
