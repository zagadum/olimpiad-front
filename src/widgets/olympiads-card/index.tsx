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
import firstPlaceIcon from "@/shared/assets/images/first-place.png";
import secondPlaceIcon from "@/shared/assets/images/second-place.png";
import thirdPlaceIcon from "@/shared/assets/images/third-place.png";
import superPlaceIcon from "@/shared/assets/images/super-place.png";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import { calcDays } from "@/shared/lib/calcDays";
import { useLanguage } from "./hooks";

const getMedalIcon = (medal?: string, rank?: number) => {
  if (medal === "gold" || rank === 1) return firstPlaceIcon;
  if (medal === "silver" || rank === 2) return secondPlaceIcon;
  if (medal === "bronze" || rank === 3) return thirdPlaceIcon;
  if (medal === "super") return superPlaceIcon;
  return null;
};

// Badge місця для завершених олімпіад
const PlaceBadge: React.FC<{ rank?: number; medal?: string; isMobile?: boolean }> =
  React.memo(({ rank, medal, isMobile = false }) => {
    if (!rank) return null;
    const icon = getMedalIcon(medal, rank);
    const size = isMobile ? "w-8 h-8" : "w-10 h-10";

    return (
      <div className={cn("flex shrink-0 items-center justify-center", size)}>
        {icon ? (
          <img src={icon} alt={`Place ${rank}`} className="h-full w-full object-contain" />
        ) : (
          <div className={cn(
            "flex items-center justify-center rounded-full bg-[--color-2] text-[--color-3] font-bold",
            isMobile ? "w-8 h-8 text-sm" : "w-10 h-10 text-base",
          )}>
            {rank}
          </div>
        )}
      </div>
    );
  });

// Блок балів
const PointsDisplay: React.FC<{ score?: number; isMobile?: boolean }> = React.memo(
  ({ score, isMobile = false }) => {
    const { t } = useTranslation();
    if (score == null) return null;

    return (
      <div className={cn("flex flex-col items-end text-right", isMobile ? "gap-1 text-xs" : "gap-6 text-sm 2xl:text-base")}>
        <div className="text-[--color-3] opacity-70">{t("olympiadCard.pointsLabel")}</div>
        <div className="text-lg font-bold text-[--color-3] 2xl:text-xl">{score}</div>
      </div>
    );
  },
);

type OlympiadsCardProps = {
  olympiad: Olympiad;
  onCardClick?: (id: number) => void;
  /** "my" — compact results layout; "all" — always full layout */
  variant?: "my" | "all";
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
    : cn("h-[140px] w-[190px] lg:w-[240px] xl:h-[160px] xl:w-[275px] object-cover");

  const containerClasses = isMobile
    ? "h-[156px] w-[94px] overflow-hidden rounded-2xl flex-shrink-0"
    : cn("h-[140px] w-[190px] lg:w-[240px] xl:h-[160px] xl:w-[275px] overflow-hidden rounded-2xl shrink-0");

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
      : cn("text-base leading-4 text-[--color-3]", "2xl:text-lg 2xl:leading-4");

    const distanceClasses = isMobile
      ? "mt-1 text-nowrap text-[10px] leading-3 text-[--color-3]"
      : cn(
          "mt-2 text-nowrap text-sm leading-4 text-[--color-3]",
          "2xl:text-lg 2xl:leading-5",
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
    let price;
    if (olympiad.country_id === 3) {
      price = olympiad.international_price;
    } else if (olympiad.is_international) {
      price = olympiad.international_price;
    } else {
      price = olympiad.local_price;
    }

    let currency;
    if (olympiad.country_id === 3) {
      currency = olympiad.international_currency;
    } else if (olympiad.is_international) {
      currency = olympiad.international_currency;
    } else {
      currency= olympiad.local_currency;
    }

 

      

      
    console.log(olympiad);

    const priceClasses = isMobile
      ? "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]"
      : cn(
          "text-nowrap rounded-full border border-[--color-2] px-3 py-2.5 text-xs leading-4 text-[--color-3]",
          "2xl:px-4 2xl:py-3 2xl:text-lg 2xl:leading-5",
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
  onViewResults?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isMobile?: boolean;
}> = React.memo(
  ({
    olympiad,
    olympiadIsPaid,
    onRegister,
    onTraining,
    onStart,
    onViewResults,
    isMobile = false,
  }) => {
    const { t } = useTranslation();
    const containerClasses = isMobile
      ? "flex items-center gap-3"
      : cn("flex flex-wrap items-center justify-end gap-3");

    const hasResults = olympiad.is_public_result === 1 || olympiad.is_show_result === 1;

    if (olympiadIsPaid) {
      if (olympiad.is_done === 1 && hasResults) {
        return (
          <div className={containerClasses}>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onViewResults?.(e);
              }}
            >
              {t("olympiadCard.viewResults")}
            </Button>
          </div>
        );
      }
      if (olympiad.is_done === 1 && !hasResults) {
        return (
          <div className={containerClasses}>
            <span className="text-[--color-2]">
              {t("olympiadCard.waitResults")}
            </span>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onStart(e);
              }}
            >
              {t("olympiadCard.myResults")}
            </Button>
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
  ({ olympiad, onCardClick, variant = "my" }) => {
    const lang = useLanguage();
    const navigate = useNavigate();

    const hasResults = olympiad.is_public_result === 1 || olympiad.is_show_result === 1;

    // На сторінці "all" завжди показуємо повний layout карточки
    const showResultsLayout = variant === "my" && olympiad.is_done === 1 && hasResults;

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

    const handleViewResults = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigate(`/olympiads/${olympiad.id}/top10`);
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
            "2xl:gap-5 2xl:px-5 2xl:py-5",
          )}
          onClick={handleCardClick}
        >
          {showResultsLayout && (
            <PlaceBadge rank={olympiad.user_rank} medal={olympiad.user_medal} />
          )}

          <OlympiadImage olympiad={olympiad} lang={lang} />

          {/* Основна інформація */}
          <div className="h-[140px] xl:h-[160px] flex-1">
            <div className={cn("mb-2 flex h-full flex-col justify-between")}>
              {showResultsLayout ? (
                <>
                  <span className={cn("text-base leading-4 text-[--color-3]", "2xl:text-lg 2xl:leading-4")}>
                    {formattedStartDate}
                  </span>
                  <h3
                    className={cn(
                      "line-clamp-1 text-lg font-bold leading-5 text-[--color-3]",
                      "2xl:text-xl 2xl:leading-6",
                    )}
                  >
                    {olympiad.title[lang as keyof typeof olympiad.title]}
                  </h3>
                  <div />
                </>
              ) : (
                <>
                  <h3
                    className={cn(
                      "line-clamp-1 text-lg font-bold leading-5 text-[--color-3]",
                      "2xl:text-xl 2xl:leading-6",
                    )}
                  >
                    {olympiad.title[lang as keyof typeof olympiad.title]}
                  </h3>
                  <p
                    className={cn(
                      "mb-2 line-clamp-3 text-sm leading-4 text-[--color-3]",
                      "2xl:text-lg 2xl:leading-5",
                    )}
                  >
                    {
                      olympiad.short_description[
                        lang as keyof typeof olympiad.short_description
                      ]
                    }
                  </p>
                  <OlympiadTags olympiad={olympiad} />
                </>
              )}
            </div>
          </div>

          {/* Правий блок */}
          <div className={cn(
            "flex h-[140px] xl:h-[160px] flex-shrink-0 flex-col items-end space-y-2",
            showResultsLayout ? "justify-center" : "justify-between",
          )}>
            {!showResultsLayout && (
              <OlympiadDates
                olympiad={olympiad}
                formattedStartDate={formattedStartDate}
                formattedEndDate={formattedEndDate}
                startDateDistance={startDateDistance}
                endDateDistance={endDateDistance}
                olympiadIsPaid={olympiadIsPaid}
              />
            )}
            <div className="flex items-center gap-6">
              <OlympiadActions
                olympiad={olympiad}
                olympiadIsPaid={olympiadIsPaid}
                formattedDate={formattedEndDate}
                onRegister={handleRegister}
                onTraining={handleTraining}
                onStart={handleStart}
                onViewResults={handleViewResults}
              />
              {showResultsLayout && (
                <PointsDisplay score={olympiad.user_score} />
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
          onClick={handleCardClick}
        >
          <div className="flex gap-2">
            {showResultsLayout && (
              <PlaceBadge rank={olympiad.user_rank} medal={olympiad.user_medal} isMobile />
            )}
            <OlympiadImage olympiad={olympiad} lang={lang} isMobile />

            {/* Основна інформація */}
            <div className="flex-1">
              {showResultsLayout ? (
                <div className={cn("mb-2 flex flex-col justify-between gap-2")}>
                  <span className="text-[10px] leading-3 text-[--color-3]">
                    {formattedStartDate}
                  </span>
                  <h3
                    className={cn(
                      "line-clamp-1 text-base font-bold leading-5 text-[--color-3]",
                    )}
                  >
                    {olympiad.title[lang as keyof typeof olympiad.title]}
                  </h3>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <OlympiadActions
              olympiad={olympiad}
              olympiadIsPaid={olympiadIsPaid}
              formattedDate={formattedEndDate}
              onRegister={handleRegister}
              onTraining={handleTraining}
              onStart={handleStart}
              onViewResults={handleViewResults}
              isMobile
            />
            {showResultsLayout && (
              <PointsDisplay score={olympiad.user_score} isMobile />
            )}
          </div>
        </div>
      </>
    );
  },
);

OlympiadsCard.displayName = "OlympiadsCard";
