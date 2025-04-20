import { OlympiadsResponse } from "./types";

export const getOlympiadsResponse = (params?: OlympiadsResponse["params"]) =>
  new Promise<{ status: number; data: OlympiadsResponse }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          data_list: [
            {
              id: 1,
              title: {
                uk: "Українська Національна Олімпіада",
                pl: "fdsf",
              },
              country_id: 1,
              region_id: 1,
              city_id: 1,
              locality: "dfsdf",
              promotion: "olympiad",
              is_international: 0,
              announcement_start_date: "2025-04-11",
              announcement_end_date: "2025-04-10",
              activation_date: "2025-04-02",
              start_date: "2025-04-02",
              end_date: "2025-04-03",
              status: "draft",
              local_price: 500,
              local_currency: "UAH",
              international_price: "0.00",
              international_currency: "EUR",
              created_by: 1,
              created_at: "2025-04-08",
              updated_at: "2025-04-10",
              city_name: "Киев",
              region_name: "Черновицкая обл.",
              country_name: "Украина",
              short_description: {
                uk: "Для всіх студентів з України ми організовуємо національну олімпіаду",
                pl: "fdsf",
              },
              cover: {
                uk: "fdsf",
                pl: "fdsf",
              },
              full_description: {
                uk: "test",
                pl: "dfdsf",
              },
              payment_status: "none",
            },
            {
              id: 2,
              title: {
                uk: "Всеукраїнська Національна Олімпіада",
                pl: "fdsf",
              },
              country_id: 1,
              region_id: 1,
              city_id: 1,
              locality: "dfsdf",
              promotion: "olympiad",
              is_international: 1,
              announcement_start_date: "2025-04-02",
              announcement_end_date: "2025-04-10",
              activation_date: "2025-04-02",
              start_date: "2025-04-21",
              end_date: "2025-04-26",
              status: "draft",
              local_price: 500,
              local_currency: "UAH",
              international_price: "0.00",
              international_currency: "EUR",
              created_by: 1,
              created_at: "2025-04-08",
              updated_at: "2025-04-10",
              city_name: "Киев",
              region_name: "Черновицкая обл.",
              country_name: "Украина",
              short_description: {
                uk: "Для всіх студентів з України ми організовуємо національну олімпіаду. Перед участю ознайомтеся з правилами.",
                pl: "fdsf",
              },
              cover: {
                uk: "fdsf",
                pl: "fdsf",
              },
              full_description: {
                uk: `
<h3>Тренировка</h3>
<p>После регистриции на платформе Олимпиады, вы можете тренироваться 7 раз в день.
Доступ открыт с 25.04.2025 - 05.05.2025г.</p>
<h3>Прохождение олимпиады</h3>
<p>Пройти Олимпиаду вы можете только один раз, нажав кнопку «Начать Олимпиаду».
Доступ открыт с 01.05.2025 - 05.05.2025г.</p>
<h3>Олимпиаду можно пройти используя:</h3>
<ul>
<li>Компьютер</li>
<li>Ноутбук</li>
<li>Планшет</li>
</ul>
<h3 style="color: #F98901">Запрещено проходить олимпиаду на телефоне!</h3>
<h3>Во время прохождения онлайн олимпиады обязательно делать видеозапись!</h3>
<p>На видео должен быть четко виден ребенок, экран, и четко зафиксирован результат прохождения олимпиады. Видео должно быть со звуком и без монтажа, сниматься непрерывно от начала и до конца олимпиады. Участник должен быть без наушников!</p>
`,
                pl: "dfdsf",
              },
              payment_status: "ok",
            },
          ],
          params: params || []
        },
      });
    }, 500);
  });
