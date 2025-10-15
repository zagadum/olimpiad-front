import React from "react";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import arrowBackIcon from "@/shared/assets/icons/ion_arrow-back.svg";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/cn";
import { formatDate } from "@/shared/lib/formatDate";
import { calcDays } from "@/shared/lib/calcDays";
import { useLanguage } from "@/widgets/olympiads-card/hooks";
import { useNavigate } from "react-router-dom";

type OlympiadsCardProps = {
  olympiad?: Olympiad;
};

export const OlympiadHeader: React.FC<OlympiadsCardProps> = ({ olympiad }) => {
  const { t } = useTranslation();
  const lang = useLanguage();
  const navigate = useNavigate();

  const olympiadIsPaid = olympiad?.payment_status === "ok" || olympiad?.is_pay === 1

  const formattedStartDate = formatDate(olympiad?.start_date ?? "");
  const formattedEndDate = formatDate(olympiad?.end_date ?? "");

  const startDateDistance = calcDays(olympiad?.start_date ?? "", lang);
  const endDateDistance = calcDays(olympiad?.end_date ?? "", lang);

  const onGoBack = () => {
    // window.history.back();
    navigate('..');
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-xl px-2 py-1.5",
        "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "md:gap-6 md:rounded-3xl md:px-4 md:py-2.5",
        "xl:gap-8 xl:rounded-3xl xl:px-6 xl:py-3",
      )}
    >
      <img
        className="w-[40px] cursor-pointer rounded-full border border-transparent transition hover:border-[--color-1] md:w-[52px] xl:w-[64px]"
        src={arrowBackIcon}
        alt=""
        onClick={onGoBack}
      />
      {/* Зображення */}
      <div
        className={cn(
          "h-[77px] w-[52px] shrink-0 overflow-hidden rounded-md",
          "md:h-22 md:w-40 md:rounded-2xl",
          "xl:h-28 xl:w-48 xl:rounded-2xl",
        )}
      >
        <img
          className={cn("h-[77px] w-[52px] object-cover", "md:h-28 md:w-48")}
          src={olympiad?.cover[lang] || placeholderImg}
          alt=""
        />
      </div>
      {/* Основна інформація */}
      <div className="hidden flex-1 md:block">
        <div className="mb-2 flex h-full flex-col justify-between">
          <h3
            className={cn(
              "line-clamp-2 text-sm font-bold leading-4 text-[--color-3]",
              "md:text-xl md:leading-6",
              "xl:text-2xl xl:leading-7",
            )}
          >
            {olympiad?.title[lang]}
          </h3>
          {/* Короткий опис */}
        </div>
      </div>
      {/* Правий блок: дата, ціна, кнопки дій */}
      <div className="flex w-full flex-col justify-between gap-2 md:w-auto md:items-end">
        <div className="md:hidden">
          <h3
            className={cn(
              "line-clamp-2 text-sm font-bold leading-4 text-[--color-3]",
            )}
          >
            {olympiad?.title[lang]}
          </h3>
        </div>
        {/* Дата (або період проведення) */}
        <div className="text-right">
          {(!olympiad?.payment_status ||
            olympiad?.payment_status === "none" ||
            olympiad?.payment_status === "no" ||
            olympiad?.is_pay === 0) && (
            <span
              className={cn(
                "mr-6 text-nowrap rounded-full border border-[--color-2] px-3 py-2 text-[10px] leading-3 text-[--color-3]",
                "md:mr-6 md:px-4 md:py-2.5 md:text-base md:leading-4",
                "xl:mr-8 xl:px-5 xl:py-3 xl:text-lg xl:leading-4",
              )}
            >
              {olympiad?.local_price} {olympiad?.local_currency}
            </span>
          )}
          <span
            className={cn(
              "text-[10px] leading-3 text-[--color-3]",
              "md:text-lg md:leading-5",
              "xl:text-xl xl:leading-5",
            )}
          >
            {olympiad?.end_date
              ? `${formattedStartDate} - ${formattedEndDate}`
              : formattedStartDate}
          </span>
          {olympiadIsPaid && (
            <div className="mt-3 hidden text-nowrap text-lg leading-5 xl:text-xl xl:leading-6 text-[--color-3] md:block">
              {!!startDateDistance && (
                <div>
                  <span>{t("olympiadHeader.startIn")}</span>
                  <span className="text-lg leading-5 text-[#E79600] xl:text-xl xl:leading-6">
                    {startDateDistance}
                  </span>
                </div>
              )}
              {!!endDateDistance && (
                <div>
                  <span>{t("olympiadHeader.endIn")}</span>
                  <span className="text-xl leading-6 text-[#E79600]">
                    {endDateDistance}
                  </span>
                </div>
              )}
              {/*<div>*/}
              {/*  <span>{t("olympiadHeader.startIn")}</span>*/}
              {/*  <span className="text-xl leading-6 text-[#E79600]">*/}
              {/*      {startDateDistance}*/}
              {/*    </span>*/}
              {/*</div>*/}
              {/*<div>*/}
              {/*  <span>{t("olympiadHeader.endIn")}</span>*/}
              {/*  <span className="text-xl leading-6 text-[#E79600]">*/}
              {/*      {endDateDistance}*/}
              {/*    </span>*/}
              {/*</div>*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
