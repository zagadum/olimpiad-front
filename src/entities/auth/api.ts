import { axiosInstance } from "@/shared/api/axiosInstance";
import { User } from "@/entities/auth/types";

// Логін користувача
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  const response = await axiosInstance.post("/api/auth/login", credentials);
  return response.data;
};

// Реєстрація користувача
export const registerUser = async (data: unknown): Promise<User> => {
  const response = await axiosInstance.post("/api/auth/register", data);
  return response.data;
};

// Отримання поточного користувача
export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get("/api/auth/me");
  return response.data;
};

// Вихід користувача
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};
