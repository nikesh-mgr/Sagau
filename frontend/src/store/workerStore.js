import { create } from "zustand";

import {
  createWorkerProfile,
  getProfile,
  updateProfile,
  getWorkerById,
} from "../api/workerApi";

const useWorkerStore = create((set) => ({
  profile: null,
  worker: null,
  loading: false,

  // =========================
  // CREATE PROFILE
  // =========================
  createProfile: async (data) => {
    set({ loading: true });

    try {
      const res = await createWorkerProfile(data);

      set({
        profile: res.data,
        loading: false,
      });

      return res;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // =========================
  // FETCH OWN PROFILE
  // =========================
  fetchProfile: async () => {
    set({ loading: true });

    try {
      const res = await getProfile();

      set({
        profile: res.data,
        loading: false,
      });

      return res;
    } catch (error) {
      set({
        profile: null,
        loading: false,
      });

      throw error;
    }
  },

  // =========================
  // UPDATE PROFILE
  // =========================
  updateProfile: async (data) => {
    set({ loading: true });

    try {
      const res = await updateProfile(data);

      set({
        profile: res.data,
        loading: false,
      });

      return res;
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  // =========================
  // FETCH WORKER BY ID
  // =========================
  fetchWorker: async (workerId) => {
    set({ loading: true });

    try {
      const res = await getWorkerById(workerId);

      set({
        worker: res.data,
        loading: false,
      });

      return res;
    } catch (error) {
      set({
        worker: null,
        loading: false,
      });

      throw error;
    }
  },
}));

export default useWorkerStore;
