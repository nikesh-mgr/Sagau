import { create } from "zustand";

import {
  createReview,
  getWorkerReviews,
  getClientReviews,
} from "../api/reviewApi";

const useReviewStore = create((set) => ({
  reviews: [],
  summary: {},
  loading: false,

  submitReview: async (agreementId, data) => {
    set({ loading: true });

    try {
      const res = await createReview(agreementId, data);

      set({ loading: false });

      return res.data;
    } catch (error) {
      set({ loading: false });

      throw error;
    }
  },

  fetchWorkerReviews: async (workerId) => {
    set({ loading: true });

    try {
      const res = await getWorkerReviews(workerId);

      set({
        reviews: res.data.reviews,
        summary: {
          averageRating: res.data.averageRating,
          totalReviews: res.data.totalReviews,
        },
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });

      throw error;
    }
  },

  fetchClientReviews: async (clientId) => {
    set({ loading: true });

    try {
      const res = await getClientReviews(clientId);

      set({
        reviews: res.data.reviews,
        summary: {
          averageRating: res.data.averageRating,
          totalReviews: res.data.totalReviews,
        },
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });

      throw error;
    }
  },
}));

export default useReviewStore;
