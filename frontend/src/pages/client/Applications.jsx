import { useEffect, useState } from "react";

import {
  FiSearch,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { motion } from "framer-motion";

import ApplicantCard from "../../components/application/ApplicantCard";

import { getClientApplications } from "../../api/applicationApi";

import { errorToast } from "../../utils/toast";

const Applications = () => {
  const [applications, setApplications] = useState([]);

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [search, applications]);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getClientApplications();

      setApplications(response.data || []);

      setFilteredApplications(response.data || []);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let data = [...applications];

    if (search.trim()) {
      data = data.filter(
        (application) =>
          application.worker?.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          application.job?.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredApplications(data);
  };

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: <FiUsers />,
      color: "from-blue-500 to-indigo-600",
    },

    {
      title: "Pending",
      value: applications.filter((item) => item.status === "PENDING").length,
      icon: <FiClock />,
      color: "from-yellow-500 to-orange-500",
    },

    {
      title: "Accepted",
      value: applications.filter((item) => item.status === "ACCEPTED").length,
      icon: <FiCheckCircle />,
      color: "from-green-500 to-emerald-600",
    },

    {
      title: "Rejected",
      value: applications.filter((item) => item.status === "REJECTED").length,
      icon: <FiXCircle />,
      color: "from-red-500 to-rose-600",
    },
  ];

  if (loading) {
    return (
      <div
        className="
        min-h-[500px]
        flex
        items-center
        justify-center
        "
      >
        <div
          className="
          text-center
          "
        >
          <div
            className="
            h-14
            w-14
            mx-auto
            rounded-full
            border-4
            border-blue-600
            border-t-transparent
            animate-spin
            "
          />

          <p
            className="
            mt-5
            text-slate-500
            font-medium
            "
          >
            Loading Applications...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-blue-50
      px-4
      py-8
      sm:px-6
      lg:px-8
      space-y-10
      "
    >
      {/* Header */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
        rounded-3xl
        bg-gradient-to-r
        from-blue-600
        via-indigo-600
        to-purple-700
        p-8
        text-white
        shadow-xl
        "
      >
        <h1
          className="
          text-3xl
          sm:text-4xl
          font-bold
          "
        >
          Worker Applications
        </h1>

        <p
          className="
          mt-3
          text-blue-100
          max-w-xl
          "
        >
          Review proposals, compare skilled workers and select the best person
          for your project.
        </p>
      </motion.div>

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
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -6,
            }}
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              border
              border-slate-100
              "
          >
            <div
              className={`
                h-14
                w-14
                rounded-2xl
                bg-gradient-to-r
                ${item.color}
                flex
                items-center
                justify-center
                text-white
                text-2xl
                `}
            >
              {item.icon}
            </div>

            <h2
              className="
                text-3xl
                font-bold
                mt-5
                text-slate-900
                "
            >
              {item.value}
            </h2>

            <p
              className="
                mt-2
                text-slate-500
                font-medium
                "
            >
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search */}

      <div
        className="
        bg-white
        rounded-3xl
        shadow-lg
        border
        border-slate-100
        p-6
        "
      >
        <div
          className="
          relative
          "
        >
          <FiSearch
            className="
            absolute
            left-5
            top-1/2
            -translate-y-1/2
            text-slate-400
            text-xl
            "
          />

          <input
            type="text"
            placeholder="Search worker name or job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            rounded-2xl
            border
            border-slate-200
            py-4
            pl-14
            pr-5
            outline-none
            focus:ring-2
            focus:ring-blue-500
            transition
            "
          />
        </div>
      </div>

      {/* Applications List */}

      {filteredApplications.length === 0 ? (
        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            p-12
            text-center
            "
        >
          <FiUsers
            className="
              mx-auto
              text-slate-300
              text-6xl
              "
          />

          <h2
            className="
              text-2xl
              font-bold
              mt-5
              text-slate-800
              "
          >
            No Applications Found
          </h2>

          <p
            className="
              text-slate-500
              mt-3
              "
          >
            Workers applications will appear here once they apply.
          </p>
        </div>
      ) : (
        <div
          className="
            space-y-6
            "
        >
          {filteredApplications.map((application) => (
            <motion.div
              key={application._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <ApplicantCard
                application={application}
                refresh={loadApplications}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
