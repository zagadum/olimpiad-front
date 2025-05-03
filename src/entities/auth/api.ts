import { axiosInstance } from "@/shared/api/axiosInstance";
import { User, UserResponse } from "@/entities/auth/types";
// import { getOlympiadsResponse } from "@/entities/auth/mockData.ts";

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
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axiosInstance.get("/api/init");
  // const response = await getOlympiadsResponse()
  return response.data;
};

// Вихід користувача
export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post("/api/auth/logout");
};
