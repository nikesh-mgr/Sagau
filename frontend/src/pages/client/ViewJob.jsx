import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import ClientLayout from "../../components/layouts/ClientLayout";

import useJobStore from "../../store/jobStore";

const ViewJob = () => {
  const { jobId } = useParams();

  const currentJob = useJobStore((state) => state.currentJob);
  const loading = useJobStore((state) => state.loading);

  const fetchSingleJob = useJobStore((state) => state.fetchSingleJob);

  useEffect(() => {
    fetchSingleJob(jobId);
  }, [jobId]);

  if (loading) {
    return (
      <ClientLayout>
        <h2 className="text-xl font-semibold">Loading...</h2>
      </ClientLayout>
    );
  }

  if (!currentJob) {
    return (
      <ClientLayout>
        <h2 className="text-red-600 text-xl">Job not found.</h2>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{currentJob.title}</h1>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {currentJob.status}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg">Description</h3>

            <p className="text-gray-700 mt-2">{currentJob.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">Budget</p>
              <p>NPR {currentJob.budget}</p>
            </div>

            <div>
              <p className="font-semibold">Category</p>
              <p>{currentJob.category}</p>
            </div>

            <div>
              <p className="font-semibold">Location</p>
              <p>{currentJob.location}</p>
            </div>

            <div>
              <p className="font-semibold">Deadline</p>
              <p>{new Date(currentJob.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Skills Required</h3>

            <div className="flex flex-wrap gap-2">
              {currentJob.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Link
              to={`/client/jobs/edit/${currentJob._id}`}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
            >
              Edit Job
            </Link>

            <Link
              to="/client/jobs"
              className="bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ViewJob;
