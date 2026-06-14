import { create } from "zustand";

import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../services/authService";

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,

  register: async (userData) => {
    set({ loading: true });

    try {
      const response = await registerUser(userData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      });

      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ loading: true });

    try {
      const response = await loginUser(credentials);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
      });

      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchUser: async () => {
    try {
      const response = await getCurrentUser();

      set({
        user: response.data,
        isAuthenticated: true,
      });
    } catch {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  logout: async () => {
    try {
      await logoutUser();
    } catch {}

    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;
