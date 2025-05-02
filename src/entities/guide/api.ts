import { axiosInstance } from "@/shared/api/axiosInstance";
import { CountryListResponse, RegionListResponse } from "./types";

// Отримання списка країн
export const getCountryList = async (
  params?: CountryListResponse["params"],
): Promise<CountryListResponse> => {
  const response = await axiosInstance.get("/api/guide/get-country-list", {
    params,
  });
  return response.data;
};

// Отримання списка областей
export const getRegionList = async (
  country_id: number,
  params?: RegionListResponse["params"],
): Promise<RegionListResponse> => {
  const response = await axiosInstance.get(`/api/guide/get-region-list/${country_id}`, {
    params,
  });
  return response.data;
};

// Отримання списка міст
export const getCityList = async (
  region_id: number,
  params?: RegionListResponse["params"],
): Promise<RegionListResponse> => {
  const response = await axiosInstance.get(`/api/guide/get-city-list/${region_id}`, {
    params,
  });
  return response.data;
};
