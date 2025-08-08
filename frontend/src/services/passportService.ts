import axiosInstance from './axiosInstance';

export interface PassportDetails {
  passportApplicationId: number;
  userId: string;
  passportId: string;
  serviceTypeId: number;
  bookletTypeId: number;
  passportType: 'NEW' | 'RENEWAL';
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'PENDING' | 'ISSUED' | 'CANCELLED';
  amountPaid: number;
  previousPassportId?: string;
  processingDays?: number;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userCitizenType: string;
  createdAt: string;
  updatedAt: string;
}

export const passportService = {
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
      console.error('Error fetching passport details:', error);
      throw error;
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

  async renewPassport(userId: string) {
    try {
      console.log('Renewing passport for user:', userId);
      const response = await axiosInstance.put(`/api/passport/renew/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error renewing passport:', error);
      throw error;
    }
  },
};