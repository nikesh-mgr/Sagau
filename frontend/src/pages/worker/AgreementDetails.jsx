import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiUser,
  FiPhone,
  FiMail,
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

  useEffect(() => {
    loadAgreement();
    loadReviews();
  }, []);

  const loadAgreement = async () => {
    try {
      const res = await getSingleAgreement(agreementId);

      setAgreement(res.data);
    } catch (err) {
      errorToast(err?.response?.data?.message || "Failed to load agreement");
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

  const updateStatus = async () => {
    try {
      setActionLoading(true);

      await updateAgreementStatus(agreement._id);

      successToast("Agreement updated successfully");

      loadAgreement();
    } catch (err) {
      errorToast(err?.response?.data?.message || "Update failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading...
      </div>
    );
  }
  const isWorker = user?.role === "worker";
  const isClient = user?.role === "client";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Agreement Details
            </h1>

            <p className="text-slate-500 mt-2">
              View agreement progress and manage work completion.
            </p>
          </div>

          <div>
            <span
              className={`px-5 py-3 rounded-full font-semibold text-sm ${
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
      </div>
      {/* Job Information */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <FiBriefcase className="text-emerald-600 text-xl" />
          </div>

          <div>
            <h2 className="text-xl font-bold">{agreement.jobTitle}</h2>

            <p className="text-slate-500">Agreement Information</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiDollarSign />
              Budget
            </div>

            <p className="mt-3 text-2xl font-bold">
              NPR {agreement.agreedBudget}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiClock />
              Duration
            </div>

            <p className="mt-3 text-2xl font-bold">
              {agreement.estimatedDays} Days
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-500">
              <FiCalendar />
              Started
            </div>

            <p className="mt-3 text-lg font-semibold">
              {new Date(agreement.startedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {/* Participants */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Client */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-5">Client</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-emerald-600" />

              <span className="font-medium">{agreement.client?.fullName}</span>
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

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-xl font-bold mb-5">Worker</h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-600" />

              <span className="font-medium">{agreement.worker?.fullName}</span>
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
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">Agreement Progress</h2>

        <div className="space-y-5">
          {/* Worker */}

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
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
                <h3 className="font-semibold">Worker Completion</h3>

                <p className="text-sm text-slate-500">
                  {agreement.workerCompleted
                    ? "Worker has submitted the work."
                    : "Waiting for worker to submit work."}
                </p>
              </div>
            </div>

            {isWorker &&
              !agreement.workerCompleted &&
              agreement.status === "ACTIVE" && (
                <button
                  onClick={updateStatus}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Submitting..." : "Mark Work Completed"}
                </button>
              )}
          </div>

          {/* Client */}

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-5">
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

                <p className="text-sm text-slate-500">
                  {agreement.clientCompleted
                    ? "Client approved the work."
                    : agreement.workerCompleted
                      ? "Waiting for client approval."
                      : "Client can approve after worker submits."}
                </p>
              </div>
            </div>

            {isClient &&
              agreement.workerCompleted &&
              !agreement.clientCompleted &&
              agreement.status === "ACTIVE" && (
                <button
                  onClick={updateStatus}
                  disabled={actionLoading}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {actionLoading ? "Approving..." : "Approve Completion"}
                </button>
              )}
          </div>
        </div>

        {agreement.status === "COMPLETED" && (
          <div className="mt-6 rounded-2xl bg-green-50 border border-green-200 p-6">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-600 text-2xl" />

              <div>
                <h3 className="font-bold text-green-700">
                  Agreement Completed
                </h3>

                <p className="text-green-600">
                  Both worker and client have confirmed completion.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default AgreementDetails;
