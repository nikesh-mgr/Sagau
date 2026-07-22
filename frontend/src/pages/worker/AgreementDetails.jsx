import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
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

  const { user } = useAuthStore();

  const [agreement, setAgreement] = useState(null);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    loadAgreement();
  }, []);

  const loadAgreement = async () => {
    try {
      setLoading(true);

      const response = await getSingleAgreement(agreementId);

      const agreementData = response.data;

      setAgreement(agreementData);

      if (agreementData.status === "COMPLETED") {
        try {
          const reviewResponse = await getAgreementReviews(agreementId);

          setHasReviewed(reviewResponse.data.length > 0);
        } catch {
          setHasReviewed(false);
        }
      }
    } catch (error) {
      console.log(error);

      errorToast(error?.response?.data?.message || "Failed to load agreement");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (updating) return;

    try {
      setUpdating(true);

      const response = await updateAgreementStatus(agreementId);

      successToast(response.message);

      await loadAgreement();
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to update agreement",
      );
    } finally {
      setUpdating(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-700";

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
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>

          <p className="mt-4 text-gray-500">Loading Agreement...</p>
        </div>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="h-96 flex items-center justify-center">
        <h2 className="text-xl font-semibold">Agreement not found.</h2>
      </div>
    );
  }

  const isWorker = agreement.worker?._id === user?._id;

  const isClient = agreement.client?._id === user?._id;
  return (
    <div className="space-y-8">
      {/* =======================================
          HEADER
      ======================================== */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Agreement Details
          </h1>

          <p className="mt-2 text-slate-500">
            View the agreement progress and completion status.
          </p>
        </div>

        <div>
          <span
            className={`px-5 py-2 rounded-full font-semibold ${getStatusStyle(
              agreement.status,
            )}`}
          >
            {agreement.status}
          </span>
        </div>
      </div>
      {/* =======================================
          AGREEMENT INFORMATION
      ======================================== */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <InfoItem
            icon={<FiBriefcase />}
            title="Job"
            value={agreement.jobTitle}
          />

          <InfoItem
            icon={<FiDollarSign />}
            title="Budget"
            value={`NPR ${agreement.agreedBudget}`}
          />

          <InfoItem
            icon={<FiCalendar />}
            title="Estimated Time"
            value={`${agreement.estimatedDays} Days`}
          />

          <InfoItem
            icon={<FiClock />}
            title="Started"
            value={new Date(agreement.startedAt).toLocaleDateString()}
          />

          <InfoItem
            icon={<FiUser />}
            title="Client"
            value={agreement.client?.fullName}
          />

          <InfoItem
            icon={<FiUser />}
            title="Worker"
            value={agreement.worker?.fullName}
          />
        </div>
      </div>
      {/* =======================================
          PROPOSAL
      ======================================== */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <h2 className="text-xl font-bold mb-5">Accepted Proposal</h2>

        <div className="rounded-2xl bg-slate-50 p-6 leading-7 text-slate-600">
          {agreement.proposalText}
        </div>
      </div>
      {/* =======================================
          COMPLETION STATUS
      ======================================== */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
        <h2 className="text-xl font-bold mb-6">Completion Progress</h2>

        <div className="space-y-5">
          <StatusBox
            title="Worker Completed Work"
            completed={agreement.workerCompleted}
            date={agreement.workerCompletedAt}
          />

          <StatusBox
            title="Client Approved Work"
            completed={agreement.clientCompleted}
            date={agreement.clientCompletedAt}
          />
        </div>
      </div>
      {/* =======================================
          ACTION SECTION
      ======================================== */}
      {agreement.status === "ACTIVE" && (
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8">
          {isWorker ? (
            agreement.workerCompleted ? (
              <MessageBox>
                <div className="flex items-center gap-3">
                  <FiClock className="text-lg" />
                  Waiting for the client to approve your completed work.
                </div>
              </MessageBox>
            ) : (
              <button
                onClick={handleComplete}
                disabled={updating}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition disabled:opacity-50"
              >
                {updating ? "Submitting..." : "Mark Work as Completed"}
              </button>
            )
          ) : agreement.workerCompleted ? (
            agreement.clientCompleted ? (
              <MessageBox>
                <div className="flex items-center gap-3">
                  <FiCheckCircle className="text-lg" />
                  Agreement has been completed successfully.
                </div>
              </MessageBox>
            ) : (
              <button
                onClick={handleComplete}
                disabled={updating}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
              >
                {updating ? "Approving..." : "Approve Completion"}
              </button>
            )
          ) : (
            <MessageBox>
              <div className="flex items-center gap-3">
                <FiClock className="text-lg" />
                Waiting for the worker to mark this job as completed.
              </div>
            </MessageBox>
          )}
        </div>
      )}{" "}
      {/* =======================================
          REVIEW SECTION
      ======================================== */}
      {agreement.status === "COMPLETED" && !hasReviewed && isClient && (
        <ReviewForm
          agreementId={agreement._id}
          revieweeId={agreement.worker._id}
          onSuccess={() => {
            successToast("Review submitted successfully");
            setHasReviewed(true);
          }}
        />
      )}
      {agreement.status === "COMPLETED" && hasReviewed && (
        <MessageBox>
          <div className="flex items-center gap-3">
            <FiCheckCircle className="text-lg text-green-600" />

            <span>Review has already been submitted.</span>
          </div>
        </MessageBox>
      )}
    </div>
  );
};

/* =======================================
    SMALL COMPONENTS
======================================= */

const InfoItem = ({ icon, title, value }) => (
  <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5">
    <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
      {icon}
    </div>

    <div>
      <p className="text-sm text-slate-500">{title}</p>

      <div className="mt-1 font-semibold text-slate-900">{value}</div>
    </div>
  </div>
);

const StatusBox = ({ title, completed, date }) => (
  <div
    className={`rounded-2xl border p-5 ${
      completed
        ? "bg-green-50 border-green-200"
        : "bg-yellow-50 border-yellow-200"
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {completed ? (
          <FiCheckCircle className="text-green-600 text-xl" />
        ) : (
          <FiClock className="text-yellow-600 text-xl" />
        )}

        <div>
          <p className="font-semibold">{title}</p>

          <p className="text-sm text-slate-500">
            {completed ? "Completed" : "Pending"}
          </p>
        </div>
      </div>

      {completed && date && (
        <span className="text-sm text-slate-500">
          {new Date(date).toLocaleString()}
        </span>
      )}
    </div>
  </div>
);

const MessageBox = ({ children }) => (
  <div className="rounded-2xl bg-blue-50 border border-blue-200 p-5 text-blue-700 font-medium">
    {children}
  </div>
);

export default AgreementDetails;
