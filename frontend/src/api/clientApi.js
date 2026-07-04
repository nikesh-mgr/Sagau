import api from "./axios";

export const createClientProfile = (data) =>
  api.post("/clients/create-profile", data);

export const getClientProfile = () => api.get("/clients/profile");

export const updateClientProfile = (data) =>
  api.put("/clients/profile/update", data);
