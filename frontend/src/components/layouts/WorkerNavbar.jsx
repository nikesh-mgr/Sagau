import { useNavigate } from "react-router-dom";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import useAuthStore from "../../store/authStore";

const WorkerNavbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Worker Dashboard</h1>

        <p className="text-gray-500 text-sm">Welcome back!</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell size={22} className="text-gray-600 hover:text-blue-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
            0
          </span>
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle size={40} className="text-slate-600" />

          <div>
            <p className="font-semibold">{user?.fullName || "Worker"}</p>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default WorkerNavbar;
