import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";
import { Button } from "@/shared/ui/button";
import { getLang } from "@/shared/lib/getLang.ts";

export const OverviewPage: React.FC = () => {
  const lang = getLang();
  const navigate = useNavigate();
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    select: (value) => value.data_list[0],
    enabled: !!olympiadId,
  });

  const goToRegister = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    navigate(`/olympiads/${olympiadId}/register`);
  };

  console.log('data?.payment_status', data?.payment_status);

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div className="mt-8 rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] p-9 shadow-[-1px_-1px_1px_-0px_#657E8A]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="mb-4 text-3xl font-bold">Опис олімпіади</h2>
        <div className="mb-4 flex space-x-8">
          {data?.payment_status == "none" && (
            <Button onClick={goToRegister}>Участвовать</Button>
          )}
          {data?.payment_status == "ok" && (
            <>
              <Button variant="secondary">Тренировка</Button>
              <Button>Начать</Button>
            </>
          )}
        </div>
      </div>
      <div className="rounded-3xl bg-[--color-5] p-4">
        <p
          className="mb-4"
          dangerouslySetInnerHTML={{
            __html: data?.full_description[lang] ?? "",
          }}
        />
      </div>
    </div>
  );
};
