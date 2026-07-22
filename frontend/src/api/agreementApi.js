import api from "./axios";

// ======================================
// Get all agreements
// ======================================

export const getMyAgreements = async () => {
  const response = await api.get("/agreements");

  return response.data;
};

// ======================================
// Get single agreement
// ======================================

export const getSingleAgreement = async (agreementId) => {
  const response = await api.get(`/agreements/${agreementId}`);

  return response.data;
};

// ======================================
// Worker marks complete
// Client approves
// Backend determines the role automatically
// ======================================

export const updateAgreementStatus = async (agreementId) => {
  const response = await api.patch(`/agreements/${agreementId}/status`);

  return response.data;
};
