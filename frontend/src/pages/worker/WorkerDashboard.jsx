import { useEffect } from "react";

import WorkerLayout from "../../components/layouts/WorkerLayout";

import WorkerProfileCard from "../../components/worker/WorkerProfileCard";
import WorkerStats from "../../components/worker/WorkerStats";
import RecentJobs from "../../components/worker/RecentJobs";

import useWorkerStore from "../../store/workerStore";
import useJobStore from "../../store/jobStore";

const WorkerDashboard = () => {
  const profile = useWorkerStore((state) => state.profile);
  const fetchProfile = useWorkerStore((state) => state.fetchProfile);

  const jobs = useJobStore((state) => state.jobs);
  const fetchJobs = useJobStore((state) => state.fetchJobs);

  useEffect(() => {
    fetchProfile();
    fetchJobs();
  }, []);

  return (
    <WorkerLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Worker Dashboard</h1>

        <WorkerProfileCard profile={profile} />

        <WorkerStats />

        <RecentJobs jobs={jobs.slice(0, 5)} />
      </div>
    </WorkerLayout>
  );
};

export default WorkerDashboard;
