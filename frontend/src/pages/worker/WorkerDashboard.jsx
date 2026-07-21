import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiBriefcase, FiFileText, FiCheckCircle, FiUser } from "react-icons/fi";

import { getAllJobs } from "../../api/jobApi";
import { getMyApplications } from "../../api/applicationApi";
import { getMyWorkerProfile } from "../../api/workerApi";

import { errorToast } from "../../utils/toast";

const WorkerDashboard = () => {
  const [profile, setProfile] = useState(null);

  const [stats, setStats] = useState({
    availableJobs: 0,
    applications: 0,
    accepted: 0,
    pending: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [profileRes, jobsRes, applicationRes] = await Promise.all([
        getMyWorkerProfile(),
        getAllJobs(),
        getMyApplications(),
      ]);

      const profileData = profileRes.data;

      const jobs = jobsRes.data.jobs || [];

      const applications = applicationRes.data || [];

      setProfile(profileData);

      setRecentJobs(jobs.slice(0, 5));

      setStats({
        availableJobs: jobs.length,
        applications: applications.length,
        accepted: applications.filter((item) => item.status === "ACCEPTED")
          .length,
        pending: applications.filter((item) => item.status === "PENDING")
          .length,
      });
    } catch (error) {
      console.log(error);

      errorToast("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back, {profile?.user?.fullName}
        </h1>

        <p className="text-gray-500 mt-2">
          Find new opportunities and manage your work.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <FiBriefcase className="text-4xl text-emerald-600 mb-3" />

          <p className="text-gray-500">Available Jobs</p>

          <h2 className="text-3xl font-bold">{stats.availableJobs}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FiFileText className="text-4xl text-blue-600 mb-3" />

          <p className="text-gray-500">Applications</p>

          <h2 className="text-3xl font-bold">{stats.applications}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FiCheckCircle className="text-4xl text-green-600 mb-3" />

          <p className="text-gray-500">Accepted</p>

          <h2 className="text-3xl font-bold">{stats.accepted}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FiUser className="text-4xl text-purple-600 mb-3" />

          <p className="text-gray-500">Pending</p>

          <h2 className="text-3xl font-bold">{stats.pending}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Latest Jobs</h2>

          <Link
            to="/worker/jobs"
            className="text-primary font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        {recentJobs.length === 0 ? (
          <div className="p-6 text-gray-500">No jobs available.</div>
        ) : (
          <div>
            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="flex justify-between items-center p-6 border-b last:border-none"
              >
                <div>
                  <h3 className="font-semibold">{job.title}</h3>

                  <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold">NPR {job.budget}</p>

                  <Link
                    to={`/worker/jobs/${job._id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
