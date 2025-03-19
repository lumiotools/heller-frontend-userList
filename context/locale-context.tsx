"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/translations";

type Language = {
  code: string;
  name: string;
};

// Define a type for translation keys based on what's available in English translations
type TranslationKey = keyof typeof translations.en;

type LocaleContextType = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  t: (key: TranslationKey) => string;
  isLoading: boolean;
};

const languages: Record<string, Language> = {
  en: { code: "en", name: "English" },
  zh: { code: "zh", name: "Chinese" },
  hi: { code: "hi", name: "Hindi" },
  ja: { code: "ja", name: "Japanese" },
  ko: { code: "ko", name: "Korean" },
  th: { code: "th", name: "Thai" },
  vi: { code: "vi", name: "Vietnamese" },
};

// Provide a default value that matches the expected type
const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages.en);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage && languages[savedLanguage]) {
        setCurrentLanguage(languages[savedLanguage]);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const setLanguage = (code: string) => {
    if (languages[code] && currentLanguage.code !== code) {
      setIsLoading(true);

      setTimeout(() => {
        setCurrentLanguage(languages[code]);

        try {
          localStorage.setItem("preferredLanguage", code);
        } catch (error) {
          console.error("Error setting localStorage:", error);
        }

        setIsLoading(false);
      }, 300);
    }
  };

  const t = (key: TranslationKey): string => {
    const langCode = currentLanguage?.code || "en";
    const langTranslations = translations[langCode as keyof typeof translations] ?? translations.en;
    return langTranslations[key] ?? translations.en[key] ?? key;
  };

  const contextValue: LocaleContextType = {
    currentLanguage,
    setLanguage,
    t,
    isLoading,
  };

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};