import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import AdminDashboard from "../ui/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#f0f7fc]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
            >
              <ChevronLeft size={18} />
              <span>Back</span>
            </Button>
          </Link>
        </div>
        <AdminDashboard />
      </div>
    </div>
  )
}