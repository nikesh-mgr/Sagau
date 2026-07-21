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
      setLoading(true);

      const response = await getSingleAgreement(agreementId);

      setAgreement(response.data);

      if (response.data.status === "COMPLETED") {
        try {
          const reviewResponse = await getAgreementReviews(agreementId);

          setHasReviewed(reviewResponse.data.length > 0);
        } catch {
          setHasReviewed(false);
        }
      }
    } catch (error) {
      console.log(error);

      errorToast("Failed to load agreement");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await updateAgreementStatus(agreementId);

      successToast("Agreement updated successfully");

      loadAgreement();
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to update agreement",
      );
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
    return (
      <div className="h-96 flex justify-center items-center">
        Agreement not found.
      </div>
    );
  }

  const isWorker =
    agreement.worker?._id === agreement.currentUser ||
    agreement.worker?.id === agreement.currentUser;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Agreement Details</h1>

        <p className="text-gray-500 mt-2">Track and manage your agreement.</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-8">
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

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="flex gap-4">
            <FiUser size={24} />

            <div>
              <p className="text-gray-500">Client</p>

              <p className="font-semibold">{agreement.client?.fullName}</p>

              <p>{agreement.client?.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiBriefcase size={24} />

            <div>
              <p className="text-gray-500">Worker</p>

              <p className="font-semibold">{agreement.worker?.fullName}</p>

              <p>{agreement.worker?.email}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <FiDollarSign size={24} />

            <div>
              <p className="text-gray-500">Budget</p>

              <p className="font-semibold">NPR {agreement.job?.budget}</p>
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

        <div className="mt-10 space-y-4">
          <div className="flex justify-between bg-gray-50 rounded-lg p-4">
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

          <div className="flex justify-between bg-gray-50 rounded-lg p-4">
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

        {agreement.status === "ACTIVE" && (
          <div className="mt-8">
            {isWorker ? (
              agreement.workerCompleted ? (
                <div className="bg-blue-100 border border-blue-300 rounded-xl p-5">
                  <h3 className="font-bold text-blue-700">
                    Waiting for Client
                  </h3>

                  <p className="text-blue-600 mt-2">
                    You have marked this work as completed. Waiting for the
                    client to approve.
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-emerald-700"
                >
                  <FiCheckCircle />
                  Mark Work Completed
                </button>
              )
            ) : agreement.workerCompleted ? (
              agreement.clientCompleted ? (
                <div className="bg-green-100 border border-green-300 rounded-xl p-5">
                  Agreement Completed
                </div>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
                >
                  <FiCheckCircle />
                  Approve Completion
                </button>
              )
            ) : (
              <div className="bg-yellow-100 border border-yellow-300 rounded-xl p-5">
                Waiting for worker to complete the work.
              </div>
            )}
          </div>
        )}
      </div>

      {agreement.status === "COMPLETED" &&
        (!hasReviewed ? (
          <ReviewForm agreementId={agreement._id} refresh={loadAgreement} />
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold">Review Submitted</h2>

            <p className="text-gray-500 mt-2">
              You have already reviewed this agreement.
            </p>
          </div>
        ))}
    </div>
  );
};

export default AgreementDetails;
