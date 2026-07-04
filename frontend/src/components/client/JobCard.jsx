import { Link } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">{job.title}</h2>

          <p className="text-gray-500 mt-2">{job.description}</p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full h-fit">
          {job.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <p className="font-semibold">Budget</p>

          <p>NPR {job.budget}</p>
        </div>

        <div>
          <p className="font-semibold">Location</p>

          <p>{job.location}</p>
        </div>

        <div>
          <p className="font-semibold">Category</p>

          <p>{job.category}</p>
        </div>

        <div>
          <p className="font-semibold">Deadline</p>

          <p>{new Date(job.deadline).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          to={`/client/jobs/${job._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          View
        </Link>

        <Link
          to={`/client/jobs/edit/${job._id}`}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(job._id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <Link
          to={`/client/jobs/${job._id}/applications`}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Applications
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
