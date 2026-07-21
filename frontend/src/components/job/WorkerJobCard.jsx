import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiArrowRight,
} from "react-icons/fi";

const WorkerJobCard = ({ job }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-200 hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>

            <p className="text-sm text-gray-500 mt-1">{job.category}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              job.status === "OPEN"
                ? "bg-green-100 text-green-700"
                : job.status === "IN_PROGRESS"
                  ? "bg-blue-100 text-blue-700"
                  : job.status === "COMPLETED"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </div>

        <p className="text-gray-600 leading-7 line-clamp-3 mb-6">
          {job.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-primary" />

            <span className="font-medium">NPR {job.budget}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiMapPin className="text-primary" />

            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary" />

            <span>{formatDate(job.deadline)}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiTag className="text-primary" />

            <span>{job.skillsRequired?.length || 0} Skills</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.skillsRequired?.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/worker/jobs/${job._id}`}
            className="text-primary font-semibold hover:underline"
          >
            View Details
          </Link>

          {job.status === "OPEN" && (
            <Link
              to={`/worker/jobs/${job._id}/apply`}
              className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition"
            >
              Apply
              <FiArrowRight />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerJobCard;
