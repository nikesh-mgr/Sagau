import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const ClientNavbar = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Client Dashboard</h1>

        <p className="text-gray-500 text-sm">
          Welcome back,
          <span className="font-semibold text-blue-600 ml-1">
            {user?.fullName || "Client"}
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative text-gray-600 hover:text-blue-600 transition">
          <FaBell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-[10px] h-5 w-5 flex items-center justify-center">
            0
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <FaUserCircle size={38} className="text-slate-500" />

          <div>
            <p className="font-semibold">{user?.fullName}</p>

            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default ClientNavbar;
