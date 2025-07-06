import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@/entities/ranking";
import { Select, SelectOption } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn.ts";
import superIcon from "@/shared/assets/images/super-place.png";
import firstIcon from "@/shared/assets/images/first-place.png";
import secondIcon from "@/shared/assets/images/second-place.png";
import thirdIcon from "@/shared/assets/images/third-place.png";
import { useTranslation } from "react-i18next";
import { useCurrentUserQuery } from "@/entities/auth";
import rankingBg from "@/shared/assets/images/ranking-bg.png";
import { useDimensions } from "@/shared/hooks";
import { useOlympiadsQuery } from "@/entities/olympiads/query.ts";
import { getLang } from "@/shared/lib/getLang.ts";
import "./style.css";

const levels: SelectOption[] = [
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
    id: "1",
    label: "9-12",
    value: "9-12",
  },
  {
    id: "2",
    label: "13-15",
    value: "13-15",
  },
  {
    id: "3",
    label: "16-17",
    value: "16-17",
  },
  {
    id: "4",
    label: "18+",
    value: "18-100",
  },
];

export const RankingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);

  const { isMobile, isTablet } = useDimensions();

  const { data: user } = useCurrentUserQuery();

  // Стан для фільтрів
  const [selectedLevel, setSelectedLevel] = useState<string | number>();
  const [selectedAge, setSelectedAge] = useState<string | number>();
  const [myselfId, setMyselfId] = useState<number>();

  const { data: olympiadsData } = useOlympiadsQuery();

  const olympiads = useMemo(
    () =>
      olympiadsData?.map(({ id, title }) => ({
        id,
        label: title[lang],
        value: id,
      })),
    [olympiadsData],
  );

  const olympiadIds = useMemo(
    () => olympiadsData?.map((item) => item.id),
    [olympiadsData],
  );

  const [selectedOlympiadId, setSelectedOlympiadId] = useState<string | number | undefined>(
    olympiadIds?.[0],
  );

  useEffect(() => {
    const paidOlympiad = olympiadsData?.find(item => item.is_pay === 1)
    if (paidOlympiad) {
      setSelectedOlympiadId(paidOlympiad.id)
      setSelectedAge(paidOlympiad?.subscribe?.age_tab)
      setSelectedLevel(paidOlympiad.subscribe.stages_level)
    }
  }, [olympiadsData]);

  const { data, error } = useQuery({
    queryKey: [
      "ranking",
      {
        olympiad_id: selectedOlympiadId,
        stages_level: selectedLevel,
        age_tab: selectedAge,
      },
    ],
    queryFn: () =>
      getRanking({
        olympiad_id: selectedOlympiadId,
        stages_level: selectedLevel,
        age_tab: selectedAge,
      }),
  });

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToItem = (id?: number) => {
    if (!id) return;
    const node = itemRefs.current[id];
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const findMyself = () => {
    setMyselfId(user?.id);
    scrollToItem(user?.id);
  };

  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <>
      {!isMobile && !isTablet && (
        <img
          src={rankingBg}
          alt=""
          className="pointer-events-none fixed -top-10 right-12 z-[-1] w-[388px] opacity-30"
        />
      )}
      {/* Блок фільтрів */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* Найти себя */}
        <Button onClick={findMyself}>{t("ranking.findMyself")}</Button>

        {/* Вибір олімпіади */}
        {olympiads && (
          <Select
            placeholder={t("ranking.olympiadPlaceholder")}
            options={olympiads}
            value={selectedOlympiadId}
            onChange={(value) => setSelectedOlympiadId(value)}
          />
        )}

        {/* Вибір рівня */}
        <Select
          placeholder="Категорія"
          options={levels}
          value={selectedLevel}
          onChange={(value) => setSelectedLevel(value)}
        />

        {/* Вибір віку */}
        <Select
          placeholder="Вік"
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
                  Правильні відповіді
                </th>
                <th className="px-2.5 py-2.5 text-right text-xs font-light leading-3 text-[--color-white] md:px-6 md:py-6 md:text-base md:leading-4">
                  Бали
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row) => (
                <tr
                  key={row.practicant_id}
                  className={cn(
                    "cursor-pointer",
                    row.practicant_id === myselfId && "active",
                  )}
                  ref={(el) => (itemRefs.current[row.practicant_id] = el)}
                >
                  <td
                    className={cn(
                      "w-5 px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:w-12 md:px-6 md:py-6 md:text-lg md:leading-5",
                      "rounded-s-xl border-l border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] md:rounded-s-3xl",
                    )}
                  >
                    {row.place === 1 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={superIcon}
                        alt=""
                      />
                    ) : row.place === 2 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={firstIcon}
                        alt=""
                      />
                    ) : row.place === 3 ? (
                      <img
                        className="h-5 w-5 object-cover md:h-11 md:w-11"
                        src={secondIcon}
                        alt=""
                      />
                    ) : row.place === 4 ? (
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
                    {row.surname} {row.lastname}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.stages_level}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.age_tab}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-6 md:py-6 md:text-xl md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.good_answear}
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
