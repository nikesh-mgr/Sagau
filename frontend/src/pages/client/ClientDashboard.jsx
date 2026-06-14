import { useEffect } from "react";
import { FaBriefcase, FaFileContract, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import useJobStore from "../../store/jobStore";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>

        <Icon className="text-3xl text-blue-600" />
      </div>
    </div>
  );
};

const ClientDashboard = () => {
  const { myJobs, fetchMyJobs } = useJobStore();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const totalJobs = myJobs?.length || 0;

  const activeJobs =
    myJobs?.filter(
      (job) => job.status === "OPEN" || job.status === "IN_PROGRESS",
    ).length || 0;

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Client Dashboard"
        subtitle="Manage jobs and hire workers"
      />

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Jobs" value={totalJobs} icon={FaBriefcase} />

        <StatCard title="Active Jobs" value={activeJobs} icon={FaUsers} />

        <StatCard title="Agreements" value="0" icon={FaFileContract} />
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/client/jobs/create"
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Create Job
          </Link>

          <Link to="/client/jobs" className="rounded-xl border px-5 py-3">
            View Jobs
          </Link>

          <Link to="/client/agreements" className="rounded-xl border px-5 py-3">
            Agreements
          </Link>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Jobs</h2>

        {myJobs?.length === 0 ? (
          <p className="text-slate-500">No jobs posted yet.</p>
        ) : (
          <div className="space-y-4">
            {myJobs.slice(0, 5).map((job) => (
              <div key={job._id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{job.title}</h3>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    {job.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">NPR {job.budget}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Client Dashboard
      </h1>
    </DashboardLayout>
  );
};

export default Dashboard;