import React from "react";
import EventDataLayout from "../../layouts/admin/EventDataLayout";
import ProtectedRoute from "../../layouts/admin/ProtectedLayoutAdmin";

export default function EventData() {
  return (
    <ProtectedRoute>
      <EventDataLayout />
    </ProtectedRoute>
  );
}
