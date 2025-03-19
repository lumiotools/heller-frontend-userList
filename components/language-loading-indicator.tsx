"use client"

import { useLocale } from "@/context/locale-context"
import { Loader2 } from "lucide-react"

export default function LanguageLoadingIndicator() {
  const { isLoading } = useLocale()

  if (!isLoading) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50 flex items-center gap-2">
      <Loader2 size={20} className="animate-spin text-[#0083BF]" />
      <p className="text-[#003750] text-sm font-medium">Changing language...</p>
    </div>
  )
}

