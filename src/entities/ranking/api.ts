import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking } from "./types";
import { Params } from "@/shared/types";

export const getRanking = async (
  params?: Params,
): Promise<Ranking[]> => {
  const response = await axiosInstance.get("/api/ranking", { params });
  // New API format: { result: Ranking[], table_links: any[] }
  // Return `result` when present, otherwise fall back to old response shape.
  const data = response.data as any;
  return data?.result ?? data;
};
