import api from "./axios";

// =====================================================
// Create Worker Profile
// =====================================================

export const createWorkerProfile = async (formData) => {
  const response = await api.post("/workers/create-profile", formData);

  return response.data;
};

// =====================================================
// Get Logged In Worker Profile
// =====================================================

export const getMyWorkerProfile = async () => {
  const response = await api.get("/workers/profile");

  return response.data;
};

// =====================================================
// Update Worker Profile
// =====================================================

export const updateWorkerProfile = async (formData) => {
  const response = await api.put("/workers/profile/update", formData);

  return response.data;
};

// =====================================================
// Get All Workers
// =====================================================

export const getAllWorkers = async (params = {}) => {
  const response = await api.get("/workers", {
    params,
  });

  return response.data;
};

// =====================================================
// Admin Toggle Worker Status
// =====================================================

export const toggleWorkerStatus = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/toggle-status`);

  return response.data;
};

// =====================================================
// Admin Delete Worker
// =====================================================

export const deleteWorker = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);

  return response.data;
};

// =====================================================
// Get Worker By ID
// =====================================================

export const getWorkerById = async (id) => {
  const response = await api.get(`/workers/${id}`);

  return response.data;
};
