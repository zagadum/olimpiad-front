// export interface Ranking {
//   id: string;
//   username: string;
//   points: number;
// }

export interface Ranking {
  id: string;
  username: string;
  country: string;
  city: string;
  level: string;
  time: string;
  points: number;
  isHighlighted?: boolean;
  rank?: number;
  avatar?: string;
}
