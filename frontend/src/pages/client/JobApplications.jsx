import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaBriefcase,
} from "react-icons/fa";

import ClientLayout from "../../components/layouts/ClientLayout";

import useApplicationStore from "../../store/applicationStore";

import { successToast, errorToast } from "../../utils/toast";

const badgeColors = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const JobApplications = () => {
  const { jobId } = useParams();

  const applications = useApplicationStore((state) => state.applications);

  const loading = useApplicationStore((state) => state.loading);

  const fetchJobApplications = useApplicationStore(
    (state) => state.fetchJobApplications,
  );

  const changeStatus = useApplicationStore((state) => state.changeStatus);

  useEffect(() => {
    fetchJobApplications(jobId);
  }, [jobId]);
  const handleStatus = async (applicationId, status) => {
    try {
      await changeStatus(applicationId, status);

      await fetchJobApplications(jobId);

      successToast(`Application ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error(error);

      errorToast(error?.response?.data?.message || "Operation failed");
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <div className="text-center py-20 text-xl font-semibold">
          Loading Applications...
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">Job Applications</h1>

            <p className="text-gray-500 mt-2">
              Review workers and hire the best one.
            </p>
          </div>

          <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-bold">
            {applications.length} Applicant(s)
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-16 text-center">
            <h2 className="text-2xl font-bold">No Applications Yet</h2>
          </div>
        ) : (
          <div className="space-y-8">
            {applications.map((application) => {
              const profile = application.workerProfile || {};

              return (
                <div
                  key={application._id}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <FaUser />

                        {application.worker?.fullName}
                      </h2>

                      <p className="text-gray-500 flex items-center gap-2 mt-2">
                        <FaEnvelope />

                        {application.worker?.email}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        badgeColors[application.status]
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 mt-8">
                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500">Bid Amount</p>

                      <p className="font-bold text-xl flex items-center gap-2 mt-2">
                        <FaMoneyBillWave />
                        NPR {application.bidAmount}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500">Completion</p>

                      <p className="font-bold text-xl flex items-center gap-2 mt-2">
                        <FaClock />
                        {application.estimatedDays} Days
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500">Rating</p>

                      <p className="font-bold text-xl flex items-center gap-2 mt-2 text-yellow-500">
                        <FaStar />

                        {profile.rating || 0}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="text-gray-500">Reviews</p>

                      <p className="font-bold text-xl mt-2">
                        {profile.totalReviews || 0}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-blue-50 rounded-xl p-5">
                      <p className="text-gray-500">Reputation Score</p>

                      <p className="text-2xl font-bold text-blue-700 mt-2">
                        {profile.reputationScore || 0}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-5">
                      <p className="text-gray-500">Experience</p>

                      <p className="font-semibold text-lg mt-2 flex items-center gap-2">
                        <FaBriefcase />

                        {profile.experience || "N/A"}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-5">
                      <p className="text-gray-500">Hourly Rate</p>

                      <p className="font-bold text-xl mt-2">
                        NPR {profile.hourlyRate || 0}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-bold mb-3">Skills</h3>

                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.length > 0 ? (
                        profile.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500">No skills added</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-bold mb-2">Proposal</h3>

                    <div className="bg-gray-50 rounded-xl p-5">
                      <p className="whitespace-pre-line leading-7 text-gray-700">
                        {application.proposalText}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    {profile._id && (
                      <Link
                        to={`/client/workers/${profile._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                      >
                        View Full Profile
                      </Link>
                    )}

                    {application.status === "PENDING" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatus(application._id, "ACCEPTED")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleStatus(application._id, "REJECTED")
                          }
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default JobApplications;
