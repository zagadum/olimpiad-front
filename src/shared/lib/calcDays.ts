import { formatDistanceToNowStrict, isAfter, isValid } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { pl } from "date-fns/locale/pl";
import { enUS} from "date-fns/locale/en-US";

const locales = {
  uk: uk,
  pl: pl,
  en: enUS
}

export const calcDays = (date: string, lang: keyof typeof locales = 'uk') => {
  const locale = locales[lang];
  const dateNow = Date.now();
  const parsedDate = Date.parse(date);
  const isDateValid = isValid(parsedDate);
  if (isDateValid && isAfter(parsedDate, dateNow)) {
    return formatDistanceToNowStrict(parsedDate, { locale });
  }
  return "";
};
