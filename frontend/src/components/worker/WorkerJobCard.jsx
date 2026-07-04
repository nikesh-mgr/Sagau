import { Link } from "react-router-dom";
import { FaMoneyBillWave, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const statusColor = {
  OPEN: "bg-green-100 text-green-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-purple-100 text-purple-700",
  CLOSED: "bg-red-100 text-red-700",
};

const WorkerJobCard = ({ job }) => {
  const deadline = new Date(job.deadline);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>

          <p className="text-gray-500 mt-2">
            {job.description.length > 120
              ? job.description.substring(0, 120) + "..."
              : job.description}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            statusColor[job.status]
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-blue-600" />
          <span>NPR {job.budget}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-green-600" />
          <span>{deadline.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {job.skillsRequired?.map((skill) => (
          <span
            key={skill}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Link
          to={`/worker/jobs/${job._id}`}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
        >
          View Details
        </Link>

        {job.status === "OPEN" ? (
          <Link
            to={`/worker/jobs/${job._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Apply Now
          </Link>
        ) : (
          <button
            disabled
            className="bg-gray-300 text-gray-600 px-5 py-2 rounded-lg cursor-not-allowed"
          >
            {job.status}
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkerJobCard;
