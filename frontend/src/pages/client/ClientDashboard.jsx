import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiBriefcase,
  FiUsers,
  FiCheckCircle,
  FiPlus,
  FiArrowRight,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { motion } from "framer-motion";

import { getMyJobs } from "../../api/jobApi";
import { getClientApplications } from "../../api/applicationApi";
import { getMyAgreements } from "../../api/agreementApi";

import { errorToast } from "../../utils/toast";

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    jobs: [],
    applications: [],
    agreements: [],
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

      setDashboardData({
        jobs: jobsResponse.data || [],

        applications: applicationsResponse.data || [],

        agreements: agreementsResponse.data || [],
      });
    } catch (error) {
      console.log(error);

      errorToast("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const { jobs, applications, agreements } = dashboardData;

  /*
  ==========================
  DASHBOARD STATISTICS
  ==========================
  */

  const stats = useMemo(() => {
    const activeJobs = jobs.filter(
      (job) => job.status === "IN_PROGRESS",
    ).length;

    const openJobs = jobs.filter((job) => job.status === "OPEN").length;

    const completedJobs = agreements.filter(
      (agreement) => agreement.status === "COMPLETED",
    ).length;

    return {
      totalJobs: jobs.length,

      openJobs,

      activeJobs,

      completedJobs,

      totalApplicants: applications.length,
    };
  }, [jobs, applications, agreements]);

  /*
  ==========================
  JOB STATUS CHART
  ==========================
  */

  const jobStatusData = useMemo(() => {
    return [
      {
        name: "Open",
        value: jobs.filter((job) => job.status === "OPEN").length,
      },

      {
        name: "Active",
        value: jobs.filter((job) => job.status === "IN_PROGRESS").length,
      },

      {
        name: "Completed",
        value: agreements.filter(
          (agreement) => agreement.status === "COMPLETED",
        ).length,
      },

      {
        name: "Closed",
        value: jobs.filter((job) => job.status === "CLOSED").length,
      },
    ];
  }, [jobs, agreements]);

  /*
  ==========================
  APPLICATION CHART
  ==========================
  */

  const applicationChartData = useMemo(() => {
    return [
      {
        name: "Pending",
        value: applications.filter((item) => item.status === "PENDING").length,
      },

      {
        name: "Accepted",
        value: applications.filter((item) => item.status === "ACCEPTED").length,
      },

      {
        name: "Rejected",
        value: applications.filter((item) => item.status === "REJECTED").length,
      },
    ];
  }, [applications]);

  /*
  ==========================
  JOB GROWTH CHART
  ==========================
  */

  const growthData = useMemo(() => {
    return [...jobs]

      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

      .slice(0, 7)

      .map((job, index) => ({
        name: new Date(job.createdAt).toLocaleDateString("en-US", {
          month: "short",
        }),

        jobs: index + 1,
      }));
  }, [jobs]);

  const cards = [
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: <FiBriefcase />,
      description: "Currently running projects",
    },

    {
      title: "Applicants",
      value: stats.totalApplicants,
      icon: <FiUsers />,
      description: "Workers interested",
    },

    {
      title: "Completed",
      value: stats.completedJobs,
      icon: <FiCheckCircle />,
      description: "Successfully finished",
    },
  ];

  /*
  ==========================
  LOADING STATE
  ==========================
  */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />

          <p className="mt-5 text-sm font-medium text-gray-500">
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <motion.section
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white shadow-xl sm:p-8"
      >
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-sm text-emerald-100">
            <FiTrendingUp />

            <span>Your hiring workspace</span>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">Welcome back 👋</h1>

          <p className="mt-3 text-sm leading-relaxed text-emerald-100 sm:text-base">
            Manage your jobs, review skilled workers, and build successful
            projects through SAGAU.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/client/jobs/create"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <FiPlus />
              Post New Job
            </Link>

            <Link
              to="/client/jobs"
              className="flex items-center justify-center gap-2 rounded-xl bg-white/20 px-6 py-3 font-semibold transition hover:bg-white/30"
            >
              Manage Jobs
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </motion.section>{" "}
      {/* SUMMARY STATISTICS */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-gray-500">{card.description}</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-xl text-emerald-600">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </section>
      {/* ANALYTICS SECTION */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hiring Analytics</h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your job activity and hiring progress.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* JOB STATUS */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">Job Status</h3>

              <p className="mt-1 text-sm text-gray-500">
                Current project distribution
              </p>
            </div>

            <div className="h-72">
              {jobStatusData.some((item) => item.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobStatusData.filter((item) => item.value > 0)}
                      dataKey="value"
                      outerRadius={90}
                      innerRadius={55}
                      paddingAngle={5}
                    >
                      {jobStatusData.map((_, index) => (
                        <Cell key={index} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No job data available
                </div>
              )}
            </div>
          </div>

          {/* APPLICATION STATUS */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">Applications</h3>

              <p className="mt-1 text-sm text-gray-500">
                Worker response overview
              </p>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={applicationChartData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* JOB GROWTH */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-gray-900">Job Growth</h3>

              <p className="mt-1 text-sm text-gray-500">
                Your posting activity
              </p>
            </div>

            <div className="h-72">
              {growthData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Line type="monotone" dataKey="jobs" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  Create your first job to see growth
                </div>
              )}
            </div>
          </div>
        </div>
      </section>{" "}
      {/* RECENT JOBS SECTION */}
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor your latest posted projects and hiring progress.
            </p>
          </div>

          <Link
            to="/client/jobs"
            className="flex items-center gap-2 font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            View All
            <FiArrowRight />
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FiBriefcase size={24} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              No jobs posted yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              Start your hiring journey by posting your first project and
              connect with skilled workers.
            </p>

            <Link
              to="/client/jobs/create"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <FiPlus />
              Create First Job
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job) => (
              <motion.div
                key={job._id}
                whileHover={{
                  y: -3,
                }}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5 transition hover:bg-emerald-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-gray-900">
                    {job.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      📍
                      {job.location}
                    </span>

                    <span className="flex items-center gap-1">
                      💰 NPR {job.budget}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm sm:self-center">
                  <FiClock />

                  {job.status}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      {/* QUICK ACTIONS */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your hiring workflow faster.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Link
            to="/client/applications"
            className="group rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg transition hover:-translate-y-1"
          >
            <FiUsers className="mb-5 text-3xl transition group-hover:scale-110" />

            <h3 className="text-xl font-bold">Manage Applicants</h3>

            <p className="mt-2 text-sm text-indigo-100">
              Review worker applications and choose the right talent.
            </p>
          </Link>

          <Link
            to="/client/agreements"
            className="group rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 p-6 text-white shadow-lg transition hover:-translate-y-1"
          >
            <FiCheckCircle className="mb-5 text-3xl transition group-hover:scale-110" />

            <h3 className="text-xl font-bold">Agreements</h3>

            <p className="mt-2 text-sm text-emerald-100">
              Track contracts, progress, and completed projects.
            </p>
          </Link>

          <Link
            to="/client/profile"
            className="group rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white shadow-lg transition hover:-translate-y-1"
          >
            <FiBriefcase className="mb-5 text-3xl transition group-hover:scale-110" />

            <h3 className="text-xl font-bold">Profile Settings</h3>

            <p className="mt-2 text-sm text-orange-100">
              Keep your client profile professional and trusted.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientDashboard;
