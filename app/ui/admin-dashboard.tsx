"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import GeneralSettings from "./general-settings"
// import { useLocale } from "@/context/locale-context"
import { Loader2 } from "lucide-react"

export default function AdminDashboard() {
//   const { currentLanguage } = useLocale()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin mx-auto mb-4 text-[#0083BF]" />
          <p className="text-[#003750]">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  // Get country name based on language code
//   const getCountryName = (langCode: string) => {
//     switch (langCode) {
//       case "en":
//         return "United States"
//       case "zh":
//         return "China"
//       case "hi":
//         return "India"
//       case "ja":
//         return "Japan"
//       case "ko":
//         return "South Korea"
//       case "th":
//         return "Thailand"
//       case "vi":
//         return "Vietnam"
//       default:
//         return "Global"
//     }
//   }

//   const countryName = currentLanguage ? getCountryName(currentLanguage.code) : "Global"

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsContent value="general">
          <GeneralSettings  />
        </TabsContent>
      </Tabs>
    </div>
  )
}

