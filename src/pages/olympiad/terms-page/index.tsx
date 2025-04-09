import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Після прийняття умов переходимо до сторінки оплати
    navigate('/payment-status');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Умови олімпіади</h2>
      <p className="mb-4">
        Будь ласка, уважно прочитайте умови участі в олімпіаді. Тут можуть бути перелічені правила, порядок оплати,
        порядок участі та інша важлива інформація.
      </p>
      <button onClick={handleAccept} className="px-4 py-2 bg-blue-500 text-white rounded">
        Прийняти
      </button>
    </div>
  );
};
