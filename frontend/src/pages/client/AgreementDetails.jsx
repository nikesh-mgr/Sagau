import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

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
        Loading Agreement...
      </div>
    );
  }

  if (!agreement) {
    return <div className="p-10">Agreement not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Agreement Details</h1>

        <p className="text-gray-500 mt-2">
          Review worker progress and manage completion.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-8">
        {/* Header */}

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{agreement.job?.title}</h2>

            <p className="text-gray-500 mt-2">{agreement.job?.description}</p>
          </div>

          <span
            className={`px-4 py-2 rounded-full font-semibold ${getStatusStyle(
              agreement.status,
            )}`}
          >
            {agreement.status}
          </span>
        </div>

        {/* Information */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="flex gap-4">
            <FiUser size={24} />

            <div>
              <p className="text-gray-500">Worker</p>

              <p className="font-semibold">{agreement.worker?.fullName}</p>

              <p>{agreement.worker?.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiBriefcase size={24} />

            <div>
              <p className="text-gray-500">Job</p>

              <p className="font-semibold">{agreement.job?.title}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiDollarSign size={24} />

            <div>
              <p className="text-gray-500">Accepted Amount</p>

              <p className="font-semibold">
                NPR {agreement.bidAmount || agreement.job?.budget}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiCalendar size={24} />

            <div>
              <p className="text-gray-500">Started</p>

              <p className="font-semibold">
                {new Date(agreement.startedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Completion Status */}

        <div className="mt-10 space-y-4">
          <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
            <span>Worker Confirmation</span>

            <span
              className={
                agreement.workerCompleted
                  ? "text-green-600 font-semibold"
                  : "text-orange-600 font-semibold"
              }
            >
              {agreement.workerCompleted ? "Completed" : "Pending"}
            </span>
          </div>

          <div className="flex justify-between bg-gray-50 p-4 rounded-lg">
            <span>Client Confirmation</span>

            <span
              className={
                agreement.clientCompleted
                  ? "text-green-600 font-semibold"
                  : "text-orange-600 font-semibold"
              }
            >
              {agreement.clientCompleted ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        {/* Approve Button */}

        {agreement.status === "ACTIVE" &&
          agreement.workerCompleted &&
          !agreement.clientCompleted && (
            <button
              onClick={handleApprove}
              className="mt-8 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              <FiCheckCircle />
              Approve Completion
            </button>
          )}

        {agreement.status === "ACTIVE" && !agreement.workerCompleted && (
          <div className="mt-8 bg-yellow-100 text-yellow-700 p-4 rounded-xl">
            Waiting for worker to complete the work.
          </div>
        )}
      </div>

      {agreement.status === "COMPLETED" &&
        (hasReviewed ? (
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-bold">Review Submitted</h2>

            <p className="text-gray-500 mt-2">
              You already reviewed this worker.
            </p>
          </div>
        ) : (
          <ReviewForm agreementId={agreement._id} refresh={loadAgreement} />
        ))}
    </div>
  );
};

export default AgreementDetails;
