import { create } from "zustand";

import { loginApi, registerApi, getMeApi } from "../api/authApi";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  token: localStorage.getItem("token") || null,

  loading: false,

  login: async (data) => {
    set({
      loading: true,
    });

    try {
      const response = await loginApi(data);

      const token = response.data.token;

      const user = response.data.user;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,

        user,
      });

      return user;
    } catch (error) {
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  register: async (data) => {
    set({
      loading: true,
    });

    try {
      const response = await registerApi(data);

      const token = response.data.token;

      const user = response.data.user;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      set({
        token,

        user,
      });

      return user;
    } catch (error) {
      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  loadUser: async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await getMeApi();

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      set({
        user,

        token,
      });
    } catch (error) {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      set({
        user: null,

        token: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    set({
      user: null,

      token: null,
    });
  },
}));

export default useAuthStore;
