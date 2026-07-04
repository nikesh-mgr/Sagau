import { useEffect } from "react";

import WorkerLayout from "../../components/layouts/WorkerLayout";

import useApplicationStore from "../../store/applicationStore";

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

const MyApplications = () => {
  const applications = useApplicationStore((state) => state.applications);

  const loading = useApplicationStore((state) => state.loading);

  const fetchMyApplications = useApplicationStore(
    (state) => state.fetchMyApplications,
  );

  useEffect(() => {
    fetchMyApplications();
  }, [fetchMyApplications]);

  if (loading) {
    return (
      <WorkerLayout>
        <h2 className="text-xl">Loading...</h2>
      </WorkerLayout>
    );
  }

  return (
    <WorkerLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">No Applications Yet</h2>

            <p className="text-gray-500 mt-2">
              Browse jobs and apply to get started.
            </p>
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
                      {application.job?.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {application.job?.description}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-1 rounded-full h-fit font-semibold ${
                      statusColor[application.status]
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
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

                  <div>
                    <p className="font-semibold">Job Budget</p>

                    <p>NPR {application.job?.budget}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-semibold mb-2">Proposal</p>

                  <p className="text-gray-700">{application.proposalText}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </WorkerLayout>
  );
};

export default MyApplications;
