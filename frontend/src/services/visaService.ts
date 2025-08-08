import axiosInstance from "./axiosInstance";

export const visaService = {
  async getVisasByUserId(userId: string) {
    try {
      const response = await axiosInstance.get(`/api/visa/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching visa applications:", error);
      return [];
    }
  },

  async applyVisa(visaData: {
    userId: string;
    passportId: string;
    destinationCountry: string;
    visaType: string;
    amountPaid: number;
  }) {
    try {
      const response = await axiosInstance.post("/api/visa/apply", visaData);
      return response.data;
    } catch (error) {
      console.error("Error applying for visa:", error);
      throw error;
    }
  },

  async cancelVisa(cancellationData: {
    visaApplicationId: number;
    userId: string;
    cancellationReason: string;
    cancellationDate: string;
  }) {
    try {
      const response = await axiosInstance.post(
        "/api/visa-cancellation/request",
        cancellationData
      );
      return response.data;
    } catch (error) {
      console.error("Error cancelling visa:", error);
      throw error;
    }
  },

  async getCancellationsByUserId(userId: string) {
    try {
      const response = await axiosInstance.get(
        `/api/visa-cancellation/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching visa cancellations:", error);
      return [];
    }
  },
};