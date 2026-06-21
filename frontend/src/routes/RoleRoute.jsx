import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
