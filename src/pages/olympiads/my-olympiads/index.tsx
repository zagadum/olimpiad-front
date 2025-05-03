import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOlympiads } from "@/entities/olympiads";
import { OlympiadsCard } from "@/widgets/olympiads-card";
import { useNavigate } from "react-router-dom";

export const MyOlympiadsPage: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-olympiads"],
    queryFn: getMyOlympiads,
    select: (value) => value.data_list,
  });

  const onOlympiadsCardClick = (id: number) => {
    navigate(`/olympiads/${id}`);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div className="space-y-8">
      {data?.length ? (
        data.map((olympiad) => (
          <OlympiadsCard
            key={olympiad.id}
            olympiad={olympiad}
            onCardClick={onOlympiadsCardClick}
          />
        ))
      ) : (
        <div>У вас немає активних олімпіад</div>
      )}
    </div>
  );
};
