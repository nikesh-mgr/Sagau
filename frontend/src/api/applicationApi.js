import api from "./axios";

export const applyToJob = async (jobId, data) => {
  const response = await api.post(`/applications/apply/${jobId}`, data);

  return response.data;
};

export const getMyApplications = async () => {
  const response = await api.get("/applications/me");

  return response.data;
};

export const getJobApplications = async (jobId) => {
  const response = await api.get(`/applications/job/${jobId}`);

  return response.data;
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.patch(`/applications/${id}/status`, { status });

  return response.data;
};
export const getClientApplications = async () => {
  const response = await api.get("/applications/client");

  return response.data;
};
