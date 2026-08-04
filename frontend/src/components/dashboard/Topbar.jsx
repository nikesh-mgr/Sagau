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

import { getMyWorkerProfile } from "../../api/workerApi";
import { getClientProfile } from "../../api/clientApi";

const SERVER_URL = "http://localhost:5000";

const Topbar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const [profileImage, setProfileImage] = useState("");

  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  /*
  |--------------------------------------------------------------------------
  | Load Profile Image
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        if (!user?.role) return;

        let response;

        if (user.role === "worker") {
          response = await getMyWorkerProfile();
        }

        if (user.role === "client") {
          response = await getClientProfile();
        }

        if (response?.data?.profileImage) {
          setProfileImage(response.data.profileImage);
        }
      } catch (error) {
        console.log(
          "Profile image loading failed:",
          error?.response?.data || error.message,
        );
      }
    };

    loadProfileImage();
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | Close Dropdown Outside Click
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Escape Close
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

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
      {/* Mobile Menu */}

      <button
        onClick={() => setSidebarOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-100 md:hidden"
      >
        <FiMenu size={24} />
      </button>

      {/* Mobile Logo */}

      <h1 className="text-xl font-bold text-emerald-600 md:hidden">Sagau</h1>

      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        <NotificationBell />

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50 sm:px-3 sm:py-2"
          >
            {/* Avatar */}

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-emerald-100 font-bold text-emerald-700 sm:h-10 sm:w-10">
              {profileImage ? (
                <img
                  src={`${SERVER_URL}${profileImage}`}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                userInitial
              )}
            </div>

            {/* User Info */}

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

          {/* Dropdown */}

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-56 max-w-[90vw] rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
              <div className="mb-2 border-b border-gray-100 px-4 py-3 md:hidden">
                <p className="font-semibold text-gray-800">{user?.fullName}</p>

                <p className="text-sm capitalize text-gray-500">{user?.role}</p>
              </div>

              <button
                onClick={() => {
                  navigate("profile");
                  setProfileOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <FiUser />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
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
