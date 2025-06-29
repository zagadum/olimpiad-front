import { axiosInstance } from "@/shared/api/axiosInstance";
import { Ranking } from "./types";

// Отримання списку рейтингу
export const getRanking = async (
  params?: [] | { [key: string]: string | number | undefined },
): Promise<Ranking[]> => {
  const response = await axiosInstance.get("/api/ranking", { params });
  return response.data;
};
