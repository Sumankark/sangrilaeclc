import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en.json";
import np from "./locales/np.json";

// i18next configuration
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to React
  .init({
    resources: {
      en: {
        translation: en,
      },
      np: {
        translation: np,
      },
    },
    fallbackLng: "en", // Fallback to English if translation is missing
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
