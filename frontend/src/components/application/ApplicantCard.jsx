import { useState } from "react";

import {
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiStar,
  FiCheckCircle,
  FiXCircle,
  FiBriefcase,
  FiMail,
  FiAward,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import { updateApplicationStatus } from "../../api/applicationApi";

import { successToast, errorToast } from "../../utils/toast";

const ApplicantCard = ({ application, refresh }) => {
  const [loading, setLoading] = useState(false);

  const worker = application?.worker || {};

  const profile = application?.workerProfile || {};

  const job = application?.job || {};

  const isHired = application.status === "ACCEPTED";

  const updateStatus = async (status) => {
    if (loading) return;

    try {
      setLoading(true);

      await updateApplicationStatus(application._id, status);

      successToast(
        status === "ACCEPTED"
          ? "Worker hired successfully"
          : "Application rejected",
      );

      refresh();
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to update application status",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = () => {
    switch (application.status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-700 border-green-200";

      case "REJECTED":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const stats = [
    {
      title: "Bid Amount",
      value: `NPR ${application.bidAmount || 0}`,
      icon: <FiDollarSign />,
    },
    {
      title: "Delivery",
      value: `${application.estimatedDays || 0} Days`,
      icon: <FiClock />,
    },
    {
      title: "Rating",
      value: `${profile.rating || 0}/5`,
      icon: <FiStar />,
    },
    {
      title: "Experience",
      value: profile.experience || "N/A",
      icon: <FiAward />,
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-blue-50 p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-blue-600 text-3xl font-bold text-white shadow-lg">
              {worker.fullName?.charAt(0) || "W"}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {worker.fullName || "Unknown Worker"}
                </h2>

                {profile.isVerified && (
                  <FiShield className="text-emerald-600" />
                )}
              </div>

              {/* EMAIL */}

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <FiMail />

                {isHired ? (
                  <span>{worker.email}</span>
                ) : (
                  <span className="italic text-gray-400">
                    Email available after hiring
                  </span>
                )}
              </div>

              {/* LOCATION */}

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <FiMapPin />

                {isHired ? (
                  <span>{profile.location || "Location not added"}</span>
                ) : (
                  <span>
                    {profile.city ||
                      profile.location?.split(",")[0] ||
                      "Location"}
                  </span>
                )}
              </div>
            </div>
          </div>

          <span
            className={`rounded-full border px-5 py-2 text-sm font-semibold ${getStatusStyle()}`}
          >
            {application.status}
          </span>
        </div>
      </div>
      {/* ================= JOB ================= */}
      <div className="border-b border-slate-100 p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
            <FiBriefcase className="text-emerald-600" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">Applied Job</h3>

            <p className="text-sm text-slate-500">Project information</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <h4 className="text-lg font-bold text-slate-900">
            {job.title || "Untitled Job"}
          </h4>

          <div className="mt-3 flex items-center gap-2 text-slate-500">
            <FiMapPin />
            {job.location || "Location not available"}
          </div>
        </div>
      </div>{" "}
      {/* ================= WORKER OVERVIEW ================= */}
      <div className="border-b border-slate-100 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Worker Overview
            </h3>

            <p className="text-sm text-slate-500">Professional summary</p>
          </div>

          {profile.successRate && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-green-700">
              <FiTrendingUp />
              <span className="font-semibold">
                {profile.successRate}% Success
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-emerald-50"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="text-lg text-emerald-600">{item.icon}</span>

                {item.title}
              </div>

              <p className="mt-4 text-xl font-bold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* ================= SKILLS ================= */}
      <div className="border-b border-slate-100 p-6">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Skills</h3>

          <p className="text-sm text-slate-500">
            Skills provided by the worker
          </p>
        </div>

        {profile.skills?.length ? (
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="
                  rounded-full
                  bg-emerald-100
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-emerald-700
                "
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-50 p-6 text-center text-slate-500">
            No skills added
          </div>
        )}
      </div>
      {/* ================= PROPOSAL ================= */}
      <div className="border-b border-slate-100 p-6">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900">Worker Proposal</h3>

          <p className="text-sm text-slate-500">
            Why this worker is suitable for the job
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-slate-50
            p-6
            leading-8
            text-slate-700
          "
        >
          {application.proposalText ||
            "No proposal was submitted by the worker."}
        </div>
      </div>
      {/* ================= PRIVACY NOTICE ================= */}
      {!isHired && (
        <div className="mx-6 my-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <h4 className="font-semibold text-blue-700">Privacy Protection</h4>

          <p className="mt-2 text-sm leading-7 text-blue-600">
            Worker contact details such as email, phone number, and detailed
            address are protected until you hire this worker. This helps ensure
            communication and agreements stay within the Sagau platform.
          </p>
        </div>
      )}{" "}
      {/* ================= ACTIONS ================= */}
      {application.status === "PENDING" && (
        <div className="border-t border-slate-100 p-6">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
            <button
              disabled={loading}
              onClick={() => updateStatus("REJECTED")}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-300
                px-6
                py-3
                font-semibold
                text-red-600
                transition
                hover:bg-red-50
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FiXCircle />
              Reject Application
            </button>

            <button
              disabled={loading}
              onClick={() => updateStatus("ACCEPTED")}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-emerald-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-emerald-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <FiCheckCircle />

              {loading ? "Processing..." : "Hire Worker"}
            </button>
          </div>
        </div>
      )}
      {/* ================= ACCEPTED ================= */}
      {application.status === "ACCEPTED" && (
        <div className="border-t border-slate-100 p-6">
          <div
            className="
              rounded-2xl
              border
              border-green-200
              bg-green-50
              p-6
            "
          >
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <FiCheckCircle className="text-2xl text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-green-700">
                  Worker Hired Successfully
                </h3>

                <p className="mt-2 text-green-600 leading-7">
                  This applicant has been hired. An agreement has been created
                  and contact information is now available.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ================= REJECTED ================= */}
      {application.status === "REJECTED" && (
        <div className="border-t border-slate-100 p-6">
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-6
            "
          >
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-3">
                <FiXCircle className="text-2xl text-red-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-red-700">
                  Application Rejected
                </h3>

                <p className="mt-2 text-red-600 leading-7">
                  This application has been rejected. The worker has been
                  notified and can continue applying to other jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default ApplicantCard;
