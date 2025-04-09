import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@/entities/ranking";
import { Select, SelectOption } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";

const levels: SelectOption[] = [
  {
    id: "0",
    label: "Все",
  },
  {
    id: "1",
    label: "Basic",
    value: "basic",
  },
  {
    id: "2",
    label: "Intermediate",
    value: "intermediate",
  },
  {
    id: "3",
    label: "Pro",
    value: "pro",
  },
];

const ages: SelectOption[] = [
  {
    id: "0",
    label: "Все",
  },
  {
    id: "1",
    label: "11-13",
    value: "11-13",
  },
  {
    id: "2",
    label: "13-15",
    value: "13-15",
  },
  {
    id: "3",
    label: "15-17",
    value: "15-17",
  },
];

export const RankingPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRanking,
  });

  // Стан для фільтрів
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const [selectedAge, setSelectedAge] = useState<string>();

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <>
      {/* Блок фільтрів */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Найти себя */}
        <Button>Найти себя</Button>

        {/* Вибір рівня */}
        <Select
          placeholder="Сложность"
          options={levels}
          value={selectedLevel}
          onChange={(value) => setSelectedLevel(value)}
        />

        {/* Вибір часу */}
        <Select
          placeholder="Возраст"
          options={ages}
          value={selectedAge}
          onChange={(value) => setSelectedAge(value)}
        />
      </div>

      {/* Таблиця рейтингу */}
      <div className="overflow-x-auto rounded bg-[#1A1F25] p-4">
        <table className="w-full table-auto">
          <thead className="border-b border-gray-700 text-sm text-gray-400">
            <tr>
              <th className="py-2 text-left font-normal">Место</th>
              <th className="py-2 text-left font-normal">Имя</th>
              <th className="py-2 text-left font-normal">Страна</th>
              <th className="py-2 text-left font-normal">Категория</th>
              <th className="py-2 text-left font-normal">Возраст</th>
              <th className="py-2 text-right font-normal">Бали</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-gray-700 text-sm transition-colors hover:bg-[#26303A] ${
                  row.isHighlighted ? "bg-[#113c44]" : ""
                }`}
              >
                <td className="w-12 px-2 py-3 text-center">{row.rank}</td>
                <td className="px-2 py-3">{row.username}</td>
                <td className="px-2 py-3">{row.country}</td>
                <td className="px-2 py-3">{row.level}</td>
                <td className="px-2 py-3">{row.time}</td>
                <td className="px-2 py-3 text-right">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
