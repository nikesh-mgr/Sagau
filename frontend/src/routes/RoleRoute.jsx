import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/authStore";

const RoleRoute = ({ role }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
