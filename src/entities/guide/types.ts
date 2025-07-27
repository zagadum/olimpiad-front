import { Params } from "@/shared/types";

export interface Country {
  id: number;
  name: string;
}

export interface Region {
  id: number;
  name: string;
}

export interface CountryListResponse {
  data_list: Country[];
  params: Params;
}

export interface RegionListResponse {
  data_list: Region[];
  params: Params;
}
