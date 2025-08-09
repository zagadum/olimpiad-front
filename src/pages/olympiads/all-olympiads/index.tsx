import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, SelectOption } from "@/shared/ui/select";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import international from "@/shared/assets/icons/international-mini.png";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import announce from "@/shared/assets/icons/announce.png";
import spacem from "@/shared/assets/icons/space-m.png";
import cupsBg from "@/shared/assets/images/cups-bg.png";
import { useDimensions } from "@/shared/hooks";
import { useOlympiadsQuery } from "@/entities/olympiads/query";
import { useTranslation } from "react-i18next";
import { useCurrentUserQuery } from "@/entities/auth";

export const AllOlympiadsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user } = useCurrentUserQuery();

  const { isMobile, isTablet } = useDimensions();

  // Стан для фільтра
  const [selectedFilter, setSelectedFilter] = useState<string | number>();
  const [isInternational, setIsInternational] = useState<number>();
  const [promotion, setPromotion] = useState<string>();

  // отримання списка олімпіад
  const { data, error } = useOlympiadsQuery({lang: user?.language, isInternational, promotion})

  const handleFilterChange = (value?: string | number) => {
    switch (value) {
      case 0:
      case 1:
        setPromotion(undefined);
        setIsInternational(value);
        setSelectedFilter(value);
        break;
      case "ads":
      case "olympiad":
        setIsInternational(undefined);
        setPromotion(value);
        setSelectedFilter(value);
        break;
      default:
        setIsInternational(undefined);
        setPromotion(undefined);
        setSelectedFilter(undefined);
    }
  };

  const onOlympiadsCardClick = (id: number) => {
    navigate(`/olympiads/${id}`);
  };

  const olympiadTypes: SelectOption[] = [
    {
      id: "0",
      label: t('olympiadTypes.all'),
    },
    {
      id: "1",
      label: t('olympiadTypes.international'),
      icon: international,
      value: 1,
    },
    {
      id: "2",
      label: user?.language === "pl" ? t('olympiadTypes.polish') : t('olympiadTypes.ukrainian'),
      icon: user?.language === "pl" ? polish : ukrainian,
      value: 0,
    },
    {
      id: "3",
      label: t('olympiadTypes.ads'),
      icon: announce,
      value: "ads",
    },
    {
      id: "4",
      label: t('olympiadTypes.olympiad'),
      icon: spacem,
      value: "olympiad",
    },
  ];

  if (error) return <div>{t('global.fetchError')}</div>;

  return (
    <>
      {!isMobile && !isTablet && (
        <img
          src={cupsBg}
          alt=""
          className="pointer-events-none fixed -top-10 right-16 z-[-1] w-[388px] rotate-[-15deg] opacity-30"
        />
      )}
      {/* Верхній блок з вкладками та фільтром */}
      <div className="mb-8 flex items-center justify-between space-y-0">
        {/* Селект для фільтрації (Международные, Украинские, Польские) */}
        <Select
          options={olympiadTypes}
          value={selectedFilter}
          onChange={handleFilterChange}
          placeholder="Выберите тип"
        />
      </div>

      {/* Список карток олімпіад */}
      <div className="space-y-6 pb-20 md:space-y-8 lg:pb-10">
        {data?.length ? (
          data.map((o) => (
            <OlympiadsCard
              key={o.id}
              olympiad={o}
              onCardClick={onOlympiadsCardClick}
            />
          ))
        ) : (
          <div>У вас немає активних олімпіад</div>
        )}
      </div>
    </>
  );
};
