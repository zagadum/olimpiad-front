import React, { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking } from "@/entities/ranking";
import { Select, SelectOption } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import superIcon from "@/shared/assets/images/super-place.png";
import firstIcon from "@/shared/assets/images/first-place.png";
import secondIcon from "@/shared/assets/images/second-place.png";
import thirdIcon from "@/shared/assets/images/third-place.png";
import { useTranslation } from "react-i18next";
import { useCurrentUserQuery } from "@/entities/auth";
import rankingBg from "@/shared/assets/images/ranking-bg.png";
import { useDimensions } from "@/shared/hooks";
import { useOlympiadsRankingListQuery } from "@/entities/olympiads/query";
import { useLanguage } from "@/widgets/olympiads-card/hooks";
import "./style.css";

const levels: SelectOption[] = [
  {
    id: "basic-1",
    label: "Basic 1",
    value: "basic-1",
  },
  {
    id: "basic-2",
    label: "Basic 2",
    value: "basic-2",
  },
  {
    id: "basic-3",
    label: "Basic 3",
    value: "basic-3",
  },
  {
    id: "intermediate-1",
    label: "Intermediate 1",
    value: "intermediate-1",
  },
  {
    id: "intermediate-2",
    label: "Intermediate 2",
    value: "intermediate-2",
  },
  {
    id: "intermediate-3",
    label: "Intermediate 3",
    value: "intermediate-3",
  },
  {
    id: "pro-1",
    label: "Pro",
    value: "pro-1",
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

const getPlaceIcon = (place: number) => {
  switch (place) {
    case 1:
      return (
        <img
          className="h-5 w-5 object-cover md:h-9 md:w-9"
          src={superIcon}
          alt=""
        />
      );
    case 2:
      return (
        <img
          className="h-5 w-5 object-cover md:h-9 md:w-9"
          src={firstIcon}
          alt=""
        />
      );
    case 3:
      return (
        <img
          className="h-5 w-5 object-cover md:h-9 md:w-9"
          src={secondIcon}
          alt=""
        />
      );
    case 4:
      return (
        <img
          className="h-5 w-5 object-cover md:h-9 md:w-9"
          src={thirdIcon}
          alt=""
        />
      );
    default:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[--color-1] md:h-9 md:w-9">
          {place}
        </div>
      );
  }
};

export const RankingPage: React.FC = () => {
  const { t } = useTranslation();
  const lang = useLanguage();

  const { isMobile, isTablet } = useDimensions();

  const { data: user } = useCurrentUserQuery();

  // Стан для фільтрів
  const [selectedLevel, setSelectedLevel] = useState<string | number>();
  const [selectedNum, setSelectedNum] = useState<string | number>();
  const [selectedAge, setSelectedAge] = useState<string | number>();
  const [myselfId, setMyselfId] = useState<number>();

  const { data: olympiadsData } = useOlympiadsRankingListQuery()

  const olympiads = useMemo(
    () =>
      olympiadsData?.map(({ id, title }) => ({
        id,
        label: title[lang],
        value: id,
      })),
    [olympiadsData],
  );

  const [selectedOlympiadId, setSelectedOlympiadId] = useState<
    string | number | undefined
  >();

  const { data, error } = useQuery({
    queryKey: [
      "ranking",
      {
        olympiad_id: selectedOlympiadId,
        stages_level: selectedLevel,
        stages_num: selectedNum,
        age_tab: selectedAge,
      },
    ],
    queryFn: () =>
      getRanking({
        olympiad_id: selectedOlympiadId,
        stages_level: selectedLevel,
        stages_num: selectedNum,
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

  if (error) return <div>{t("global.fetchError")}</div>;

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
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Найти себя */}
        <Button onClick={findMyself}>{t("ranking.findMyself")}</Button>

        {/* Вибір олімпіади */}
        {olympiads && (
          <Select
            placeholder={t("ranking.olympiadPlaceholder")}
            options={olympiads}
            value={selectedOlympiadId}
            onChange={(value) => setSelectedOlympiadId(value)}
            targetClassName="md:max-w-[300px]"
            dropdownClassName="md:max-w-prose"
          />
        )}

        {/* Вибір рівня */}
        <Select
          placeholder={t("ranking.levelPlaceholder")}
          options={levels}
          value={`${selectedLevel}-${selectedNum}`}
          onChange={(value) => {
            const [level, num] = (value as string).split("-");
            setSelectedLevel(level);
            setSelectedNum(num);
          }}
        />

        {/* Вибір віку */}
        <Select
          placeholder={t("ranking.agePlaceholder")}
          options={ages}
          value={selectedAge}
          onChange={(value) => setSelectedAge(value)}
        />
      </div>

      {/* Таблиця рейтингу */}
      <div className="overflow-x-auto">
        <div className="relative">
          <table className="ranking-table w-full table-auto border-separate border-spacing-y-3 md:border-spacing-y-4">
            <thead className="border-b border-gray-700 text-sm text-gray-400">
              <tr>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.place")}
                </th>
                <th className="px-2.5 py-2.5 text-left text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.name")}
                </th>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.category")}
                </th>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.age")}
                </th>
                <th className="px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.rightAnswers")}
                </th>
                <th className="px-2.5 py-2.5 text-right text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.points")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((row) => (
                <tr
                  key={`${row.practicant_id}-${row.olympiad_id}`}
                  className={cn(
                    "cursor-pointer",
                    row.practicant_id === myselfId && "active",
                  )}
                  ref={(el) => (itemRefs.current[row.practicant_id] = el)}
                >
                  <td
                    className={cn(
                      "w-5 px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:w-10 md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "rounded-s-xl border-l border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] md:rounded-s-3xl",
                    )}
                  >
                    {getPlaceIcon(row.place)}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-xs font-semibold leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.surname} {row.lastname}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] capitalize",
                    )}
                  >
                    {row.stages_level} {row.stages_num}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.age_tab}
                  </td>
                  <td
                    className={cn(
                      "text-nowrap px-2.5 py-2.5 text-center text-xs font-normal leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]",
                    )}
                  >
                    {row.good_answear}
                  </td>
                  <td
                    className={cn(
                      "px-2.5 py-2.5 text-right text-xs font-normal leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5",
                      "rounded-e-xl border-t border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D] md:rounded-e-3xl",
                    )}
                  >
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!data?.length && (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <p>{t("ranking.empty")}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
