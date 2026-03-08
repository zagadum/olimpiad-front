import React, { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRanking, Discipline, Ranking } from "@/entities/ranking";
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
  { id: "basic-1", label: "Basic 1", value: "basic-1" },
  { id: "basic-2", label: "Basic 2", value: "basic-2" },
  { id: "basic-3", label: "Basic 3", value: "basic-3" },
  { id: "intermediate-1", label: "Intermediate 1", value: "intermediate-1" },
  { id: "intermediate-2", label: "Intermediate 2", value: "intermediate-2" },
  { id: "intermediate-3", label: "Intermediate 3", value: "intermediate-3" },
  { id: "pro-1", label: "Pro", value: "pro-1" },
];

const ages: SelectOption[] = [
  { id: "1", label: "9-12", value: "9-12" },
  { id: "2", label: "13-15", value: "13-15" },
  { id: "3", label: "16-17", value: "16-17" },
  { id: "4", label: "18+", value: "18-100" },
];

const getPlaceIcon = (place: number) => {
  switch (place) {
    case 1:
      return <img className="h-5 w-5 object-cover md:h-9 md:w-9" src={superIcon} alt="" />;
    case 2:
      return <img className="h-5 w-5 object-cover md:h-9 md:w-9" src={firstIcon} alt="" />;
    case 3:
      return <img className="h-5 w-5 object-cover md:h-9 md:w-9" src={secondIcon} alt="" />;
    case 4:
      return <img className="h-5 w-5 object-cover md:h-9 md:w-9" src={thirdIcon} alt="" />;
    default:
      return (
        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[--color-1] md:h-9 md:w-9">
          {place}
        </div>
      );
  }
};

const getDisciplineScore = (row: Ranking, discipline: Discipline): number => {
  if (discipline === "all") return Number(row.points);
  const key = discipline as keyof NonNullable<Ranking["discipline_scores"]>;
  return row.discipline_scores?.[key] ?? 0;
};

const getSortedWithPlaces = (rows: Ranking[], discipline: Discipline): (Ranking & { computedPlace: number })[] => {
  const sorted = [...rows].sort((a, b) => getDisciplineScore(b, discipline) - getDisciplineScore(a, discipline));
  return sorted.map((row, i) => ({ ...row, computedPlace: i + 1 }));
};

const cellBase = "px-2.5 py-2.5 text-xs font-normal leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base xl:text-lg md:leading-5";
const cardBg = "border border-[#657E8A] bg-gradient-to-t from-[#082536] to-[#193C4D]";

export const RankingPage: React.FC = () => {
  const { t } = useTranslation();
  const lang = useLanguage();

  const { isMobile, isTablet } = useDimensions();
  const { data: user } = useCurrentUserQuery();

  const [selectedLevel, setSelectedLevel] = useState<string | number>();
  const [selectedNum, setSelectedNum] = useState<string | number>();
  const [selectedAge, setSelectedAge] = useState<string | number>();
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>("all");
  const [myselfId, setMyselfId] = useState<number>();

  const { data: olympiadsData } = useOlympiadsRankingListQuery();

  const olympiads = useMemo(
    () =>
      olympiadsData?.map(({ id, title }) => ({
        id,
        label: title[lang],
        value: id,
      })),
    [olympiadsData, lang],
  );

  const [selectedOlympiadId, setSelectedOlympiadId] = useState<string | number | undefined>();

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "ranking",
      { olympiad_id: selectedOlympiadId, stages_level: selectedLevel, stages_num: selectedNum, age_tab: selectedAge },
    ],
    queryFn: () =>
      getRanking({
        olympiad_id: selectedOlympiadId,
        stages_level: selectedLevel,
        stages_num: selectedNum,
        age_tab: selectedAge,
      }),
  });

  const filtersReady = !!(selectedLevel && selectedAge);

  const rawData = filtersReady ? (data?.result ?? []) : [];

  const sortedData = useMemo(() => getSortedWithPlaces(rawData, selectedDiscipline), [rawData, selectedDiscipline]);

  const top10 = sortedData.slice(0, 10);
  const currentUserRow = sortedData.find((r) => r.practicant_id === user?.id);
  const currentUserInTop10 = top10.some((r) => r.practicant_id === user?.id);

  const DISCIPLINE_ORDER: Discipline[] = ["clk", "pictures", "words", "cards", "binary", "dates"];
  const TABLE_LINK_TO_DISCIPLINE: Record<string, Discipline> = {
    olympiad_clk: "clk",
    olympiad_pictures: "pictures",
    olympiad_words: "words",
    olympiad_cards: "cards",
    olympiad_binary: "binary",
    olympiad_dates: "dates",
  };
  const availableDisciplines: Discipline[] = filtersReady && data?.table_links?.length
    ? DISCIPLINE_ORDER.filter((d) =>
        data.table_links.some((link) => TABLE_LINK_TO_DISCIPLINE[link] === d)
      )
    : DISCIPLINE_ORDER;

  const disciplineOptions: SelectOption[] = [
    { id: "all", label: t("ranking.discipline.all"), value: "all" },
    ...availableDisciplines.map((d) => ({
      id: d,
      label: t(`ranking.discipline.${d}`),
      value: d,
    })),
  ];

  const activeDisciplines: Discipline[] = selectedDiscipline === "all"
    ? availableDisciplines
    : [];

  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const scrollToItem = (id?: number) => {
    if (!id) return;
    const node = itemRefs.current[id];
    if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const findMyself = () => {
    setMyselfId(user?.id);
    scrollToItem(user?.id);
  };

  if (error) return <div>{t("global.fetchError")}</div>;

  const renderRow = (row: Ranking & { computedPlace: number }, isCurrentUser: boolean) => (
    <div
      key={`${row.practicant_id}-${row.olympiad_id}`}
      className={cn("ranking-row flex cursor-pointer items-stretch gap-2 md:gap-3", (isCurrentUser || row.practicant_id === myselfId) && "active")}
      ref={(el) => { itemRefs.current[row.practicant_id] = el; }}
    >
      <div className="min-w-0 flex-1 overflow-x-auto">
        <div className={cn("ranking-main flex min-w-max items-center rounded-xl md:rounded-3xl", cardBg)}>
          <div className={cn(cellBase, "flex w-10 flex-shrink-0 items-center justify-center md:w-16 md:px-3")}>
            {getPlaceIcon(row.computedPlace)}
          </div>
          <div className={cn(cellBase, "w-32 flex-shrink-0 font-semibold text-nowrap md:w-48")}>
            {row.surname} {row.lastname}
          </div>
          <div className={cn(cellBase, "min-w-0 flex-1 text-nowrap")}>
            {row.city ? `${row.city}, ${row.country}` : row.country ?? "—"}
          </div>
          {activeDisciplines.map((d) => (
            <div key={d} className={cn(cellBase, "w-14 flex-shrink-0 text-right text-nowrap md:w-20")}>
              {row.discipline_scores?.[d as keyof NonNullable<Ranking["discipline_scores"]>] ?? "—"}
            </div>
          ))}
        </div>
      </div>
      <div className={cn("score-cell flex w-16 flex-shrink-0 items-center justify-center rounded-xl md:w-24 md:rounded-3xl", cardBg, cellBase, "font-semibold")}>
        {getDisciplineScore(row, selectedDiscipline)}
      </div>
    </div>
  );

  // const scoreHeaderLabel = selectedDiscipline === "all"
  //   ? t("ranking.points")
  //   : `${t("ranking.points")} ${t(`ranking.discipline.${selectedDiscipline}`)}`;
  const scoreHeaderLabel = t("ranking.points");

  return (
    <>
      {!isMobile && !isTablet && (
        <img
          src={rankingBg}
          alt=""
          className="pointer-events-none fixed -top-10 right-12 z-[-1] w-[388px] opacity-30"
        />
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Button onClick={findMyself}>{t("ranking.findMyself")}</Button>

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

        <Select
          placeholder={t("ranking.agePlaceholder")}
          options={ages}
          value={selectedAge}
          onChange={(value) => setSelectedAge(value)}
        />

        {filtersReady && (
          <Select
            placeholder={t("ranking.disciplinePlaceholder")}
            options={disciplineOptions}
            value={selectedDiscipline}
            onChange={(value) => setSelectedDiscipline((value as Discipline) ?? "all")}
          />
        )}
      </div>

      {!filtersReady && (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p className="text-lg text-[--color-white] opacity-60">{t("ranking.selectOlympiad")}</p>
        </div>
      )}

      {filtersReady && isLoading && (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p className="text-lg text-[--color-white] opacity-60">{t("ranking.loading")}</p>
        </div>
      )}

      {filtersReady && !isLoading && top10.length === 0 && (
        <div className="flex h-[50vh] w-full items-center justify-center">
          <p className="text-lg text-[--color-white] opacity-60">{t("ranking.empty")}</p>
        </div>
      )}

      {filtersReady && !isLoading && top10.length > 0 && (
        <div className="ranking-table flex flex-col gap-3 md:gap-4">
          {/* Header */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="min-w-0 flex-1 overflow-x-auto">
              <div className="flex min-w-max items-center border border-transparent">
                <div className="w-10 flex-shrink-0 px-2.5 py-2.5 text-center text-xs font-light leading-3 text-[--color-white] md:w-16 md:px-3 md:py-5 md:text-base md:leading-4">
                  {t("ranking.place")}
                </div>
                <div className="w-32 flex-shrink-0 px-2.5 py-2.5 text-left text-xs font-light leading-3 text-[--color-white] md:w-48 md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.name")}
                </div>
                <div className="min-w-0 flex-1 px-2.5 py-2.5 text-left text-xs font-light leading-3 text-[--color-white] md:px-5 md:py-5 md:text-base md:leading-4">
                  {t("ranking.cityCountry")}
                </div>
                {activeDisciplines.map((d) => (
                  <div key={d} className="w-14 flex-shrink-0 px-2.5 py-2.5 text-right text-xs font-light leading-3 text-[--color-white] md:w-20 md:px-5 md:py-5 md:text-base md:leading-4">
                    {t(`ranking.discipline.${d}`)}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-16 flex-shrink-0 border border-transparent px-2.5 py-2.5 text-center text-xs font-light leading-3 text-nowrap text-[--color-white] md:w-24 md:px-5 md:py-5 md:text-base md:leading-4">
              {scoreHeaderLabel}
            </div>
          </div>

          {/* Rows */}
          {top10.map((row) => renderRow(row, row.practicant_id === user?.id))}
          {!currentUserInTop10 && currentUserRow && renderRow(currentUserRow, true)}
        </div>
      )}
    </>
  );
};
