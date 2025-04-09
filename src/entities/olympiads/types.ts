export type OlympiadType =
  | "international"
  | "ukrainian"
  | "polish"
  | "announce"
  | "spacem";

// Інтерфейс, що описує структуру даних для олімпіади
export interface Olympiad {
  id: string;
  title: string;
  description: string;
  type: OlympiadType[];
  registrationDeadline?: string;
  startDate: string;
  endDate?: string;
  imageUrl?: string;
  currency?: string;
  price?: number;
  isPaid?: boolean;
  trainingCount?: number;
}
