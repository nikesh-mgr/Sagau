import api from "./axios";

// Get My Agreements
export const getMyAgreements = async () => {
  const response = await api.get("/agreements");

  return response.data;
};

// Get Single Agreement
export const getAgreement = async (agreementId) => {
  const response = await api.get(`/agreements/${agreementId}`);

  return response.data;
};

// Update Agreement Status
export const updateAgreementStatus = async (agreementId, status) => {
  const response = await api.patch(`/agreements/${agreementId}/status`, {
    status,
  });

  return response.data;
};
