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
  FiUser,
  FiMapPin,
  FiTrendingUp,
} from "react-icons/fi";

import { motion } from "framer-motion";

import { getMyAgreements } from "../../api/agreementApi";

import { errorToast } from "../../utils/toast";

const SERVER_URL = "http://localhost:5000";

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

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.job?.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.client?.fullName?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (status) {
      data = data.filter((item) => item.status === status);
    }

    return data;
  }, [agreements, search, status]);

  const stats = [
    {
      title: "Total Agreements",
      value: agreements.length,
      icon: <FiFileText />,
      color: "bg-blue-500",
    },

    {
      title: "Active",
      value: agreements.filter((x) => x.status === "ACTIVE").length,
      icon: <FiClock />,
      color: "bg-green-500",
    },

    {
      title: "Completed",
      value: agreements.filter((x) => x.status === "COMPLETED").length,
      icon: <FiCheckCircle />,
      color: "bg-emerald-500",
    },

    {
      title: "Cancelled",
      value: agreements.filter((x) => x.status === "CANCELLED").length,
      icon: <FiXCircle />,
      color: "bg-red-500",
    },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
          h-14
          w-14
          rounded-full
          border-4
          border-emerald-600
          border-t-transparent
          animate-spin
          mx-auto
          "
          />

          <p className="mt-5 text-gray-500">Loading agreements...</p>
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
      {/* HERO */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
rounded-3xl
bg-gradient-to-r
from-emerald-600
to-teal-700
p-8
text-white
shadow-xl
"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">My Agreements</h1>

            <p
              className="
mt-3
text-emerald-100
max-w-xl
"
            >
              Track your hired projects, agreements and work progress.
            </p>
          </div>

          <div
            className="
flex
items-center
gap-3
bg-white/20
px-5
py-3
rounded-2xl
"
          >
            <FiTrendingUp size={22} />

            <span className="font-semibold">{agreements.length} Projects</span>
          </div>
        </div>
      </motion.div>

      {/* STATS */}

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
            whileHover={{ y: -5 }}
            className="
bg-white
rounded-3xl
border
shadow-sm
p-6
"
          >
            <div
              className={`

h-12
w-12
rounded-2xl
${item.color}
text-white
flex
items-center
justify-center
text-xl

`}
            >
              {item.icon}
            </div>

            <h2
              className="
text-3xl
font-bold
mt-5
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

      {/* FILTER */}

      <div
        className="
bg-white
rounded-3xl
border
shadow-sm
p-6
"
      >
        <div
          className="
grid
md:grid-cols-3
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
              placeholder="Search job or client..."
              className="
w-full
rounded-xl
border
py-3
pl-11
pr-4
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
rounded-xl
border
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

          <button
            onClick={() => {
              setSearch("");

              setStatus("");
            }}
            className="
rounded-xl
border
hover:bg-gray-50
transition
"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* AGREEMENTS */}

      {filteredAgreements.length === 0 ? (
        <div
          className="
bg-white
rounded-3xl
border
shadow-sm
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
mt-2
text-gray-500
"
          >
            Accepted jobs will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAgreements.map((agreement) => (
            <motion.div
              key={agreement._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
bg-white
rounded-3xl
border
shadow-sm
p-6
hover:shadow-xl
transition
"
            >
              <div
                className="
flex
flex-col
md:flex-row
md:justify-between
gap-5
"
              >
                <div className="flex gap-4">
                  <div
                    className="
h-14
w-14
rounded-2xl
bg-emerald-100
flex
items-center
justify-center
overflow-hidden
"
                  >
                    {agreement.client?.profileImage ? (
                      <img
                        src={`${SERVER_URL}${agreement.client.profileImage}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiUser
                        className="
text-emerald-600
text-2xl
"
                      />
                    )}
                  </div>

                  <div>
                    <h2
                      className="
text-xl
font-bold
"
                    >
                      {agreement.job?.title}
                    </h2>

                    <p
                      className="
text-gray-500
mt-1
"
                    >
                      Client: {agreement.client?.fullName}
                    </p>
                  </div>
                </div>

                <span
                  className={`
px-4
py-2
rounded-full
font-semibold
h-fit
${statusStyle(agreement.status)}
`}
                >
                  {agreement.status}
                </span>
              </div>

              <div
                className="
grid
md:grid-cols-3
gap-5
mt-8
"
              >
                <div className="flex gap-3">
                  <FiDollarSign className="text-emerald-600" />

                  <div>
                    <p className="text-sm text-gray-500">Budget</p>

                    <p className="font-bold">NPR {agreement.job?.budget}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiCalendar className="text-emerald-600" />

                  <div>
                    <p className="text-sm text-gray-500">Started</p>

                    <p className="font-bold">
                      {agreement.startedAt
                        ? new Date(agreement.startedAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiBriefcase className="text-emerald-600" />

                  <div>
                    <p className="text-sm text-gray-500">Job Status</p>

                    <p className="font-bold">{agreement.job?.status}</p>
                  </div>
                </div>
              </div>

              <div
                className="
mt-8
flex
flex-col
sm:flex-row
justify-between
gap-5
"
              >
                <div className="flex gap-3 flex-wrap">
                  <span
                    className="
rounded-full
bg-gray-100
px-4
py-2
text-sm
"
                  >
                    Worker:
                    {agreement.workerCompleted ? "Done" : "Pending"}
                  </span>

                  <span
                    className="
rounded-full
bg-gray-100
px-4
py-2
text-sm
"
                  >
                    Client:
                    {agreement.clientCompleted ? "Done" : "Pending"}
                  </span>
                </div>

                <Link
                  to={`/worker/agreements/${agreement._id}`}
                  className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-emerald-600
px-6
py-3
text-white
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

export default Agreements;
