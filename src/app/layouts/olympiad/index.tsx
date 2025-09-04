import { FC } from "react";
import { Outlet, useParams } from "react-router-dom";
import { OlympiadHeader } from "@/widgets/olympiad-header";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";

export const OlympiadLayout: FC = () => {
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const { data, error } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

  if (error) return <div>Помилка завантаження даних</div>;
  return (
    <main className="flex-1 overflow-auto px-4 py-6 md:px-6 md:py-8 lg:px-10 lg:py-10 xl:px-24 xl:py-12">
      <OlympiadHeader olympiad={data} />
      <Outlet />
    </main>
  );
};
