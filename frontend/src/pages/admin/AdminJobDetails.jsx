import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";

import {
  getJobById,
  deleteJobByAdmin,
  updateJobStatusByAdmin,
} from "../../api/adminApi";

const AdminJobDetails = () => {
  const { jobId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [jobData, setJobData] = useState(null);

  const [statusLoading, setStatusLoading] = useState(false);

  const loadJob = async () => {
    try {
      setLoading(true);

      const response = await getJobById(jobId);

      console.log(response);

      setJobData(response.data);
    } catch (err) {
      console.error(err);

      alert("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Job...</h2>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Job not found</h2>
      </div>
    );
  }

  const { job, agreement, reviews } = jobData;

  const handleDelete = async () => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJobByAdmin(job._id);

      alert("Job deleted successfully.");

      navigate("/admin/jobs");
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setStatusLoading(true);

      await updateJobStatusByAdmin(job._id, status);

      await loadJob();
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Status update failed.");
    } finally {
      setStatusLoading(false);
    }
  };

  const badgeColor = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    CLOSED: "bg-slate-200 text-slate-700",
    EXPIRED: "bg-red-100 text-red-700",
  };
  return (
    <div className="space-y-8">
      {/* ================= Header ================= */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-100"
          >
            <FiArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">Job Details</h1>

            <p className="text-slate-500">
              View complete information about this job
            </p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
        >
          <FiTrash2 />
          Delete Job
        </button>
      </div>
      {/* ================= Job Overview ================= */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{job.title}</h2>

            <p className="mt-2 text-slate-600">{job.description}</p>
          </div>

          <span
            className={`rounded-full px-5 py-2 font-semibold ${
              badgeColor[job.status]
            }`}
          >
            {job.status.replace("_", " ")}
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiDollarSign />
              Budget
            </div>

            <p className="mt-2 text-2xl font-bold text-emerald-600">
              NPR {job.budget}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiMapPin />
              Location
            </div>

            <p className="mt-2 font-semibold">{job.location}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiBriefcase />
              Category
            </div>

            <p className="mt-2 font-semibold">{job.category}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiCalendar />
              Deadline
            </div>

            <p className="mt-2 font-semibold">
              {new Date(job.deadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Skills */}

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold">Required Skills</h3>

          <div className="flex flex-wrap gap-3">
            {job.skillsRequired?.length > 0 ? (
              job.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-400">No skills specified</span>
            )}
          </div>
        </div>
      </motion.div>
      {/* ================= Status Management ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-2xl font-bold">Update Job Status</h2>

        <div className="flex flex-wrap gap-4">
          {["OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED", "EXPIRED"].map(
            (status) => (
              <button
                key={status}
                disabled={statusLoading}
                onClick={() => handleStatusChange(status)}
                className={`rounded-xl px-6 py-3 font-semibold transition ${
                  job.status === status
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-300 bg-white hover:bg-slate-100"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ),
          )}
        </div>
      </motion.div>{" "}
      {/* ================= Client & Worker ================= */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Client */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
        >
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <FiUser />
            Client
          </h2>

          {job.client ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>

                <p className="text-xl font-semibold">{job.client.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <p>{job.client.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Role</p>

                <span className="rounded-full bg-blue-100 px-4 py-1 text-blue-700">
                  {job.client.role}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400">Client not available.</p>
          )}
        </motion.div>

        {/* Worker */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
        >
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <FiBriefcase />
            Selected Worker
          </h2>

          {job.selectedWorker ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>

                <p className="text-xl font-semibold">
                  {job.selectedWorker.fullName}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>

                <p>{job.selectedWorker.email}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Role</p>

                <span className="rounded-full bg-emerald-100 px-4 py-1 text-emerald-700">
                  {job.selectedWorker.role}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-lg font-medium text-slate-400">
                No Worker Selected Yet
              </p>
            </div>
          )}
        </motion.div>
      </div>
      {/* ================= Agreement ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <FiCheckCircle />
          Agreement
        </h2>

        {agreement ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Status</p>

              <span className="rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
                {agreement.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">Client</p>

              <p className="font-semibold">
                {agreement.client?.fullName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Worker</p>

              <p className="font-semibold">
                {agreement.worker?.fullName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Created</p>

              <p>{new Date(agreement.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          <div className="flex h-44 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-lg font-medium text-slate-400">
              No Agreement Created
            </p>
          </div>
        )}
      </motion.div>{" "}
      {/* ================= Reviews ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
          <FiClock />
          Reviews
        </h2>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-5">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">
                      {review.client?.fullName || "Anonymous"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-yellow-100 px-4 py-1 font-semibold text-yellow-700">
                    ⭐ {review.rating}/5
                  </span>
                </div>

                <p className="mt-4 leading-7 text-slate-700">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-44 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-lg font-medium text-slate-400">No Reviews Yet</p>
          </div>
        )}
      </motion.div>
      {/* ================= Footer ================= */}
      <div className="sticky bottom-0 flex justify-end gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
};

export default AdminJobDetails;
