import type { PassportDetails } from '../types';
import axiosInstance from './axiosInstance';
import type { AdminVisaApplication } from '../types';

export const adminService = {
  async getAllPassportApplications(): Promise<PassportDetails[]> {
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
    status: string,
    cancellationComment?: string
  ): Promise<PassportDetails> {
    try {
      const requestBody = {
        status,
        ...(cancellationComment && { cancellationComment })
      };

      console.log('Updating passport status:', requestBody);

      const response = await axiosInstance.put(
        `/api/passport/status/${applicationId}?status=${status}`,
        requestBody
      );
      return response.data;
    } catch (error) {
      console.error('Error updating passport status:', error);
      throw error;
    }
  },

  async getPassportById(passportId: string): Promise<PassportDetails> {
    try {
      const response = await axiosInstance.get(`/api/passport/${passportId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching passport details:', error);
      throw error;
    }
  },

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
    status: string,
    cancellationComment?: string
  ): Promise<AdminVisaApplication> {
    try {
      const requestBody = {
        status,
        ...(cancellationComment && { cancellationComment })
      };
      
      const response = await axiosInstance.put(
        `/api/visa/${visaId}/status`,
        requestBody
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