import { create } from "zustand";

import {
  getMyAgreements,
  getAgreement,
  updateAgreementStatus,
} from "../api/agreementApi";

const useAgreementStore = create((set) => ({
  agreements: [],
  currentAgreement: null,
  loading: false,

  fetchAgreements: async () => {
    set({ loading: true });

    try {
      const res = await getMyAgreements();

      set({
        agreements: res.data,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });

      throw error;
    }
  },

  fetchAgreement: async (agreementId) => {
    set({ loading: true });

    try {
      const res = await getAgreement(agreementId);

      set({
        currentAgreement: res.data,
        loading: false,
      });

      return res.data;
    } catch (error) {
      set({ loading: false });

      throw error;
    }
  },

  changeAgreementStatus: async (agreementId, status) => {
    const res = await updateAgreementStatus(agreementId, status);

    set((state) => ({
      agreements: state.agreements.map((agreement) =>
        agreement._id === agreementId ? res.data : agreement,
      ),
    }));

    return res.data;
  },
}));

export default useAgreementStore;
