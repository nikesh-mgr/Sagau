import { create } from "zustand";

import * as applicationService from "../services/applicationService";

const useApplicationStore = create((set) => ({
  applications: [],
  loading: false,

  fetchMyApplications: async () => {
    set({ loading: true });

    try {
      const response = await applicationService.getMyApplications();

      set({
        applications: response.data,
        loading: false,
      });

      return response;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  applyToJob: async (data) => {
    return await applicationService.applyToJob(data);
  },
}));

export default useApplicationStore;
