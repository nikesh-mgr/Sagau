import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiMapPin,
  FiPhone,
  FiMail,
  FiStar,
  FiBriefcase,
  FiTrash2,
  FiSlash,
} from "react-icons/fi";

import {
  getWorkerById,
  deleteWorker,
  toggleWorkerStatus,
} from "../../api/workerApi";

const WorkerDetails = () => {
  const { workerId } = useParams();

  const navigate = useNavigate();

  const [worker, setWorker] = useState(null);

  const [loading, setLoading] = useState(true);
  const getWorkerImage = (worker) => {
    if (!worker?.profileImage) {
      return "https://placehold.co/220x220?text=Worker";
    }

    if (worker.profileImage.startsWith("http")) {
      return worker.profileImage;
    }

    return `http://localhost:5000${worker.profileImage}`;
  };
  const loadWorker = async () => {
    try {
      setLoading(true);

      const response = await getWorkerById(workerId);

      setWorker(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorker();
  }, []);

  const handleDelete = async () => {
    if (!window.confirm("Delete this worker?")) return;

    try {
      await deleteWorker(worker.user._id);

      alert("Worker deleted");

      navigate("/admin/workers");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = async () => {
    try {
      await toggleWorkerStatus(worker.user._id);

      loadWorker();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl font-semibold">
        Loading Worker...
      </div>
    );
  }

  if (!worker) {
    return <div className="text-center py-20">Worker not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side */}
        {/* Worker Profile */}

        <div className="bg-white rounded-3xl shadow border border-slate-200 p-8">
          <div className="flex flex-col items-center text-center">
            <img
              src={getWorkerImage(worker)}
              alt={worker.user.fullName}
              className="h-52 w-52 rounded-3xl object-cover border-4 border-slate-200 shadow-lg"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/220x220?text=Worker";
              }}
            />

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              {worker.user.fullName}
            </h2>

            <p className="mt-2 flex items-center justify-center gap-2 text-slate-600">
              <FiMail />
              {worker.user.email}
            </p>

            <p className="mt-2 flex items-center justify-center gap-2 text-slate-600">
              <FiPhone />
              {worker.phone || "Not Provided"}
            </p>

            <p className="mt-2 flex items-center justify-center gap-2 text-slate-600">
              <FiMapPin />
              {worker.location || "Not Provided"}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  worker.user.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {worker.user.isActive ? "Active" : "Blocked"}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  worker.availability === "Available"
                    ? "bg-green-100 text-green-700"
                    : worker.availability === "Busy"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {worker.availability}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {/* Skills */}

          <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Skills</h2>

            <div className="flex flex-wrap gap-3">
              {worker.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}

          <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Bio</h2>

            <p className="leading-8 text-slate-700 whitespace-pre-wrap">
              {worker.bio}
            </p>
          </div>

          {/* Portfolio */}

          <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Portfolio</h2>

            {worker.portfolio?.length > 0 ? (
              <div className="space-y-3">
                {worker.portfolio.map((item, index) => (
                  <a
                    key={index}
                    href={item}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-emerald-600 hover:underline break-all"
                  >
                    {item}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No portfolio added.</p>
            )}
          </div>
        </div>

        {/* Right Side */}

        <div className="space-y-8">
          {/* Statistics */}

          <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Statistics</h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Hourly Rate</span>
                <span className="font-bold text-emerald-600">
                  NPR {worker.hourlyRate}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Experience</span>
                <span className="font-semibold">{worker.experience} Years</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Rating</span>
                <span className="font-semibold">
                  ⭐ {worker.rating.toFixed(1)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Reviews</span>
                <span className="font-semibold">{worker.totalReviews}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Reputation Score</span>
                <span className="font-bold text-emerald-600">
                  {worker.reputationScore}
                </span>
              </div>
            </div>
          </div>

          {/* Account */}

          <div className="bg-white rounded-3xl shadow border border-slate-200 p-6">
            <h2 className="text-2xl font-bold mb-6">Account Information</h2>

            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Role</span>
                <span className="font-semibold capitalize">
                  {worker.user.role}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>

                <span
                  className={`font-semibold ${
                    worker.user.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {worker.user.isActive ? "Active" : "Blocked"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Joined</span>

                <span>{new Date(worker.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Last Updated</span>

                <span>{new Date(worker.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkerDetails;
