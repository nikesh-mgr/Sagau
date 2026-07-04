import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaSearch,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
import useAuthStore from "../../store/authStore";
const WorkerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/worker",
      icon: <FaHome />,
    },
    {
      title: "My Profile",
      path: "/worker/profile",
      icon: <FaUser />,
    },
    {
      title: "Browse Jobs",
      path: "/worker/jobs",
      icon: <FaSearch />,
    },
    {
      title: "My Applications",
      path: "/worker/applications",
      icon: <FaClipboardList />,
    },
    {
      title: "MyAgreements",
      path: "/worker/agreements",
      icon: <FaFileContract />,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/login");
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-center">Sagau</h1>

        <p className="text-center text-gray-400 text-sm mt-1">Worker Panel</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-6 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg mb-2 transition

              ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>

            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default WorkerSidebar;
