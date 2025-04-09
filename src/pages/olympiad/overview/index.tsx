import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOlympiadDetail } from "@/entities/olympiads";

export const OverviewPage: React.FC = () => {
  const { olympiadId } = useParams<{ olympiadId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["olympiad", olympiadId],
    queryFn: () => getOlympiadDetail(olympiadId!),
    enabled: !!olympiadId,
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">{data?.title}</h1>
      <img
        src={data?.imageUrl}
        alt={data?.title}
        className="mb-4 h-auto w-full"
      />
      <p className="mb-4">{data?.description}</p>
      <div className="mb-4 flex space-x-4">
        <Link to="register" className="text-blue-500 underline">
          Участвовать
        </Link>
        <Link to="training" className="text-blue-500 underline">
          Тренировка
        </Link>
      </div>
      {/* Outlet дозволяє відображати дочірні маршрути */}
      <Outlet />
    </div>
  );
};
