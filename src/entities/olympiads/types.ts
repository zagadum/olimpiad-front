// Інтерфейс, що описує структуру даних для олімпіади
export interface Olympiad {
  id: number;
  title: {
    uk: string;
    pl: string;
  };
  country_id: number;
  region_id: number;
  city_id: number;
  locality: string;
  promotion: string;
  is_international: number;
  payment_status: string;
  announcement_start_date: string;
  announcement_end_date: string;
  activation_date: string;
  start_date: string;
  end_date: string;
  status: string;
  local_price: number;
  local_currency: string;
  international_price: string;
  international_currency: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  city_name: string;
  region_name: string;
  country_name: string;
  short_description: {
    uk: string;
    pl: string;
  };
  cover: {
    uk: string;
    pl: string;
  };
  full_description: {
    uk: string;
    pl: string;
  };
  image_url?: string;
  training_count?: number;
}

export interface OlympiadsResponse {
  data_list: Olympiad[];
  params: [] | { [key: string]: string | number | undefined };
}

export interface Task {
  id: number;
  olympiad_id: number;
  stages_level: string;
  age_tab: string;
  stages_num: number;
  is_basic: number;
  is_intermediate: number;
  is_pro: number;
  training_type_id: number;
  params_json: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
}

export interface OlympiadsTaskResponse {
  data_list: Task[];
  params: [] | { [key: string]: string | number | undefined };
}
