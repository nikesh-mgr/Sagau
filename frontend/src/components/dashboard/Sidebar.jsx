import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiStar,
  FiX,
} from "react-icons/fi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const links = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: <FiHome />,
    },

    {
      name: "Profile",
      path: "profile",
      icon: <FiUser />,
    },

    {
      name: "Jobs",
      path: "jobs",
      icon: <FiBriefcase />,
    },

    {
      name: "Applications",
      path: "/client/applications",
      icon: <FiUsers />,
    },

    {
      name: "Agreements",
      path: "agreements",
      icon: <FiFileText />,
    },

    {
      name: "Reviews",
      path: "reviews",
      icon: <FiStar />,
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r p-6 transition-transform duration-300 md:translate-x-0 md:static md:block ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary">Sagau</h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="space-y-3">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-emerald-50 text-primary font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
