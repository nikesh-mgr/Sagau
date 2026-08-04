import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUsers,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiTrash2,
  FiLock,
  FiUnlock,
} from "react-icons/fi";

import { motion } from "framer-motion";

import {
  getAllClients,
  toggleClientStatus,
  deleteClient,
} from "../../api/adminApi";

// ===============================
// IMAGE HANDLER
// ===============================

const getClientImage = (client) => {
  const image =
    client.profileImage ||
    client.user?.profileImage ||
    client.clientProfile?.profileImage;

  if (!image) {
    return "https://placehold.co/100x100?text=Client";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `http://localhost:5000/uploads/${image}`;
};

// ===============================
// COMPONENT
// ===============================

const AdminClient = () => {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  // ===============================
  // LOAD CLIENTS
  // ===============================

  const loadClients = async () => {
    try {
      setLoading(true);

      console.log("========== ADMIN CLIENTS ==========");

      const response = await getAllClients();

      console.log("Clients Response:", response);

      setClients(response.data || []);
    } catch (error) {
      console.error("Client loading failed", error);

      alert("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  // ===============================
  // FILTER
  // ===============================

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        client.user?.fullName?.toLowerCase().includes(keyword) ||
        client.user?.email?.toLowerCase().includes(keyword) ||
        client.phone?.toLowerCase().includes(keyword) ||
        client.address?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : statusFilter === "ACTIVE"
            ? client.user?.isActive
            : !client.user?.isActive;

      return matchesSearch && matchesStatus;
    });
  }, [clients, search, statusFilter]);

  // ===============================
  // STATUS CHANGE
  // ===============================

  const handleToggleStatus = async (client) => {
    const confirm = window.confirm(
      `${client.user.fullName}

      ${client.user.isActive ? "Block" : "Activate"} account?`,
    );

    if (!confirm) return;

    try {
      await toggleClientStatus(client.user._id);

      loadClients();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Status update failed");
    }
  };

  // ===============================
  // DELETE CLIENT
  // ===============================

  const handleDeleteClient = async (client) => {
    const confirm = window.confirm(
      `Delete ${client.user.fullName} permanently?`,
    );

    if (!confirm) return;

    try {
      await deleteClient(client.user._id);

      loadClients();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  }; // ===============================
  // LOADING SCREEN
  // ===============================

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="mx-auto text-5xl text-emerald-600 animate-spin" />

          <p className="mt-5 text-lg font-semibold text-slate-700">
            Loading Clients...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ===============================
          HEADER
      =============================== */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Client Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage registered clients, profiles and account status.
          </p>
        </div>

        <button
          onClick={loadClients}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>
      {/* ===============================
          STATISTICS
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
          <p className="text-slate-500">Total Clients</p>

          <h2 className="text-4xl font-bold mt-3">{clients.length}</h2>
        </div>

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
          <p className="text-slate-500">Active Clients</p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {clients.filter((client) => client.user?.isActive).length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
          <p className="text-slate-500">Blocked Clients</p>

          <h2 className="text-4xl font-bold mt-3 text-red-600">
            {clients.filter((client) => !client.user?.isActive).length}
          </h2>
        </div>
      </div>
      {/* ===============================
          FILTER SECTION
      =============================== */}
      <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* SEARCH */}

          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search client name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* STATUS FILTER */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Clients</option>

            <option value="ACTIVE">Active Clients</option>

            <option value="BLOCKED">Blocked Clients</option>
          </select>

          {/* RESULT COUNT */}

          <div className="rounded-xl bg-emerald-50 flex items-center justify-center">
            <p className="font-semibold text-emerald-700">
              {filteredClients.length} Clients Found
            </p>
          </div>
        </div>
      </div>{" "}
      {/* ===============================
          CLIENT TABLE
      =============================== */}
      <div className="bg-white rounded-3xl shadow border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">
                  Address
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  Jobs
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  Joined
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClients.map((client) => (
                <motion.tr
                  key={client._id}
                  whileHover={{
                    backgroundColor: "#f8fafc",
                  }}
                  className="border-t border-slate-200"
                >
                  {/* CLIENT PROFILE */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4 min-w-[260px]">
                      <img
                        src={getClientImage(client)}
                        alt={client.user?.fullName}
                        className="h-14 w-14 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/100x100?text=Client";
                        }}
                      />

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {client.user?.fullName || "Unknown Client"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {client.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* PHONE */}

                  <td className="px-6 py-5">
                    <p className="font-medium">{client.phone || "-"}</p>
                  </td>

                  {/* ADDRESS */}

                  <td className="px-6 py-5">
                    <p className="max-w-xs truncate">{client.address || "-"}</p>
                  </td>

                  {/* JOB COUNT */}

                  <td className="px-6 py-5 text-center">
                    <span className="font-bold text-emerald-600">
                      {client.jobsPosted || 0}
                    </span>
                  </td>

                  {/* CREATED DATE */}

                  <td className="px-6 py-5 text-center">
                    {client.createdAt
                      ? new Date(client.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        client.user?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {client.user?.isActive ? "Active" : "Blocked"}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      {/* VIEW */}

                      <button
                        onClick={() => navigate(`/admin/clients/${client._id}`)}
                        className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
                        title="View Client"
                      >
                        <FiEye />
                      </button>

                      {/* BLOCK / UNBLOCK */}

                      <button
                        onClick={() => handleToggleStatus(client)}
                        className={`p-3 rounded-xl transition ${
                          client.user?.isActive
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                      >
                        {client.user?.isActive ? <FiLock /> : <FiUnlock />}
                      </button>

                      {/* DELETE */}

                      <button
                        onClick={() => handleDeleteClient(client)}
                        className="p-3 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
                        title="Delete Client"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-20 text-center">
                    <FiUsers className="mx-auto text-6xl text-slate-300 mb-5" />

                    <h2 className="text-2xl font-bold text-slate-700">
                      No Clients Found
                    </h2>

                    <p className="text-slate-500 mt-2">
                      Try changing your search filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>{" "}
      {/* ===============================
          FOOTER SUMMARY
      =============================== */}
      <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Client Summary</h2>

            <p className="text-slate-500 mt-2">
              Showing {filteredClients.length} of {clients.length} registered
              clients.
            </p>
          </div>

          <button
            onClick={loadClients}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
          >
            <FiRefreshCw />
            Refresh Clients
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminClient;
