import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/app/ui/header"
import { LocaleProvider } from "@/context/locale-context"
// import LanguageLoadingIndicator from "@/components/language-loading-indicator"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Heller Industries - Team Directory",
  description: "Global team directory for Heller Industries",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto">{children}</main>
            {/* <LanguageLoadingIndicator /> */}
          </div>
        </LocaleProvider>
      </body>
    </html>
  )
}

