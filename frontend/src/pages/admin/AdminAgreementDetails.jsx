import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

import {
  getAgreementById,
  updateAgreementStatusByAdmin,
  deleteAgreementByAdmin,
} from "../../api/adminApi";

const statusColors = {
  ACTIVE: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const AdminAgreementDetails = () => {
  const { agreementId } = useParams();

  const navigate = useNavigate();

  const [agreement, setAgreement] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadAgreement = async () => {
    try {
      setLoading(true);

      const response = await getAgreementById(agreementId);

      console.log(response);

      setAgreement(response.data);
    } catch (error) {
      console.error(error);

      alert("Unable to load agreement.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgreement();
  }, [agreementId]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this agreement permanently?")) return;

    try {
      await deleteAgreementByAdmin(agreement._id);

      alert("Agreement deleted.");

      navigate("/admin/agreements");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Delete failed.");
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await updateAgreementStatusByAdmin(agreement._id, status);

      loadAgreement();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Status update failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Agreement...</h2>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">
          Agreement not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-100"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Agreement Details
            </h1>

            <p className="text-slate-500">Agreement ID : {agreement._id}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            statusColors[agreement.status]
          }`}
        >
          {agreement.status}
        </span>
      </div>
      {/* Client & Worker */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Client */}

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiUser className="text-emerald-600" size={24} />

            <h2 className="text-2xl font-bold">Client</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Name</p>

              <h3 className="text-lg font-semibold">
                {agreement.client?.fullName}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>

              <p>{agreement.client?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Worker */}

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
        >
          <div className="mb-6 flex items-center gap-3">
            <FiUser className="text-blue-600" size={24} />

            <h2 className="text-2xl font-bold">Worker</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Name</p>

              <h3 className="text-lg font-semibold">
                {agreement.worker?.fullName}
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>

              <p>{agreement.worker?.email}</p>
            </div>
          </div>
        </motion.div>
      </div>{" "}
      {/* ====================================== */}
      {/* Job Snapshot */}
      {/* ====================================== */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <div className="mb-8 flex items-center gap-3">
          <FiBriefcase className="text-emerald-600" size={24} />

          <h2 className="text-2xl font-bold">Job Snapshot</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-slate-500">Job Title</p>

            <p className="text-lg font-semibold">{agreement.jobTitle}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Category</p>

            <p className="text-lg font-semibold">{agreement.jobCategory}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Location</p>

            <div className="flex items-center gap-2">
              <FiMapPin className="text-emerald-600" />

              <span>{agreement.jobLocation || "-"}</span>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Budget</p>

            <div className="flex items-center gap-2">
              <FiDollarSign className="text-emerald-600" />

              <span className="font-bold text-emerald-600">
                NPR {agreement.agreedBudget}
              </span>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Estimated Days</p>

            <div className="flex items-center gap-2">
              <FiClock className="text-blue-600" />

              <span>{agreement.estimatedDays} Days</span>
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Status</p>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                statusColors[agreement.status]
              }`}
            >
              {agreement.status}
            </span>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-3 text-xl font-bold">Job Description</h3>

          <div className="rounded-2xl bg-slate-50 p-5 leading-8 text-slate-700">
            {agreement.jobDescription}
          </div>
        </div>
      </motion.div>
      {/* ====================================== */}
      {/* Proposal */}
      {/* ====================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-5 text-2xl font-bold">Accepted Proposal</h2>

        <div className="rounded-2xl bg-emerald-50 p-6 leading-8 text-slate-700">
          {agreement.proposalText}
        </div>
      </motion.div>
      {/* ====================================== */}
      {/* Agreement Information */}
      {/* ====================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 md:grid-cols-4"
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Started</p>

          <h3 className="mt-3 text-lg font-bold">
            {new Date(agreement.startedAt).toLocaleDateString()}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Created</p>

          <h3 className="mt-3 text-lg font-bold">
            {new Date(agreement.createdAt).toLocaleDateString()}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Updated</p>

          <h3 className="mt-3 text-lg font-bold">
            {new Date(agreement.updatedAt).toLocaleDateString()}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Completed</p>

          <h3 className="mt-3 text-lg font-bold">
            {agreement.completedAt
              ? new Date(agreement.completedAt).toLocaleDateString()
              : "-"}
          </h3>
        </div>
      </motion.div>{" "}
      {/* ====================================== */}
      {/* Completion Status */}
      {/* ====================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Worker Completion */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow">
          <div className="mb-5 flex items-center gap-3">
            <FiCheckCircle className="text-blue-600" size={22} />

            <h2 className="text-2xl font-bold">Worker Completion</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span>Status</span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  agreement.workerCompleted
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {agreement.workerCompleted ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Date</span>

              <span>
                {agreement.workerCompletedAt
                  ? new Date(agreement.workerCompletedAt).toLocaleString()
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Client Completion */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow">
          <div className="mb-5 flex items-center gap-3">
            <FiCheckCircle className="text-emerald-600" size={22} />

            <h2 className="text-2xl font-bold">Client Completion</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span>Status</span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  agreement.clientCompleted
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {agreement.clientCompleted ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Date</span>

              <span>
                {agreement.clientCompletedAt
                  ? new Date(agreement.clientCompletedAt).toLocaleString()
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* ====================================== */}
      {/* Admin Actions */}
      {/* ====================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-2xl font-bold">Admin Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleStatusChange("ACTIVE")}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Set Active
          </button>

          <button
            onClick={() => handleStatusChange("COMPLETED")}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Mark Completed
          </button>

          <button
            onClick={() => handleStatusChange("CANCELLED")}
            className="rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
          >
            Cancel Agreement
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
          >
            <FiTrash2 />
            Delete
          </button>

          <Link
            to="/admin/agreements"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
          >
            Back
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAgreementDetails;
