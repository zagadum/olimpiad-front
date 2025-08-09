// Інтерфейс, що описує дані користувача
export interface User {
  id: number;
  student_id: number;
  name: string;
  surname: string;
  lastname: string;
  language: string;
  patronymic: string;
  email: string;
  email_verified_at: string;
  phone: string;
  phone_country: string;
  dob: string;
  country_id: number;
  region_id: number;
  city_id: number;
  locality: string;
  school: string;
  age_id: number;
  blocked: boolean;
  deleted: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  data_list: {
    practicant: User
  }
}
