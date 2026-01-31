import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";
import { useTranslation } from "react-i18next";
import i18n from "@/shared/i18n";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/widgets/olympiads-card/hooks.ts";

const ukSuccessDescription = `
<p>Ваш платіж успішно оброблено.</p>
<br />
<p>📩 Що далі?</p>
<ul>
  <li>
    Ми відправили ваш унікальний код учасника олімпіади на вашу
    электронну пошту.
  </li>
  <li>
    Якщо у вас виникли запитання, зв'яжіться з нами:
    [office@space-memory.com]
  </li>
</ul>
<br />
<p>🎯 Готові к змагання?</p>
<p>Перейдіть на сторінку олімпіади, щоб почати тренуватися</p>
`;

const ukErrorDescription = `
<p>На жаль, вашу оплату не вдалося обробити. Будь ласка, спробуйте ще раз.
Якщо проблема повторюється, зв’яжіться з нашою службою підтримки:</p>
<br />
<p>📞 (+48) 733 805 610</p>
<p>📧 office@space-memory.com</p>
<br />
<p>Дякуємо за ваше терпіння!</p>
`;

const ukPendingDescription = `
<p>Будь ласка, зачекайте. Операція виконується, це може зайняти кілька секунд.
Не закривайте сторінку й не оновлюйте її, поки транзакція не завершиться.</p>
<br />
<p>Дякуємо за терпіння! 💙</p>
<br />
<p>❓ Якщо у вас виникнуть запитання щодо оплати, напишіть нам:</p>
<p>📧 office@space-memory.com</p>
`;

const plSuccessDescription = `
<p>Twoja płatność została pomyślnie przetworzona.</p>
<br />
<p>📩 Co dalej?</p>
<ul>
  <li>
    Wysłaliśmy Twój unikalny kod uczestnika olimpiady na podany adres e-mail.
  </li>
  <li>
    Masz pytania? Skontaktuj się z nami: [office@space-memory.com].
  </li>
</ul>
<br />
<p>🎯 Gotowy do rywalizacji?</p>
<p>Przejdź na stronę olimpiady, aby rozpocząć przygotowania.</p>
`;

const plErrorDescription = `
<p>Niestety, Twoja płatność nie została przetworzona. Prosimy, spróbuj ponownie.
Jeśli problem się powtórzy, skontaktuj się z naszym zespołem wsparcia:</p>
<br />
<p>📞 (+48) 733 805 610</p>
<p>📧 office@space-memory.com</p>
<br />
<p>Dziękujemy za cierpliwość!</p>
`;

const plPendingDescription = `
<p>Prosimy o chwilę cierpliwości. Operacja jest w toku i może potrwać kilka sekund.
Nie zamykaj ani nie odświeżaj strony, dopóki transakcja się nie zakończy.</p>
<br />
<p>Dziękujemy za cierpliwość! 💙</p>
<br />
<p>❓ Masz pytania dotyczące płatności? Skontaktuj się z nami:</p>
<p>📧 office@space-memory.com</p>
`;

const enPendingDescription = `
<p>Prosimy o chwilę cierpliwości. Operacja jest w toku i może potrwać kilka sekund.
Nie zamykaj ani nie odświeżaj strony, dopóki transakcja się nie zakończy.</p>
<br />
<p>Dziękujemy za cierpliwość! 💙</p>
<br />
<p>❓ Masz pytania dotyczące płatności? Skontaktuj się z nami:</p>
<p>📧 office@space-memory.com</p>
`;
const enSuccessDescription = `
<p>Twoja płatność została pomyślnie przetworzona.</p>
<br />
<p>📩 Co dalej?</p>
<ul>
  <li>
    Wysłaliśmy Twój unikalny kod uczestnika olimpiady na podany adres e-mail.
  </li>
  <li>
    Masz pytania? Skontaktuj się z nami: [office@space-memory.com].
  </li>
</ul>
<br />
<p>🎯 Gotowy do rywalizacji?</p>
<p>Przejdź na stronę olimpiady, aby rozpocząć przygotowania.</p>
`;

const enErrorDescription = `
<p>Niestety, Twoja płatność nie została przetworzona. Prosimy, spróbuj ponownie.
Jeśli problem się powtórzy, skontaktuj się z naszym zespołem wsparcia:</p>
<br />
<p>📞 (+48) 733 805 610</p>
<p>📧 office@space-memory.com</p>
<br />
<p>Dziękujemy za cierpliwość!</p>
`;
const statusData = {
  success: {
    title: i18n.t("paymentStatus.success.title"),
    description: {
      uk: ukSuccessDescription,
      pl: plSuccessDescription,
      en: enSuccessDescription,
    },
  },
  error: {
    title: i18n.t("paymentStatus.error.title"),
    description: {
      uk: ukErrorDescription,
      pl: plErrorDescription,
      en: enErrorDescription,
    },
  },
  pending: {
    title: i18n.t("paymentStatus.pending.title"),
    description: {
      uk: ukPendingDescription,
      pl: plPendingDescription,
      en: enPendingDescription,
    },
  },
};

type PaymentStatus = "success" | "error" | "pending";

export const PaymentStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = useLanguage();

  const queryClient = useQueryClient();

  const [statusType, setStatusType] = useState<PaymentStatus>("pending")

  const content = statusData[statusType];
  const description = content.description[lang];

  const handleAccept = () => {
    // Переходимо до сторінки олімпіади
    queryClient.invalidateQueries({queryKey: ['olympiad']})
    navigate("..", { replace: true });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStatusType("success")
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);
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
            __html: description ?? "",
          }}
        ></div>
      </div>
      <div className="w-full max-w-[1286px] md:p-4">
        {statusType === "success" && (
          <Button
            className="w-full text-base md:w-auto lg:px-8 lg:py-3 lg:text-base"
            onClick={handleAccept}
          >
            {t("paymentStatus.goToOlympiad")}
          </Button>
        )}
      </div>
    </div>
  );
};
