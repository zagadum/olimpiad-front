// src/entities/payments/api.ts
import { axiosInstance } from "@/shared/api/axiosInstance";
import i18n from "@/shared/i18n";
import {
  PaymentCreateRequest,
  PaymentCreateResponse,
} from "./types";

export const createPayment = async (
  data: PaymentCreateRequest,
): Promise<PaymentCreateResponse> => {
  const res = await axiosInstance.post("/api/payment/create", data, {
    headers: {
      "Accept-Language": data.lang || i18n.language,
    },
  });
  return res.data;
};
