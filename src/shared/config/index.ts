export const debugMode = import.meta.env.VITE_DEBUG_MODE === "true";

export const API_URL = debugMode
  ? "https://api-memory.firm.kiev.ua"
  : "https://olymp-space.com/";

export const UK_URL = debugMode
  ? "https://memory.firm.kiev.ua"
  : "https://space-memory.com";
export const PL_URL = debugMode
  ? "https://memory-pl.firm.kiev.ua"
  : "https://pl.space-memory.com";

export const EN_URL = debugMode
    ? "https://memory-en.firm.kiev.ua"
    : "https://en.space-memory.com";

