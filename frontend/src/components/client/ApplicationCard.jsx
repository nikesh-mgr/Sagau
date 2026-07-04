import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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

      successToast(`Application ${status.toLowerCase()}`);
    } catch (error) {
      console.error(error);

      errorToast(error.response?.data?.message || "Operation failed");
    }
  };

  if (loading) {
    return (
      <ClientLayout>
        <h2>Loading...</h2>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">No Applications Yet</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow p-6"
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {application.worker?.fullName}
                    </h2>

                    <p className="text-gray-500">{application.worker?.email}</p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full h-fit font-semibold ${
                      badgeColors[application.status]
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <p className="font-semibold">Bid Amount</p>

                    <p>NPR {application.bidAmount}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Estimated Days</p>

                    <p>{application.estimatedDays} Days</p>
                  </div>

                  <div>
                    <p className="font-semibold">Applied On</p>

                    <p>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-semibold mb-2">Proposal</p>

                  <p className="text-gray-700 whitespace-pre-line">
                    {application.proposalText}
                  </p>
                </div>

                {application.status === "PENDING" && (
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={() => handleStatus(application._id, "ACCEPTED")}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => handleStatus(application._id, "REJECTED")}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      Reject
                    </button>
                    <Link
                      to={`/client/workers/${application.worker._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      View Worker
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
};

export default JobApplications;
