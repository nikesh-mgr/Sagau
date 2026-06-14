import api from "../api/axios";

export const createJob = async (data) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const getAllJobs = async (params) => {
  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

export const getMyJobs = async () => {
  const response = await api.get("/jobs/client/my-jobs");

  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const updateJob = async (id, data) => {
  const response = await api.put(`/jobs/${id}`, data);

  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);

  return response.data;
};

export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/jobs/${id}/status`, { status });

  return response.data;
};
