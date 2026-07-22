import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiFileText,
  FiEye,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getMyAgreements } from "../../api/agreementApi";

import { errorToast } from "../../utils/toast";

const Agreements = () => {
  const [agreements, setAgreements] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgreements();
  }, []);

  const loadAgreements = async () => {
    try {
      const response = await getMyAgreements();

      setAgreements(response.data || []);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load agreements");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

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
        <div className="text-center">
          <div
            className="
            h-14
            w-14
            mx-auto
            rounded-full
            border-4
            border-emerald-600
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
            Loading Agreements...
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
      px-4
      py-8
      sm:px-6
      lg:px-10
      space-y-8
      "
    >
      {/* HEADER */}

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
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-xl
        p-6
        sm:p-8
        "
      >
        <div
          className="
          flex
          items-center
          gap-5
          "
        >
          <div
            className="
            h-16
            w-16
            rounded-3xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            flex
            items-center
            justify-center
            text-white
            shadow-lg
            "
          >
            <FiFileText
              className="
              text-3xl
              "
            />
          </div>

          <div>
            <h1
              className="
              text-3xl
              sm:text-4xl
              font-bold
              text-slate-900
              "
            >
              My Agreements
            </h1>

            <p
              className="
              mt-2
              text-slate-500
              "
            >
              Manage hired workers and ongoing projects.
            </p>
          </div>
        </div>
      </motion.div>

      {agreements.length === 0 ? (
        <div
          className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          shadow-lg
          p-10
          sm:p-16
          text-center
          "
        >
          <div
            className="
            h-20
            w-20
            mx-auto
            rounded-full
            bg-slate-100
            flex
            items-center
            justify-center
            "
          >
            <FiFileText
              className="
              text-4xl
              text-slate-400
              "
            />
          </div>

          <h2
            className="
            mt-6
            text-2xl
            font-bold
            text-slate-900
            "
          >
            No Agreements Yet
          </h2>

          <p
            className="
            mt-3
            text-slate-500
            "
          >
            Agreements appear after accepting worker applications.
          </p>
        </div>
      ) : (
        <div
          className="
          space-y-6
          "
        >
          {agreements.map((agreement) => (
            <motion.div
              key={agreement._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -5,
              }}
              className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              shadow-lg
              hover:shadow-xl
              transition
              overflow-hidden
              "
            >
              <div
                className="
                p-6
                sm:p-8
                bg-gradient-to-r
                from-emerald-50
                to-white
                "
              >
                <div
                  className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-start
                  md:justify-between
                  gap-5
                  "
                >
                  <div>
                    <h2
                      className="
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-slate-900
                      "
                    >
                      {agreement.job?.title}
                    </h2>

                    <div
                      className="
                      flex
                      items-center
                      gap-2
                      mt-4
                      text-slate-500
                      "
                    >
                      <FiUser />
                      Worker:
                      <span
                        className="
                        font-semibold
                        text-slate-700
                        "
                      >
                        {agreement.worker?.fullName}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`
                    h-fit
                    px-5
                    py-2
                    rounded-full
                    border
                    font-semibold
                    ${getStatusStyle(agreement.status)}
                    `}
                  >
                    {agreement.status}
                  </span>
                </div>
              </div>

              <div
                className="
                p-6
                sm:p-8
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-5
                "
              >
                <InfoCard
                  icon={<FiUser />}
                  title="Worker"
                  value={agreement.worker?.fullName}
                />

                <InfoCard
                  icon={<FiDollarSign />}
                  title="Budget"
                  value={`NPR ${agreement.job?.budget || 0}`}
                />

                <InfoCard
                  icon={<FiCalendar />}
                  title="Started"
                  value={
                    agreement.startedAt
                      ? new Date(agreement.startedAt).toLocaleDateString()
                      : "Not started"
                  }
                />

                <InfoCard
                  icon={<FiBriefcase />}
                  title="Job Status"
                  value={agreement.job?.status}
                />
              </div>

              <div
                className="
                px-6
                sm:px-8
                pb-8
                "
              >
                <h3
                  className="
                  text-lg
                  font-bold
                  text-slate-900
                  mb-4
                  "
                >
                  Completion Progress
                </h3>

                <div
                  className="
                  grid
                  sm:grid-cols-2
                  gap-4
                  "
                >
                  <StatusBadge
                    completed={agreement.workerCompleted}
                    label="Worker"
                  />

                  <StatusBadge
                    completed={agreement.clientCompleted}
                    label="Client"
                  />
                </div>

                <Link
                  to={`/client/agreements/${agreement._id}`}
                  className="
                  mt-6
                  w-full
                  sm:w-fit
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-emerald-600
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-emerald-700
                  transition
                  "
                >
                  <FiEye />
                  View Agreement
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div
    className="
    rounded-2xl
    bg-slate-50
    p-5
    hover:bg-emerald-50
    transition
    "
  >
    <div
      className="
      flex
      items-center
      gap-2
      text-slate-500
      "
    >
      <span
        className="
        text-emerald-600
        "
      >
        {icon}
      </span>

      {title}
    </div>

    <p
      className="
      mt-3
      font-bold
      text-slate-900
      "
    >
      {value || "N/A"}
    </p>
  </div>
);

const StatusBadge = ({ completed, label }) => (
  <div
    className={`
    flex
    items-center
    gap-3
    rounded-2xl
    p-4
    border
    ${
      completed
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "bg-yellow-50 border-yellow-200 text-yellow-700"
    }
    `}
  >
    {completed ? <FiCheckCircle /> : <FiClock />}

    <span
      className="
      font-semibold
      "
    >
      {label}: {completed ? "Completed" : "Pending"}
    </span>
  </div>
);

export default Agreements;
