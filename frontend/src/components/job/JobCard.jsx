import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiEye,
  FiEdit,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

const JobCard = ({ job, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "COMPLETED":
        return "bg-purple-100 text-purple-700";

      case "CLOSED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (confirmDelete) {
      onDelete(job._id);
    }
  };

  const isOpen = job.status === "OPEN";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300">
      {/* Job Information */}

      <div className="p-6">
        <div className="flex justify-between items-start gap-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>

            <p className="text-gray-500 mt-1">{job.category}</p>
          </div>

          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
              job.status,
            )}`}
          >
            {job.status}
          </span>
        </div>

        <p className="text-gray-600 mt-5 line-clamp-3">{job.description}</p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div className="flex items-center gap-3">
            <FiDollarSign className="text-primary" />

            <div>
              <p className="text-gray-500 text-sm">Budget</p>

              <p className="font-semibold">NPR {job.budget}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiMapPin className="text-primary" />

            <div>
              <p className="text-gray-500 text-sm">Location</p>

              <p className="font-semibold">{job.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="text-primary" />

            <div>
              <p className="text-gray-500 text-sm">Deadline</p>

              <p className="font-semibold">
                {new Date(job.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Required Skills</p>

            <p className="font-semibold">
              {job.skillsRequired?.length || 0} Skills
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {job.skillsRequired?.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm"
            >
              {skill}
            </span>
          ))}

          {job.skillsRequired?.length > 4 && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
              +{job.skillsRequired.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}

      <div className="border-t p-5">
        <div className="grid md:grid-cols-2 gap-3">
          {/* View Always Available */}

          <Link
            to={`/client/jobs/${job._id}`}
            className="flex items-center justify-center gap-2 border border-primary text-primary rounded-xl py-3 hover:bg-primary hover:text-white transition"
          >
            <FiEye />
            View
          </Link>

          {/* Applicants Only For Open Jobs */}

          {isOpen && (
            <Link
              to={`/client/jobs/${job._id}/applicants`}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 transition"
            >
              <FiUsers />
              Applicants
            </Link>
          )}

          {/* Edit Only Open Jobs */}

          {isOpen && (
            <Link
              to={`/client/jobs/edit/${job._id}`}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700 transition"
            >
              <FiEdit />
              Edit
            </Link>
          )}

          {/* Delete Only Open Jobs */}

          {isOpen && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 bg-red-600 text-white rounded-xl py-3 hover:bg-red-700 transition"
            >
              <FiTrash2 />
              Delete
            </button>
          )}
        </div>

        {/* Marketplace Status Message */}

        {!isOpen && (
          <div className="mt-4 text-center text-sm text-gray-500 bg-gray-50 rounded-xl py-3">
            This job is {job.status.toLowerCase().replace("_", " ")}. Editing
            and deletion are disabled.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
