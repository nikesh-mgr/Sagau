import { useEffect, useState } from "react";

import { FiBriefcase, FiUsers, FiCheckCircle } from "react-icons/fi";

import { Link } from "react-router-dom";

import { getMyJobs } from "../../api/jobApi";
import { getClientApplications } from "../../api/applicationApi";
import { getMyAgreements } from "../../api/agreementApi";

import { errorToast } from "../../utils/toast";

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,

    applicants: 0,

    completedJobs: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [jobsResponse, applicationsResponse, agreementsResponse] =
        await Promise.all([
          getMyJobs(),

          getClientApplications(),

          getMyAgreements(),
        ]);

      const jobs = jobsResponse.data || [];

      const applications = applicationsResponse.data || [];

      const agreements = agreementsResponse.data || [];

      const activeJobs = jobs.filter(
        (job) => job.status === "IN_PROGRESS",
      ).length;

      const completedJobs = agreements.filter(
        (agreement) => agreement.status === "COMPLETED",
      ).length;

      setStats({
        activeJobs,

        applicants: applications.length,

        completedJobs,
      });
    } catch (error) {
      console.log(error);

      errorToast("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Active Jobs",

      value: stats.activeJobs,

      icon: <FiBriefcase />,
    },

    {
      title: "Applicants",

      value: stats.applicants,

      icon: <FiUsers />,
    },

    {
      title: "Completed Jobs",

      value: stats.completedJobs,

      icon: <FiCheckCircle />,
    },
  ];

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome to Client Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-card p-6">
            <div className="text-primary text-3xl">{card.icon}</div>

            <h3 className="mt-4 text-gray-600">{card.title}</h3>

            <p className="text-3xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-card p-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">
          <Link
            to="/client/jobs/create"
            className="bg-primary text-white rounded-xl py-3 text-center"
          >
            Post New Job
          </Link>

          <Link
            to="/client/applications"
            className="border border-gray-200 rounded-xl py-3 text-center"
          >
            View Applicants
          </Link>

          <Link
            to="/client/jobs"
            className="border border-gray-200 rounded-xl py-3 text-center"
          >
            Manage Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
