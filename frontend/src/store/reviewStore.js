import { create } from "zustand";

import {
  createReview,
  getWorkerReviews,
  getClientReviews,
} from "../api/reviewApi";

const useReviewStore = create((set) => ({
  reviews: [],

  averageRating: 0,

  totalReviews: 0,

  reputationScore: 0,

  loading: false,

  fetchWorkerReviews: async (workerId) => {
    set({
      loading: true,
    });

    try {
      const res = await getWorkerReviews(workerId);

      set({
        reviews: res.data.reviews,
        averageRating: res.data.averageRating,
        totalReviews: res.data.totalReviews,
        reputationScore: res.data.reputationScore,
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

  fetchClientReviews: async (clientId) => {
    set({
      loading: true,
    });

    try {
      const res = await getClientReviews(clientId);

      set({
        reviews: res.data.reviews,
        averageRating: res.data.averageRating,
        totalReviews: res.data.totalReviews,
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

  submitReview: async (agreementId, reviewData) => {
    set({
      loading: true,
    });

    try {
      const res = await createReview(agreementId, reviewData);

      set({
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
}));

export default useReviewStore;
