import { Ranking } from "./types";

export const getRankingResponse = () =>
  new Promise<{ status: number; data: Ranking[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          {
            id: "1",
            rank: 1,
            username: "Lukasz Dudek",
            country: "Украина",
            city: "Кривий Ріг",
            level: "Intermediate",
            time: "13:15",
            points: 9976,
            avatar: "/assets/avatar-1.png",
          },
          {
            id: "2",
            rank: 2,
            username: "Lukasz Pior",
            country: "Украина",
            city: "Кривий Ріг",
            level: "Intermediate",
            time: "13:15",
            points: 8800,
            avatar: "/assets/avatar-2.png",
          },
          {
            id: "3",
            rank: 3,
            username: "Anna Kaminska",
            country: "Украина",
            city: "Кривий Ріг",
            level: "Intermediate",
            time: "13:15",
            points: 7800,
            avatar: "/assets/avatar-3.png",
          },
          {
            id: "4",
            rank: 4,
            username: "Tomasz Kowalski",
            country: "Украина",
            city: "Кривий Ріг",
            level: "Intermediate",
            time: "13:15",
            points: 7500,
            avatar: "/assets/avatar-4.png",
          },
          {
            id: "5",
            rank: 5,
            username: "Adam Lewandowski",
            country: "Украина",
            city: "Кривий Ріг",
            level: "Intermediate",
            time: "13:15",
            points: 6999,
            isHighlighted: true,
            avatar: "/assets/avatar-5.png",
          },
        ],
      });
    }, 300);
  });
