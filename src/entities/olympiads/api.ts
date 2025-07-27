import { axiosInstance } from "@/shared/api/axiosInstance";
import {
  OlympiadsAgreementResponse,
  // Olympiad,
  OlympiadsResponse,
  OlympiadsTaskListResponse,
  OlympiadsTaskResponse,
  RunOlympiadResponse
} from "./types";
import { Params } from "@/shared/types";

// Отримання всіх олімпіад
export const getOlympiads = async (
  params?: Params,
): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get("/api/olympiads", {
    params,
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
export const getOlympiadDetail = async (
  id: string,
): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get(`/api/olympiads/${id}`);
  return response.data;
};

// Реєстрація на олімпіаду
export const registerForOlympiad = async (
  formData: unknown,
): Promise<unknown> => {
  console.log("registerForOlympiad formData", formData);
  const response = await axiosInstance.post("/api/auth/register", formData);
  console.log("registerForOlympiad response", response);
  return response.data;
};

// Ініціація платежу (наприклад, для LiqPay або іншої системи)
export const initiatePayment = async (
  paymentData: unknown,
): Promise<unknown> => {
  const response = await axiosInstance.post(
    "/api/olympiads/payment",
    paymentData,
  );
  return response.data;
};

export const getOlympiadsTask = async (
  data: unknown,
): Promise<OlympiadsTaskResponse> => {
  console.log("getOlympiadsTask data", data);
  const response = await axiosInstance.post("/api/olympiads/get-task", data);
  console.log("getOlympiadsTask response", response);
  return response.data;
};

export const getOlympiadsTaskList = async (
  data: unknown,
): Promise<OlympiadsTaskListResponse> => {
  console.log("getOlympiadsTaskList data", data);
  const response = await axiosInstance.post(
    "/api/olympiads/get-task-list",
    data,
  );
  console.log("getOlympiadsTaskList response", response);
  return response.data;
};

export const runOlympiad = async (
  data: unknown,
): Promise<RunOlympiadResponse> => {
  console.log("runOlympiad data", data);
  const response = await axiosInstance.post(
    "/api/olympiads/run-olmypiad",
    data,
  );
  console.log("runOlympiad response", response);
  return response.data;
};

export const getOlympiadAgreement = async (
  id: string,
  params?: Params,
): Promise<OlympiadsAgreementResponse> => {
  const response = await axiosInstance.get(`/api/olympiads/agreement/${id}`, { params });
  return response.data;
};
