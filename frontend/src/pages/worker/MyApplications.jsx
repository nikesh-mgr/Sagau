import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiSearch,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getMyApplications } from "../../api/applicationApi";

import { errorToast } from "../../utils/toast";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  const [filteredApplications, setFilteredApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, search, statusFilter]);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getMyApplications();

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
      data = data.filter((application) =>
        application.job?.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter) {
      data = data.filter((application) => application.status === statusFilter);
    }

    setFilteredApplications(data);
  };

  const stats = useMemo(
    () => ({
      total: applications.length,

      pending: applications.filter((item) => item.status === "PENDING").length,

      accepted: applications.filter((item) => item.status === "ACCEPTED")
        .length,

      rejected: applications.filter((item) => item.status === "REJECTED")
        .length,
    }),
    [applications],
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      PENDING: "bg-yellow-100 text-yellow-700",

      ACCEPTED: "bg-green-100 text-green-700",

      REJECTED: "bg-red-100 text-red-700",
    };

    return (
      <span
        className={`
        px-4
        py-2
        rounded-full
        font-semibold
        text-sm
        ${styles[status]}
        `}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div
        className="
      h-96
      flex
      items-center
      justify-center
      "
      >
        <div className="text-center">
          <div
            className="
          h-12
          w-12
          border-4
          border-emerald-600
          border-t-transparent
          rounded-full
          animate-spin
          mx-auto
          "
          />

          <p
            className="
          mt-4
          text-gray-500
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
    to-emerald-50
    p-4
    sm:p-6
    lg:p-8
    space-y-8
    "
    >
      {/* Header */}

      <div>
        <h1
          className="
        text-3xl
        sm:text-4xl
        font-bold
        "
        >
          My Applications
        </h1>

        <p
          className="
        text-gray-500
        mt-2
        "
        >
          Track your job proposals and hiring status.
        </p>
      </div>

      {/* Stats */}

      <div
        className="
      grid
      md:grid-cols-4
      gap-6
      "
      >
        {[
          {
            title: "Total",
            value: stats.total,
            icon: <FiBriefcase />,
          },

          {
            title: "Pending",
            value: stats.pending,
            icon: <FiClock />,
          },

          {
            title: "Accepted",
            value: stats.accepted,
            icon: <FiCheckCircle />,
          },

          {
            title: "Rejected",
            value: stats.rejected,
            icon: <FiXCircle />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -5,
            }}
            className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            p-6
            "
          >
            <div
              className="
            text-3xl
            text-emerald-600
            "
            >
              {item.icon}
            </div>

            <h2
              className="
            text-4xl
            font-bold
            mt-4
            "
            >
              {item.value}
            </h2>

            <p
              className="
            text-gray-500
            mt-2
            "
            >
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}

      <div
        className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      p-6
      "
      >
        <div
          className="
        grid
        md:grid-cols-2
        gap-5
        "
        >
          <div className="relative">
            <FiSearch
              className="
              absolute
              left-4
              top-4
              text-gray-400
              "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job"
              className="
              w-full
              border
              rounded-xl
              py-3
              pl-11
              pr-4
              outline-none
              focus:ring-2
              focus:ring-primary
              "
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
            border
            rounded-xl
            px-4
            "
          >
            <option value="">All Status</option>

            <option value="PENDING">Pending</option>

            <option value="ACCEPTED">Accepted</option>

            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications */}

      {filteredApplications.length === 0 ? (
        <div
          className="
          bg-white
          rounded-3xl
          shadow-lg
          border
          p-12
          text-center
          "
        >
          <FiBriefcase
            size={60}
            className="
              mx-auto
              text-gray-300
              mb-5
              "
          />

          <h2
            className="
            text-2xl
            font-bold
            "
          >
            No Applications Found
          </h2>

          <p
            className="
            text-gray-500
            mt-3
            "
          >
            Start applying for available jobs.
          </p>

          <Link
            to="/worker/jobs"
            className="
              inline-block
              mt-6
              bg-primary
              text-white
              px-6
              py-3
              rounded-xl
              "
          >
            Browse Jobs
          </Link>
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
              className="
                bg-white
                rounded-3xl
                shadow-lg
                border
                p-6
                "
            >
              <div
                className="
                flex
                justify-between
                items-start
                flex-wrap
                gap-4
                "
              >
                <div>
                  <h2
                    className="
                    text-2xl
                    font-bold
                    "
                  >
                    {application.job?.title}
                  </h2>

                  <p
                    className="
                    text-gray-500
                    mt-2
                    "
                  >
                    {application.job?.location}
                  </p>
                </div>

                <StatusBadge status={application.status} />
              </div>

              <div
                className="
                grid
                md:grid-cols-3
                gap-6
                mt-8
                "
              >
                <Info
                  title="Bid Amount"
                  value={`NPR ${application.bidAmount}`}
                />

                <Info
                  title="Estimated Days"
                  value={`${application.estimatedDays} Days`}
                />

                <Info
                  title="Job Budget"
                  value={`NPR ${application.job?.budget}`}
                />
              </div>

              <div
                className="
                mt-8
                "
              >
                <h3
                  className="
                  font-bold
                  mb-3
                  "
                >
                  Proposal
                </h3>

                <p
                  className="
                  text-gray-600
                  leading-7
                  "
                >
                  {application.proposalText}
                </p>
              </div>

              <div
                className="
                flex
                justify-end
                mt-8
                "
              >
                <Link
                  to={`/worker/jobs/${application.job?._id}`}
                  className="
                    bg-primary
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    "
                >
                  View Job
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const Info = ({ title, value }) => (
  <div>
    <p
      className="
text-gray-500
text-sm
"
    >
      {title}
    </p>

    <p
      className="
font-semibold
text-lg
mt-1
"
    >
      {value}
    </p>
  </div>
);

export default MyApplications;
