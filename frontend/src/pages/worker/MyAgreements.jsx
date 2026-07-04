import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFileContract,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

import WorkerLayout from "../../components/layouts/WorkerLayout";

import useAgreementStore from "../../store/agreementStore";

const badgeColors = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const MyAgreements = () => {
  const agreements = useAgreementStore((state) => state.agreements);

  const loading = useAgreementStore((state) => state.loading);

  const fetchAgreements = useAgreementStore((state) => state.fetchAgreements);

  useEffect(() => {
    fetchAgreements();
  }, []);

  if (loading) {
    return (
      <WorkerLayout>
        <div className="text-center py-20 text-xl font-semibold">
          Loading Agreements...
        </div>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">My Agreements</h1>

            <p className="text-gray-500 mt-2">Jobs you've been hired for.</p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-bold">
            {agreements.length} Agreement(s)
          </div>
        </div>

        {agreements.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-16 text-center">
            <FaFileContract className="mx-auto text-6xl text-gray-300 mb-6" />

            <h2 className="text-2xl font-bold">No Agreements</h2>

            <p className="text-gray-500 mt-3">
              Accept a project to see agreements here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {agreements.map((agreement) => (
              <div
                key={agreement._id}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {agreement.job?.title}
                    </h2>

                    <p className="text-gray-500 mt-2 flex items-center gap-2">
                      <FaUser />
                      Client:
                      {agreement.client?.fullName}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${
                      badgeColors[agreement.status]
                    }`}
                  >
                    {agreement.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500">Budget</p>

                    <p className="font-bold text-xl mt-2 flex items-center gap-2">
                      <FaMoneyBillWave />
                      NPR {agreement.job?.budget}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500">Started</p>

                    <p className="font-semibold mt-2 flex items-center gap-2">
                      <FaCalendarAlt />

                      {new Date(agreement.startedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="text-gray-500">Job Status</p>

                    <p className="font-bold mt-2">{agreement.job?.status}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to={`/worker/agreements/${agreement._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
};

export default MyAgreements;
