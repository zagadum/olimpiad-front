type Lang = "uk" | "pl";
const languages: Lang[] = ["uk", "pl"];

export const getLang = (language?: string): Lang => {
  console.log('getLang', language);
  if (languages.includes(language as Lang)) {
    return language as Lang;
  }
  return "uk";
};
