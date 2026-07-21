import api from "./axios";

// Create review
export const createReview = async (agreementId, data) => {
  const response = await api.post(`/reviews/${agreementId}`, data);
  return response.data;
};

// Worker reviews
export const getWorkerReviews = async (workerId) => {
  const response = await api.get(`/reviews/worker/${workerId}`);
  return response.data;
};

// Client reviews
export const getClientReviews = async (clientId) => {
  const response = await api.get(`/reviews/client/${clientId}`);
  return response.data;
};
export const getMyReviews = async () => {
  const response = await api.get("/reviews/my");

  return response.data;
};

// Agreement reviews (used to check duplicate reviews)
export const getAgreementReviews = async (agreementId) => {
  const response = await api.get(`/reviews/agreement/${agreementId}`);
  return response.data;
};
