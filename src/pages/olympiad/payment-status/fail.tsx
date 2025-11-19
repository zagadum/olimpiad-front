// `src/pages/olympiad/payment-status/fail.tsx`
import React from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { failDescription, useLocalizedDescription } from "../payment-status/descriptions";

export const PaymentFailPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const description = useLocalizedDescription(failDescription);

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div
        className={cn(
          "mt-10 w-full rounded-xl bg-gradient-to-t from-[#340808] to-[#4D1919] px-4 pb-12 pt-8",
          "md:mt-20 md:max-w-[1286px] md:rounded-3xl md:px-16 md:pb-24 md:pt-16"
        )}
      >
        <h2 className="mb-6 text-xl font-bold md:px-4 md:mb-10 md:text-3xl">
          {t("paymentStatus.error.title")}
        </h2>
        <div
          className="rounded-xl bg-[--color-5] p-4 text-sm text-[--color-placeholder] md:rounded-3xl md:text-base"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="w-full max-w-[1286px] flex gap-4 md:p-4">
        <Button
          className="flex-1 text-base lg:px-8 lg:py-3"
          onClick={() => navigate("..")}
        >
          {t("common.back")}
        </Button>
        <Button
          className="flex-1 text-base lg:px-8 lg:py-3"
          onClick={() => window.location.reload()}
        >
          {t("paymentStatus.retry")}
        </Button>
      </div>
    </div>
  );
};
