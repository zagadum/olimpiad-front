import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyOlympiads } from '@/entities/olympiads';
import { OlympiadsCard } from '@/widgets/olympiads-card';

export const MyOlympiadsPage: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-olympiads'],
    queryFn: getMyOlympiads
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка завантаження даних</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {data?.length ? (
        data.map((olympiad) => (
          <OlympiadsCard key={olympiad.id} olympiad={olympiad} />
        ))
      ) : (
        <div>У вас немає активних олімпіад</div>
      )}
    </div>
  );
};
