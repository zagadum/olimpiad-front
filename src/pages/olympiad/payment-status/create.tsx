import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import i18n from "@/shared/i18n";
import { createPayment } from "@/entities/payments/api";
import { PaymentCreateResponse, PaymentFormField } from "@/entities/payments/types";


// Иконки оплаты из папки images/pay
import visa from "@/shared/assets/images/pay/visa.svg";
import imoje from "@/shared/assets/images/pay/imoje.svg";


//import mastercard from "@/images/pay/mastercard.svg";
//import applepay from "@/images/pay/apple-pay.svg";
//import googlepay from "@/images/pay/google-pay.svg";

export const PaymentCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();
    //const lang = getLang(i18n.language);
    const { data } = useQuery({
        queryKey: ["olympiad", olympiadId,'payment'],

        queryFn: () => createPayment({ id: olympiadId!, lang: i18n.language }),
        select: (response) => response.data_list,
        enabled: !!olympiadId,
    });

  const formRef = React.useRef<HTMLFormElement | null>(null);

  // @ts-ignore
    const {
    mutate,

    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation<PaymentCreateResponse, Error>({
    mutationKey: ["payment", olympiadId],
    mutationFn: () =>
      createPayment({ id: olympiadId!, lang: i18n.language }),
  });

  React.useEffect(() => {
    if (olympiadId ) {
      mutate();
    }
  }, [olympiadId,  mutate]);

  const handlePay = () => {
    if (data?.form_info && formRef.current) {
      formRef.current.submit();
      return;
    }
    if (data?.payUrl) {
      window.location.href = data.payUrl;
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div
        className={cn(
          "mt-10 w-full rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 pb-12 pt-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:mt-20 md:max-w-[960px] md:rounded-3xl md:px-12 md:pb-16 md:pt-14"
        )}
      >
        <h2 className="mb-6 text-xl font-bold md:text-3xl">
          {t("paymentStatus.created.title", "Оплата")}
        </h2>

        {isPending && (
          <p className="text-sm md:text-base">
            {t("paymentStatus.pending.loading", "Загрузка данных платежа...")}
          </p>
        )}

        {isError && (
          <div className="space-y-4">
            <p className="text-red-400 text-sm">
              {t("data.message", "Ошибка создания платежа.")}
            </p>
            <p className="text-xs opacity-70">{error.message}</p>
            <div className="flex gap-4">
              <Button onClick={() => mutate()} className="flex-1">
                {t("paymentStatus.retry", "Повторить")}
              </Button>
              <Button
                onClick={() => {
                  reset();
                  navigate("..");
                }}
                className="flex-1"
              >
                {t("common.back", "Назад")}
              </Button>
            </div>
          </div>
        )}

        {isSuccess && data && (
          <div className="space-y-6">
            <div className="rounded-xl bg-[--color-5] p-4 md:p-6">
              <div className="flex justify-between text-sm md:text-base">
                <span>{t("payment.amount", "Сумма")}:</span>
                <strong>{data.amount}</strong>
              </div>
              <div className="flex justify-between text-sm md:text-base mt-2">
                <span>{t("payment.currency", "Валюта")}:</span>
                <strong>{data.currency}</strong>
              </div>
              {data.form_info && (
                <div className="mt-4 text-xs opacity-70">
                  {t(
                    "payment.form.notice",
                    "Параметры формы подготовлены. Нажмите Оплатить для отправки данных."
                  )}
                </div>
              )}
              {!data.form_info && data.payUrl && (
                <div className="mt-4 text-xs opacity-70">
                  {t(
                    "payment.notice",
                    "Нажмите Оплатить для перехода к платежу."
                  )}
                </div>
              )}
            </div>

            {data.form_info && (
              <form
                ref={formRef}
                action={data.form_info.action}
                method={data.form_info.method || "POST"}
                className="hidden"
              >
                {data.form_info.fields.map((f: PaymentFormField) => (
                  <input
                    key={f.name}
                    type={f.type || "hidden"}
                    name={f.name}
                    defaultValue={f.value}
                  />
                ))}
              </form>
            )}

            <Button
              className="w-full md:w-auto lg:px-8 lg:py-3"
              onClick={handlePay}
              disabled={isPending}
            >
              {t("payment.pay", "Оплатить")}
            </Button>
              <div className="mt-4 text-xs opacity-70">
                  {t(
                      "payment.form.bank",
                      "Оплата осуществляется через безопасный платежный шлюз imiоje."
                  )}
              </div>
              <div className="flex items-center gap-3">
                  <img src={visa} alt={t("payment.icons.visa", "Visa")} className="h-6" />
                  <img src={imoje} alt={t("payment.icons.imoje", "imoje")} className="h-6" />
                  {/*<img src={mastercard} alt={t("payment.icons.mastercard", "Mastercard")} className="h-6" />*/}
                  {/*<img src={applepay} alt={t("payment.icons.applepay", "Apple Pay")} className="h-6" />*/}
                  {/*<img src={googlepay} alt={t("payment.icons.googlepay", "Google Pay")} className="h-6" />*/}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};
