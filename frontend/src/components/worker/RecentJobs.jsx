import { Link } from "react-router-dom";

const RecentJobs = ({ jobs }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Recent Jobs</h2>

        <Link to="/worker/jobs" className="text-blue-600">
          View All
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="border rounded-lg p-4">
              <h3 className="font-bold">{job.title}</h3>

              <p className="text-gray-500">NPR {job.budget}</p>

              <Link
                to={`/worker/jobs/${job._id}`}
                className="text-blue-600 mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentJobs;
