import MasukLayout from "../layouts/MasukLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";

const Login = () => {
  return (
    <ProtectedRoute>
      <MasukLayout />
    </ProtectedRoute>
  );
};

export default Login;
