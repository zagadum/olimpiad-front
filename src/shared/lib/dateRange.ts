import { isAfter, isBefore, isValid } from "date-fns";

export const dateRange = (date: string, dateBefore: string, dateAfter: string) => {
  const parsedDate = Date.parse(date);
  const parsedDateBefore = Date.parse(dateBefore);
  const parsedDateAfter = Date.parse(dateAfter);
  const isDateValid = isValid(parsedDate);
  const isDateBeforeValid = isValid(parsedDateBefore);
  const isDateAfterValid = isValid(parsedDateAfter);
  return isDateValid && isDateBeforeValid && isDateAfterValid && isBefore(parsedDateBefore, parsedDate) && isAfter(parsedDateAfter, parsedDate);
};

export const isDateBefore = (dateBefore: string, date?: string) => {
  const parsedDate = date ? Date.parse(date) : Date.now();
  const parsedDateBefore = Date.parse(dateBefore);
  const isDateValid = isValid(parsedDate);
  const isDateBeforeValid = isValid(parsedDateBefore);
  return isDateValid && isDateBeforeValid && isBefore(parsedDateBefore, parsedDate);
};

export const isDateAfter = (date: string, dateAfter: string) => {
  const parsedDate = Date.parse(date);
  const parsedDateAfter = Date.parse(dateAfter);
  const isDateValid = isValid(parsedDate);
  const isDateAfterValid = isValid(parsedDateAfter);
  return isDateValid && isDateAfterValid && isAfter(parsedDateAfter, parsedDate);
};
