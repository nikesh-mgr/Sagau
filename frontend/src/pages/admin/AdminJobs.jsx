import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiBriefcase,
  FiSearch,
  FiFilter,
  FiEye,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import {
  getAllJobsByAdmin,
  getJobById,
  updateJobStatusByAdmin,
  deleteJobByAdmin,
} from "../../api/adminApi";
const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();
  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getAllJobsByAdmin();

      setJobs(response.data || []);
    } catch (error) {
      console.error(error);

      alert("Unable to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.description?.toLowerCase().includes(search.toLowerCase()) ||
        job.client?.fullName?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Jobs...</h2>
      </div>
    );
  } /* ====================================== */
  /* Delete Job */
  /* ====================================== */

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJobByAdmin(jobId);

      setJobs((prev) => prev.filter((job) => job._id !== jobId));

      alert("Job deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to delete job.");
    }
  };

  /* ====================================== */
  /* Change Status */
  /* ====================================== */

  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatusByAdmin(jobId, status);

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId
            ? {
                ...job,
                status,
              }
            : job,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to update status.");
    }
  };
  return (
    <div className="space-y-8">
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Job Management</h1>

          <p className="mt-2 text-slate-500">
            View, manage and monitor all jobs on the platform.
          </p>
        </div>

        <button
          onClick={loadJobs}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>
      {/* ====================================== */}
      {/* Statistics */}
      {/* ====================================== */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-500">Total Jobs</p>

          <h2 className="mt-2 text-4xl font-bold text-slate-800">
            {jobs.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <p className="text-green-700">Open</p>

          <h2 className="mt-2 text-4xl font-bold text-green-700">
            {jobs.filter((job) => job.status === "OPEN").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <p className="text-blue-700">In Progress</p>

          <h2 className="mt-2 text-4xl font-bold text-blue-700">
            {jobs.filter((job) => job.status === "IN_PROGRESS").length}
          </h2>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
          <p className="text-purple-700">Completed</p>

          <h2 className="mt-2 text-4xl font-bold text-purple-700">
            {jobs.filter((job) => job.status === "COMPLETED").length}
          </h2>
        </div>
      </div>
      {/* ====================================== */}
      {/* Search + Filter */}
      {/* ====================================== */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 py-3 pl-12 pr-8 outline-none focus:border-blue-500"
          >
            <option value="ALL">All Status</option>

            <option value="OPEN">Open</option>

            <option value="IN_PROGRESS">In Progress</option>

            <option value="COMPLETED">Completed</option>

            <option value="CLOSED">CLOSED</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>
        </div>
      </div>{" "}
      {/* ====================================== */}
      {/* Jobs Table */}
      {/* ====================================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Job
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Budget
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Location
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-500">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5">
                      <h3 className="font-semibold text-slate-800">
                        {job.title}
                      </h3>

                      <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {job.description}
                      </p>
                    </td>

                    <td className="px-6 py-5">{job.client?.fullName || "-"}</td>

                    <td className="px-6 py-5">NPR {job.budget}</td>

                    <td className="px-6 py-5">{job.location}</td>

                    <td className="px-6 py-5">
                      <select
                        value={job.status}
                        onChange={(e) =>
                          handleStatusChange(job._id, e.target.value)
                        }
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="OPEN">OPEN</option>

                        <option value="IN_PROGRESS">IN_PROGRESS</option>

                        <option value="COMPLETED">COMPLETED</option>

                        <option value="CLOSED">CLOSED</option>
                        <option value="EXPIRED">EXPIRED</option>
                      </select>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                          className="rounded-xl bg-blue-100 p-3 text-blue-600 hover:bg-blue-200"
                        >
                          <FiEye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(job._id)}
                          className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
