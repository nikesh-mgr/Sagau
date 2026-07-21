import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiLogOut, FiUser, FiChevronDown, FiMenu } from "react-icons/fi";

import useAuthStore from "../../store/authStore";

import NotificationBell from "../notification/NotificationBell";

import { successToast } from "../../utils/toast";

const Topbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    logout();

    successToast("Logged out successfully");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 h-16 md:h-20 bg-white/90 backdrop-blur border-b border-gray-200 flex items-center justify-between px-4 md:px-8">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-700 transition"
      >
        <FiMenu size={24} />
      </button>

      <h1 className="md:hidden text-xl font-bold text-primary">Sagau</h1>

      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <NotificationBell />

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 md:gap-3 rounded-xl p-1.5 md:px-3 md:py-2 hover:bg-gray-50 transition"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-emerald-100 text-primary flex items-center justify-center font-bold">
              {user?.fullName ? (
                user.fullName.charAt(0).toUpperCase()
              ) : (
                <FiUser />
              )}
            </div>

            <div className="hidden md:block text-left">
              <p className="font-semibold text-gray-800 text-sm">
                {user?.fullName}
              </p>

              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>

            <FiChevronDown className="hidden md:block text-gray-500" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-gray-700 transition"
              >
                <FiUser />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
