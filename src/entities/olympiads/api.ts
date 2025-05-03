import { axiosInstance } from "@/shared/api/axiosInstance";
import {
  // Olympiad,
  OlympiadsResponse
} from "./types";
// import { getOlympiadsResponse } from "./mockData";

// Отримання всіх олімпіад
export const getOlympiads = async (params?: OlympiadsResponse["params"]): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get('/api/olympiads', {
    params
  });

  // Мокові дані
  // const response = await getOlympiadsResponse(params);
  return response.data;
};

// Отримання олімпіад, в яких бере участь користувач
export const getMyOlympiads = async (): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get("/api/olympiads/my");
  return response.data;
};

// Отримання деталей окремої олімпіади за ID
export const getOlympiadDetail = async (id: string): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get(`/api/olympiads/${id}`);
  return response.data;
};

// Реєстрація на олімпіаду
export const registerForOlympiad = async (
  formData: unknown,
): Promise<unknown> => {
  console.log('formData', formData);
  // const response = await axiosInstance.post("/api/register", formData);
  const response = {status: 200, data: formData}
  console.log('registerForOlympiad response', response);
  return response.data;
};

// Ініціація платежу (наприклад, для LiqPay або іншої системи)
export const initiatePayment = async (
  paymentData: unknown,
): Promise<unknown> => {
  const response = await axiosInstance.post("/api/olympiads/payment", paymentData);
  return response.data;
};
