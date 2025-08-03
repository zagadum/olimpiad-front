import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isValid, format } from 'date-fns';
import { Olympiad } from '@/entities/olympiads';
import { calcDays } from '@/shared/lib/calcDays';
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

// Хук для обчислення дат
export const useOlympiadDates = (olympiad: Olympiad, lang: string) => {
  const formattedStartDate = useFormatDate(olympiad.start_date ?? "");
  const formattedEndDate = useFormatDate(olympiad.end_date ?? "");
  
  const startDateDistance = useMemo(() => 
    calcDays(olympiad.start_date ?? "", lang), 
    [olympiad.start_date, lang]
  );

  const endDateDistance = useMemo(() => 
    calcDays(olympiad.end_date ?? "", lang), 
    [olympiad.end_date, lang]
  );

  return {
    formattedStartDate,
    formattedEndDate,
    startDateDistance,
    endDateDistance,
  };
};

// Хук для навігації
export const useOlympiadNavigation = (olympiadId: number) => {
  const navigate = useNavigate();

  const goToRegister = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiadId}/register`);
  }, [navigate, olympiadId]);

  const goToTraining = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiadId}/training`);
  }, [navigate, olympiadId]);

  const goToStart = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/olympiads/${olympiadId}/start`);
  }, [navigate, olympiadId]);

  return {
    goToRegister,
    goToTraining,
    goToStart,
  };
};

// Хук для отримання мови
export const useLanguage = () => {
  const { i18n } = useTranslation();
  return useMemo(() => getLang(i18n.language), [i18n.language]);
}; 