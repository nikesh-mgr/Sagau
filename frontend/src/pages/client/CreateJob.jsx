import { useState } from "react";
import { useNavigate } from "react-router-dom";

import JobForm from "../../components/job/JobForm";

import { createJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleCreateJob = async (jobData) => {
    try {
      setLoading(true);

      await createJob(jobData);

      successToast("Job posted successfully.");

      navigate("/client/jobs");
    } catch (error) {
      console.error("CREATE JOB ERROR:", error.response || error);

      errorToast(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to create job.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>

          <p className="text-gray-500 mt-2">
            Describe your project clearly so skilled workers can apply.
          </p>
        </div>

        <JobForm
          onSubmit={handleCreateJob}
          loading={loading}
          buttonText="Post Job"
        />
      </div>
    </div>
  );
};

export default CreateJob;
