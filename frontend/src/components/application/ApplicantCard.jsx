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
  FiUser,
} from "react-icons/fi";

import { updateApplicationStatus } from "../../api/applicationApi";

import { successToast, errorToast } from "../../utils/toast";

const ApplicantCard = ({ application, refresh }) => {
  const [loading, setLoading] = useState(false);

  const worker = application.worker;

  const profile = application.workerProfile || {};

  const job = application.job || {};

  const updateStatus = async (status) => {
    try {
      setLoading(true);

      await updateApplicationStatus(application._id, status);

      successToast(`Application ${status.toLowerCase()}`);

      refresh();
    } catch (error) {
      console.log(error);

      errorToast(
        error?.response?.data?.message || "Failed to update application",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition">
      {/* Header */}

      <div className="p-6 bg-gradient-to-r from-emerald-50 to-white">
        <div className="flex justify-between items-start gap-5">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
              {worker?.fullName?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {worker?.fullName}
              </h2>

              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <FiMail size={14} />
                {worker?.email}
              </div>

              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <FiMapPin size={14} />
                {profile.location || "Location not added"}
              </div>
            </div>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              application.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : application.status === "ACCEPTED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {application.status}
          </span>
        </div>
      </div>

      {/* Applied Job */}

      <div className="p-6 border-b">
        <div className="flex items-center gap-3 mb-4">
          <FiBriefcase className="text-primary" />

          <h3 className="font-bold text-lg">Applied For</h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold">{job.title}</h4>

          <p className="text-gray-500 text-sm mt-1">{job.location}</p>
        </div>
      </div>

      {/* Worker Stats */}

      <div className="p-6 grid md:grid-cols-4 gap-5">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <FiDollarSign />
            Bid
          </div>

          <p className="font-bold text-lg mt-2">NPR {application.bidAmount}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <FiClock />
            Delivery
          </div>

          <p className="font-bold text-lg mt-2">
            {application.estimatedDays} Days
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <FiStar />
            Rating
          </div>

          <p className="font-bold text-lg mt-2">{profile.rating || 0}/5</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <FiUser />
            Experience
          </div>

          <p className="font-bold text-lg mt-2">
            {profile.experience || "N/A"}
          </p>
        </div>
      </div>

      {/* Skills */}

      <div className="px-6">
        <h3 className="font-bold mb-3">Skills</h3>

        <div className="flex flex-wrap gap-2">
          {profile.skills?.length > 0 ? (
            profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No skills added</span>
          )}
        </div>
      </div>

      {/* Proposal */}

      <div className="p-6">
        <h3 className="font-bold mb-3">Worker Proposal</h3>

        <div className="bg-gray-50 rounded-xl p-4 text-gray-600 leading-7">
          {application.proposalText || "No proposal provided"}
        </div>
      </div>

      {/* Actions */}

      {application.status === "PENDING" && (
        <div className="p-6 border-t flex justify-end gap-4">
          <button
            disabled={loading}
            onClick={() => updateStatus("REJECTED")}
            className="
            flex items-center gap-2
            px-6 py-3 rounded-xl
            border border-red-300
            text-red-600
            hover:bg-red-50
            transition
            "
          >
            <FiXCircle />
            Reject
          </button>

          <button
            disabled={loading}
            onClick={() => updateStatus("ACCEPTED")}
            className="
            flex items-center gap-2
            px-6 py-3 rounded-xl
            bg-primary
            text-white
            hover:bg-emerald-700
            transition
            "
          >
            <FiCheckCircle />
            Accept Worker
          </button>
        </div>
      )}

      {application.status === "ACCEPTED" && (
        <div className="p-6 border-t">
          <div className="bg-green-50 text-green-700 rounded-xl p-4 flex items-center gap-3">
            <FiCheckCircle />
            Worker hired. Agreement created.
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
