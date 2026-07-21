import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user);

  const token = useAuthStore((state) => state.token);

  if (!token || !user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
