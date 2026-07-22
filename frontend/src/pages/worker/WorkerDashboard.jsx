import { useEffect, useState } from "react";

import {
  FiBriefcase,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getWorkerDashboard } from "../../api/dashboardApi";

import { errorToast } from "../../utils/toast";

import Card from "../../components/common/Card";

import Loader from "../../components/common/Loader";

const WorkerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getWorkerDashboard();

      setDashboard(response.data);
    } catch (error) {
      console.log(error);

      errorToast(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen text="Loading dashboard..." />;
  }

  const stats = dashboard?.stats || {};

  const cards = [
    {
      title: "Available Jobs",
      value: stats.availableJobs || 0,
      icon: <FiBriefcase />,
      color: "bg-blue-100 text-blue-600",
    },

    {
      title: "Applications",
      value: stats.applications || 0,
      icon: <FiFileText />,
      color: "bg-purple-100 text-purple-600",
    },

    {
      title: "Accepted Jobs",
      value: stats.accepted || 0,
      icon: <FiCheckCircle />,
      color: "bg-green-100 text-green-600",
    },

    {
      title: "Pending",
      value: stats.pending || 0,
      icon: <FiClock />,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}

      <div
        className="
        bg-gradient-to-r
        from-emerald-600
        to-blue-600
        rounded-3xl
        p-8
        text-white
        shadow-xl
      "
      >
        <div className="flex items-center gap-4">
          <div
            className="
            h-14
            w-14
            rounded-2xl
            bg-white/20
            flex
            items-center
            justify-center
          "
          >
            <FiTrendingUp className="text-3xl" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {dashboard?.profile?.user?.fullName || "Worker"}
            </h1>

            <p className="mt-2 text-emerald-100">
              Find jobs, manage applications and grow your career.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
      >
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
            whileHover={{
              y: -5,
            }}
          >
            <Card hover>
              <div
                className={`
                  h-14
                  w-14
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-3xl
                  ${card.color}
                `}
              >
                {card.icon}
              </div>

              <p
                className="
                mt-5
                text-gray-500
                font-medium
              "
              >
                {card.title}
              </p>

              <h2
                className="
                text-3xl
                font-bold
                mt-2
                text-gray-900
              "
              >
                {card.value}
              </h2>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Info */}

      <Card>
        <h2
          className="
          text-xl
          font-bold
          text-gray-900
        "
        >
          Worker Profile
        </h2>

        <div
          className="
          mt-5
          grid
          md:grid-cols-3
          gap-5
        "
        >
          <div>
            <p className="text-gray-500">Skills</p>

            <p className="font-semibold mt-1">
              {dashboard?.profile?.skills?.length || 0} Skills
            </p>
          </div>

          <div>
            <p className="text-gray-500">Experience</p>

            <p className="font-semibold mt-1">
              {dashboard?.profile?.experience || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Rating</p>

            <p className="font-semibold mt-1">
              {dashboard?.profile?.rating || 0}/5
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkerDashboard;
