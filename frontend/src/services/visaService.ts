import axiosInstance from './axiosInstance';

export const visaService = {
  async getVisasByUserId(userId: string) {
    try {
      const response = await axiosInstance.get(`/api/visa/user/${userId}`);
      return response.data; // Should be an array of visa applications
    } catch (error) {
      console.error('Error fetching visa applications:', error);
      return [];
    }
  },
};