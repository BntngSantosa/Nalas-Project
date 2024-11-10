import DaftarLayout from "../layouts/DaftarLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

const Daftar = () => {
  return (
    <ProtectedRoute>
      <DaftarLayout />
    </ProtectedRoute>
  );
};

export default Daftar;
