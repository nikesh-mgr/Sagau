import api from "./axios";

/*
|--------------------------------------------------------------------------
| Create Job
|--------------------------------------------------------------------------
*/

export const createJob = async (data) => {
  const response = await api.post("/jobs", data);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get All Jobs
|--------------------------------------------------------------------------
*/

export const getAllJobs = async (params = {}) => {
  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Logged In Client Jobs
|--------------------------------------------------------------------------
*/

export const getMyJobs = async () => {
  const response = await api.get("/jobs/client/my-jobs");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Single Job
|--------------------------------------------------------------------------
*/

export const getSingleJob = async (id) => {
  const response = await api.get(`/jobs/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Job
|--------------------------------------------------------------------------
*/

export const updateJob = async (id, data) => {
  const response = await api.put(`/jobs/${id}`, data);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Job
|--------------------------------------------------------------------------
*/

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Job Status
|--------------------------------------------------------------------------
*/

export const updateJobStatus = async (id, status) => {
  const response = await api.patch(`/jobs/${id}/status`, {
    status,
  });

  return response.data;
};
