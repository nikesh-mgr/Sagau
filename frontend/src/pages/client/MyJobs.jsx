import { useEffect } from "react";

import ClientLayout from "../../components/layouts/ClientLayout";

import JobCard from "../../components/client/JobCard";

import useJobStore from "../../store/jobStore";

import { successToast, errorToast } from "../../utils/toast";

const MyJobs = () => {
  const jobs = useJobStore((state) => state.myJobs);

  const loading = useJobStore((state) => state.loading);

  const fetchMyJobs = useJobStore((state) => state.fetchMyJobs);

  const removeJob = useJobStore((state) => state.deleteJob);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await removeJob(id);

      successToast("Job deleted successfully");
    } catch (error) {
      errorToast("Failed to delete job");
    }
  };

  return (
    <ClientLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Jobs</h1>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl p-10 shadow text-center">
          <h2 className="text-2xl font-bold">No Jobs Posted Yet</h2>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </ClientLayout>
  );
};

export default MyJobs;
