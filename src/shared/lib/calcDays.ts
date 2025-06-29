import { formatDistanceToNowStrict, isAfter, isValid } from "date-fns";
import { uk } from "date-fns/locale/uk";

export const calcDays = (date: string) => {
  const dateNow = Date.now();
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid && isAfter(parsedDate, dateNow)) {
    return formatDistanceToNowStrict(parsedDate, { locale: uk });
  }
  return "";
};
