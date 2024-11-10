import React from "react";
import DetailWbLayout from "../layouts/DetailWbLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

export default function DetailWb() {
  return (
    <ProtectedLayout>
      <DetailWbLayout />
    </ProtectedLayout>
  );
}
