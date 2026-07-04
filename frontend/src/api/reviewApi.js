import api from "./axios";

// Create Review
export const createReview = async (agreementId, data) => {
  const response = await api.post(`/reviews/${agreementId}`, data);

  return response.data;
};

// Worker Reviews
export const getWorkerReviews = async (workerId) => {
  const response = await api.get(`/reviews/worker/${workerId}`);

  return response.data;
};

// Client Reviews
export const getClientReviews = async (clientId) => {
  const response = await api.get(`/reviews/client/${clientId}`);

  return response.data;
};
