import api from "./axios";

/*
|--------------------------------------------------------------------------
| Create Worker Profile
|--------------------------------------------------------------------------
*/

export const createWorkerProfile = async (data) => {
  const response = await api.post("/workers/create-profile", data);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Logged In Worker Profile
|--------------------------------------------------------------------------
*/

export const getMyWorkerProfile = async () => {
  const response = await api.get("/workers/profile");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Worker Profile
|--------------------------------------------------------------------------
*/

export const updateWorkerProfile = async (data) => {
  const response = await api.put("/workers/profile/update", data);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get All Workers
|--------------------------------------------------------------------------
*/

export const getAllWorkers = async (params = {}) => {
  const response = await api.get("/workers", {
    params,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Worker By Id
|--------------------------------------------------------------------------
*/

export const getWorkerById = async (id) => {
  const response = await api.get(`/workers/${id}`);

  return response.data;
};
