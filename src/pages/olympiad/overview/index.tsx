import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";
import { Button } from "@/shared/ui/button";
import { getLang } from "@/shared/lib/getLang";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import "./style.css";

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

  const renderButtons = () => {
    if (olympiadIsPaid) {
      if (data?.is_done === 1) {
        return (
          <span className="text-[--color-2]">
            {t("olympiadCard.waitResults")}
          </span>
        );
      }
      if (data?.is_done === -1) {
        return (
          <span className="text-[--color-error]">
            {t("olympiadCard.finished")}
          </span>
        );
      }

      if (data?.status === "completed") {
        return (
          <span className="text-[--color-error]">
            {t("olympiadCard.finished")}
          </span>
        );
      }

      return (
        <>
          <Button variant="secondary" onClick={goToTraining}>
            {t("olympiadOverview.startTraining")}
          </Button>
          {data?.status !== "announced" && (
            <Button onClick={goToStart}>{t("olympiadOverview.start")}</Button>
          )}
        </>
      );
    }
  };

  if (isLoading) return <div>{t("global.loading")}</div>;
  if (error) return <div>{t("global.fetchError")}</div>;

  return (
    <div
      className={cn(
        "olympiad-overview mt-8 rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 pb-20 pt-4 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "md:rounded-2xl md:px-6 md:pb-6 md:pt-6",
        "xl:rounded-3xl xl:px-9 xl:pb-9 xl:pt-9",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-6">
        <h2
          className={cn(
            "mb-3 text-xl font-bold",
            "md:mb-4 md:text-2xl",
            "xl:mb-4 xl:text-2xl",
          )}
        >
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
          {renderButtons()}
        </div>
      </div>
      <div
        className="full-description rounded-3xl bg-[--color-5] p-4 text-sm font-light text-[#A5A5A5] md:text-lg xl:text-xl"
        dangerouslySetInnerHTML={{ __html: data?.full_description[lang] ?? "" }}
      ></div>
    </div>
  );
};
