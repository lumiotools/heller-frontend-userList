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
  isLoading: boolean
}

const languages: Record<string, Language> = {
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
  isLoading: false,
})

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(languages.en)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with English or browser language on client side
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("preferredLanguage")
      const languageCode = savedLanguage || "en"
      setCurrentLanguage(languages[languageCode] || languages.en)
    } catch (error) {
        console.log("Error", error as Error);
      // If localStorage is not available, default to English
      setCurrentLanguage(languages.en)
    }
  }, [])

  const setLanguage = (code: string) => {
    if (languages[code] && currentLanguage?.code !== code) {
      setIsLoading(true)

      // Simulate loading delay for better UX
      setTimeout(() => {
        setCurrentLanguage(languages[code])
        try {
          localStorage.setItem("preferredLanguage", code)
        } catch (error) {
          // Ignore localStorage errors
          console.log("Error", error as Error);
        }
        setIsLoading(false)
      }, 300)
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!currentLanguage) return key

    const langTranslations = translations[currentLanguage.code]
    if (!langTranslations) return key

    return langTranslations[key] || translations.en[key] || key
  }

  const contextValue = {
    currentLanguage,
    setLanguage,
    t,
    isLoading,
  }

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>
}

export const useLocale = () => {
  return useContext(LocaleContext)
}

