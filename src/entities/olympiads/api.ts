import { axiosInstance } from "@/shared/api/axiosInstance";
import { Olympiad } from "./types";
import { getOlympiadsResponse } from "./mockData";

// Отримання всіх олімпіад
export const getOlympiads = async (): Promise<Olympiad[]> => {
  // const response = await axiosInstance.get('/olympiads');

  // Мокові дані
  const response = await getOlympiadsResponse();
  return response.data;
};

// Отримання олімпіад, в яких бере участь користувач
export const getMyOlympiads = async (): Promise<Olympiad[]> => {
  const response = await axiosInstance.get("/olympiads/my");
  return response.data;
};

// Отримання деталей окремої олімпіади за ID
export const getOlympiadDetail = async (id: string): Promise<Olympiad> => {
  const response = await axiosInstance.get(`/olympiads/${id}`);
  return response.data;
};

// Реєстрація на олімпіаду
export const registerForOlympiad = async (
  formData: unknown,
): Promise<unknown> => {
  // const response = await axiosInstance.post("/olympiads/register", formData);
  const response = {status: 200, data: formData}
  return response.data;
};

// Ініціація платежу (наприклад, для LiqPay або іншої системи)
export const initiatePayment = async (
  paymentData: unknown,
): Promise<unknown> => {
  const response = await axiosInstance.post("/olympiads/payment", paymentData);
  return response.data;
};
