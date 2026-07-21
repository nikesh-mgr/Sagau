import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiBriefcase,
} from "react-icons/fi";

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

      setApplications(response.data);

      setFilteredApplications(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let data = [...applications];

    if (search !== "") {
      data = data.filter((application) =>
        application.job.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "") {
      data = data.filter((application) => application.status === statusFilter);
    }

    setFilteredApplications(data);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
            Pending
          </span>
        );

      case "ACCEPTED":
        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            Accepted
          </span>
        );

      case "REJECTED":
        return (
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">
            Rejected
          </span>
        );

      default:
        return null;
    }
  };

  const stats = useMemo(() => {
    return {
      total: applications.length,
      pending: applications.filter(
        (application) => application.status === "PENDING",
      ).length,
      accepted: applications.filter(
        (application) => application.status === "ACCEPTED",
      ).length,
      rejected: applications.filter(
        (application) => application.status === "REJECTED",
      ).length,
    };
  }, [applications]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading Applications...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Applications</h1>

        <p className="text-gray-500 mt-2">
          Track all jobs you have applied for.
        </p>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Total</h3>

          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-yellow-600">Pending</h3>

          <p className="text-3xl font-bold mt-2">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-green-600">Accepted</h3>

          <p className="text-3xl font-bold mt-2">{stats.accepted}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-red-600">Rejected</h3>

          <p className="text-3xl font-bold mt-2">{stats.rejected}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Job..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 py-3 pr-4"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4"
          >
            <option value="">All Status</option>

            <option value="PENDING">Pending</option>

            <option value="ACCEPTED">Accepted</option>

            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>{" "}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <FiBriefcase size={60} className="mx-auto text-gray-300 mb-5" />

          <h2 className="text-2xl font-bold">No Applications Found</h2>

          <p className="text-gray-500 mt-3">
            You haven't applied for any jobs yet or no applications match your
            search.
          </p>

          <Link
            to="/worker/jobs"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApplications.map((application) => (
            <div
              key={application._id}
              className="bg-white rounded-xl shadow border border-gray-200 p-6"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {application.job?.title}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {application.job?.location}
                  </p>
                </div>

                {getStatusBadge(application.status)}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div>
                  <p className="text-gray-500 text-sm">Bid Amount</p>

                  <p className="font-semibold text-lg">
                    NPR {application.bidAmount}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Estimated Days</p>

                  <p className="font-semibold text-lg">
                    {application.estimatedDays} Days
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Job Budget</p>

                  <p className="font-semibold text-lg">
                    NPR {application.job?.budget}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-3">Proposal</h3>

                <p className="text-gray-600 leading-7 whitespace-pre-line">
                  {application.proposalText}
                </p>
              </div>

              <div className="flex justify-end mt-8">
                <Link
                  to={`/worker/jobs/${application.job?._id}`}
                  className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
                >
                  View Job
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}{" "}
    </div>
  );
};

export default MyApplications;
