import { create } from "zustand";

import {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from "../api/applicationApi";

const useApplicationStore = create((set) => ({
  applications: [],
  loading: false,

  // ======================
  // APPLY
  // ======================

  apply: async (jobId, data) => {
    set({
      loading: true,
    });

    try {
      const res = await applyToJob(jobId, data);

      set({
        loading: false,
      });

      return res;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // ======================
  // WORKER APPLICATIONS
  // ======================

  fetchMyApplications: async () => {
    set({
      loading: true,
    });

    try {
      const res = await getMyApplications();

      set({
        applications: res.data,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // ======================
  // CLIENT APPLICATIONS
  // ======================

  fetchJobApplications: async (jobId) => {
    set({
      loading: true,
    });

    try {
      const res = await getJobApplications(jobId);

      set({
        applications: res.data,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({
        loading: false,
      });

      throw error;
    }
  },

  // ======================
  // ACCEPT / REJECT
  // ======================

  changeStatus: async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);

      // Reload applications from backend
      // Don't manually modify state
      return true;
    } catch (error) {
      throw error;
    }
  },
}));

export default useApplicationStore;
