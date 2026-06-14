import api from "../api/axios";

export const createClientProfile = async (data) => {
  const response = await api.post("/clients/create-profile", data);

  return response.data;
};

export const getClientProfile = async () => {
  const response = await api.get("/clients/profile");

  return response.data;
};

export const updateClientProfile = async (data) => {
  const response = await api.put("/clients/profile/update", data);

  return response.data;
};
