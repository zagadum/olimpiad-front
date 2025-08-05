import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";
import { Button } from "@/shared/ui/button";
import { getLang } from "@/shared/lib/getLang.ts";
import { useTranslation } from "react-i18next";
import "./style.css";
import { cn } from "@/shared/lib/cn";
import { isDateBefore } from "@/shared/lib/dateRange";
import { formatDate } from "@/shared/lib/formatDate";

export const OverviewPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

  const formattedEndDate = formatDate(data?.end_date ?? "");

  const olympiadIsPaid = data?.payment_status === "ok" || data?.is_pay === 1;

  const goToRegister = () => {
    navigate(`/olympiads/${olympiadId}/register`);
  };

  const goToTraining = () => {
    navigate(`/olympiads/${olympiadId}/training`);
  };

  const goToStart = () => {
    navigate(`/olympiads/${olympiadId}/start`);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div
      className={cn(
        "olympiad-overview mt-8 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 pb-20 pt-4 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "md:rounded-3xl md:px-9 md:pb-9 md:pt-9",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
        <h2 className={cn("mb-3 text-xl font-bold", "md:mb-4 md:text-3xl")}>
          {t("olympiadOverview.title")}
        </h2>
        <div className="mb-2 flex gap-3 md:mb-4 md:gap-8">
          {(!data?.payment_status ||
            data?.payment_status === "none" ||
            data?.payment_status === "no" ||
            data?.is_pay === 0) && (
            <Button onClick={goToRegister}>
              {t("olympiadOverview.participate")}
            </Button>
          )}
          {olympiadIsPaid && (
            <>
              <Button variant="secondary" onClick={goToTraining}>
                {t("olympiadOverview.startTraining")}
              </Button>
              <Button onClick={goToStart} disabled={isDateBefore(formattedEndDate)}>{t("olympiadOverview.start")}</Button>
            </>
          )}
        </div>
      </div>
      <div
        className="full-description rounded-3xl bg-[--color-5] p-4 text-sm font-light text-[#A5A5A5] md:text-xl"
        dangerouslySetInnerHTML={{ __html: data?.full_description[lang] ?? "" }}
      ></div>
    </div>
  );
};
