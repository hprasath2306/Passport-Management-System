import type { LoginData, RegisterData, AuthResponse } from '../types';
import axiosInstance from './axiosInstance';


export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axiosInstance.post("/api/auth/login", data);

    if (!response.data) {
      throw new Error('User not found');
    }

    const user = response.data.user;
    const token = response.data.token;
    
    return {
      token,
      user,
      role: user.role
    };
  },

  async register(data: RegisterData): Promise<void> {
    const response = await axiosInstance.post("/api/auth/register", data);

    if (!response.data) {
      throw new Error('Registration failed');
    }

    return response.data;
  }
};