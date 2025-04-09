import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectOption } from "@/shared/ui/select";
import { getOlympiads, OlympiadType } from "@/entities/olympiads";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import international from '@/shared/assets/icons/international.svg'
import ukrainian from '@/shared/assets/icons/ukrainian.svg'
import polish from '@/shared/assets/icons/polish.svg'
import announce from '@/shared/assets/icons/announce.svg'
import spacem from '@/shared/assets/icons/spacem.svg'

const olympiadTypes: SelectOption[] = [
  {
    id: "0",
    label: "Все",
  },
  {
    id: "1",
    label: "Международные",
    icon: international,
    value: "international",
  },
  {
    id: "2",
    label: "Украинские",
    icon: ukrainian,
    value: "ukrainian",
  },
  {
    id: "3",
    label: "Польские",
    icon: polish,
    value: "polish",
  },
  {
    id: "4",
    label: "Объявление",
    icon: announce,
    value: "announce",
  },
  {
    id: "5",
    label: "Олимпиада SpaceM",
    icon: spacem,
    value: "spacem",
  },
];

export const AllOlympiadsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiads"],
    queryFn: getOlympiads,
  });

  // Стан для фільтра
  const [selectedFilter, setSelectedFilter] = useState<OlympiadType>();

  type OlympiadValue = OlympiadType | undefined;
  const handleFilterChange = (value?: string) => {
    setSelectedFilter(value as OlympiadValue);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <>
      {/* Верхній блок з вкладками та фільтром */}
      <div className="mb-8 flex justify-between items-center space-y-0">
        {/* Селект для фільтрації (Международные, Украинские, Польские) */}
        <Select
          options={olympiadTypes}
          value={selectedFilter as string}
          onChange={handleFilterChange}
          placeholder="Выберите тип"
        />
      </div>

      {/* Список карток олімпіад */}
      <div className="space-y-8">
        {data?.length ? (
          data
            .filter((o) => !selectedFilter || o.type.includes(selectedFilter))
            .map((o) => <OlympiadsCard key={o.id} olympiad={o} />)
        ) : (
          <div>У вас немає активних олімпіад</div>
        )}
      </div>
    </>
  );
};
