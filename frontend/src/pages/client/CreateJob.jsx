import { useNavigate } from "react-router-dom";

import JobForm from "../../components/jobs/JobForm";

import useJobStore from "../../store/jobStore";
import ClientLayout from "../../components/layouts/ClientLayout";
import { successToast, errorToast } from "../../utils/toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const createJob = useJobStore((state) => state.createJob);
  const loading = useJobStore((state) => state.loading);

  const handleCreateJob = async (data) => {
    try {
      await createJob(data);

      successToast("Job created successfully");

      navigate("/client/");
    } catch (error) {
      if (error.response?.data?.errors) {
        errorToast(error.response.data.errors[0].msg);
        return;
      }

      errorToast(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <ClientLayout>
      <div className="max-w-4xl mx-auto py-8">
        <JobForm
          onSubmit={handleCreateJob}
          loading={loading}
          buttonText="Create Job"
        />
      </div>
    </ClientLayout>
  );
};

export default CreateJob;
