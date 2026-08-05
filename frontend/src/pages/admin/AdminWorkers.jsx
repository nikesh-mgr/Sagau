import { useEffect, useMemo, useState } from "react";

import {
  FiRefreshCw,
  FiSearch,
  FiUsers,
  FiMapPin,
  FiStar,
  FiEye,
  FiTrash2,
  FiShield,
  FiShieldOff,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import {
  getAllWorkers,
  toggleWorkerStatus,
  deleteWorker,
} from "../../api/adminApi";

const API_URL = "http://localhost:5000";

const getImageUrl = (image) => {
  if (!image) {
    return "https://placehold.co/120x120?text=User";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${API_URL}/${image.replace(/^\/+/, "")}`;
};

const AdminWorkers = () => {
  const navigate = useNavigate();

  const [workers, setWorkers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [availability, setAvailability] = useState("ALL");

  const [location, setLocation] = useState("");

  const [rating, setRating] = useState("0");

  const [actionLoading, setActionLoading] = useState(false);

  const loadWorkers = async () => {
    try {
      setLoading(true);

      const params = {};

      if (availability !== "ALL") {
        params.availability = availability;
      }

      if (location.trim()) {
        params.location = location;
      }

      if (rating !== "0") {
        params.rating = rating;
      }

      console.log("ADMIN WORKERS REQUEST", params);

      const response = await getAllWorkers(params);

      console.log("ADMIN WORKERS RESPONSE", response.data);

      setWorkers(response.data || []);
    } catch (error) {
      console.error("LOAD WORKERS ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkers();
  }, [availability, location, rating]);

  const handleToggleStatus = async (worker) => {
    try {
      setActionLoading(true);

      console.log("Worker ID:", worker._id);

      await toggleWorkerStatus(worker._id);

      await loadWorkers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Unable to update status");
    } finally {
      setActionLoading(false);
    }
  };
  const handleDelete = async (worker) => {
    const confirmDelete = window.confirm(`Delete ${worker.user.fullName}?`);

    if (!confirmDelete) return;

    try {
      setActionLoading(true);

      await deleteWorker(worker._id);

      await loadWorkers();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const keyword = search.toLowerCase();

      return (
        worker.user?.fullName?.toLowerCase().includes(keyword) ||
        worker.user?.email?.toLowerCase().includes(keyword) ||
        worker.skills?.join(" ").toLowerCase().includes(keyword) ||
        worker.location?.toLowerCase().includes(keyword)
      );
    });
  }, [workers, search]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="mx-auto text-5xl text-emerald-600 animate-spin" />

          <p className="mt-5 text-slate-600 font-semibold">
            Loading Workers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Worker Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage, monitor and control all registered workers on Sagau.
          </p>
        </div>

        <button
          onClick={loadWorkers}
          disabled={actionLoading}
          className="flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition shadow"
        >
          <FiRefreshCw className={actionLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>
      {/* ================= STATISTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl border shadow p-6"
        >
          <p className="text-slate-500">Total Workers</p>

          <h2 className="text-4xl font-bold mt-3">{workers.length}</h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl border shadow p-6"
        >
          <p className="text-slate-500">Available</p>

          <h2 className="text-4xl font-bold mt-3 text-green-600">
            {
              workers.filter((worker) => worker.availability === "Available")
                .length
            }
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl border shadow p-6"
        >
          <p className="text-slate-500">Busy</p>

          <h2 className="text-4xl font-bold mt-3 text-yellow-600">
            {workers.filter((worker) => worker.availability === "Busy").length}
          </h2>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl border shadow p-6"
        >
          <p className="text-slate-500">Blocked Accounts</p>

          <h2 className="text-4xl font-bold mt-3 text-red-600">
            {workers.filter((worker) => !worker.user?.isActive).length}
          </h2>
        </motion.div>
      </div>
      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white rounded-3xl shadow border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* SEARCH */}

          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search worker..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* AVAILABILITY */}

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="px-4 py-3 rounded-xl border outline-none"
          >
            <option value="ALL">All Availability</option>

            <option value="Available">Available</option>

            <option value="Busy">Busy</option>

            <option value="Not Available">Not Available</option>
          </select>

          {/* LOCATION */}

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter location"
            className="px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500"
          />

          {/* RATING */}

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="px-4 py-3 rounded-xl border outline-none"
          >
            <option value="0">All Ratings</option>

            <option value="1">1+ Stars</option>

            <option value="2">2+ Stars</option>

            <option value="3">3+ Stars</option>

            <option value="4">4+ Stars</option>

            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>{" "}
      {/* ================= WORKERS TABLE ================= */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Worker
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Skills
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Rating
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Availability
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredWorkers.map((worker) => (
                <motion.tr
                  key={worker._id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="border-t hover:bg-slate-50 transition"
                >
                  {/* USER */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={getImageUrl(worker.profileImage)}
                        alt={worker.user?.fullName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/120x120?text=User";
                        }}
                      />

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {worker.user?.fullName}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {worker.user?.email}
                        </p>

                        <p className="text-xs text-slate-400">
                          {worker.phone || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SKILLS */}

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2 max-w-xs">
                      {worker.skills?.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* LOCATION */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-emerald-600" />

                      {worker.location || "-"}
                    </div>
                  </td>

                  {/* EXPERIENCE */}

                  <td className="px-6 py-5">{worker.experience || 0} yrs</td>

                  {/* RATING */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FiStar className="text-yellow-500" />

                      <span className="font-semibold">
                        {worker.rating?.toFixed
                          ? worker.rating.toFixed(1)
                          : worker.rating || 0}
                      </span>

                      <span className="text-xs text-slate-400">
                        ({worker.totalReviews || 0})
                      </span>
                    </div>
                  </td>

                  {/* AVAILABILITY */}

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        worker.availability === "Available"
                          ? "bg-green-100 text-green-700"
                          : worker.availability === "Busy"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {worker.availability}
                    </span>
                  </td>

                  {/* ACCOUNT STATUS */}

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        worker.user?.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {worker.user?.isActive ? "Active" : "Blocked"}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/workers/${worker._id}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        <FiEye />
                        View
                      </button>

                      <button
                        onClick={() => handleToggleStatus(worker)}
                        className={`p-3 rounded-xl ${
                          worker.user?.isActive
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {worker.user?.isActive ? <FiShieldOff /> : <FiShield />}
                      </button>

                      <button
                        onClick={() => handleDelete(worker)}
                        className="p-3 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>{" "}
      {/* ================= EMPTY STATE ================= */}
      {filteredWorkers.length === 0 && (
        <div className="bg-white rounded-3xl border shadow p-16 text-center">
          <FiUsers className="mx-auto text-6xl text-slate-300" />

          <h2 className="text-2xl font-bold mt-5">No Workers Found</h2>

          <p className="text-slate-500 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      )}
      {/* ================= FOOTER SUMMARY ================= */}
      <div className="bg-white rounded-3xl border shadow p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-5 lg:items-center">
          <div>
            <h2 className="text-xl font-bold">Worker Summary</h2>

            <p className="text-slate-500 mt-1">
              Showing {filteredWorkers.length} of {workers.length} workers
            </p>
          </div>

          <button
            onClick={loadWorkers}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <FiRefreshCw />
            Reload Workers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkers;
