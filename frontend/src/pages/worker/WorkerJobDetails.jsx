import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";

import { getSingleJob } from "../../api/jobApi";

import { errorToast } from "../../utils/toast";

const WorkerJobDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">Loading...</div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-3">Job Not Found</h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 px-6 py-3 bg-primary text-white rounded-xl"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <FiArrowLeft />
        Back
      </button>
      <div className="bg-white rounded-2xl shadow-card p-8">
        <div className="flex justify-between items-start flex-wrap gap-5">
          <div>
            <h1 className="text-4xl font-bold">{job.title}</h1>

            <p className="text-gray-500 mt-2">{job.category}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${
              job.status === "OPEN"
                ? "bg-green-100 text-green-700"
                : job.status === "IN_PROGRESS"
                  ? "bg-blue-100 text-blue-700"
                  : job.status === "COMPLETED"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-primary text-xl" />

            <div>
              <p className="text-gray-500 text-sm">Budget</p>

              <p className="font-semibold">NPR {job.budget}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiMapPin className="text-primary text-xl" />

            <div>
              <p className="text-gray-500 text-sm">Location</p>

              <p className="font-semibold">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="text-primary text-xl" />

            <div>
              <p className="text-gray-500 text-sm">Deadline</p>

              <p className="font-semibold">{formatDate(job.deadline)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiUser className="text-primary text-xl" />

            <div>
              <p className="text-gray-500 text-sm">Client</p>

              <p className="font-semibold">{job.client?.fullName}</p>
            </div>
          </div>
        </div>{" "}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Job Description</h2>

          <p className="text-gray-700 leading-8 whitespace-pre-line">
            {job.description}
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Required Skills</h2>

          <div className="flex flex-wrap gap-3">
            {job.skillsRequired?.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Job Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>

                  <span className="font-semibold">{job.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>

                  <span className="font-semibold">NPR {job.budget}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>

                  <span className="font-semibold">{job.location}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>

                  <span className="font-semibold">{job.status}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Deadline</span>

                  <span className="font-semibold">
                    {formatDate(job.deadline)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3">Ready to work?</h3>

                <p className="text-gray-600 leading-7 mb-6">
                  Submit your proposal and tell the client why you're the best
                  person for this job.
                </p>

                {job.status === "OPEN" ? (
                  <button
                    onClick={() => navigate(`/worker/jobs/${job._id}/apply`)}
                    className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
                  >
                    Apply Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl cursor-not-allowed"
                  >
                    Applications Closed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default WorkerJobDetails;
