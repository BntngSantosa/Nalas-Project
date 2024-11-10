import React from "react";
import WbDataLyout from "../../layouts/admin/WbDataLyout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function WbData() {
  return (
    <ProtectedRoute>
      <WbDataLyout />
    </ProtectedRoute>
  );
}
