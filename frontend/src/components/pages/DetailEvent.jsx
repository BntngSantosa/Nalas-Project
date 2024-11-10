import React from "react";
import DetailEventLayout from "../layouts/DetailEventLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function DetailEvent() {
  return (
    <ProtectedLayout>
      <DetailEventLayout />
    </ProtectedLayout>
  );
}
