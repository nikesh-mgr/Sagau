import api from "./axios";

// =====================================================
// Create Client Profile
// =====================================================

export const createClientProfile = async (formData) => {
  const response = await api.post("/clients/create-profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// =====================================================
// Get Client Profile
// =====================================================

export const getClientProfile = async () => {
  const response = await api.get("/clients/profile");

  return response.data;
};

// =====================================================
// Update Client Profile
// =====================================================

export const updateClientProfile = async (formData) => {
  const response = await api.put("/clients/profile/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
