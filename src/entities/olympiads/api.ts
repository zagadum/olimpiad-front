import i18n from "@/shared/i18n";
import { axiosInstance } from "@/shared/api/axiosInstance";
import { PaymentCreateRequest, PaymentCreateResponse } from "@/entities/payments/types";

import {
  OlympiadsAgreementResponse,
  OlympiadsResponse,
  OlympiadsTaskListResponse,
  OlympiadsTaskResponse,
  RunOlympiadResponse,
} from "./types";
import { Params } from "@/shared/types";

export const getOlympiads = async (
  params?: Params,
): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get("/api/olympiads", {
    params,
  });
  return response.data;
};

export const getMyOlympiads = async (): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get("/api/olympiads/my");
  return response.data;
};

export const getOlympiadDetail = async (
  id: string,
): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get(`/api/olympiads/${id}`);
  return response.data;
};

export const registerForOlympiad = async (
  formData: unknown,
): Promise<unknown> => {
  const response = await axiosInstance.post("/api/auth/register", formData);
  return response.data;
};

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
  const response = await axiosInstance.post("/api/olympiads/get-task", data);
  return response.data;
};

export const getOlympiadsTaskList = async (
  data: unknown,
): Promise<OlympiadsTaskListResponse> => {
  const response = await axiosInstance.post(
    "/api/olympiads/get-task-list",
    data,
  );
  return response.data;
};

export const runOlympiad = async (
  data: unknown,
): Promise<RunOlympiadResponse> => {
  const response = await axiosInstance.post(
    "/api/olympiads/run-olmypiad",
    data,
  );
  return response.data;
};

export const getOlympiadAgreement = async (
  id: string,
  params?: Params,
): Promise<OlympiadsAgreementResponse> => {
  const response = await axiosInstance.get(`/api/olympiads/agreement/${id}`, {
    params,
  });
  return response.data;
};

export const getOlympiadsRankingList = async (): Promise<OlympiadsResponse> => {
  const response = await axiosInstance.get("/api/olympiads/ratting-list");
  return response.data;
};


export const createPayment = async (
  data: PaymentCreateRequest,
): Promise<PaymentCreateResponse> => {
    const response = await axiosInstance.post(`/api/olympiads/${data.id}/payment`, data, {
    headers: {
      "Accept-Language": data.lang || i18n.language,
    },
  });
  return response.data;
};