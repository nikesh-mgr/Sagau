import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaFileContract,
  FaUserTie,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

import useAgreementStore from "../../store/agreementStore";
import useAuthStore from "../../store/authStore";

import ClientLayout from "../../components/layouts/ClientLayout";
import WorkerLayout from "../../components/layouts/WorkerLayout";

import { successToast, errorToast } from "../../utils/toast";

const badgeColors = {
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const AgreementDetails = () => {
  const { agreementId } = useParams();

  const currentAgreement = useAgreementStore((state) => state.currentAgreement);

  const loading = useAgreementStore((state) => state.loading);

  const fetchAgreement = useAgreementStore((state) => state.fetchAgreement);

  const changeAgreementStatus = useAgreementStore(
    (state) => state.changeAgreementStatus,
  );

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    fetchAgreement(agreementId);
  }, [agreementId]);

  const handleStatus = async (status) => {
    try {
      await changeAgreementStatus(agreementId, status);

      await fetchAgreement(agreementId);

      successToast(`Agreement ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Unable to update agreement");
    }
  };

  if (loading || !currentAgreement) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  const Layout = user?.role === "client" ? ClientLayout : WorkerLayout;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FaFileContract />

                {currentAgreement.job?.title}
              </h1>

              <p className="text-gray-500 mt-2">Agreement Details</p>
            </div>

            <span
              className={`px-4 py-2 rounded-full font-semibold ${
                badgeColors[currentAgreement.status]
              }`}
            >
              {currentAgreement.status}
            </span>
          </div>

          {/* Participants */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Client</h2>

              <p className="flex items-center gap-3">
                <FaUser />

                {currentAgreement.client?.fullName}
              </p>

              <p className="mt-3 text-gray-600">
                {currentAgreement.client?.email}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="font-bold text-lg mb-4">Worker</h2>

              <p className="flex items-center gap-3">
                <FaUserTie />

                {currentAgreement.worker?.fullName}
              </p>

              <p className="mt-3 text-gray-600">
                {currentAgreement.worker?.email}
              </p>
            </div>
          </div>

          {/* Agreement Info */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-gray-500">Budget</p>

              <p className="font-bold text-2xl mt-2 flex items-center gap-2">
                <FaMoneyBillWave />
                NPR {currentAgreement.job?.budget}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-gray-500">Started</p>

              <p className="font-bold mt-2 flex items-center gap-2">
                <FaCalendarAlt />

                {new Date(currentAgreement.startedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-gray-500">Job Status</p>

              <p className="font-bold mt-2">{currentAgreement.job?.status}</p>
            </div>
          </div>

          {/* Client Actions */}

          {user?.role === "client" && currentAgreement.status === "ACTIVE" && (
            <div className="flex gap-4 mt-10">
              <button
                onClick={() => handleStatus("COMPLETED")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                Mark Completed
              </button>

              <button
                onClick={() => handleStatus("CANCELLED")}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >
                Cancel Agreement
              </button>
            </div>
          )}

          {/* Review Section */}

          {currentAgreement.status === "COMPLETED" && (
            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold mb-3">Project Completed</h2>

              <p className="text-gray-600 mb-6">
                Share your experience by leaving a review.
              </p>

              <Link
                to={`/review/${currentAgreement._id}`}
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Leave Review
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgreementDetails;
