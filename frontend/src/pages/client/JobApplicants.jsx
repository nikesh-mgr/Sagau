import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ApplicantCard from "../../components/application/ApplicantCard";

import { getJobApplications } from "../../api/applicationApi";

import { errorToast } from "../../utils/toast";

const JobApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getJobApplications(jobId);

      setApplications(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading Applicants...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Job Applicants</h1>

        <p className="text-gray-500 mt-2">
          Review worker proposals and hire the best candidate.
        </p>
      </div>
      {applications.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-16 text-center">
          <h2 className="text-2xl font-bold">No Applicants Yet</h2>

          <p className="text-gray-500 mt-3">
            Workers haven't applied to this job yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <ApplicantCard
              key={application._id}
              application={application}
              refresh={loadApplications}
            />
          ))}
        </div>
      )}{" "}
    </div>
  );
};

export default JobApplicants;
