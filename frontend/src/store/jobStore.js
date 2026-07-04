import { create } from "zustand";

import {
  createJob,
  getAllJobs,
  getSingleJob,
  getMyJobs,
  updateJob,
  deleteJob,
  updateJobStatus,
} from "../api/jobApi";

const useJobStore = create((set) => ({
  jobs: [],
  myJobs: [],
  currentJob: null,
  loading: false,

  // ==========================
  // CREATE JOB
  // ==========================
  createJob: async (data) => {
    set({ loading: true });

    try {
      const res = await createJob(data);

      set((state) => ({
        myJobs: [res.data.data, ...state.myJobs],
        loading: false,
      }));

      return res;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ==========================
  // GET ALL JOBS
  // ==========================
  fetchJobs: async (params = {}) => {
    set({ loading: true });

    try {
      const res = await getAllJobs(params);

      set({
        jobs: res.data.data.jobs,
        loading: false,
      });

      return res.data.data.jobs;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ==========================
  // GET MY JOBS
  // ==========================
  fetchMyJobs: async () => {
    set({ loading: true });

    try {
      const res = await getMyJobs();

      console.log("MY JOBS:", res.data);

      set({
        myJobs: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });

      throw error;
    }
  },

  // ==========================
  // GET SINGLE JOB
  // ==========================
  fetchSingleJob: async (jobId) => {
    set({ loading: true });

    try {
      const res = await getSingleJob(jobId);

      set({
        currentJob: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ==========================
  // UPDATE JOB
  // ==========================
  updateJob: async (jobId, data) => {
    set({ loading: true });

    try {
      const res = await updateJob(jobId, data);

      set((state) => ({
        myJobs: state.myJobs.map((job) =>
          job._id === jobId ? res.data.data : job,
        ),
        currentJob: res.data.data,
        loading: false,
      }));

      return res.data.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ==========================
  // DELETE JOB
  // ==========================
  deleteJob: async (jobId) => {
    set({ loading: true });

    try {
      await deleteJob(jobId);

      set((state) => ({
        myJobs: state.myJobs.filter((job) => job._id !== jobId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // ==========================
  // UPDATE STATUS
  // ==========================
  updateStatus: async (jobId, status) => {
    set({ loading: true });

    try {
      const res = await updateJobStatus(jobId, status);

      set((state) => ({
        myJobs: state.myJobs.map((job) =>
          job._id === jobId ? res.data.data : job,
        ),
        currentJob: res.data.data,
        loading: false,
      }));

      return res.data.data;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));

export default useJobStore;
