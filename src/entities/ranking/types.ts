export interface RankingDisciplineScores {
  clk?: number;       // ЧЛК
  pictures?: number;  // Картинки
  words?: number;     // Слова
  cards?: number;     // Карти
  binary?: number;    // Бінар
  dates?: number;     // Дати
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
  // Fields to be provided by backend
  city?: string;
  country?: string;
  discipline_scores?: RankingDisciplineScores;
}

export interface ApiRankingResponse {
  result: Ranking[];
  table_links: string[];
}

export type Discipline = 'all' | 'clk' | 'pictures' | 'words' | 'cards' | 'binary' | 'dates';

export const DISCIPLINES: Discipline[] = ['all', 'clk', 'pictures', 'words', 'cards', 'binary', 'dates'];
