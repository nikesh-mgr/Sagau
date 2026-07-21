import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiPlus } from "react-icons/fi";

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

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.category.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [jobs, search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>

          <p className="text-gray-500 mt-1">Manage all your posted jobs.</p>
        </div>

        <Link
          to="/client/jobs/create"
          className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:bg-emerald-700 transition"
        >
          <FiPlus />
          Post Job
        </Link>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-primary"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-card">
          Loading jobs...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-card">
          <h2 className="text-xl font-semibold">No jobs found</h2>

          <p className="text-gray-500 mt-2">
            Create your first job to start hiring workers.
          </p>

          <Link
            to="/client/jobs/create"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl"
          >
            Post New Job
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
