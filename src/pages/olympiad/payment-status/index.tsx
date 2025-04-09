import React from 'react';
import { Link } from 'react-router-dom';

export const PaymentStatusPage: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Статус оплати</h2>
      <p className="mb-4">Оплата пройшла успішно! Дякуємо за участь.</p>
      <Link to="/olympiads" className="text-blue-500 underline">
        Повернутися до олімпіад
      </Link>
    </div>
  );
};
