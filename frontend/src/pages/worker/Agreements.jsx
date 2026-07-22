import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiFileText,
  FiEye,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getMyAgreements } from "../../api/agreementApi";

import { errorToast } from "../../utils/toast";

const Agreements = () => {
  const [agreements, setAgreements] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

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

  const filteredAgreements = useMemo(() => {
    let data = [...agreements];

    if (search) {
      data = data.filter(
        (agreement) =>
          agreement.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
          agreement.client?.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (status) {
      data = data.filter((agreement) => agreement.status === status);
    }

    return data;
  }, [agreements, search, status]);

  const stats = [
    {
      title: "Total",
      value: agreements.length,
      icon: <FiFileText />,
      color: "text-blue-600",
    },

    {
      title: "Active",
      value: agreements.filter((item) => item.status === "ACTIVE").length,
      icon: <FiClock />,
      color: "text-green-600",
    },

    {
      title: "Completed",
      value: agreements.filter((item) => item.status === "COMPLETED").length,
      icon: <FiCheckCircle />,
      color: "text-emerald-600",
    },

    {
      title: "Cancelled",
      value: agreements.filter((item) => item.status === "CANCELLED").length,
      icon: <FiXCircle />,
      color: "text-red-600",
    },
  ];

  const statusStyle = (status) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-700";

    if (status === "COMPLETED") return "bg-blue-100 text-blue-700";

    if (status === "CANCELLED") return "bg-red-100 text-red-700";

    return "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div
        className="
      h-96
      flex
      justify-center
      items-center
      "
      >
        Loading Agreements...
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
p-6
space-y-8
"
    >
      {/* Header */}

      <div>
        <h1
          className="
text-3xl
font-bold
"
        >
          My Agreements
        </h1>

        <p
          className="
text-gray-500
mt-2
"
        >
          Manage accepted jobs and work progress.
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
        {stats.map((item, index) => (
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
              className={`
text-3xl
${item.color}
`}
            >
              {item.icon}
            </div>

            <h2
              className="
text-3xl
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

      {/* Search Filter */}

      <div
        className="
bg-white
rounded-3xl
shadow
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
          <div
            className="
relative
"
          >
            <FiSearch
              className="
absolute
left-4
top-4
text-gray-400
"
            />

            <input
              placeholder="
Search job or client...
"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
w-full
border
rounded-xl
pl-11
py-3
outline-none
focus:ring-2
focus:ring-emerald-500
"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
border
rounded-xl
px-4
py-3
outline-none
"
          >
            <option value="">All Status</option>

            <option value="ACTIVE">Active</option>

            <option value="COMPLETED">Completed</option>

            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {filteredAgreements.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
shadow
p-12
text-center
"
        >
          <FiFileText
            size={60}
            className="
mx-auto
text-gray-300
"
          />

          <h2
            className="
text-2xl
font-bold
mt-5
"
          >
            No Agreements Found
          </h2>

          <p
            className="
text-gray-500
mt-2
"
          >
            Accepted jobs will appear here.
          </p>
        </div>
      ) : (
        <div
          className="
space-y-6
"
        >
          {filteredAgreements.map((agreement) => (
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
              className="
bg-white
rounded-3xl
shadow-lg
border
p-6
"
            >
              {/* Header */}

              <div
                className="
flex
justify-between
flex-wrap
gap-5
"
              >
                <div>
                  <div
                    className="
flex
items-center
gap-3
"
                  >
                    <FiBriefcase
                      className="
text-emerald-600
"
                    />

                    <h2
                      className="
text-xl
font-bold
"
                    >
                      {agreement.job?.title}
                    </h2>
                  </div>

                  <p
                    className="
text-gray-500
mt-2
"
                  >
                    Client:
                    {agreement.client?.fullName}
                  </p>
                </div>

                <span
                  className={`
px-4
py-2
rounded-full
font-semibold
${statusStyle(agreement.status)}
`}
                >
                  {agreement.status}
                </span>
              </div>

              {/* Information */}

              <div
                className="
grid
md:grid-cols-3
gap-6
mt-8
"
              >
                <div
                  className="
flex
gap-3
"
                >
                  <FiDollarSign
                    className="
text-emerald-600
"
                  />

                  <div>
                    <p
                      className="
text-gray-500
text-sm
"
                    >
                      Budget
                    </p>

                    <p
                      className="
font-semibold
"
                    >
                      NPR {agreement.job?.budget}
                    </p>
                  </div>
                </div>

                <div
                  className="
flex
gap-3
"
                >
                  <FiCalendar
                    className="
text-emerald-600
"
                  />

                  <div>
                    <p
                      className="
text-gray-500
text-sm
"
                    >
                      Started
                    </p>

                    <p
                      className="
font-semibold
"
                    >
                      {new Date(agreement.startedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className="
text-gray-500
text-sm
"
                  >
                    Job Status
                  </p>

                  <p
                    className="
font-semibold
"
                  >
                    {agreement.job?.status}
                  </p>
                </div>
              </div>

              {/* Completion */}

              <div
                className="
mt-8
flex
justify-between
items-center
flex-wrap
gap-4
"
              >
                <div
                  className="
flex
gap-3
"
                >
                  <span
                    className={`
px-4
py-2
rounded-full
${
  agreement.workerCompleted
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700"
}
`}
                  >
                    Worker:
                    {agreement.workerCompleted ? "Completed" : "Pending"}
                  </span>

                  <span
                    className={`
px-4
py-2
rounded-full
${
  agreement.clientCompleted
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700"
}
`}
                  >
                    Client:
                    {agreement.clientCompleted ? "Completed" : "Pending"}
                  </span>
                </div>

                <Link
                  to={`/worker/agreements/${agreement._id}`}
                  className="
flex
items-center
gap-2
bg-emerald-600
text-white
px-6
py-3
rounded-xl
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

export default Agreements;
