import type { LoginData, RegisterData, AuthResponse } from "../types";
import axiosInstance from "./axiosInstance";

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axiosInstance.post("/api/auth/login", data);

    if (!response.data) {
      throw new Error("User not found");
    }

    const user = response.data.user;
    const token = response.data.token;

    return {
      token,
      user,
      role: user.role,
    };
  },

  async register(data: RegisterData): Promise<void> {
    try {
      const response = await axiosInstance.post("/api/auth/register", data);
      return response.data;
    } catch (error: any) {
      let errorMessage = "Registration failed";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error.response?.data === "string") {
        errorMessage = error.response.data;
      }
      if (
        errorMessage.includes("duplicate key value") &&
        errorMessage.includes("phone_number")
      ) {
        errorMessage =
          "Phone number already exists. Please use a different number.";
      } else if (
        errorMessage.includes("duplicate key value") &&
        errorMessage.includes("email")
      ) {
        errorMessage = "Email already exists. Please use a different email.";
      }

      console.log("Final error message:", errorMessage);
      throw new Error(errorMessage);
    }
  },
};
