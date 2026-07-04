import api from "./axios";

// Apply to Job
export const applyToJob = async (jobId, data) => {
  const response = await api.post(`/applications/apply/${jobId}`, data);
  return response.data;
};

// Worker Applications
export const getMyApplications = async () => {
  const response = await api.get("/applications/me");
  return response.data;
};

// Client - Get Applications for a Job
export const getJobApplications = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);
  return response.data;
};

// Client - Accept / Reject
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.patch(`/applications/${applicationId}/status`, {
    status,
  });

  return response.data;
};
