import { create } from "zustand";

import * as agreementService from "../services/agreementService";

const useAgreementStore = create((set) => ({
  agreements: [],
  loading: false,

  fetchAgreements: async () => {
    set({
      loading: true,
    });

    try {
      const response = await agreementService.getMyAgreements();

      set({
        agreements: response.data,
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
}));

export default useAgreementStore;
