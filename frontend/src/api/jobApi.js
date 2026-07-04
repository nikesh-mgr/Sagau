import api from "./axios";

// ===========================
// CREATE JOB
// ===========================
export const createJob = (data) => {
  return api.post("/jobs", data);
};

// ===========================
// GET ALL JOBS
// ===========================
export const getAllJobs = (params = {}) => {
  return api.get("/jobs", {
    params,
  });
};

// ===========================
// GET SINGLE JOB
// ===========================
export const getSingleJob = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

// ===========================
// GET MY JOBS
// ===========================
export const getMyJobs = () => {
  return api.get("/jobs/client/my-jobs");
};

// ===========================
// UPDATE JOB
// ===========================
export const updateJob = (jobId, data) => {
  return api.put(`/jobs/${jobId}`, data);
};

// ===========================
// DELETE JOB
// ===========================
export const deleteJob = (jobId) => {
  return api.delete(`/jobs/${jobId}`);
};

// ===========================
// UPDATE JOB STATUS
// ===========================
export const updateJobStatus = (jobId, status) => {
  return api.patch(`/jobs/${jobId}/status`, {
    status,
  });
};
