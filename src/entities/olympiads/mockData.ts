import { Olympiad } from "./types";

export const getOlympiadsResponse = () =>
  new Promise<{ status: number; data: Olympiad[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          {
            id: "1",
            title: "Украинская Национальная Олимпиада",
            description:
              "Для всех студентов из Украины мы организуем национальную олимпиаду. Для всех студентов из Украины мы организуем национальную олимпиаду. Для всех студентов из Украины мы организуем национальную олимпиаду.",
            type: ["ukrainian", 'spacem'],
            startDate: "2025-11-17",
            endDate: "2025-05-05",
            price: 500,
            isPaid: false,
            trainingCount: 7,
          },
          {
            id: "2",
            title: "International Competition",
            description:
              "For all students around the world we have an international competition.",
            type: ["international", "announce"],
            startDate: "2025-04-25",
            endDate: "2025-05-05",
            price: 1700,
            isPaid: true,
            trainingCount: 0,
          },
        ],
      });
    }, 300);
  });
