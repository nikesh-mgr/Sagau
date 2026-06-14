import { FaHome, FaUser, FaBriefcase } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  const role = user?.role;

  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-64
      bg-white
      border-r
      shadow-sm
      "
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Sagau</h1>
      </div>

      <nav className="px-4 space-y-2">
        <NavLink
          to={`/${role}`}
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to={`/${role}/profile`}
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <FaUser />
          Profile
        </NavLink>

        <NavLink
          to="/jobs"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-slate-100"
        >
          <FaBriefcase />
          Jobs
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
