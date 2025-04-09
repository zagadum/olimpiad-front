// import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking } from "./types";
import { getRankingResponse } from "@/entities/ranking/mockData.ts";

// Отримання списку рейтингу
export const getRanking = async (): Promise<Ranking[]> => {
  // const response = await axiosInstance.get("/ranking");
  const response = await getRankingResponse();
  return response.data;
};
