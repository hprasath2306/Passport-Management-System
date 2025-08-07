import axiosInstance from './axiosInstance';

export const passportService = {
  async getPassportByUserId(userId: string): Promise<boolean> {
    try {
      const response = await axiosInstance.get(`/api/passport/user/${userId}`);
      if (!response.data) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error fetching passport status:', error);
      return false;
    }
  },
  async applyPassport(applicationData: any) {
    try {
        console.log('Applying for passport with data:', applicationData);
      const response = await axiosInstance.post('/api/passport/apply', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error applying for passport:', error);
      throw error;
    }
  },
};