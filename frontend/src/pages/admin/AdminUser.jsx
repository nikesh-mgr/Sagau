import { useEffect, useMemo, useState } from "react";

import {
  FiSearch,
  FiRefreshCw,
  FiTrash2,
  FiShield,
  FiShieldOff,
  FiUsers,
  FiMapPin,
  FiCalendar,
  FiStar,
  FiX,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getAllUsers, toggleUserStatus, deleteUser } from "../../api/adminApi";

import { successToast, errorToast } from "../../utils/toast";

const API_URL = "http://localhost:5000";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  const [search, setSearch] = useState("");

  const [roleFilter, setRoleFilter] = useState("ALL");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [selectedUser, setSelectedUser] = useState(null);

  const [showDelete, setShowDelete] = useState(false);

  const getProfileImage = (user) => {
    let image = null;

    if (user.role === "worker") {
      image = user.workerProfile?.profileImage;
    }

    if (user.role === "client") {
      image = user.clientProfile?.profileImage;
    }

    if (!image) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.fullName || "User",
      )}&background=10b981&color=fff`;
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_URL}/${image.replace("\\", "/")}`;
  };

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers();

      console.log("ADMIN USERS RESPONSE", response.data);

      setUsers(response.data || []);
    } catch (error) {
      console.error(error);

      errorToast(error?.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.fullName} ${user.email}`.toLowerCase();

      const matchSearch = text.includes(search.toLowerCase());

      const matchRole = roleFilter === "ALL" || user.role === roleFilter;

      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" ? user.isActive : !user.isActive);

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const handleToggle = async (user) => {
    try {
      setActionLoading(user._id);

      await toggleUserStatus(user._id);

      successToast("User status updated");

      loadUsers();
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(selectedUser._id);

      await deleteUser(selectedUser._id);

      successToast("User deleted successfully");

      setShowDelete(false);

      loadUsers();
    } catch (error) {
      errorToast(error?.response?.data?.message || "Delete failed");
    } finally {
      setActionLoading(null);
    }
  };
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="mx-auto text-5xl text-emerald-600 animate-spin" />

          <p className="mt-4 text-slate-500 font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      color: "bg-blue-50 text-blue-700",
    },

    {
      title: "Workers",
      value: users.filter((user) => user.role === "worker").length,
      color: "bg-emerald-50 text-emerald-700",
    },

    {
      title: "Clients",
      value: users.filter((user) => user.role === "client").length,
      color: "bg-purple-50 text-purple-700",
    },

    {
      title: "Blocked",
      value: users.filter((user) => !user.isActive).length,
      color: "bg-red-50 text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 space-y-8 p-6">
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">User Management</h1>

          <p className="mt-2 text-slate-500">
            Manage Sagau clients, workers and platform accounts.
          </p>
        </div>

        <button
          onClick={loadUsers}
          className="
flex
items-center
justify-center
gap-2
px-6
py-3
rounded-2xl
bg-emerald-600
hover:bg-emerald-700
text-white
font-semibold
shadow
transition
"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{
              y: -5,
            }}
            className={`
rounded-3xl
p-6
shadow-sm
border
border-slate-200
${item.color}
`}
          >
            <p className="font-medium">{item.title}</p>

            <h2 className="text-4xl font-bold mt-4">{item.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* FILTER SECTION */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
      >
        <div
          className="
grid
lg:grid-cols-4
gap-5
"
        >
          {/* SEARCH */}

          <div className="relative">
            <FiSearch
              className="
absolute
left-4
top-4
text-slate-400
"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="
w-full
pl-12
pr-4
py-3
rounded-xl
border
border-slate-300
outline-none
focus:ring-2
focus:ring-emerald-500
"
            />
          </div>

          {/* ROLE FILTER */}

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="
px-4
py-3
rounded-xl
border
border-slate-300
outline-none
"
          >
            <option value="ALL">All Roles</option>

            <option value="worker">Workers</option>

            <option value="client">Clients</option>

            <option value="admin">Admins</option>
          </select>

          {/* STATUS FILTER */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
px-4
py-3
rounded-xl
border
border-slate-300
outline-none
"
          >
            <option value="ALL">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="BLOCKED">Blocked</option>
          </select>

          {/* RESULT */}

          <div
            className="
flex
items-center
justify-center
rounded-xl
bg-emerald-50
text-emerald-700
font-semibold
"
          >
            {filteredUsers.length}
            &nbsp; Users Found
          </div>
        </div>

        {(search || roleFilter !== "ALL" || statusFilter !== "ALL") && (
          <button
            onClick={() => {
              setSearch("");

              setRoleFilter("ALL");

              setStatusFilter("ALL");
            }}
            className="
mt-5
flex
items-center
gap-2
px-5
py-2
rounded-xl
border
text-slate-600
hover:bg-slate-100
"
          >
            <FiX />
            Clear Filters
          </button>
        )}
      </div>
      {/* USERS LIST */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
overflow-hidden
"
      >
        <div
          className="
hidden
lg:block
overflow-x-auto
"
        >
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left px-6 py-4">User</th>

                <th className="text-left px-6 py-4">Role</th>

                <th className="text-left px-6 py-4">Information</th>

                <th className="text-left px-6 py-4">Status</th>

                <th className="text-center px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user._id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  whileHover={{
                    backgroundColor: "#f8fafc",
                  }}
                  className="
border-b
transition
"
                >
                  {/* USER */}

                  <td className="px-6 py-5">
                    <div
                      className="
flex
items-center
gap-4
"
                    >
                      <img
                        src={getProfileImage(user)}
                        alt={user.fullName}
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=User";
                        }}
                        className="
w-14
h-14
rounded-full
object-cover
border-2
border-white
shadow
"
                      />

                      <div>
                        <h3
                          className="
font-bold
text-slate-900
"
                        >
                          {user.fullName}
                        </h3>

                        <p
                          className="
text-sm
text-slate-500
"
                        >
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ROLE */}

                  <td className="px-6 py-5">
                    <span
                      className={`

px-3
py-1
rounded-full
text-sm
font-semibold

${
  user.role === "worker"
    ? "bg-emerald-100 text-emerald-700"
    : user.role === "client"
      ? "bg-blue-100 text-blue-700"
      : "bg-red-100 text-red-700"
}

`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* INFORMATION */}

                  <td className="px-6 py-5">
                    {user.role === "worker" ? (
                      <div>
                        <div
                          className="
flex
items-center
gap-2
text-yellow-600
font-bold
"
                        >
                          <FiStar />

                          {user.workerProfile?.rating || 0}
                        </div>

                        <p
                          className="
text-xs
text-slate-500
mt-1
"
                        >
                          {user.workerProfile?.totalReviews || 0}
                          Reviews
                        </p>

                        <div
                          className="
flex
flex-wrap
gap-1
mt-3
"
                        >
                          {user.workerProfile?.skills
                            ?.slice(0, 3)
                            .map((skill) => (
                              <span
                                key={skill}
                                className="
px-2
py-1
rounded-lg
bg-emerald-100
text-emerald-700
text-xs
"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">
                        <p>Client Account</p>

                        <p
                          className="
mt-2
flex
items-center
gap-2
"
                        >
                          <FiCalendar />
                          Joined:
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">
                    {user.isActive ? (
                      <span
                        className="
px-3
py-1
rounded-full
bg-green-100
text-green-700
font-semibold
text-sm
"
                      >
                        Active
                      </span>
                    ) : (
                      <span
                        className="
px-3
py-1
rounded-full
bg-red-100
text-red-700
font-semibold
text-sm
"
                      >
                        Blocked
                      </span>
                    )}
                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-5">
                    <div
                      className="
flex
justify-center
gap-3
"
                    >
                      <button
                        disabled={actionLoading === user._id}
                        onClick={() => handleToggle(user)}
                        className={`

p-3
rounded-xl
transition

${
  user.isActive
    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
    : "bg-green-100 text-green-700 hover:bg-green-200"
}

`}
                      >
                        {user.isActive ? <FiShieldOff /> : <FiShield />}
                      </button>

                      {user.role !== "admin" && (
                        <button
                          onClick={() => {
                            setSelectedUser(user);

                            setShowDelete(true);
                          }}
                          className="
p-3
rounded-xl
bg-red-100
text-red-700
hover:bg-red-200
transition
"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}

        <div
          className="
lg:hidden
space-y-4
p-4
"
        >
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="
border
rounded-3xl
p-5
shadow-sm
"
            >
              <div
                className="
flex
gap-4
items-center
"
              >
                <img
                  src={getProfileImage(user)}
                  className="
w-16
h-16
rounded-full
object-cover
"
                />

                <div>
                  <h3 className="font-bold">{user.fullName}</h3>

                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <span
                  className="
px-3
py-1
rounded-full
bg-slate-100
text-sm
"
                >
                  {user.role}
                </span>

                <button
                  onClick={() => handleToggle(user)}
                  className="
p-3
rounded-xl
bg-slate-100
"
                >
                  {user.isActive ? <FiShieldOff /> : <FiShield />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* DELETE CONFIRMATION MODAL */}

      {showDelete && selectedUser && (
        <div
          className="
fixed
inset-0
bg-black/40
backdrop-blur-sm
flex
items-center
justify-center
z-50
p-5
"
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            className="
bg-white
rounded-3xl
max-w-md
w-full
p-8
shadow-2xl
"
          >
            <div
              className="
h-16
w-16
mx-auto
rounded-full
bg-red-100
text-red-600
flex
items-center
justify-center
text-3xl
"
            >
              <FiTrash2 />
            </div>

            <h2
              className="
text-2xl
font-bold
text-center
mt-5
text-slate-900
"
            >
              Delete User?
            </h2>

            <p
              className="
text-center
text-slate-500
mt-3
"
            >
              Are you sure you want to permanently delete
              <span
                className="
font-semibold
text-slate-700
"
              >
                &nbsp;{selectedUser.fullName}
              </span>
              ?
              <br />
              This action cannot be undone.
            </p>

            <div
              className="
flex
gap-4
mt-8
"
            >
              <button
                onClick={() => {
                  setShowDelete(false);

                  setSelectedUser(null);
                }}
                className="
flex-1
py-3
rounded-xl
border
border-slate-300
font-semibold
hover:bg-slate-100
transition
"
              >
                Cancel
              </button>

              <button
                disabled={actionLoading === selectedUser._id}
                onClick={handleDelete}
                className="
flex-1
py-3
rounded-xl
bg-red-600
hover:bg-red-700
text-white
font-semibold
transition
"
              >
                {actionLoading === selectedUser._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
      >
        <div
          className="
flex
flex-col
lg:flex-row
justify-between
gap-4
lg:items-center
"
        >
          <div>
            <h2
              className="
text-xl
font-bold
text-slate-900
"
            >
              User Summary
            </h2>

            <p
              className="
text-slate-500
mt-2
"
            >
              Showing
              <span
                className="
font-semibold
text-slate-700
"
              >
                &nbsp;{filteredUsers.length}
              </span>
              &nbsp;of&nbsp;
              <span
                className="
font-semibold
text-slate-700
"
              >
                {users.length}
              </span>
              registered users.
            </p>
          </div>

          <button
            onClick={loadUsers}
            className="
flex
items-center
justify-center
gap-2
px-6
py-3
rounded-xl
bg-emerald-600
text-white
font-semibold
hover:bg-emerald-700
transition
"
          >
            <FiRefreshCw />
            Refresh Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
