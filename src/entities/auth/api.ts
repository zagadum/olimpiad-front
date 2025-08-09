import { axiosInstance } from "@/shared/api/axiosInstance";
import { User, UserResponse } from "@/entities/auth/types";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  return response.data;
};

export const registerUser = async (data: unknown): Promise<User> => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get("/api/init");
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};
