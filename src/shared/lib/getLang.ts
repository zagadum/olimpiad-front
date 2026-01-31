type Lang = "uk" | "pl" | "en";
const languages: Lang[] = ["uk", "pl","en"];

export const getLang = (language?: string): Lang => {
  if (languages.includes(language as Lang)) {
    return language as Lang;
  }
  return "uk";
};
