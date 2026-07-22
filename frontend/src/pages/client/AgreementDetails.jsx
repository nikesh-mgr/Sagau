import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { motion } from "framer-motion";

import {
  getSingleAgreement,
  updateAgreementStatus,
} from "../../api/agreementApi";

import { getAgreementReviews } from "../../api/reviewApi";

import ReviewForm from "../../components/review/ReviewForm";

import { successToast, errorToast } from "../../utils/toast";

const AgreementDetails = () => {
  const { agreementId } = useParams();

  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    loadAgreement();
  }, []);

  const loadAgreement = async () => {
    try {
      const response = await getSingleAgreement(agreementId);

      setAgreement(response.data);

      const reviewResponse = await getAgreementReviews(agreementId);

      setHasReviewed(reviewResponse.data.length > 0);
    } catch (error) {
      console.log(error);
      errorToast("Failed to load agreement");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await updateAgreementStatus(agreementId);

      successToast("Work approved successfully");

      loadAgreement();
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to approve work");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700 border-green-200";

      case "COMPLETED":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="h-14 w-14 mx-auto rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
          <p className="mt-5 text-gray-500">Loading Agreement...</p>
        </div>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="p-10 text-center text-gray-500">Agreement not found.</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-5 justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Agreement Details
            </h1>

            <p className="mt-2 text-slate-500">
              Review worker progress and manage project completion.
            </p>
          </div>

          <span
            className={`h-fit px-5 py-2 rounded-full border font-semibold ${getStatusStyle(agreement.status)}`}
          >
            {agreement.status}
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
      >
        <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
              <FiBriefcase className="text-2xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {agreement.job?.title}
              </h2>

              <p className="mt-3 text-slate-600 leading-7">
                {agreement.job?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoCard
            icon={<FiUser />}
            title="Worker"
            value={agreement.worker?.fullName}
            extra={agreement.worker?.email}
          />

          <InfoCard
            icon={<FiBriefcase />}
            title="Job"
            value={agreement.job?.title}
          />

          <InfoCard
            icon={<FiDollarSign />}
            title="Accepted Amount"
            value={`NPR ${agreement.bidAmount || agreement.job?.budget}`}
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
        </div>

        <div className="px-6 sm:px-8 pb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-5">
            Completion Status
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            <CompletionCard
              title="Worker Confirmation"
              completed={agreement.workerCompleted}
            />

            <CompletionCard
              title="Client Confirmation"
              completed={agreement.clientCompleted}
            />
          </div>

          {agreement.status === "ACTIVE" &&
            agreement.workerCompleted &&
            !agreement.clientCompleted && (
              <button
                onClick={handleApprove}
                className="mt-8 flex items-center justify-center gap-3 w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg"
              >
                <FiCheckCircle />
                Approve Completion
              </button>
            )}

          {agreement.status === "ACTIVE" && !agreement.workerCompleted && (
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-yellow-50 border border-yellow-200 p-5 text-yellow-700">
              <FiClock className="text-xl" />
              Waiting for worker to complete the work.
            </div>
          )}
        </div>
      </motion.div>

      {agreement.status === "COMPLETED" &&
        (hasReviewed ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                <FiShield className="text-green-600 text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-bold">Review Submitted</h2>

                <p className="text-gray-500">
                  You already reviewed this worker.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ReviewForm agreementId={agreement._id} refresh={loadAgreement} />
        ))}
    </div>
  );
};

const InfoCard = ({ icon, title, value, extra }) => (
  <div className="rounded-2xl bg-slate-50 p-5 hover:bg-emerald-50 transition">
    <div className="flex items-center gap-3 text-slate-500">
      <span className="text-emerald-600 text-xl">{icon}</span>

      {title}
    </div>

    <p className="mt-3 font-bold text-slate-900">{value || "N/A"}</p>

    {extra && (
      <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
        <FiMail />
        {extra}
      </div>
    )}
  </div>
);

const CompletionCard = ({ title, completed }) => (
  <div
    className={`flex items-center justify-between rounded-2xl p-5 border ${completed ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"}`}
  >
    <div className="flex items-center gap-3">
      {completed ? (
        <FiCheckCircle className="text-green-600 text-xl" />
      ) : (
        <FiClock className="text-yellow-600 text-xl" />
      )}

      <span className="font-semibold text-slate-800">{title}</span>
    </div>

    <span
      className={`font-bold ${completed ? "text-green-600" : "text-yellow-600"}`}
    >
      {completed ? "Completed" : "Pending"}
    </span>
  </div>
);

export default AgreementDetails;
