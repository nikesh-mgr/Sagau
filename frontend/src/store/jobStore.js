import { create } from "zustand";

import * as jobService from "../services/jobService";

const useJobStore = create((set) => ({
  jobs: [],
  myJobs: [],
  selectedJob: null,
  loading: false,

  fetchJobs: async (params = {}) => {
    set({ loading: true });

    try {
      const response = await jobService.getAllJobs(params);

      set({
        jobs: response.data.jobs,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  fetchMyJobs: async () => {
    set({ loading: true });

    try {
      const response = await jobService.getMyJobs();

      set({
        myJobs: response.data,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  createJob: async (jobData) => {
    return await jobService.createJob(jobData);
  },

  deleteJob: async (jobId) => {
    return await jobService.deleteJob(jobId);
  },

  updateJobStatus: async (jobId, status) => {
    return await jobService.updateJobStatus(jobId, status);
  },
}));

export default useJobStore;
