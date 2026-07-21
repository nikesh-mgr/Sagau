import api from "./axios";

// Get logged-in user's notifications
export const getNotifications = async () => {
  const response = await api.get("/notifications");

  return response.data;
};

// Mark notification as read
export const markNotificationRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);

  return response.data;
};
