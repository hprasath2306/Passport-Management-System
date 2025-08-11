import axiosInstance from "./axiosInstance";
import type { PassportDetails } from "../types";

export const userService = {
  async getPassportByUserId(userId: string): Promise<PassportDetails | null> {
    try {
      const response = await axiosInstance.get(`/api/passport/user/${userId}`);
      if (response.data && response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error fetching passport details:", error);
      throw error;
    }
  },

  async applyPassport(applicationData: any) {
    try {
      console.log("Applying for passport with data:", applicationData);
      const response = await axiosInstance.post(
        "/api/passport/apply",
        applicationData
      );
      return response.data;
    } catch (error) {
      console.error("Error applying for passport:", error);
      throw error;
    }
  },

  async renewPassport(userId: string) {
    try {
      console.log("Renewing passport for user:", userId);
      const response = await axiosInstance.put(`/api/passport/renew/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error renewing passport:", error);
      throw error;
    }
  },

   async updatePassportStatus(applicationId: number, status: string, cancellationComment?: string) {
    try {
      const requestBody = {
        status,
        ...(cancellationComment && { cancellationComment })
      };
      
      const response = await axiosInstance.put(
        `/api/passport/status/${applicationId}`,
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error("Error updating passport status:", error);
      throw error;
    }
  },

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
