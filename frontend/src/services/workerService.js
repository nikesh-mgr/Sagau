import api from "../api/axios";

export const createWorkerProfile = async (data) => {
  const response = await api.post("/workers/create-profile", data);

  return response.data;
};

export const getWorkerProfile = async () => {
  const response = await api.get("/workers/profile");

  return response.data;
};

export const updateWorkerProfile = async (data) => {
  const response = await api.put("/workers/profile/update", data);

  return response.data;
};

export const getAllWorkers = async () => {
  const response = await api.get("/workers");

  return response.data;
};

export const getWorkerById = async (id) => {
  const response = await api.get(`/workers/${id}`);

  return response.data;
};
