import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const RoleRoute = ({ children, role }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
