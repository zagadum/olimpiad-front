export interface RankingDetail {
  category: string;
  total: number | string;
}

export interface Ranking {
  age_tab: string;
  good_answear: number | string;
  lastname: string;
  olympiad_id: number;
  place: number;
  points: number | string;
  practicant_id: number;
  stages_level: string;
  stages_num: number;
  surname: string;
  details?: RankingDetail[];
}

export interface ApiRankingResponse {
  result: Ranking[];
  table_links: string[];
}
