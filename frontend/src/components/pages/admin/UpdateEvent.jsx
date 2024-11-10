import React from "react";
import UpdateEventLayout from "../../layouts/admin/UpdateEventLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function UpdateEvent() {
  return (
    <ProtectedRoute>
      <UpdateEventLayout />
    </ProtectedRoute>
  );
}
