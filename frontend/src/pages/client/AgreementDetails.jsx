import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiCircle,
  FiAward,
} from "react-icons/fi";

import {
  getSingleAgreement,
  updateAgreementStatus,
} from "../../api/agreementApi";

import { getAgreementReviews } from "../../api/reviewApi";

import ReviewForm from "../../components/review/ReviewForm";

import useAuthStore from "../../store/authStore";

import { successToast, errorToast } from "../../utils/toast";

const AgreementDetails = () => {
  const { agreementId } = useParams();

  const user = useAuthStore((state) => state.user);

  const [agreement, setAgreement] = useState(null);

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);
  const alreadyReviewed = reviews.some(
    (review) => review.reviewer?._id === user?._id,
  );
  useEffect(() => {
    loadAgreement();
    loadReviews();
  }, []);

  const loadAgreement = async () => {
    try {
      const res = await getSingleAgreement(agreementId);

      setAgreement(res.data);
    } catch (error) {
      errorToast(error?.response?.data?.message || "Failed to load agreement");
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const res = await getAgreementReviews(agreementId);

      setReviews(res.data || []);
    } catch {}
  };

  const approveAgreement = async () => {
    try {
      setActionLoading(true);

      await updateAgreementStatus(agreement._id);

      successToast("Agreement approved successfully");

      loadAgreement();
    } catch (error) {
      errorToast(
        error?.response?.data?.message || "Failed to update agreement",
      );
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Agreement not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-6">
      {" "}
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Agreement Details
            </h1>

            <p className="text-slate-500 mt-2">
              Track work progress and communicate with your worker.
            </p>
          </div>

          <span
            className={`px-5 py-3 h-fit rounded-full font-semibold text-sm ${
              agreement.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : agreement.status === "ACTIVE"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {agreement.status}
          </span>
        </div>
      </div>
      {/* Job */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <FiBriefcase className="text-emerald-600 text-xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{agreement.jobTitle}</h2>

            <p className="text-slate-500">Job Agreement</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiDollarSign />
              Budget
            </div>

            <h3 className="mt-3 text-2xl font-bold">
              NPR {agreement.agreedBudget}
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiClock />
              Estimated Time
            </div>

            <h3 className="mt-3 text-2xl font-bold">
              {agreement.estimatedDays} Days
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiCalendar />
              Started
            </div>

            <h3 className="mt-3 font-semibold">
              {new Date(agreement.startedAt).toLocaleDateString()}
            </h3>
          </div>
        </div>
      </div>
      {/* Client & Worker */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Client */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-5">Client Information</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-emerald-600" />

              <span>{agreement.client?.fullName}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-emerald-600" />

              <span>{agreement.client?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-emerald-600" />

              <span>{agreement.clientPhone || "Not Available"}</span>
            </div>
          </div>
        </div>

        {/* Worker */}

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-5">Worker Information</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-600" />

              <span>{agreement.worker?.fullName}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600" />

              <span>{agreement.worker?.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <FiPhone className="text-blue-600" />

              <span>{agreement.workerPhone || "Not Available"}</span>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Progress */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold mb-6">Work Progress</h2>

        <div className="space-y-5">
          {/* Worker */}

          <div className="flex justify-between items-center rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              {agreement.workerCompleted ? (
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="text-green-600 text-xl" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <FiCircle className="text-slate-500 text-xl" />
                </div>
              )}

              <div>
                <h3 className="font-semibold">Worker Submission</h3>

                <p className="text-slate-500 text-sm">
                  {agreement.workerCompleted
                    ? "The worker has marked the work as completed."
                    : "Waiting for the worker to complete the work."}
                </p>
              </div>
            </div>

            {agreement.workerCompleted ? (
              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                Completed
              </span>
            ) : (
              <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                Pending
              </span>
            )}
          </div>

          {/* Client */}

          <div className="flex justify-between items-center rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              {agreement.clientCompleted ? (
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheckCircle className="text-green-600 text-xl" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center">
                  <FiCircle className="text-slate-500 text-xl" />
                </div>
              )}

              <div>
                <h3 className="font-semibold">Client Approval</h3>

                <p className="text-slate-500 text-sm">
                  {agreement.clientCompleted
                    ? "You have approved this work."
                    : agreement.workerCompleted
                      ? "Please review and approve the completed work."
                      : "Approval will be available after the worker submits the work."}
                </p>
              </div>
            </div>

            {!agreement.clientCompleted &&
              agreement.workerCompleted &&
              agreement.status === "ACTIVE" && (
                <button
                  onClick={approveAgreement}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Approving..." : "Approve Completion"}
                </button>
              )}
          </div>
        </div>

        {agreement.status === "COMPLETED" && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-3xl text-green-600" />

              <div>
                <h3 className="font-bold text-green-700">
                  Agreement Completed
                </h3>

                <p className="text-green-600 mt-1">
                  Both the worker and the client have confirmed completion.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      {/* Review Section */}
      {agreement.status === "COMPLETED" && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Review & Rating</h2>

              <p className="text-slate-500 mt-1">
                Rate your experience with the worker.
              </p>
            </div>

            <div className="h-14 w-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FiAward className="text-yellow-600 text-2xl" />
            </div>
          </div>

          {/* Review Form */}
          {!alreadyReviewed ? (
            <ReviewForm
              agreementId={agreement._id}
              revieweeId={agreement.worker._id}
              onSuccess={() => {
                successToast("Review submitted successfully");
                loadReviews();
              }}
            />
          ) : (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-lg font-semibold text-green-700">
                Review Submitted
              </h3>

              <p className="mt-2 text-green-600">
                You have already reviewed this worker.
              </p>
            </div>
          )}
          {/* Existing Reviews */}

          {reviews.length > 0 && (
            <div className="space-y-5">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        {review.reviewer?.fullName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                      <FiAward />

                      <span className="font-bold">{review.rating}/5</span>
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-slate-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgreementDetails;
