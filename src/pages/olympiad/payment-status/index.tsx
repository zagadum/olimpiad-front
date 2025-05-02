import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";

export const PaymentStatusPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Переходимо до сторінки олімпіади
    navigate("..", { replace: true });
  };
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="mt-20 w-full max-w-[1286px] rounded-3xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-16 pt-16 pb-24 shadow-[-1px_-1px_1px_-0px_#657E8A]">
        <div className="mb-10">
          <h2 className="px-4 text-3xl font-bold">✅ Оплата пройшла успішно!</h2>
        </div>
        <div className="rounded-3xl bg-[--color-5] p-4 text-[--color-placeholder]">
          <p>Спасибо! Ваш платеж успешно обработан.</p>
          <br />
          <p>📩 Что дальше?</p>
          <ul>
            <li>
              Мы отправили ваш уникальный код участника олимпиады на вашу
              электронную почту.
            </li>
            <li>
              Если у вас возникли вопросы, свяжитесь с нами:
              [office@space-memory.com]
            </li>
          </ul>
          <br />
          <p>🎯 Готовы к соревнованию?</p>
          <p>Перейдите на страницу олимпиады, чтобы начать тренироваться</p>
        </div>
      </div>
      <div className="w-full max-w-[1286px] p-4">
        <Button onClick={handleAccept}>Перейти до олімпіади</Button>
      </div>
    </div>
  );
};
