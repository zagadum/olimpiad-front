import { UserResponse } from "./types";

export const getOlympiadsResponse = () =>
  new Promise<{ status: number; data: UserResponse }>((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          data_list: {
            practicant: {
              id: 2,
              student_id: 58,
              name: "",
              surname: "florya",
              lastname: "aleksey",
              patronymic: "",
              email: "aleksey.florya@gmail.com",
              email_verified_at: "",
              phone: "+380678889672",
              dob: "2020-01-01",
              phone_country: "UA",
              country_id: 0,
              region_id: 0,
              city_id: 0,
              locality: "",
              school: "SpaceM",
              age_id: 0,
              blocked: false,
              deleted: false,
              last_login_at: "",
              created_at: "2025-04-28T09:24:48.000000Z",
              updated_at: "2025-04-28T09:24:48.000000Z",
            },
          },
        },
      });
    }, 500);
  });
