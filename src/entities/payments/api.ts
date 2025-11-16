// src/entities/payments/api.ts
import { axiosInstance } from "@/shared/api/axiosInstance";

import {
  PaymentCreateRequest,
  PaymentCreateResponse,
} from "./types";

export const createPayment = async (
  data: PaymentCreateRequest,
): Promise<PaymentCreateResponse> => {
  const res = await axiosInstance.post("/api/payment/create", data);
  return res.data;
};
