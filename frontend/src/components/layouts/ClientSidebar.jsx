import {
  FaHome,
  FaUser,
  FaBriefcase,
  FaPlusCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const ClientSidebar = () => {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const menu = [
    {
      title: "Dashboard",
      path: "/client",
      icon: <FaHome />,
    },
    {
      title: "My Profile",
      path: "/client/profile",
      icon: <FaUser />,
    },
    {
      title: "My Jobs",
      path: "/client/jobs",
      icon: <FaBriefcase />,
    },
    {
      title: "Post Job",
      path: "/client/jobs/create",
      icon: <FaPlusCircle />,
    },
    {
      title: "My Agreements",
      path: "/client/agreements",
      icon: <FaFileContract />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="text-center py-8 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-blue-400">Sagau</h1>

        <p className="text-sm text-gray-400">Client Panel</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-slate-800"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ClientSidebar;
