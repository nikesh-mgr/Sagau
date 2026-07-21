import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiEdit,
  FiArrowLeft,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

import { getSingleJob, deleteJob } from "../../api/jobApi";

import { errorToast, successToast } from "../../utils/toast";

const JobDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (job.status !== "OPEN") {
      errorToast("Only open jobs can be deleted");

      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(job._id);

      successToast("Job deleted successfully");

      navigate("/client/jobs");
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-card">Loading...</div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-card">Job not found</div>
    );
  }

  const isOpen = job.status === "OPEN";

  return (
    <div className="space-y-8">
      {/* Header Actions */}

      <div className="flex items-center justify-between">
        <Link
          to="/client/jobs"
          className="flex items-center gap-2 text-primary"
        >
          <FiArrowLeft />
          Back
        </Link>

        <div className="flex gap-3">
          {isOpen && (
            <Link
              to={`/client/jobs/edit/${job._id}`}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <FiEdit />
              Edit Job
            </Link>
          )}

          {isOpen && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-red-700"
            >
              <FiTrash2 />
              Delete
            </button>
          )}
        </div>
      </div>

      {/* Main Details */}

      <div className="bg-white rounded-2xl shadow-card p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{job.title}</h1>

            <p className="text-gray-500 mt-2">{job.category}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold
            ${
              job.status === "OPEN"
                ? "bg-green-100 text-green-700"
                : job.status === "IN_PROGRESS"
                  ? "bg-blue-100 text-blue-700"
                  : job.status === "COMPLETED"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </div>

        <p className="mt-8 text-gray-700 leading-8">{job.description}</p>
      </div>

      {/* Job Information Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-card p-6">
          <FiDollarSign className="text-primary text-3xl mb-3" />

          <p className="text-gray-500">Budget</p>

          <h3 className="text-2xl font-bold">NPR {job.budget}</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <FiMapPin className="text-primary text-3xl mb-3" />

          <p className="text-gray-500">Location</p>

          <h3 className="text-xl font-semibold">{job.location}</h3>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <FiCalendar className="text-primary text-3xl mb-3" />

          <p className="text-gray-500">Deadline</p>

          <h3 className="text-lg font-semibold">
            {new Date(job.deadline).toLocaleDateString()}
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6">
          <FiTag className="text-primary text-3xl mb-3" />

          <p className="text-gray-500">Category</p>

          <h3 className="text-lg font-semibold">{job.category}</h3>
        </div>
      </div>

      {/* Skills */}

      <div className="bg-white rounded-2xl shadow-card p-8">
        <h2 className="text-2xl font-bold mb-6">Required Skills</h2>

        <div className="flex flex-wrap gap-3">
          {job.skillsRequired?.map((skill) => (
            <span
              key={skill}
              className="bg-primary/10 text-primary px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Applicants */}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-card p-8">
          <Link
            to={`/client/jobs/${job._id}/applicants`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
          >
            <FiUsers />
            View Applicants
          </Link>
        </div>
      )}

      {!isOpen && (
        <div className="bg-gray-50 rounded-xl p-5 text-center text-gray-600">
          This job is currently {job.status.toLowerCase().replace("_", " ")}.
          Editing and deleting are disabled.
        </div>
      )}
    </div>
  );
};

export default JobDetails;
