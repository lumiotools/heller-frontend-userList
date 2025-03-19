"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations } from "@/translations"

type Language = {
  code: string
  name: string
}

type LocaleContextType = {
  currentLanguage: Language | null
  setLanguage: (code: string) => void
  t: (key: string) => string
}

// Define the valid language codes as a type
type LanguageCode = keyof typeof translations

const languages: Record<LanguageCode, Language> = {
  en: { code: "en", name: "English" },
  zh: { code: "zh", name: "Chinese" },
  hi: { code: "hi", name: "Hindi" },
  ja: { code: "ja", name: "Japanese" },
  ko: { code: "ko", name: "Korean" },
  th: { code: "th", name: "Thai" },
  vi: { code: "vi", name: "Vietnamese" },
}

// Create context with default values to prevent undefined errors
const LocaleContext = createContext<LocaleContextType>({
  currentLanguage: null,
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(languages.en)

  // Initialize with English or browser language on client side
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage")
      const languageCode = savedLanguage || "en"
      // Type guard to ensure languageCode is a valid key
      if (isValidLanguageCode(languageCode)) {
        setCurrentLanguage(languages[languageCode] || languages.en)
      } else {
        setCurrentLanguage(languages.en)
      }
    } catch (error) {
      // If localStorage is not available, default to English
      setCurrentLanguage(languages.en)
    }
  }, [])

  // Type guard function to check if a string is a valid language code
  function isValidLanguageCode(code: string): code is LanguageCode {
    return code in translations
  }

  const setLanguage = (code: string) => {
    if (isValidLanguageCode(code) && currentLanguage?.code !== code) {
      setCurrentLanguage(languages[code])
      try {
        localStorage.setItem("preferredLanguage", code)
      } catch (error) {
        // Ignore localStorage errors
      }
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!currentLanguage) return key

    // Use type guard to ensure code is a valid key
    const code = currentLanguage.code
    if (!isValidLanguageCode(code)) return key

    const langTranslations = translations[code]
    if (!langTranslations) return key

    return langTranslations[key] || translations.en[key] || key
  }

  const contextValue = {
    currentLanguage,
    setLanguage,
    t,
  }

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>
}

export const useLocale = () => {
  return useContext(LocaleContext)
}

