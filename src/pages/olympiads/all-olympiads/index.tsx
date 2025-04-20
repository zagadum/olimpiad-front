import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectOption } from "@/shared/ui/select";
import { getOlympiads } from "@/entities/olympiads";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import international from "@/shared/assets/icons/international.svg";
import ukrainian from "@/shared/assets/icons/ukrainian.svg";
import polish from "@/shared/assets/icons/polish.svg";
import announce from "@/shared/assets/icons/announce.svg";
import spacem from "@/shared/assets/icons/spacem.svg";
import { useNavigate } from "react-router-dom";
import { getLang } from "@/shared/lib/getLang";

export const AllOlympiadsPage: React.FC = () => {
  const navigate = useNavigate();
  const lang = getLang();

  // Стан для фільтра
  const [selectedFilter, setSelectedFilter] = useState<string | number>();
  const [isInternational, setIsInternational] = useState<number>();
  const [promotion, setPromotion] = useState<string>();

  // отримання списка олімпіад
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiads", {language: lang, is_international: isInternational, promotion}],
    queryFn: () => getOlympiads({language: lang, is_international: isInternational, promotion}),
    select: (value) => value.data_list,
  });

  const handleFilterChange = (value?: string | number) => {
    switch (value) {
      case 0:
      case 1:
        setPromotion(undefined);
        setIsInternational(value);
        setSelectedFilter(value);
        break;
      case 'ads':
      case 'olympiad':
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
      label: "Всі",
    },
    {
      id: "1",
      label: "Міжнародні",
      icon: international,
      value: 1,
    },
    {
      id: "2",
      label: lang === 'pl' ? "Польські" : "Українські",
      icon: lang === 'pl' ? polish : ukrainian,
      value: 0,
    },
    {
      id: "3",
      label: "Оголошення",
      icon: announce,
      value: "ads",
    },
    {
      id: "4",
      label: "Олімпіада SpaceM",
      icon: spacem,
      value: "olympiad",
    },
  ];

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <>
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
      <div className="space-y-8">
        {data?.length ? (
          data
            .map((o) => (
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
