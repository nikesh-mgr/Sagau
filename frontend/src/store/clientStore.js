import { create } from "zustand";

import {
  createClientProfile,
  getClientProfile,
  updateClientProfile,
} from "../api/clientApi";

const useClientStore = create((set) => ({
  profile: null,
  loading: false,

  fetchProfile: async () => {
    try {
      const res = await getClientProfile();

      set({
        profile: res.data.data,
      });

      return res.data.data;
    } catch (error) {
      // Profile doesn't exist yet
      if (error.response?.status === 404) {
        set({
          profile: null,
        });

        return null;
      }

      throw error;
    }
  },

  createProfile: async (data) => {
    const res = await createClientProfile(data);

    set({
      profile: res.data.data,
    });

    return res;
  },

  updateProfile: async (data) => {
    const res = await updateClientProfile(data);

    set({
      profile: res.data.data,
    });

    return res;
  },
}));

export default useClientStore;
