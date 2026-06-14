import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{job.title}</h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
          {job.status}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 text-slate-600">{job.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {job.skillsRequired?.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-slate-100 px-2 py-1 text-xs"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="space-y-1 text-sm text-slate-500">
        <p>Budget: NPR {job.budget}</p>
        <p>Location: {job.location}</p>
        <p>Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      </div>

      <Link
        to={`/jobs/${job._id}`}
        className="mt-4 inline-block font-medium text-blue-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default JobCard;
