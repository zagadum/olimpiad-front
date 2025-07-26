import { useQuery } from "@tanstack/react-query";
import { getOlympiads, getMyOlympiads } from "@/entities/olympiads/api";

interface Props {
  lang?: string;
  isInternational?: number;
  promotion?: string;
}

export const useOlympiadsQuery = ({
  lang,
  isInternational,
  promotion,
}: Props = {}) => {
  return useQuery({
    queryKey: [
      "olympiads",
      { language: lang, is_international: isInternational, promotion },
    ],
    queryFn: () =>
      getOlympiads({
        language: lang,
        is_international: isInternational,
        promotion,
      }),
    select: (value) => value.data_list,
  });
};

export const useMyOlympiadsQuery = ({
  lang,
  isInternational,
  promotion,
}: Props = {}) => {
  return useQuery({
    queryKey: [
      "olympiads",
      { language: lang, is_international: isInternational, promotion },
    ],
    queryFn: getMyOlympiads,
    select: (value) => value.data_list,
  });
};
