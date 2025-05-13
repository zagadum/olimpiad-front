import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

const successDescription = `
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
`;

const errorDescription = `
<p>На жаль, вашу оплату не вдалося обробити. Будь ласка, спробуйте ще раз.
Якщо проблема повторюється, зв’яжіться з нашою службою підтримки:</p>
<br />
<p>📞 (+48) 733 805 610</p>
<p>📧 office@space-memory.com</p>
<br />
<p>Дякуємо за ваше терпіння!</p>
`;

const pendingDescription = `
<p>Будь ласка, зачекайте. Операція виконується, це може зайняти кілька секунд.
Не закривайте сторінку й не оновлюйте її, поки транзакція не завершиться.</p>
<br />
<p>Дякуємо за терпіння! 💙</p>
<br />
<p>❓ Якщо у вас виникнуть запитання щодо оплати, напишіть нам:</p>
<p>📧 office@space-memory.com</p>
`;

const statusData = {
  success: {
    title: "✅ Оплата пройшла успішно!",
    description: successDescription,
  },
  error: { title: "❌ Платіж не пройшов", description: errorDescription },
  pending: { title: "⏳ Обробка платежу…", description: pendingDescription },
};

export const PaymentStatusPage: React.FC = () => {
  const navigate = useNavigate();

  const statusType = "error";

  const content = statusData[statusType];

  const handleAccept = () => {
    // Переходимо до сторінки олімпіади
    navigate("..", { replace: true });
  };
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div
        className={cn(
          "mt-10 w-full rounded-xl bg-gradient-to-t from-[#082536] to-[#193C4D] px-4 pb-12 pt-8 shadow-[-1px_-1px_1px_-0px_#657E8A]",
          "md:mt-20 md:max-w-[1286px] md:rounded-3xl md:px-16 md:pb-24 md:pt-16",
        )}
      >
        <div className="mb-6 md:mb-10">
          <h2 className="text-xl font-bold md:px-4 md:text-3xl">
            {content.title}
          </h2>
        </div>
        <div
          className="rounded-xl bg-[--color-5] p-4 text-sm text-[--color-placeholder] md:rounded-3xl md:text-base"
          dangerouslySetInnerHTML={{
            __html: content.description ?? "",
          }}
        ></div>
      </div>
      <div className="w-full max-w-[1286px] md:p-4">
        <Button
          className="w-full text-base md:w-auto lg:px-8 lg:py-3 lg:text-base"
          onClick={handleAccept}
        >
          Перейти до олімпіади
        </Button>
      </div>
    </div>
  );
};
