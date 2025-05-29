import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@/entities/ranking";
import { Select, SelectOption } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn.ts";
import firstIcon from "@/shared/assets/images/first-place.png";
import secondIcon from "@/shared/assets/images/second-place.png";
import thirdIcon from "@/shared/assets/images/third-place.png";
import "./style.css";

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
  const { data, error } = useQuery({
    queryKey: ["ranking"],
    queryFn: getRanking,
  });

  // Стан для фільтрів
  const [selectedLevel, setSelectedLevel] = useState<string | number>();
  const [selectedAge, setSelectedAge] = useState<string | number>();

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
      <div className="overflow-x-auto">
        <div className="relative">
          <table className="ranking-table w-full table-auto border-separate border-spacing-y-3 md:border-spacing-y-6">
            <thead className="border-b border-gray-700 text-sm text-gray-400">
              <tr>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Місце
                </th>
                <th className="px-2.5 py-2.5 text-left text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Ім'я
                </th>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Категорія
                </th>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Вік
                </th>
                <th className="px-2.5 py-2.5 text-right text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Бали
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row, index) => (
                <tr key={index} className="cursor-pointer">
                  <td
                    className={cn(
                      "w-5 px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:w-12 md:px-6 md:py-6 md:text-xl md:leading-5",
                      "rounded-s-xl border-l border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] md:rounded-s-3xl",
                    )}
                  >
                    {row.place === 1 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={firstIcon}
                        alt=""
                      />
                    ) : row.place === 2 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={secondIcon}
                        alt=""
                      />
                    ) : row.place === 3 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={thirdIcon}
                        alt=""
                      />
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[--color-1] md:h-11 md:w-11">
                        {row.place}
                      </div>
                    )}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-xs font-semibold leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.name}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.level}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.age}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-2.5 text-right text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "rounded-e-xl border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] md:rounded-e-3xl",
                    )}
                  >
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
