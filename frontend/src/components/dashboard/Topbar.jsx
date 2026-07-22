import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiMenu,
  FiShield,
} from "react-icons/fi";

import useAuthStore from "../../store/authStore";

import NotificationBell from "../notification/NotificationBell";

import { successToast } from "../../utils/toast";

const Topbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown using ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    logout();

    successToast("Logged out successfully");

    navigate("/login");
  };

  const userInitial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:h-20 lg:px-8">
      {/* Mobile menu */}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 md:hidden"
      >
        <FiMenu size={24} />
      </button>

      {/* Mobile logo */}
      <h1 className="text-xl font-bold text-emerald-600 md:hidden">Sagau</h1>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        {/* Notifications */}
        <NotificationBell />

        {/* Profile */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50 sm:px-3 sm:py-2"
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 sm:h-10 sm:w-10">
              {userInitial}
            </div>

            {/* Desktop user information */}
            <div className="hidden text-left md:block">
              <p className="max-w-[130px] truncate text-sm font-semibold text-gray-800">
                {user?.fullName || "User"}
              </p>

              <div className="mt-0.5 flex items-center gap-1 text-xs text-emerald-600">
                <FiShield size={12} />

                <span className="capitalize">{user?.role || "member"}</span>
              </div>
            </div>

            <FiChevronDown className="hidden text-gray-400 md:block" />
          </button>

          {/* Dropdown menu */}

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 max-w-[90vw] rounded-2xl border border-gray-100 bg-white p-3 shadow-xl animate-in fade-in slide-in-from-top-2">
              {/* Mobile user info */}
              <div className="mb-2 border-b border-gray-100 px-4 py-3 md:hidden">
                <p className="font-semibold text-gray-800">{user?.fullName}</p>

                <p className="text-sm capitalize text-gray-500">{user?.role}</p>
              </div>

              {/* Profile */}
              <button
                onClick={() => {
                  navigate("profile");
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 transition hover:bg-gray-100"
              >
                <FiUser />
                Profile
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
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
