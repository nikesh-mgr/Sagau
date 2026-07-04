import { useEffect } from "react";

import WorkerLayout from "../../components/layouts/WorkerLayout";
import WorkerJobCard from "../../components/worker/WorkerJobCard";

import useJobStore from "../../store/jobStore";

const BrowseJobs = () => {
  const jobs = useJobStore((state) => state.jobs);
  const loading = useJobStore((state) => state.loading);

  const fetchJobs = useJobStore((state) => state.fetchJobs);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <WorkerLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Browse Jobs</h1>

            <p className="text-gray-500">Find jobs that match your skills.</p>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-8">Loading Jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-bold">No Jobs Found</h2>

            <p className="text-gray-500 mt-2">
              There are currently no available jobs.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <WorkerJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
};

export default BrowseJobs;
