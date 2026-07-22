import { NavLink } from "react-router-dom";

import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiUsers,
  FiFileText,
  FiStar,
  FiX,
  FiShield,
} from "react-icons/fi";

import useAuthStore from "../../store/authStore";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAuthStore((state) => state.user);

  const clientLinks = [
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
      path: "applications",
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

  const workerLinks = [
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
      name: "Browse Jobs",
      path: "jobs",
      icon: <FiBriefcase />,
    },
    {
      name: "Applications",
      path: "applications",
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

  const links = user?.role === "client" ? clientLinks : workerLinks;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-gray-100 bg-white p-5 shadow-xl transition-transform duration-300 md:static md:translate-x-0 md:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-600">Sagau</h1>

            <p className="mt-1 text-xs text-gray-500">
              Skilled worker marketplace
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 md:hidden"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 h-8 w-1 rounded-r-full bg-emerald-600" />
                  )}

                  <span
                    className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>

                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="text-center text-xs text-gray-400">
            Build trust. Find skilled people.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
