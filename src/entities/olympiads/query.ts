import { useQuery } from "@tanstack/react-query";
import { getOlympiads } from "@/entities/olympiads/api.ts";


interface Props {
  lang?: string;
  isInternational?: number;
  promotion?: string;
}

export const useOlympiadsQuery = ({lang, isInternational, promotion}: Props = {}) => {
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
}
