export const API_URL = import.meta.env.DEV
  ? undefined
  : "https://api-memory.firm.kiev.ua";

//PROD
// export const UK_URL = import.meta.env.DEV ? 'https://memory.firm.kiev.ua' : 'https://space-memory.com'
// export const PL_URL = import.meta.env.DEV ? 'https://memory-pl.firm.kiev.ua' : 'https://pl.space-memory.com'

//STAGE
export const UK_URL = 'https://memory.firm.kiev.ua'
export const PL_URL = 'https://memory-pl.firm.kiev.ua'
