import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiFileText,
  FiEye,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

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

      setAgreements(response.data);
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
      <div className="h-96 flex justify-center items-center">
        Loading Agreements...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Agreements</h1>

        <p className="text-gray-500 mt-2">
          Manage your hired workers and active projects.
        </p>
      </div>

      {agreements.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <FiFileText size={60} className="mx-auto text-gray-300 mb-5" />

          <h2 className="text-2xl font-bold">No Agreements Yet</h2>

          <p className="text-gray-500 mt-3">
            Agreements appear after accepting a worker.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {agreements.map((agreement) => (
            <div
              key={agreement._id}
              className="bg-white rounded-2xl shadow border border-gray-200 p-6"
            >
              {/* Header */}

              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <FiBriefcase className="text-primary" />

                    <h2 className="text-xl font-bold">
                      {agreement.job?.title}
                    </h2>
                  </div>

                  <p className="text-gray-500 mt-2">
                    Worker: {agreement.worker?.fullName}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getStatusStyle(
                    agreement.status,
                  )}`}
                >
                  {agreement.status}
                </span>
              </div>

              {/* Details */}

              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="flex gap-3">
                  <FiUser className="text-primary" />

                  <div>
                    <p className="text-gray-500 text-sm">Worker</p>

                    <p className="font-semibold">
                      {agreement.worker?.fullName}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiDollarSign className="text-primary" />

                  <div>
                    <p className="text-gray-500 text-sm">Budget</p>

                    <p className="font-semibold">NPR {agreement.job?.budget}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiCalendar className="text-primary" />

                  <div>
                    <p className="text-gray-500 text-sm">Started</p>

                    <p className="font-semibold">
                      {new Date(agreement.startedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Job Status</p>

                  <p className="font-semibold">{agreement.job?.status}</p>
                </div>
              </div>

              {/* Completion */}

              <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-3">
                  <span
                    className={`px-4 py-2 rounded-full ${
                      agreement.workerCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Worker:{" "}
                    {agreement.workerCompleted ? "Completed" : "Pending"}
                  </span>

                  <span
                    className={`px-4 py-2 rounded-full ${
                      agreement.clientCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    Client:{" "}
                    {agreement.clientCompleted ? "Completed" : "Pending"}
                  </span>
                </div>

                <Link
                  to={`/client/agreements/${agreement._id}`}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
                >
                  <FiEye />
                  View Agreement
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Agreements;
