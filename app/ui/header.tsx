"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  // Redirect to /chatbot if on the home page
  useEffect(() => {
    if (pathname === "/") {
      router.push("/")
    }
  }, [pathname, router])

  const flags = [
    {
      src: "https://heller-proto-frontend.vercel.app/usa.png",
      alt: "USA Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/china.png",
      alt: "China Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/india.png",
      alt: "India Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/japan.png",
      alt: "Japan Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/korea.png",
      alt: "Korea Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/thailand.png",
      alt: "Thailand Flag",
    },
    {
      src: "https://heller-proto-frontend.vercel.app/vietnam.png",
      alt: "Vietnam Flag",
    },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full h-auto py-2 md:h-20 bg-[#011A2E] px-4 md:px-10 relative flex flex-wrap items-center justify-between md:justify-start font-montserrat shadow-md">
      {/* Left section - Flags (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-2 order-1">
        {flags.map((flag, index) => (
          <img
            key={index}
            src={flag.src || "/placeholder.svg"}
            alt={flag.alt}
            className="w-8 h-6 object-cover rounded-sm hover:scale-110 transition-transform duration-200"
          />
        ))}
      </div>

      {/* Center logo */}
      <div className="w-full md:w-auto md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 flex justify-center order-0">
        <img src="https://heller-proto-frontend.vercel.app/hellerLogo.png" alt="Heller Logo" className="w-24 md:w-28" />
      </div>

      {/* Right section - ml-auto to push it to the right */}
      <div className="order-2 ml-auto">{/* Contact info or other elements can go here */}</div>
    </nav>
  )
}

