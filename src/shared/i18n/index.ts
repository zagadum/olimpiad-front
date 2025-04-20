import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Імпортуємо файли перекладів
import enTranslation from './locales/en/translation.json';
import ukTranslation from '@/shared/i18n/locales/uk/translation.json';
import plTranslation from './locales/pl/translation.json';

i18n
  .use(LanguageDetector) // Виявлення мови браузера
  .use(initReactI18next) // Інтеграція з React
  .init({
    resources: {
      en: { translation: enTranslation },
      uk: { translation: ukTranslation },
      pl: { translation: plTranslation },
    },
    fallbackLng: 'uk', // Мова за замовчуванням
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // Не екрануємо, бо React безпечний
    },
  });

export default i18n;
