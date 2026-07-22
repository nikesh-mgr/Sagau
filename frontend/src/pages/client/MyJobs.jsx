import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiSearch,
  FiPlus,
  FiBriefcase,
  FiGrid,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import { motion } from "framer-motion";

import JobCard from "../../components/job/JobCard";

import { getMyJobs, deleteJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const response = await getMyJobs();

      setJobs(response.data || []);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      successToast("Job deleted successfully");

      loadJobs();
    } catch (error) {
      console.log(error);

      errorToast("Unable to delete job");
    }
  };

  /*
    Search and filtering logic
    preserved from original component
  */

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.category?.toLowerCase().includes(search.toLowerCase()) ||
        job.location?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [jobs, search]);

  /*
    Dashboard summary data

    Helps clients quickly understand
    their hiring activity.
  */

  const statistics = useMemo(() => {
    return {
      total: jobs.length,

      active: jobs.filter((job) => job.status === "IN_PROGRESS").length,

      open: jobs.filter((job) => job.status === "OPEN").length,

      completed: jobs.filter((job) => job.status === "COMPLETED").length,
    };
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <motion.section
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FiBriefcase size={26} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  My Jobs
                </h1>
              </div>

              <p className="mt-3 max-w-xl text-gray-500">
                Manage your projects, review applications, and hire skilled
                workers through SAGAU.
              </p>
            </div>

            <Link
              to="/client/jobs/create"
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <FiPlus />
              Post New Job
            </Link>
          </div>
        </motion.section>{" "}
        {/* JOB STATISTICS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Jobs</p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {statistics.total}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <FiBriefcase size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open Jobs</p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {statistics.open}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <FiTrendingUp size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Projects
                </p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {statistics.active}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <FiClock size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>

                <h3 className="mt-3 text-3xl font-bold text-gray-900">
                  {statistics.completed}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <FiCheckCircle size={22} />
              </div>
            </div>
          </div>
        </section>
        {/* SEARCH SECTION */}
        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Find a job</h2>

            <p className="mt-1 text-sm text-gray-500">
              Search by title, category, or location.
            </p>
          </div>

          <div className="relative">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </section>
        {/* CONTENT AREA */}
        {loading ? (
          <section className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>

            <p className="mt-5 text-sm text-gray-500">Loading your jobs...</p>
          </section>
        ) : filteredJobs.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FiGrid size={28} />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No jobs available
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Create your first project and connect with skilled workers ready
              to help.
            </p>

            <Link
              to="/client/jobs/create"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <FiPlus />
              Create Job
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                whileHover={{
                  y: -5,
                }}
              >
                <JobCard job={job} onDelete={handleDelete} />
              </motion.div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
