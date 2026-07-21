import api from "./axios";

export const getMyAgreements = async () => {
  const response = await api.get("/agreements");

  return response.data;
};

export const getSingleAgreement = async (agreementId) => {
  const response = await api.get(`/agreements/${agreementId}`);

  return response.data;
};

export const updateAgreementStatus = async (agreementId, status) => {
  const response = await api.patch(`/agreements/${agreementId}/status`, {
    status,
  });

  return response.data;
};
