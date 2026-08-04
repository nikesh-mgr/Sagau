import api from "./axios";

export const sendContactMessage = async (data) => {
  const response = await api.post("/contact", data);

  return response.data;
};
