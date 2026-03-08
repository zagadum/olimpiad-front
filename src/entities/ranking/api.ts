import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking, ApiRankingResponse, RankingDisciplineScores } from "./types";
import { Params } from "@/shared/types";

// Maps API category names to discipline keys
const CATEGORY_TO_DISCIPLINE: Record<string, keyof RankingDisciplineScores> = {
  olympiad_clk: "clk",
  olympiad_pictures: "pictures",
  olympiad_words: "words",
  olympiad_cards: "cards",
  olympiad_binary: "binary",
  olympiad_dates: "dates",
};

const transformRankingItem = (item: any): Ranking => {
  const disciplineScores: RankingDisciplineScores = {};
  if (Array.isArray(item.details)) {
    for (const detail of item.details) {
      const key = CATEGORY_TO_DISCIPLINE[detail.category];
      if (key) disciplineScores[key] = Number(detail.total) ?? 0;
    }
  }
  return {
    ...item,
    points: Number(item.points) || 0,
    good_answear: Number(item.good_answear) || 0,
    discipline_scores: disciplineScores,
  };
};

export const getRanking = async (
  params?: Params,
): Promise<ApiRankingResponse> => {
  const response = await axiosInstance.get("/api/ranking", { params });
  const data = response.data as any;
  if (Array.isArray(data)) {
    return { result: data.map(transformRankingItem), table_links: [] };
  }
  return {
    result: (data.result ?? []).map(transformRankingItem),
    table_links: data.table_links ?? [],
  };
};
