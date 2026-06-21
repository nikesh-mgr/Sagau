import { create } from "zustand";
import { getCurrentUser } from "../features/auth/services/authService";

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: true,

  setAuth: ({ user, token }) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  // 🔥 IMPORTANT: session restore
  loadUser: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({ isLoading: false });
        return;
      }

      const response = await getCurrentUser();

      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
