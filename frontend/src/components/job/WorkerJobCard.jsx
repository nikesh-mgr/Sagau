import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiArrowRight,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";

const SERVER_URL = "http://localhost:5000";

const WorkerJobCard = ({ job }) => {
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700 border-purple-200";

      default:
        return "bg-red-100 text-red-700 border-red-200";
    }
  };

  const clientImage = job?.clientProfile?.profileImage;

  const clientName = job?.client?.fullName || "Client";

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      {/* HEADER */}

      <div className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            {/* CLIENT IMAGE */}

            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-100 shadow-md">
              {clientImage ? (
                <img
                  src={`${SERVER_URL}${clientImage}`}
                  alt="Client"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser className="text-2xl text-emerald-600" />
              )}
            </div>

            <div>
              <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-emerald-600">
                {job.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{job.category}</p>

              {/* CLIENT NAME */}

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <FiUser className="text-emerald-600" />

                <span>Posted by</span>

                <span className="font-semibold text-slate-700">
                  {clientName}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
              job.status,
            )}`}
          >
            {job.status?.replace("_", " ")}
          </span>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-6 line-clamp-3 leading-relaxed text-slate-600">
          {job.description}
        </p>

        {/* JOB INFORMATION */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <FiDollarSign className="text-xl text-emerald-600" />

            <div>
              <p className="text-xs text-slate-500">Budget</p>

              <p className="font-semibold text-slate-900">NPR {job.budget}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <FiMapPin className="text-xl text-blue-600" />

            <div>
              <p className="text-xs text-slate-500">Location</p>

              <p className="truncate font-semibold text-slate-900">
                {job.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <FiCalendar className="text-xl text-purple-600" />

            <div>
              <p className="text-xs text-slate-500">Deadline</p>

              <p className="font-semibold text-slate-900">
                {formatDate(job.deadline)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <FiTag className="text-xl text-orange-600" />

            <div>
              <p className="text-xs text-slate-500">Required Skills</p>

              <p className="font-semibold text-slate-900">
                {job.skillsRequired?.length || 0} Skills
              </p>
            </div>
          </div>
        </div>

        {/* SKILLS */}

        <div className="mt-6 flex flex-wrap gap-2">
          {job.skillsRequired?.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
            >
              {skill}
            </span>
          ))}

          {job.skillsRequired?.length > 5 && (
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
              +{job.skillsRequired.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* ACTION AREA */}

      <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={`/worker/jobs/${job._id}`}
          className="font-semibold text-emerald-600 transition hover:text-emerald-700"
        >
          View Details
        </Link>

        {job.status === "OPEN" && (
          <Link
            to={`/worker/jobs/${job._id}/apply`}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg"
          >
            Apply Now
            <FiArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default WorkerJobCard;
