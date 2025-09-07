import React, { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { isValid, format } from "date-fns";
import { Button } from "@/shared/ui/button";
import { Olympiad } from "@/entities/olympiads";
import placeholderImg from "@/shared/assets/images/olympiad-placeholder.jpeg";
import { OlympiadTag } from "@/widgets/olympiads-card/OlympiadTag";
import international from "@/shared/assets/icons/international-mini.png";
import spacem from "@/shared/assets/icons/space-m.png";
import announce from "@/shared/assets/icons/announce.png";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import { calcDays } from "@/shared/lib/calcDays";
import { useLanguage } from "./hooks";

type OlympiadsCardProps = {
  olympiad: Olympiad;
  onCardClick?: (id: number) => void;
};

// Утиліта для форматування дати
const formatDate = (date: string) => {
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid) {
    return format(parsedDate, "dd.MM.yyyy");
  }
  return date;
};

// Компонент для відображення зображення
const OlympiadImage: React.FC<{
  olympiad: Olympiad;
  lang: string;
  isMobile?: boolean;
}> = React.memo(({ olympiad, lang, isMobile = false }) => {
  const imageSrc =
    olympiad.cover[lang as keyof typeof olympiad.cover] || placeholderImg;

  const imageClasses = isMobile
    ? "h-[156px] w-[94px] object-cover"
    : cn("h-[140px] w-[190px] lg:w-[240px] xl:h-[184px] xl:w-[316px] object-cover");

  const containerClasses = isMobile
    ? "h-[156px] w-[94px] overflow-hidden rounded-2xl flex-shrink-0"
    : cn("h-[140px] w-[190px] lg:w-[240px] xl:h-[184px] xl:w-[316px] overflow-hidden rounded-2xl shrink-0");

  return (
    <div className={containerClasses}>
      <img
        className={imageClasses}
        src={imageSrc}
        alt={olympiad.title[lang as keyof typeof olympiad.title]}
        loading="lazy"
      />
    </div>
  );
});

// Компонент для відображення тегів
const OlympiadTags: React.FC<{ olympiad: Olympiad }> = React.memo(
  ({ olympiad }) => {
    const { t } = useTranslation();

    return (
      <div className={cn("flex gap-2", "2xl:gap-3")}>
        {olympiad.is_international ? (
          <OlympiadTag
            label={t("olympiadCard.international")}
            icon={international}
          />
        ) : (
          <OlympiadTag
            label={olympiad.country_name}
            icon={`/images/country/${olympiad.country_img}`}
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
    );
  },
);

// Компонент для відображення дат
const OlympiadDates: React.FC<{
  olympiad: Olympiad;
  formattedStartDate: string;
  formattedEndDate: string;
  startDateDistance: string;
  endDateDistance: string;
  olympiadIsPaid: boolean;
  isMobile?: boolean;
}> = React.memo(
  ({
    olympiad,
    formattedStartDate,
    formattedEndDate,
    startDateDistance,
    endDateDistance,
    olympiadIsPaid,
    isMobile = false,
  }) => {
    const { t } = useTranslation();
    const dateText = olympiad.end_date
      ? `${formattedStartDate} - ${formattedEndDate}`
      : formattedStartDate;

    const textClasses = isMobile
      ? "text-[10px] leading-3 text-[--color-3]"
      : cn("text-base leading-4 text-[--color-3]", "2xl:text-xl 2xl:leading-4");

    const distanceClasses = isMobile
      ? "mt-1 text-nowrap text-[10px] leading-3 text-[--color-3]"
      : cn(
          "mt-2 text-nowrap text-sm leading-4 text-[--color-3]",
          "2xl:mt-3 2xl:text-nowrap 2xl:text-xl 2xl:leading-4",
        );

    return (
      <div className="text-right">
        <span className={textClasses}>{dateText}</span>
        {olympiadIsPaid && (
          <div className={distanceClasses}>
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
    );
  },
);

// Компонент для відображення ціни
const OlympiadPrice: React.FC<{ olympiad: Olympiad; isMobile?: boolean }> =
  React.memo(({ olympiad, isMobile = false }) => {
    const price = olympiad.is_international
      ? olympiad.international_price
      : olympiad.local_price;

    const currency = olympiad.is_international
      ? olympiad.international_currency
      : olympiad.local_currency;

    const priceClasses = isMobile
      ? "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]"
      : cn(
          "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]",
          "2xl:px-5 2xl:py-3.5 2xl:text-xl 2xl:leading-5",
        );

    return (
      <span className={priceClasses}>
        {price} {currency}
      </span>
    );
  });

// Компонент для відображення кнопок дій
const OlympiadActions: React.FC<{
  olympiad: Olympiad;
  olympiadIsPaid: boolean;
  formattedDate?: string;
  onRegister: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTraining: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onStart: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMobile?: boolean;
}> = React.memo(
  ({
    olympiad,
    olympiadIsPaid,
    onRegister,
    onTraining,
    onStart,
    isMobile = false,
  }) => {
    const { t } = useTranslation();
    const containerClasses = isMobile
      ? "flex items-center gap-3"
      : cn("flex flex-wrap items-center justify-end gap-3", "2xl:gap-4");

    if (olympiadIsPaid) {
      if (olympiad.is_done === 1) {
        return (
          <div className={containerClasses}>
            <span className="text-[--color-2]">
              {t("olympiadCard.waitResults")}
            </span>
          </div>
        );
      }
      if (olympiad.is_done === -1) {
        return (
          <div className={containerClasses}>
            <span className="text-[--color-error]">
              {t("olympiadCard.finished")}
            </span>
          </div>
        );
      }

      if (olympiad.status === "completed") {
        return (
          <div className={containerClasses}>
            <span className="text-[--color-error]">
              {t("olympiadCard.finished")}
            </span>
          </div>
        );
      }

      return (
        <div className={containerClasses}>
          <Button variant="secondary" onClick={onTraining}>
            {t("olympiadCard.startTraining")}
          </Button>
          {olympiad.status !== "announced" && (
            <Button onClick={onStart}>{t("olympiadCard.start")}</Button>
          )}
        </div>
      );
    }

    return (
      <div className={containerClasses}>
        <OlympiadPrice olympiad={olympiad} isMobile={isMobile} />
        <Button onClick={onRegister}>{t("olympiadCard.participate")}</Button>
      </div>
    );
  },
);

// Основний компонент
export const OlympiadsCard: React.FC<OlympiadsCardProps> = React.memo(
  ({ olympiad, onCardClick }) => {
    const lang = useLanguage();
    const navigate = useNavigate();

    // Мемоізовані обчислення
    const olympiadIsPaid = useMemo(
      () => olympiad.payment_status === "ok" || olympiad.is_pay === 1,
      [olympiad.payment_status, olympiad.is_pay],
    );

    const formattedStartDate = useMemo(
      () => formatDate(olympiad.start_date ?? ""),
      [olympiad.start_date],
    );

    const formattedEndDate = useMemo(
      () => formatDate(olympiad.end_date ?? ""),
      [olympiad.end_date],
    );

    const startDateDistance = useMemo(
      () => calcDays(olympiad.start_date ?? "", lang),
      [olympiad.start_date, lang],
    );

    const endDateDistance = useMemo(
      () => calcDays(olympiad.end_date ?? "", lang),
      [olympiad.end_date, lang],
    );

    // Мемоізовані обробники подій
    const handleCardClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (olympiad.status !== "completed") {
          onCardClick?.(olympiad.id);
        }
      },
      [onCardClick, olympiad.id],
    );

    const handleRegister = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/olympiads/${olympiad.id}/register`);
      },
      [navigate, olympiad.id],
    );

    const handleTraining = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/olympiads/${olympiad.id}/training`);
      },
      [navigate, olympiad.id],
    );

    const handleStart = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/olympiads/${olympiad.id}/start`);
      },
      [navigate, olympiad.id],
    );

    return (
      <>
        {/* Десктопна версія */}
        <div
          className={cn(
            "hidden cursor-pointer items-center justify-between gap-2 rounded-3xl px-2 py-4",
            "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
            "md:flex md:gap-4 md:px-4 md:py-4",
            "2xl:gap-6 2xl:px-6 2xl:py-6",
            olympiad.status === "completed" && "pointer-events-none",
          )}
          onClick={handleCardClick}
        >
          <OlympiadImage olympiad={olympiad} lang={lang} />

          {/* Основна інформація */}
          <div className="h-[140px] xl:h-[184px] flex-1">
            <div className={cn("mb-2 flex h-full flex-col justify-between")}>
              <h3
                className={cn(
                  "line-clamp-1 text-xl font-bold leading-5 text-[--color-3]",
                  "2xl:text-2xl 2xl:leading-6",
                )}
              >
                {/*{olympiad.title[lang as keyof typeof olympiad.title]}*/}
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor volutpat purus quis iaculis. Sed pellentesque justo vitae laoreet faucibus. Vestibulum ipsum nunc, egestas sit amet nisi at, fermentum tincidunt velit. Ut ultricies neque id aliquam blandit. Curabitur finibus placerat consequat. Donec commodo accumsan viverra. Cras suscipit massa posuere enim sagittis, eu porta metus dapibus.'}
              </h3>
              <p
                className={cn(
                  "mb-2 line-clamp-3 text-sm leading-4 text-[--color-3]",
                  "2xl:text-xl 2xl:leading-5",
                )}
              >
                {/*{*/}
                {/*  olympiad.short_description[*/}
                {/*    lang as keyof typeof olympiad.short_description*/}
                {/*  ]*/}
                {/*}*/}
                {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor volutpat purus quis iaculis. Sed pellentesque justo vitae laoreet faucibus. Vestibulum ipsum nunc, egestas sit amet nisi at, fermentum tincidunt velit. Ut ultricies neque id aliquam blandit. Curabitur finibus placerat consequat. Donec commodo accumsan viverra. Cras suscipit massa posuere enim sagittis, eu porta metus dapibus.'}
              </p>
              <OlympiadTags olympiad={olympiad} />
            </div>
          </div>

          {/* Правий блок */}
          <div className="flex h-[140px] xl:h-[184px] flex-shrink-0 flex-col items-end justify-between space-y-2">
            <OlympiadDates
              olympiad={olympiad}
              formattedStartDate={formattedStartDate}
              formattedEndDate={formattedEndDate}
              startDateDistance={startDateDistance}
              endDateDistance={endDateDistance}
              olympiadIsPaid={olympiadIsPaid}
            />
            <OlympiadActions
              olympiad={olympiad}
              olympiadIsPaid={olympiadIsPaid}
              formattedDate={formattedEndDate}
              onRegister={handleRegister}
              onTraining={handleTraining}
              onStart={handleStart}
            />
          </div>
        </div>

        {/* Мобільна версія */}
        <div
          className={cn(
            "flex cursor-pointer flex-col justify-between gap-2 rounded-3xl px-2 py-4",
            "bg-gradient-to-t from-[#082536] to-[#193C4D] shadow-[-1px_-1px_1px_-0px_#657E8A]",
            "md:hidden",
          )}
          onClick={handleCardClick}
        >
          <div className="flex gap-2">
            <OlympiadImage olympiad={olympiad} lang={lang} isMobile />

            {/* Основна інформація */}
            <div className="flex-1">
              <OlympiadDates
                olympiad={olympiad}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                startDateDistance={startDateDistance}
                endDateDistance={endDateDistance}
                olympiadIsPaid={olympiadIsPaid}
                isMobile
              />
              <div className={cn("mb-2 flex flex-col justify-between gap-2")}>
                <h3
                  className={cn(
                    "line-clamp-1 text-base font-bold leading-5 text-[--color-3]",
                  )}
                >
                  {olympiad.title[lang as keyof typeof olympiad.title]}
                </h3>
                <p
                  className={cn(
                    "mb-2 line-clamp-3 text-sm leading-[18px] text-[--color-3]",
                  )}
                >
                  {
                    olympiad.short_description[
                      lang as keyof typeof olympiad.short_description
                    ]
                  }
                </p>
                <OlympiadTags olympiad={olympiad} />
              </div>
            </div>
          </div>

          <OlympiadActions
            olympiad={olympiad}
            olympiadIsPaid={olympiadIsPaid}
            formattedDate={formattedEndDate}
            onRegister={handleRegister}
            onTraining={handleTraining}
            onStart={handleStart}
            isMobile
          />
        </div>
      </>
    );
  },
);

OlympiadsCard.displayName = "OlympiadsCard";
