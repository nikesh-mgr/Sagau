import api from "./axios";

// =========================
// CREATE WORKER PROFILE
// =========================
export const createWorkerProfile = async (data) => {
  const response = await api.post("/workers/create-profile", data);
  return response.data;
};

// =========================
// GET LOGGED-IN PROFILE
// =========================
export const getProfile = async () => {
  const response = await api.get("/workers/profile");
  return response.data;
};

// =========================
// UPDATE PROFILE
// =========================
export const updateProfile = async (data) => {
  const response = await api.put("/workers/profile/update", data);
  return response.data;
};

// =========================
// GET ALL WORKERS
// =========================
export const getAllWorkers = async () => {
  const response = await api.get("/workers");
  return response.data;
};

// =========================
// GET WORKER BY ID
// =========================
export const getWorkerById = async (workerId) => {
  const response = await api.get(`/workers/${workerId}`);
  return response.data;
};
