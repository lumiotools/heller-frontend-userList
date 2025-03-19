"use client"
// Update the Header component to use the translation function
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useLocale } from "@/context/locale-context"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { setLanguage, currentLanguage, t } = useLocale()

  // Redirect to /chatbot if on the home page
  useEffect(() => {
    if (pathname === "/") {
      router.push("/")
    }
  }, [pathname, router])

  // Define the mapping of country flags to language codes
  const flags = [
    {
      src: "https://heller-proto-frontend.vercel.app/usa.png",
      alt: "USA Flag",
      language: "en",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/china.png",
      alt: "China Flag",
      language: "zh",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/india.png",
      alt: "India Flag",
      language: "hi",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/japan.png",
      alt: "Japan Flag",
      language: "ja",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/korea.png",
      alt: "Korea Flag",
      language: "ko",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/thailand.png",
      alt: "Thailand Flag",
      language: "th",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/vietnam.png",
      alt: "Vietnam Flag",
      language: "vi",
    },
  ]

  // Handle flag click to change language
  const handleFlagClick = (languageCode: string) => {
    setLanguage(languageCode)
  }

  return (
    <nav className="sticky top-0 z-50 w-full h-auto py-4 md:py-2 md:h-20 bg-[#011A2E] px-4 md:px-10 relative flex flex-wrap items-center justify-between md:justify-start font-montserrat shadow-md">
      {/* Left section - Flags */}
      <div className="flex items-center gap-2 order-1">
        {flags.map((flag, index) => (
          <button
            key={index}
            onClick={() => handleFlagClick(flag.language)}
            className="border-0 bg-transparent p-0 cursor-pointer transition-all duration-200 relative"
            title={`${t("switch.language")} ${flag.alt.replace(" Flag", "")}`}
          >
            <div className="relative">
              <img
                src={flag.src || "/placeholder.svg"}
                alt={flag.alt}
                className={`w-8 h-6 object-cover rounded-sm hover:opacity-90 ${
                  currentLanguage?.code === flag.language ? "ring-2 ring-white" : ""
                }`}
              />
              {currentLanguage?.code === flag.language && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#0083BF] rounded-full"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Center logo */}
      <div className="w-full md:w-auto md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex justify-center order-0">
        <img src="https://heller-proto-frontend.vercel.app/hellerLogo.png" alt="Heller Logo" className="w-24 md:w-28" />
      </div>
    </nav>
  )
}
