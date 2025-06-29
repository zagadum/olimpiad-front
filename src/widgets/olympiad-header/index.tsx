import React from "react";
import { formatDistanceToNowStrict, isAfter, isValid } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import arrowBackIcon from "@/shared/assets/icons/ion_arrow-back.svg";
import i18n from "@/shared/i18n";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/cn";
import { formatDate } from "@/shared/lib/formatDate.ts";

type OlympiadsCardProps = {
  olympiad?: Olympiad;
};

const calcDays = (date: string) => {
  const dateNow = Date.now();
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid && isAfter(parsedDate, dateNow)) {
    return formatDistanceToNowStrict(parsedDate, { locale: uk });
  }
  return 0;
};

type Lang = "uk" | "pl";
const languages: Lang[] = ["uk", "pl"];

const getLang = (): Lang => {
  if (languages.includes(i18n.language as Lang)) {
    return i18n.language as Lang;
  }
  return "uk";
};

export const OlympiadHeader: React.FC<OlympiadsCardProps> = ({ olympiad }) => {
  const { t } = useTranslation();
  const lang = getLang();

  const olympiadIsPaid = olympiad?.payment_status === "ok" || olympiad?.is_pay === 1

  const formattedStartDate = formatDate(olympiad?.start_date ?? "");
  const formattedEndDate = formatDate(olympiad?.end_date ?? "");

  const startDateDistance = calcDays(olympiad?.start_date ?? "");
  const endDateDistance = calcDays(olympiad?.end_date ?? "");

  const onGoBack = () => {
    window.history.back();
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-xl px-2 py-1.5",
        "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "md:gap-8 md:rounded-3xl md:px-6 md:py-3",
      )}
    >
      <img
        className="w-[40px] cursor-pointer rounded-full border border-transparent transition hover:border-[--color-1] md:w-[64px]"
        src={arrowBackIcon}
        alt=""
        onClick={onGoBack}
      />
      {/* Зображення */}
      <div
        className={cn(
          "h-[77px] w-[52px] min-w-[52px] overflow-hidden rounded-md",
          "md:h-28 md:w-48 md:rounded-2xl",
        )}
      >
        <img
          className={cn("h-[77px] w-[52px] object-cover", "md:h-28 md:w-48")}
          src={olympiad?.image_url || placeholderImg}
          alt=""
        />
      </div>
      {/* Основна інформація */}
      <div className="hidden flex-1 md:block">
        <div className="mb-2 flex h-full flex-col justify-between">
          <h3
            className={cn(
              "line-clamp-2 text-sm font-bold leading-4 text-[--color-3]",
              "md:text-2xl md:leading-6",
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
                "md:mr-8 md:px-7 md:py-4 md:text-xl md:leading-4",
              )}
            >
              {olympiad?.local_price} {olympiad?.local_currency}
            </span>
          )}
          <span
            className={cn(
              "text-[10px] leading-3 text-[--color-3]",
              "md:text-xl md:leading-4",
            )}
          >
            {olympiad?.end_date
              ? `${formattedStartDate} - ${formattedEndDate}`
              : formattedStartDate}
          </span>
          {olympiadIsPaid && (
            <div className="mt-3 hidden text-nowrap text-xl leading-6 text-[--color-3] md:block">
              {!!startDateDistance && (
                <div>
                  <span>{t("olympiadHeader.startIn")}</span>
                  <span className="text-xl leading-6 text-[#E79600]">
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
