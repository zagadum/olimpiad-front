import React from "react";
// import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict, isAfter, isValid, format } from "date-fns";
import { uk } from "date-fns/locale/uk";
// import { ru } from "date-fns/locale/ru";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import arrowBackIcon from "@/shared/assets/icons/ion_arrow-back.svg";
import i18n from "@/shared/i18n";
import { useTranslation } from "react-i18next";

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

const formatDate = (date: string) => {
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid) {
    return format(parsedDate, "dd.MM.yyyy");
  }
  return date;
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

  const formattedStartDate = formatDate(olympiad?.start_date ?? "");
  const formattedEndDate = formatDate(olympiad?.end_date ?? "");

  const startDateDistance = calcDays(olympiad?.start_date ?? "");
  const endDateDistance = calcDays(olympiad?.end_date ?? "");

  const onGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex items-center justify-between gap-8 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-6 py-3 shadow-[-1px_-1px_1px_-0px_#657E8A]">
      {/* Зображення */}
      <img
        className="cursor-pointer rounded-full border border-transparent transition hover:border-[--color-1]"
        src={arrowBackIcon}
        alt=""
        onClick={onGoBack}
      />
      <div className="hidden h-28 w-48 overflow-hidden rounded-2xl xl:block">
        <img
          className="h-28 w-48 object-cover"
          src={olympiad?.image_url || placeholderImg}
          alt=""
        />
      </div>
      {/* Основна інформація */}
      <div className="flex-1">
        <div className="mb-2 flex h-full flex-col justify-between">
          <h3 className="line-clamp-2 text-2xl font-bold leading-5 text-[--color-3]">
            {olympiad?.title[lang]}
          </h3>
          {/* Короткий опис */}
        </div>
      </div>
      {/* Правий блок: дата, ціна, кнопки дій */}
      <div className="flex flex-col items-end justify-between space-y-2">
        {/* Дата (або період проведення) */}
        <div className="text-right">
          {(!olympiad?.payment_status ||
            olympiad?.payment_status === "none") && (
            <span className="mr-8 text-nowrap rounded-full border border-[--color-2] px-7 py-4 text-xl leading-4 text-[--color-3]">
              {olympiad?.local_price} {olympiad?.local_currency}
            </span>
          )}
          <span className="text-xl leading-4 text-[--color-3]">
            {olympiad?.end_date
              ? `${formattedStartDate} - ${formattedEndDate}`
              : formattedStartDate}
          </span>
          {olympiad?.payment_status === "ok" && (
            <div className="mt-3 text-nowrap text-xl leading-6 text-[--color-3]">
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
