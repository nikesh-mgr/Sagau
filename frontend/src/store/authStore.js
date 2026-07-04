import { create } from "zustand";

import { loginUser, registerUser, getCurrentUser } from "../api/authApi";

import { saveToken, getToken, removeToken } from "../utils/token";

const useAuthStore = create((set) => ({
  user: null,
  token: getToken(),
  loading: false,

  // REGISTER
  register: async (formData) => {
    const response = await registerUser(formData);

    const token = response.data.data.token;
    const user = response.data.data.user;

    saveToken(token);

    set({
      token,
      user,
    });

    return response;
  },

  // LOGIN
  login: async (credentials) => {
    const response = await loginUser(credentials);

    const token = response.data.data.token;
    const user = response.data.data.user;

    saveToken(token);

    set({
      token,
      user,
    });

    return response;
  },

  // LOAD USER
  loadUser: async () => {
    try {
      const token = getToken();

      if (!token) return;

      const response = await getCurrentUser();

      set({
        user: response.data.data,
        token,
      });
    } catch (error) {
      removeToken();

      set({
        user: null,
        token: null,
      });
    }
  },

  // LOGOUT
  logout: () => {
    removeToken();

    set({
      user: null,
      token: null,
    });
  },
}));

export default useAuthStore;
