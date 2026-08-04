import api from "./axios";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export const getDashboard = async () => {
  const { data } = await api.get("/admin/dashboard");
  return data;
};

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data;
};

export const getUserById = async (userId) => {
  const { data } = await api.get(`/admin/users/${userId}`);
  return data;
};

export const updateUser = async (userId, userData) => {
  const { data } = await api.put(`/admin/users/${userId}`, userData);
  return data;
};

export const toggleUserStatus = async (userId) => {
  const { data } = await api.patch(`/admin/users/${userId}/toggle`);
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/admin/users/${userId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Workers
|--------------------------------------------------------------------------
*/

export const createWorker = async (formData) => {
  const { data } = await api.post("/admin/workers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getAllWorkers = async () => {
  const { data } = await api.get("/admin/workers");
  return data;
};

export const getWorkerById = async (workerId) => {
  const { data } = await api.get(`/admin/workers/${workerId}`);
  return data;
};

export const updateWorker = async (workerId, formData) => {
  const { data } = await api.put(`/admin/workers/${workerId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const toggleWorkerStatus = async (workerId) => {
  const { data } = await api.patch(`/admin/workers/${workerId}/toggle`);
  return data;
};

export const deleteWorker = async (workerId) => {
  const { data } = await api.delete(`/admin/workers/${workerId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Clients
|--------------------------------------------------------------------------
*/

export const createClient = async (formData) => {
  const { data } = await api.post("/admin/clients", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getAllClients = async () => {
  const { data } = await api.get("/admin/clients");
  return data;
};

export const getClientById = async (clientId) => {
  const { data } = await api.get(`/admin/clients/${clientId}`);
  return data;
};

export const updateClient = async (clientId, formData) => {
  const { data } = await api.put(`/admin/clients/${clientId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const toggleClientStatus = async (clientId) => {
  const { data } = await api.patch(`/admin/clients/${clientId}/toggle`);
  return data;
};

export const deleteClient = async (clientId) => {
  const { data } = await api.delete(`/admin/clients/${clientId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Jobs
|--------------------------------------------------------------------------
*/

export const createJob = async (jobData) => {
  const { data } = await api.post("/admin/jobs", jobData);
  return data;
};

export const getAllJobsByAdmin = async () => {
  const { data } = await api.get("/admin/jobs");
  return data;
};

export const getJobById = async (jobId) => {
  const { data } = await api.get(`/admin/jobs/${jobId}`);
  return data;
};

export const updateJobByAdmin = async (jobId, jobData) => {
  const { data } = await api.put(`/admin/jobs/${jobId}`, jobData);
  return data;
};

export const updateJobStatusByAdmin = async (jobId, status) => {
  const { data } = await api.patch(`/admin/jobs/${jobId}/status`, {
    status,
  });

  return data;
};

export const toggleJobStatus = async (jobId) => {
  const { data } = await api.patch(`/admin/jobs/${jobId}/toggle`);
  return data;
};

export const deleteJobByAdmin = async (jobId) => {
  const { data } = await api.delete(`/admin/jobs/${jobId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Agreements
|--------------------------------------------------------------------------
*/

export const getAllAgreements = async () => {
  const res = await api.get("/admin/agreements");
  console.log(res.data);
  return res.data;
};

export const getAgreementById = async (agreementId) => {
  const { data } = await api.get(`/admin/agreements/${agreementId}`);
  return data;
};

export const updateAgreementStatusByAdmin = async (agreementId, status) => {
  const { data } = await api.patch(`/admin/agreements/${agreementId}/status`, {
    status,
  });

  return data;
};

export const toggleAgreementStatus = async (agreementId) => {
  const { data } = await api.patch(`/admin/agreements/${agreementId}/toggle`);

  return data;
};

export const deleteAgreementByAdmin = async (agreementId) => {
  const { data } = await api.delete(`/admin/agreements/${agreementId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Reviews
|--------------------------------------------------------------------------
*/

export const getAllReviews = async () => {
  const { data } = await api.get("/admin/reviews");
  return data;
};

export const getReviewById = async (reviewId) => {
  const { data } = await api.get(`/admin/reviews/${reviewId}`);
  return data;
};

export const deleteReview = async (reviewId) => {
  const { data } = await api.delete(`/admin/reviews/${reviewId}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Contact Messages
|--------------------------------------------------------------------------
*/

export const getAllMessages = async () => {
  const { data } = await api.get("/admin/messages");
  return data;
};

export const markMessageRead = async (messageId) => {
  const { data } = await api.patch(`/admin/messages/${messageId}/read`);
  return data;
};

export const deleteMessage = async (messageId) => {
  const { data } = await api.delete(`/admin/messages/${messageId}`);
  return data;
};
