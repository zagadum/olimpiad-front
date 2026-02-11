import { Params } from "@/shared/types";

export interface Olympiad {
  id: number;
  title: {
    uk: string;
    pl: string;
    en: string;
  };
  country_id: number;
  country_name: string;
  country_img: string;
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
  short_description: {
    uk: string;
    pl: string;
    en: string;
  };
  cover: {
    uk: string;
    pl: string;
    en: string;
  };
  full_description: {
    uk: string;
    pl: string;
    en: string;
  };
  image_url?: string;
  training_count?: number;
  subscribe: {
    id?: number;
    practicant_id?: number;
    olympiad_id?: number;
    subscribe_date?: string;
    age_tab?: string;
    stages_level?: string;
    stages_num?: number;
    language?: string;
    is_pay?: number;
    created_at?: string;
    updated_at?: string;
  };
  is_pay: number;
  is_done: number;
}

export interface OlympiadsResponse {
  data_list: Olympiad[];
  params: Params;
}

interface TaskItem {
  id: number;
  name: string;
}

export type Task = Record<string, TaskItem[]>;

export interface TaskList {
  points: null;
  points: null;
  id: number;
  name: string;
  btn_allow: number;
  cnt_repeat: number;
  descr: string;
  params_json: {
    level: string;
    training_type_id: {
      id: number;
      name: string;
      short_name: string;
      table_link: string;
      comment: null;
      game_level: number;
      olympiad: number;
      enabled: number;
      created_at: string;
      updated_at: string;
      resource_url: string;
    };
    range_type: null;
    cnt_operation_list: {
      key: number;
      value: number;
      label: string;
    };
    category_maths_list: {
      key: number;
      value: string;
      label: string;
    };
    capacity_list: {
      key: number;
      value: number;
      label: string;
    };
    interval_olimpiad_list: {
      key: number;
      label: string;
      value: number;
    };
    capacity_maths_list2: {
      key: number;
      value: number;
      label: string;
    };
    procent_level_list: {
      key: number;
      value: string;
      label: string;
    };
    div_comma: number;
    evaluation: string;
    digit_number_list: string;
    interval_list: {
      key: number;
      label: string;
      value: number;
    };
    interval_memory_list: {
      key: number;
      label: string;
      value: number;
    };
    repeat_number_list: {
      key: number;
      value: number;
    };
    suits_s: number;
    suits_h: number;
    suits_d: number;
    suits_c: number;
    div_suits: number;
    group_cards: number;
    pack_cards: number;
    pack_cards_list: {
      key: number;
      value: number;
      label: number;
    };
    range_increment_olist: {
      key: number;
      value: string;
    };
    interval: number;
    repeat_number: number;
    interval_memory: number;
    digit_number: string;
    capacity: number;
    range_value: null;
    show_groups: string;
    categoryBinaryFlag: string;
    category_binary: number;
    category_id: number;
  };
  table_name: string;
}

export interface OlympiadsTaskResponse {
  data_list: Task;
  params: Params;
}

export interface OlympiadsTaskListResponse {
  data_list: TaskList[];
  params: Params;
}

export interface OlympiadParamsAll {
  age_tab: string[];
  stages_level: string[];
  stages_num: number[];
  all: {
    age_tab: string;
    stages_level: string;
    stages_num: number;
  }[];
}

export interface OlympiadParamsAllResponse {
  data_list: OlympiadParamsAll;
  params: Params;
}

export interface RunOlympiadResponse {
  data_list: {
    success: boolean;
    ret_url: string;
  };
  message: string;
  warning: string;
  error: number;
}

export interface Agreement {
  id: number;
  olympiad_id: number;
  language: string;
  agreement: string;
  created_at: string;
  updated_at: string;
}

export interface OlympiadsAgreementResponse {
  data_list: Agreement[];
  params: Params;
}
