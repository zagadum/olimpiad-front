import i18n from "@/shared/i18n";

type Lang = "uk" | "pl";
const languages: Lang[] = ["uk", "pl"];

export const getLang = (): Lang => {
  if (languages.includes(i18n.language as Lang)) {
    return i18n.language as Lang;
  }
  return "uk";
};
