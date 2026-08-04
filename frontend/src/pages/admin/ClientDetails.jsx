import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  FiArrowLeft,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiTrash2,
} from "react-icons/fi";

import {
  getClientById,
  toggleClientStatus,
  deleteClient,
} from "../../api/adminApi";
const ClientDetails = () => {
  const { clientId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [client, setClient] = useState(null);
  const [jobsPosted, setJobsPosted] = useState(0);

  const [completedJobs, setCompletedJobs] = useState(0);

  const [reviews, setReviews] = useState([]);
  const loadClient = async () => {
    try {
      setLoading(true);
      const response = await getClientById(clientId);

      console.log(response.data);

      setClient(response.data.client);

      setJobsPosted(response.data.jobsPosted);

      setCompletedJobs(response.data.completedJobs);

      setReviews(response.data.reviews);
    } catch (error) {
      console.error(error);

      alert("Unable to load client.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClient();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold">Loading Client...</h2>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Client not found</h2>
      </div>
    );
  }
  /* ====================================== */
  /* Block / Unblock */
  /* ====================================== */

  const handleToggleStatus = async () => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        client.user.isActive ? "block" : "unblock"
      } this client?`,
    );

    if (!confirmAction) return;

    try {
      await toggleClientStatus(client.user._id);

      await loadClient();

      alert(
        `Client ${
          client.user.isActive ? "blocked" : "unblocked"
        } successfully.`,
      );
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Action failed.");
    }
  };

  /* ====================================== */
  /* Delete Client */
  /* ====================================== */

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete this client. Continue?",
    );

    if (!confirmDelete) return;

    try {
      await deleteClient(client.user._id);

      alert("Client deleted successfully.");

      navigate("/admin/clients");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Delete failed.");
    }
  };
  return (
    <div className="space-y-8">
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-100"
          >
            <FiArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Client Details
            </h1>

            <p className="text-slate-500">View client profile information</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleToggleStatus}
            className={`rounded-xl px-5 py-3 font-semibold text-white transition ${
              client.user.isActive
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {client.user.isActive ? "Block" : "Unblock"}
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>

      {/* ====================================== */}
      {/* Profile Card */}
      {/* ====================================== */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row">
          <img
            src={
              client.profileImage
                ? `http://localhost:5000/uploads/${client.profileImage}`
                : "https://placehold.co/220x220?text=Client"
            }
            alt={client.user.fullName}
            className="h-52 w-52 rounded-3xl border object-cover shadow-lg"
          />

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <FiUser className="text-emerald-600" size={22} />

              <h2 className="text-3xl font-bold">{client.user.fullName}</h2>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FiMail />

              {client.user.email}
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FiPhone />

              {client.phone || "Not Provided"}
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FiMapPin />

              {client.address || "Not Provided"}
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FiCalendar />
              Joined {new Date(client.user.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-3">
              <FiShield className="text-emerald-600" />

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  client.user.isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {client.user.isActive ? "Active" : "Blocked"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ====================================== */}
      {/* Client Information */}
      {/* ====================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-2xl font-bold">Client Information</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-1 text-sm text-slate-500">Full Name</p>

            <p className="text-lg font-semibold">{client.user.fullName}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Email</p>

            <p className="text-lg font-semibold">{client.user.email}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Phone</p>

            <p className="text-lg font-semibold">{client.phone || "-"}</p>
          </div>

          <div>
            <p className="mb-1 text-sm text-slate-500">Address</p>

            <p className="text-lg font-semibold">{client.address || "-"}</p>
          </div>
        </div>
      </motion.div>
      {/* ====================================== */}
      {/* Statistics */}
      {/* ====================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid gap-6 md:grid-cols-3"
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Role</p>

          <h3 className="mt-2 text-2xl font-bold capitalize">
            {client.user.role}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Status</p>

          <h3
            className={`mt-2 text-2xl font-bold ${
              client.user.isActive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {client.user.isActive ? "Active" : "Blocked"}
          </h3>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Member Since</p>

          <h3 className="mt-2 text-2xl font-bold">
            {new Date(client.user.createdAt).toLocaleDateString()}
          </h3>
        </div>
      </motion.div>

      {/* ====================================== */}
      {/* Bottom Actions */}
      {/* ====================================== */}

      <div className="sticky bottom-0 flex justify-end gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <button
          onClick={() => navigate("/admin/clients")}
          className="rounded-xl border border-slate-300 px-8 py-3 font-semibold hover:bg-slate-100"
        >
          Back to Clients
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;
