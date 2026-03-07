import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking, ApiRankingResponse } from "./types";
import { Params } from "@/shared/types";

export const getRanking = async (
  params?: Params,
): Promise<ApiRankingResponse> => {
  const response = await axiosInstance.get("/api/ranking", { params });
  const data = response.data as any;
  // If backend returned array directly, wrap it into { result, table_links }
  if (Array.isArray(data)) {
    return { result: data as Ranking[], table_links: [] };
  }
  // Expecting { result: Ranking[], table_links: string[] }
  return data as ApiRankingResponse;
};
