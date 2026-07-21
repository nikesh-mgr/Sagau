import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import JobForm from "../../components/job/JobForm";

import { getSingleJob, updateJob } from "../../api/jobApi";

import { successToast, errorToast } from "../../utils/toast";

const EditJob = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      setPageLoading(true);

      const response = await getSingleJob(id);

      setJob(response.data);
    } catch (error) {
      console.log(error);

      errorToast("Unable to load job.");
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      setLoading(true);

      await updateJob(id, jobData);

      successToast("Job updated successfully.");

      navigate("/client/jobs");
    } catch (error) {
      console.log(error);

      errorToast(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to update job.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-10 text-center">
        Loading job...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-10 text-center">
        <h2 className="text-2xl font-bold">Job not found</h2>

        <Link
          to="/client/jobs"
          className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-xl"
        >
          Back to My Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link
          to="/client/jobs"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <FiArrowLeft />
          Back to My Jobs
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>

          <p className="text-gray-500 mt-2">Update your job details.</p>
        </div>

        <JobForm
          defaultValues={job}
          onSubmit={handleUpdateJob}
          loading={loading}
          buttonText="Update Job"
        />
      </div>
    </div>
  );
};

export default EditJob;
