import { create } from "zustand";

import * as clientService from "../services/clientService";
import * as workerService from "../services/workerService";

const useProfileStore = create((set) => ({
  profile: null,
  loading: false,

  setProfile: (profile) =>
    set({
      profile,
    }),

  clearProfile: () =>
    set({
      profile: null,
    }),

  getClientProfile: async () => {
    set({ loading: true });

    try {
      const response = await clientService.getClientProfile();

      set({
        profile: response.data,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  createClientProfile: async (data) => {
    const response = await clientService.createClientProfile(data);

    set({
      profile: response.data,
    });

    return response;
  },

  updateClientProfile: async (data) => {
    const response = await clientService.updateClientProfile(data);

    set({
      profile: response.data,
    });

    return response;
  },

  getWorkerProfile: async () => {
    set({ loading: true });

    try {
      const response = await workerService.getWorkerProfile();

      set({
        profile: response.data,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  createWorkerProfile: async (data) => {
    const response = await workerService.createWorkerProfile(data);

    set({
      profile: response.data,
    });

    return response;
  },

  updateWorkerProfile: async (data) => {
    const response = await workerService.updateWorkerProfile(data);

    set({
      profile: response.data,
    });

    return response;
  },
}));

export default useProfileStore;
