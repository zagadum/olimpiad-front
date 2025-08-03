import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { isValid, format } from 'date-fns';
import { Olympiad } from '@/entities/olympiads';
import { getLang } from '@/shared/lib/getLang';

// Хук для форматування дати
export const useFormatDate = (date: string) => {
  return useMemo(() => {
    const parsedDate = Date.parse(date);
    const isDateValid = isValid(parsedDate);
    if (isDateValid) {
      return format(parsedDate, "dd.MM.yyyy");
    }
    return date;
  }, [date]);
};

// Хук для обчислення статусу оплати
export const useOlympiadPaymentStatus = (olympiad: Olympiad) => {
  return useMemo(() => ({
    isPaid: olympiad.payment_status === "ok" || olympiad.is_pay === 1,
    needsPayment: !olympiad.payment_status ||
      olympiad.payment_status === "none" ||
      olympiad.payment_status === "no" ||
      olympiad.is_pay === 0,
  }), [olympiad.payment_status, olympiad.is_pay]);
};

// Хук для отримання мови
export const useLanguage = () => {
  const { i18n } = useTranslation();
  return useMemo(() => getLang(i18n.language), [i18n.language]);
};
