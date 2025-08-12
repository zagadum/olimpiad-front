type Lang = "uk" | "pl";
const languages: Lang[] = ["uk", "pl"];

export const getLang = (language?: string): Lang => {
  if (languages.includes(language as Lang)) {
    return language as Lang;
  }
  return "uk";
};
