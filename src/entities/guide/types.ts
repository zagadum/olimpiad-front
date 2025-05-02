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
  params: [] | { [key: string]: string | number | undefined };
}

export interface RegionListResponse {
  data_list: Region[];
  params: [] | { [key: string]: string | number | undefined };
}
