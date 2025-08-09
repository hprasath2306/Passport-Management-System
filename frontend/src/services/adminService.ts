import axiosInstance from './axiosInstance';

export interface AdminPassportApplication {
  passportApplicationId: number;
  userId: string;
  passportId: string;
  serviceTypeId: number;
  bookletTypeId: number;
  passportType: 'NEW' | 'RENEWAL';
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'PENDING' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
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

export interface AdminVisaApplication {
  visaApplicationId: number;
  userId: string;
  visaId: string;
  passportId: string;
  destinationCountry: string;
  visaType: string;
  applicationDate: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'PENDING' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  amountPaid: number;
  validityYears: number;
  userFirstName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  userOccupation: string;
  createdAt: string;
  updatedAt: string;
}

export const adminService = {
  // Passport Management
  async getAllPassportApplications(): Promise<AdminPassportApplication[]> {
    try {
      const response = await axiosInstance.get('/api/passport/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching passport applications:', error);
      throw error;
    }
  },

  async updatePassportStatus(
    applicationId: number, 
    status: string
  ): Promise<AdminPassportApplication> {
    try {
      const response = await axiosInstance.put(
        `/api/passport/status/${applicationId}?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error('Error updating passport status:', error);
      throw error;
    }
  },

  async getPassportById(passportId: string): Promise<AdminPassportApplication> {
    try {
      const response = await axiosInstance.get(`/api/passport/${passportId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching passport details:', error);
      throw error;
    }
  },

  // Visa Management
  async getAllVisaApplications(): Promise<AdminVisaApplication[]> {
    try {
      const response = await axiosInstance.get('/api/visa/all');
      return response.data;
    } catch (error) {
      console.error('Error fetching visa applications:', error);
      throw error;
    }
  },

  async updateVisaStatus(
    visaId: string, 
    status: string
  ): Promise<AdminVisaApplication> {
    try {
      const response = await axiosInstance.put(
        `/api/visa/${visaId}/status?status=${status}`
      );
      return response.data;
    } catch (error) {
      console.error('Error updating visa status:', error);
      throw error;
    }
  },

  async getVisaById(visaId: string): Promise<AdminVisaApplication> {
    try {
      const response = await axiosInstance.get(`/api/visa/${visaId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching visa details:', error);
      throw error;
    }
  },

  async validatePassportForVisa(passportNumber: string): Promise<boolean> {
    try {
      const response = await axiosInstance.get(
        `/api/visa/validate-passport/${passportNumber}`
      );
      return response.data;
    } catch (error) {
      console.error('Error validating passport:', error);
      throw error;
    }
  }
};