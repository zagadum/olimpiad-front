import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking } from "./types";
import { Params } from "@/shared/types";

export const getRanking = async (
  params?: Params,
): Promise<Ranking[]> => {
  const response = await axiosInstance.get("/api/ranking", { params });
  return response.data;
};
