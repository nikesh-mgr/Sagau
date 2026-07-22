import api from "./axios";

export const getWorkerDashboard = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};
