import React from "react";
import { useNavigate } from "react-router-dom";
import { isValid, format } from "date-fns";
// import { ru } from "date-fns/locale/ru";
import { Button } from "@/shared/ui/button";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import { OlympiadTag } from "@/widgets/olympiads-card/OlympiadTag.tsx";
import international from "@/shared/assets/icons/international-mini.png";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import spacem from "@/shared/assets/icons/space-m.png";
import announce from "@/shared/assets/icons/announce.png";
import { getLang } from "@/shared/lib/getLang";
import { cn } from "@/shared/lib/cn.ts";
import { useTranslation } from "react-i18next";
import { calcDays } from "@/shared/lib/calcDays";
import { isDateBefore } from "@/shared/lib/dateRange.ts";

type OlympiadsCardProps = {
  olympiad: Olympiad;
  onCardClick?: (id: number) => void;
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
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const navigate = useNavigate();

  const goToRegister = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiad.id}/register`);
  };

  const goToTraining = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiad.id}/training`);
  };

  const goToStart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiad.id}/start`);
  };

  const olympiadIsPaid =
    olympiad.payment_status === "ok" || olympiad.is_pay === 1;

  const formattedStartDate = formatDate(olympiad.start_date ?? "");
  const formattedEndDate = formatDate(olympiad.end_date ?? "");

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    onCardClick?.(olympiad.id);
  };

  const startDateDistance = calcDays(olympiad.start_date ?? "");
  const endDateDistance = calcDays(olympiad.end_date ?? "");

  return (
    <>
      <div
        className={cn(
          "hidden cursor-pointer items-center justify-between gap-2 rounded-3xl px-2 py-4",
          "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:flex md:gap-4 md:px-4 md:py-4",
          "2xl:gap-6 2xl:px-6 2xl:py-6",
        )}
        onClick={onClick}
      >
        {/* Зображення */}
        <div
          className={cn(
            "h-[184px] w-[175px] overflow-hidden rounded-2xl",
            "lg:w-[200px] lg:min-w-[200px] lg:max-w-[200px]",
            "xl:w-[235px] xl:min-w-[235px] xl:max-w-[235px]",
            "2xl:w-[316px] 2xl:min-w-[316px] 2xl:max-w-[316px]",
          )}
        >
          <img
            className={cn(
              "h-[184px] w-[175px] object-cover",
              "lg:w-[200px]",
              "xl:w-[235px]",
              "2xl:w-[316px]",
            )}
            src={olympiad.image_url || placeholderImg}
            alt={olympiad.title[lang]}
          />
        </div>
        {/* Основна інформація */}
        <div className="h-[184px] flex-1">
          <div className={cn("mb-2 flex h-full flex-col justify-between")}>
            <h3
              className={cn(
                "line-clamp-1 text-xl font-bold leading-5 text-[--color-3]",
                "2xl:text-2xl 2xl:leading-6",
              )}
            >
              {olympiad.title[lang]}
            </h3>
            {/* Короткий опис */}
            <p
              className={cn(
                "mb-2 line-clamp-3 text-sm leading-4 text-[--color-3]",
                "2xl:text-xl 2xl:leading-5",
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
                  label={t(
                    `olympiadCard.country.${lang === "pl" ? "pl" : "uk"}`,
                  )}
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
        <div className="flex h-[184px] flex-col items-end justify-between space-y-2">
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
            {olympiadIsPaid && (
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
            {olympiadIsPaid && (
              <>
                {olympiad.is_done === 1 ? (
                  <span className="text-[--color-error]">
                    {t("olympiadCard.finished")}
                  </span>
                ) : olympiad.is_done === -1 ? (
                  <span className="text-[--color-error]">
                    {t("olympiadCard.finished")}
                  </span>
                ) : (
                  <>
                    <Button variant="secondary" onClick={goToTraining}>
                      {t("olympiadCard.startTraining")}
                    </Button>
                    <Button
                      onClick={goToStart}
                      disabled={isDateBefore(formattedStartDate)}
                    >
                      {t("olympiadCard.start")}
                    </Button>
                  </>
                )}
              </>
            )}
            {(!olympiad.payment_status ||
              olympiad.payment_status === "none" ||
              olympiad.payment_status === "no" ||
              olympiad.is_pay === 0) && (
              <>
                {/* Ціна, якщо вона є */}
                <span
                  className={cn(
                    "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]",
                    "2xl:px-5 2xl:py-3.5 2xl:text-xl 2xl:leading-5",
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
      {/* Мобільна версія */}
      <div
        className={cn(
          "flex cursor-pointer flex-col justify-between gap-2 rounded-3xl px-2 py-4",
          "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:hidden",
        )}
        onClick={onClick}
      >
        <div className="flex gap-2">
          {/* Зображення */}
          <div className={cn("h-[156px] w-[94px] overflow-hidden rounded-2xl")}>
            <img
              className={cn("h-[156px] w-[94px] object-cover")}
              src={olympiad.image_url || placeholderImg}
              alt={olympiad.title[lang]}
            />
          </div>
          {/* Основна інформація */}
          <div className="flex-1">
            {/* Дата (або період проведення) */}
            <div className="mb-2 text-right">
              <span className={cn("text-[10px] leading-3 text-[--color-3]")}>
                {olympiad.end_date
                  ? `${formattedStartDate} - ${formattedEndDate}`
                  : formattedStartDate}
              </span>
              {olympiadIsPaid && (
                <div
                  className={cn(
                    "mt-1 text-nowrap text-[10px] leading-3 text-[--color-3]",
                  )}
                >
                  {startDateDistance && (
                    <>
                      <span>{t("olympiadCard.startIn")}</span>
                      <span className="text-[#E79600]">
                        {startDateDistance}
                      </span>
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
            <div className={cn("mb-2 flex flex-col justify-between gap-2")}>
              <h3
                className={cn(
                  "line-clamp-1 text-base font-bold leading-5 text-[--color-3]",
                )}
              >
                {olympiad.title[lang]}
              </h3>
              {/* Короткий опис */}
              <p
                className={cn(
                  "mb-2 line-clamp-3 text-sm leading-[18px] text-[--color-3]",
                )}
              >
                {olympiad.short_description[lang]}
              </p>
              {/* Тип олімпіади */}
              <div className={cn("flex gap-2")}>
                {olympiad.is_international ? (
                  <OlympiadTag
                    label={t("olympiadCard.international")}
                    icon={international}
                  />
                ) : (
                  <OlympiadTag
                    label={t(
                      `olympiadCard.country.${lang === "pl" ? "pl" : "uk"}`,
                    )}
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
        </div>
        {/* Правий блок: дата, ціна, кнопки дій */}
        <div className={cn("flex items-center gap-3")}>
          {/* Відображення кнопок дій в залежності від статусу оплати */}
          {olympiadIsPaid && (
            <>
              {olympiad.is_done === 1 ? (
                <span className="text-[--color-error]">
                  {t("olympiadCard.finished")}
                </span>
              ) : olympiad.is_done === -1 ? (
                <span className="text-[--color-error]">
                  {t("olympiadCard.finished")}
                </span>
              ) : (
                <>
                  <Button
                    onClick={goToStart}
                    disabled={isDateBefore(formattedStartDate)}
                  >
                    {t("olympiadCard.start")}
                  </Button>
                  <Button variant="secondary" onClick={goToTraining}>
                    {t("olympiadCard.startTraining")}
                  </Button>
                </>
              )}
            </>
          )}
          {(!olympiad.payment_status ||
            olympiad.payment_status === "none" ||
            olympiad.payment_status === "no" ||
            olympiad.is_pay === 0) && (
            <>
              <Button onClick={goToRegister}>
                {t("olympiadCard.participate")}
              </Button>
              {/* Ціна, якщо вона є */}
              <span
                className={cn(
                  "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]",
                  "2xl:px-5 2xl:py-3.5 2xl:text-xl 2xl:leading-5",
                )}
              >
                {olympiad.is_international
                  ? olympiad.international_price
                  : olympiad.local_price}{" "}
                {olympiad.is_international
                  ? olympiad.international_currency
                  : olympiad.local_currency}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};
