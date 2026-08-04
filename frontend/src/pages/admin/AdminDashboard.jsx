import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiUsers,
  FiUser,
  FiBriefcase,
  FiClipboard,
  FiStar,
  FiRefreshCw,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";

import AnalyticsRow from "./AnalyticsRow";
import QuickAction from "./QuickAction";

import { getDashboard } from "../../api/adminApi";

import { errorToast } from "../../utils/toast";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await getDashboard();

      console.log("ADMIN DASHBOARD DATA:", response.data);

      setDashboard(response.data);
    } catch (error) {
      console.error(error);

      errorToast(error?.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getImage = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) return image;

    return `http://localhost:5000/${image}`;
  };

  const Avatar = ({ image, name, size = "h-12 w-12" }) => {
    return (
      <div
        className={`
      ${size}
      rounded-full
      overflow-hidden
      bg-emerald-100
      flex
      items-center
      justify-center
      shrink-0
      `}
      >
        {image ? (
          <img
            src={getImage(image)}
            alt={name}
            className="
        h-full
        w-full
        object-cover
        "
          />
        ) : (
          <span
            className="
        text-emerald-700
        font-bold
        "
          >
            {name?.charAt(0)?.toUpperCase()}
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className="
      min-h-[80vh]
      flex
      items-center
      justify-center
      "
      >
        <div className="text-center">
          <div
            className="
          h-16
          w-16
          rounded-full
          border-4
          border-emerald-600
          border-t-transparent
          animate-spin
          mx-auto
          "
          />

          <p
            className="
          mt-5
          text-slate-500
          "
          >
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div
        className="
      min-h-[80vh]
      flex
      items-center
      justify-center
      "
      >
        <div className="text-center">
          <h2
            className="
          text-2xl
          font-bold
          "
          >
            Dashboard unavailable
          </h2>

          <button
            onClick={loadDashboard}
            className="
          mt-5
          px-6
          py-3
          bg-emerald-600
          text-white
          rounded-xl
          "
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboard.stats;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FiUsers />,
    },

    {
      title: "Workers",
      value: stats.totalWorkers,
      icon: <FiUser />,
    },

    {
      title: "Clients",
      value: stats.totalClients,
      icon: <FiUsers />,
    },

    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: <FiBriefcase />,
    },

    {
      title: "Agreements",
      value: stats.activeAgreements,
      icon: <FiClipboard />,
    },

    {
      title: "Reviews",
      value: stats.totalReviews,
      icon: <FiStar />,
    },
  ];

  return (
    <div
      className="
min-h-screen
bg-slate-50
p-6
space-y-8
"
    >
      {/* HEADER */}

      <div
        className="
flex
flex-col
lg:flex-row
justify-between
gap-5
"
      >
        <div>
          <h1
            className="
text-4xl
font-bold
text-slate-900
"
          >
            Admin Dashboard
          </h1>

          <p
            className="
mt-2
text-slate-500
"
          >
            Manage Sagau marketplace users, jobs and agreements.
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="
flex
items-center
gap-2
bg-emerald-600
hover:bg-emerald-700
text-white
px-6
py-3
rounded-2xl
font-semibold
shadow
"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>
      {/* STATISTICS */}

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-6
"
      >
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -5,
            }}
            className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
          >
            <div
              className="
h-14
w-14
rounded-2xl
bg-emerald-100
text-emerald-600
flex
items-center
justify-center
text-3xl
"
            >
              {card.icon}
            </div>

            <h2
              className="
text-4xl
font-bold
text-slate-900
mt-5
"
            >
              {card.value}
            </h2>

            <p
              className="
text-slate-500
mt-2
font-medium
"
            >
              {card.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* RECENT DATA */}

      <div
        className="
grid
xl:grid-cols-3
gap-6
"
      >
        {/* RECENT USERS */}

        <div
          className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
overflow-hidden
"
        >
          <div
            className="
flex
items-center
justify-between
p-6
border-b
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Recent Users
            </h2>

            <Link
              to="/admin/users"
              className="
text-emerald-600
text-sm
font-semibold
hover:underline
"
            >
              View All
            </Link>
          </div>

          <div>
            {dashboard.recentUsers?.length > 0 ? (
              dashboard.recentUsers.map((user) => (
                <div
                  key={user._id}
                  className="
flex
items-center
justify-between
gap-4
p-5
border-b
last:border-none
hover:bg-slate-50
transition
"
                >
                  <div
                    className="
flex
items-center
gap-4
min-w-0
"
                  >
                    <Avatar image={user.profileImage} name={user.fullName} />

                    <div
                      className="
min-w-0
"
                    >
                      <h3
                        className="
font-semibold
text-slate-900
truncate
"
                      >
                        {user.fullName}
                      </h3>

                      <p
                        className="
text-sm
text-slate-500
truncate
"
                      >
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`

px-3

py-1

rounded-full

text-xs

font-semibold

${
  user.role === "admin"
    ? "bg-red-100 text-red-600"
    : user.role === "worker"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-blue-100 text-blue-700"
}

`}
                  >
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <div
                className="
p-8
text-center
text-slate-500
"
              >
                No users found
              </div>
            )}
          </div>
        </div>
        {/* RECENT JOBS */}

        <div
          className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
overflow-hidden
"
        >
          <div
            className="
flex
items-center
justify-between
p-6
border-b
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Recent Jobs
            </h2>

            <Link
              to="/admin/jobs"
              className="
text-emerald-600
text-sm
font-semibold
hover:underline
"
            >
              View All
            </Link>
          </div>

          <div>
            {dashboard.recentJobs?.length > 0 ? (
              dashboard.recentJobs.map((job) => (
                <div
                  key={job._id}
                  className="
p-5
border-b
last:border-none
hover:bg-slate-50
transition
"
                >
                  <div
                    className="
flex
justify-between
gap-4
"
                  >
                    <div>
                      <h3
                        className="
font-bold
text-slate-900
"
                      >
                        {job.title}
                      </h3>

                      <div
                        className="
flex
items-center
gap-3
mt-3
"
                      >
                        <Avatar
                          image={job.client?.profileImage}
                          name={job.client?.fullName}
                          size="h-9 w-9"
                        />

                        <div>
                          <p
                            className="
text-xs
text-slate-400
"
                          >
                            Client
                          </p>

                          <p
                            className="
text-sm
font-medium
text-slate-700
"
                          >
                            {job.client?.fullName || "Unknown Client"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`

px-3

py-1

h-fit

rounded-full

text-xs

font-semibold

${
  job.status === "OPEN"
    ? "bg-blue-100 text-blue-700"
    : job.status === "IN_PROGRESS"
      ? "bg-yellow-100 text-yellow-700"
      : job.status === "COMPLETED"
        ? "bg-green-100 text-green-700"
        : "bg-slate-100 text-slate-700"
}

`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div
                    className="
flex
justify-between
items-center
mt-5
"
                  >
                    <span
                      className="
font-bold
text-emerald-600
"
                    >
                      NPR {job.budget}
                    </span>

                    <span
                      className="
text-sm
text-slate-500
"
                    >
                      {job.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="
p-8
text-center
text-slate-500
"
              >
                No jobs found
              </div>
            )}
          </div>
        </div>

        {/* RECENT AGREEMENTS */}

        <div
          className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
overflow-hidden
"
        >
          <div
            className="
flex
items-center
justify-between
p-6
border-b
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              Recent Agreements
            </h2>

            <Link
              to="/admin/agreements"
              className="
text-emerald-600
text-sm
font-semibold
hover:underline
"
            >
              View All
            </Link>
          </div>

          <div>
            {dashboard.recentAgreements?.length > 0 ? (
              dashboard.recentAgreements.map((agreement) => (
                <div
                  key={agreement._id}
                  className="
p-5
border-b
last:border-none
hover:bg-slate-50
transition
space-y-4
"
                >
                  <h3
                    className="
font-bold
text-slate-900
"
                  >
                    {agreement.jobTitle || agreement.job?.title || "Agreement"}
                  </h3>

                  {/* CLIENT */}

                  <div
                    className="
flex
items-center
gap-3
"
                  >
                    <Avatar
                      image={agreement.client?.profileImage}
                      name={agreement.client?.fullName}
                      size="h-10 w-10"
                    />

                    <div>
                      <p
                        className="
text-xs
text-slate-400
"
                      >
                        Client
                      </p>

                      <p
                        className="
font-medium
text-slate-700
"
                      >
                        {agreement.client?.fullName || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* WORKER */}

                  <div
                    className="
flex
items-center
gap-3
"
                  >
                    <Avatar
                      image={agreement.worker?.profileImage}
                      name={agreement.worker?.fullName}
                      size="h-10 w-10"
                    />

                    <div>
                      <p
                        className="
text-xs
text-slate-400
"
                      >
                        Worker
                      </p>

                      <p
                        className="
font-medium
text-slate-700
"
                      >
                        {agreement.worker?.fullName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div
                    className="
flex
justify-between
items-center
pt-3
"
                  >
                    <span
                      className="
font-bold
text-emerald-600
"
                    >
                      NPR {agreement.agreedBudget}
                    </span>

                    <span
                      className={`

px-3

py-1

rounded-full

text-xs

font-semibold

${
  agreement.status === "ACTIVE"
    ? "bg-blue-100 text-blue-700"
    : agreement.status === "COMPLETED"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
}

`}
                    >
                      {agreement.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="
p-8
text-center
text-slate-500
"
              >
                No agreements found
              </div>
            )}
          </div>
        </div>
      </div>
      {/* ANALYTICS */}

      <div
        className="
grid
lg:grid-cols-2
gap-6
"
      >
        {/* JOB ANALYTICS */}

        <div
          className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
        >
          <div
            className="
flex
items-center
gap-3
mb-6
"
          >
            <FiActivity
              className="
text-emerald-600
text-2xl
"
            />

            <h2
              className="
text-2xl
font-bold
"
            >
              Job Analytics
            </h2>
          </div>

          <div
            className="
space-y-5
"
          >
            <AnalyticsRow
              title="Open Jobs"
              value={stats.openJobs}
              color="bg-blue-500"
            />

            <AnalyticsRow
              title="Jobs In Progress"
              value={stats.inProgressJobs}
              color="bg-yellow-500"
            />

            <AnalyticsRow
              title="Completed Jobs"
              value={stats.completedJobs}
              color="bg-green-500"
            />

            <AnalyticsRow
              title="Total Jobs"
              value={stats.totalJobs}
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* AGREEMENT ANALYTICS */}

        <div
          className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
        >
          <div
            className="
flex
items-center
gap-3
mb-6
"
          >
            <FiClipboard
              className="
text-blue-600
text-2xl
"
            />

            <h2
              className="
text-2xl
font-bold
"
            >
              Agreement Analytics
            </h2>
          </div>

          <div
            className="
space-y-5
"
          >
            <AnalyticsRow
              title="Active Agreements"
              value={stats.activeAgreements}
              color="bg-blue-500"
            />

            <AnalyticsRow
              title="Completed Agreements"
              value={stats.completedAgreements}
              color="bg-green-500"
            />

            <AnalyticsRow
              title="Cancelled Agreements"
              value={stats.cancelledAgreements}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>

      {/* PLATFORM OVERVIEW */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
      >
        <h2
          className="
text-2xl
font-bold
mb-6
"
        >
          Platform Overview
        </h2>

        <div
          className="
grid
sm:grid-cols-2
xl:grid-cols-4
gap-5
"
        >
          <div
            className="
rounded-2xl
bg-blue-50
p-5
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Registered Users
            </p>

            <h3
              className="
text-4xl
font-bold
mt-3
"
            >
              {stats.totalUsers}
            </h3>
          </div>

          <div
            className="
rounded-2xl
bg-emerald-50
p-5
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Active Workers
            </p>

            <h3
              className="
text-4xl
font-bold
mt-3
"
            >
              {stats.totalWorkers}
            </h3>
          </div>

          <div
            className="
rounded-2xl
bg-orange-50
p-5
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Available Jobs
            </p>

            <h3
              className="
text-4xl
font-bold
mt-3
"
            >
              {stats.openJobs}
            </h3>
          </div>

          <div
            className="
rounded-2xl
bg-purple-50
p-5
"
          >
            <p
              className="
text-sm
text-slate-500
"
            >
              Reviews
            </p>

            <h3
              className="
text-4xl
font-bold
mt-3
"
            >
              {stats.totalReviews}
            </h3>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-6
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            Quick Actions
          </h2>

          <p
            className="
text-slate-500
"
          >
            Admin Modules
          </p>
        </div>

        <div
          className="
grid
grid-cols-2
md:grid-cols-3
xl:grid-cols-6
gap-5
"
        >
          <QuickAction title="Users" icon={<FiUsers />} to="/admin/users" />

          <QuickAction title="Workers" icon={<FiUser />} to="/admin/workers" />

          <QuickAction title="Jobs" icon={<FiBriefcase />} to="/admin/jobs" />

          <QuickAction
            title="Agreements"
            icon={<FiClipboard />}
            to="/admin/agreements"
          />

          <QuickAction title="Reviews" icon={<FiStar />} to="/admin/reviews" />

          <QuickAction title="Dashboard" icon={<FiRefreshCw />} to="/admin" />
        </div>
      </div>

      {/* SYSTEM STATUS */}

      <div
        className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-6
"
      >
        <div
          className="
flex
justify-between
items-center
mb-6
"
        >
          <h2
            className="
text-2xl
font-bold
"
          >
            System Status
          </h2>

          <span
            className="
text-emerald-600
font-semibold
text-sm
"
          >
            All Services Running
          </span>
        </div>

        <div
          className="
grid
md:grid-cols-3
gap-5
"
        >
          {["Database", "API Server", "Platform"].map((item) => (
            <div
              key={item}
              className="
border
rounded-2xl
p-5
"
            >
              <div
                className="
flex
items-center
gap-3
"
              >
                <div
                  className="
h-3
w-3
rounded-full
bg-green-500
"
                />

                <p
                  className="
font-semibold
"
                >
                  {item}
                </p>
              </div>

              <p
                className="
mt-3
text-slate-500
"
              >
                Healthy
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
text-center
text-slate-400
text-sm
py-6
"
      >
        Sagau Admin Dashboard
        <br />
        Manage users, workers, jobs and agreements.
      </div>
    </div>
  );
};

export default AdminDashboard;
