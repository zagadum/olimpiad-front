import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict, isAfter, isValid, format } from "date-fns";
import { uk } from "date-fns/locale/uk";
// import { ru } from "date-fns/locale/ru";
import { Button } from "@/shared/ui/button";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import { OlympiadTag } from "@/widgets/olympiads-card/OlympiadTag.tsx";
import international from "@/shared/assets/icons/international.svg";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import spacem from "@/shared/assets/icons/spacem.svg";
import announce from "@/shared/assets/icons/announce.svg";
import { getLang } from "@/shared/lib/getLang";
import { cn } from "@/shared/lib/cn.ts";
import { useTranslation } from "react-i18next";

type OlympiadsCardProps = {
  olympiad: Olympiad;
  onCardClick?: (id: number) => void;
};

const calcDays = (date: string) => {
  const dateNow = Date.now();
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid && isAfter(parsedDate, dateNow)) {
    return formatDistanceToNowStrict(parsedDate, { locale: uk });
  }
  return "";
};

const formatDate = (date: string) => {
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid) {
    return format(parsedDate, "dd.MM.yyyy");
  }
  return date;
};

export const OlympiadsCard: React.FC<OlympiadsCardProps> = ({
  olympiad,
  onCardClick,
}) => {
  const lang = getLang();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToRegister = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiad.id}/register`);
  };

  const formattedStartDate = formatDate(olympiad.start_date ?? "");
  const formattedEndDate = formatDate(olympiad.end_date ?? "");

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    onCardClick?.(olympiad.id);
  };

  const startDateDistance = calcDays(olympiad.start_date ?? "");
  const endDateDistance = calcDays(olympiad.end_date ?? "");

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-between gap-6 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] p-5 shadow-[-1px_-1px_1px_-0px_#657E8A]",
        "2xl:gap-8 2xl:p-6",
      )}
      onClick={onClick}
    >
      {/* Зображення */}
      <div
        className={cn(
          "overflow-hidden rounded-2xl",
          "xl:h-[184px] xl:w-[175px] xl:min-w-[175px] xl:max-w-[175px]",
          "2xl:h-[184px] 2xl:w-[316px] 2xl:min-w-[316px] 2xl:max-w-[316px]",
        )}
      >
        <img
          className={cn(
            "object-cover",
            "xl:h-[184px] xl:w-[175px]",
            "2xl:h-[184px] 2xl:w-[16.45vw]",
          )}
          src={olympiad.image_url || placeholderImg}
          alt={olympiad.title[lang]}
        />
      </div>
      {/* Основна інформація */}
      <div className="h-[184px] flex-1">
        <div
          className={cn(
            "mb-2 flex h-full flex-col justify-between",
            "lg:max-w-[420px]",
            "2xl:max-w-[480px]",
          )}
        >
          <h3
            className={cn(
              "line-clamp-2 text-xl font-bold leading-5 text-[--color-3]",
              "2xl:text-2xl",
            )}
          >
            {olympiad.title[lang]}
          </h3>
          {/* Короткий опис */}
          <p
            className={cn(
              "mb-2 line-clamp-2 text-base leading-5 text-[--color-3]",
              "2xl:text-xl",
            )}
          >
            {olympiad.short_description[lang]}
          </p>
          {/* Тип олімпіади */}
          <div className={cn("flex gap-2", "2xl:gap-3")}>
            {olympiad.is_international ? (
              <OlympiadTag
                label={t("olympiadCard.international")}
                icon={international}
              />
            ) : (
              <OlympiadTag
                label={t(`olympiadCard.country.${lang === "pl" ? "pl" : "uk"}`)}
                icon={lang === "pl" ? polish : ukrainian}
              />
            )}
            {olympiad.promotion === "olympiad" && (
              <OlympiadTag
                label={t("olympiadCard.promotion.olympiad")}
                icon={spacem}
              />
            )}
            {olympiad.promotion === "ads" && (
              <OlympiadTag
                label={t("olympiadCard.promotion.ads")}
                icon={announce}
              />
            )}
          </div>
        </div>
      </div>
      {/* Правий блок: дата, ціна, кнопки дій */}
      <div className="flex h-[184px] flex-col items-end justify-between space-y-2 2xl:min-w-[450px]">
        {/* Дата (або період проведення) */}
        <div className="text-right">
          <span
            className={cn(
              "text-base leading-4 text-[--color-3]",
              "2xl:text-xl 2xl:leading-4",
            )}
          >
            {olympiad.end_date
              ? `${formattedStartDate} - ${formattedEndDate}`
              : formattedStartDate}
          </span>
          {olympiad.payment_status === "ok" && (
            <div
              className={cn(
                "mt-2 text-nowrap text-sm leading-4 text-[--color-3]",
                "2xl:mt-3 2xl:text-nowrap 2xl:text-xl 2xl:leading-4",
              )}
            >
              {startDateDistance && (
                <>
                  <span>{t("olympiadCard.startIn")}</span>
                  <span className="text-[#E79600]">{startDateDistance}</span>
                </>
              )}
              {startDateDistance && endDateDistance && " | "}
              {endDateDistance && (
                <>
                  <span>{t("olympiadCard.endIn")}</span>
                  <span className="text-[#E79600]">{endDateDistance}</span>
                </>
              )}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex flex-wrap items-center justify-end gap-3",
            "2xl:gap-4",
          )}
        >
          {/* Відображення кнопок дій в залежності від статусу оплати */}
          {olympiad.payment_status === "ok" && (
            <>
              <Button variant="secondary">
                {t("olympiadCard.startTraining")} (
                {olympiad.training_count || 0})
              </Button>
              <Button onClick={goToRegister}>{t("olympiadCard.start")}</Button>
            </>
          )}
          {(!olympiad.payment_status || olympiad.payment_status === "none") && (
            <>
              {/* Ціна, якщо вона є */}
              <span
                className={cn(
                  "text-nowrap rounded-full border border-[--color-2] px-5 py-4 text-base leading-4 text-[--color-3]",
                  "2xl:px-7 2xl:py-5 2xl:text-xl",
                )}
              >
                {olympiad.is_international
                  ? olympiad.international_price
                  : olympiad.local_price}{" "}
                {olympiad.is_international
                  ? olympiad.international_currency
                  : olympiad.local_currency}
              </span>
              <Button onClick={goToRegister}>
                {t("olympiadCard.participate")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
