export interface PaymentFormField {
  name: string;
  value: string;
  type?: string; // 'hidden' | 'text' ...
}

export interface PaymentFormInfo {
  action: string;
  method?: "POST" | "GET";
  fields: PaymentFormField[];
}

export interface PaymentCreateRequest {
  id: string;
  lang?: string;
}

export type PaymentStatus = "created" | "error" | "pending" | "paid";

export interface PaymentCreateResponse {
  id: string;
  amount: number;
  currency: string;
  payUrl?: string;
  form_info?: PaymentFormInfo;
  status: PaymentStatus;
}
