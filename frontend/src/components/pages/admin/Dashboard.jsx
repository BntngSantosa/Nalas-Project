import React from "react";
import DashboardLayout from "../../layouts/admin/DashboardLayout";
import ProtectedLayout from "../../layouts/admin/ProtectedLayoutAdmin";

export default function Dashboard() {
  return (
    // <ProtectedLayout>
      <DashboardLayout />
    // </ProtectedLayout>
  );
}
