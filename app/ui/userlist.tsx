"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import UserProfileModal from "./user-profile-modal"

// Sample user data for Heller Industries
const users = [
  {
    id: 1,
    name: "Rajiv Patel",
    position: "Process Engineer",
    country: "India",
    office: "Bangalore",
    onboarded: true,
    expertise: ["Reflow Soldering", "Thermal Profiling", "Process Optimization"],
    projects: ["MK Series Implementation", "Thermal Process Optimization", "Customer Training Program"],
    experience: [
      { company: "Heller Industries", role: "Process Engineer", period: "2019-Present" },
      { company: "Tech Manufacturing Ltd.", role: "Junior Engineer", period: "2016-2019" },
    ],
    managerNotes:
      "Rajiv has excellent technical knowledge and has successfully implemented several reflow systems across India.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Li Wei",
    position: "Technical Sales Manager",
    country: "China",
    office: "Shanghai",
    onboarded: true,
    expertise: ["Reflow Ovens", "Sales Engineering", "Customer Solutions", "Technical Demonstrations"],
    projects: ["China Market Expansion", "VJ Series Promotion", "Electronics Manufacturing Expo"],
    experience: [
      { company: "Heller Industries", role: "Technical Sales Manager", period: "2018-Present" },
      { company: "Eastern Electronics", role: "Sales Engineer", period: "2015-2018" },
    ],
    managerNotes:
      "Li Wei has consistently exceeded sales targets and provides excellent technical support to customers.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "John Smith",
    position: "R&D Director",
    country: "United States",
    office: "Florham Park, NJ",
    onboarded: true,
    expertise: ["Product Development", "Thermal Engineering", "Patent Development", "Industry 4.0"],
    projects: ["Next-Gen Reflow Technology", "Energy Efficiency Improvements", "IoT Integration"],
    experience: [
      { company: "Heller Industries", role: "R&D Director", period: "2017-Present" },
      { company: "Advanced Thermal Systems", role: "Senior Engineer", period: "2012-2017" },
    ],
    managerNotes:
      "John leads our innovation efforts and has been instrumental in developing our latest energy-efficient systems.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Kim Min-ji",
    position: "Field Service Engineer",
    country: "South Korea",
    office: "Seoul",
    onboarded: false,
    expertise: ["Equipment Installation", "Preventive Maintenance", "Troubleshooting", "Customer Training"],
    projects: ["Samsung Support Team", "Preventive Maintenance Program", "Remote Diagnostics Implementation"],
    experience: [
      { company: "Heller Industries", role: "Field Service Engineer", period: "2023-Present" },
      { company: "Korea Electronics", role: "Maintenance Technician", period: "2020-2023" },
    ],
    managerNotes: "Min-ji needs to complete the advanced troubleshooting certification by end of quarter.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Nguyen Thi Minh",
    position: "Application Engineer",
    country: "Vietnam",
    office: "Ho Chi Minh City",
    onboarded: true,
    expertise: ["Process Development", "Thermal Profiling", "Lead-Free Soldering", "Customer Support"],
    projects: ["Vietnam Manufacturing Support", "Process Optimization for Electronics Assembly", "Training Program"],
    experience: [
      { company: "Heller Industries", role: "Application Engineer", period: "2020-Present" },
      { company: "VN Electronics Manufacturing", role: "Process Technician", period: "2017-2020" },
    ],
    managerNotes: "Minh has developed excellent relationships with key customers in the Vietnam market.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

// Define the UserProfile type to match the one in UserProfileModal
type UserProfile = {
  id: number
  name: string
  position: string
  country: string
  office: string
  onboarded: boolean
  expertise: string[]
  projects: string[]
  experience: { company: string; role: string; period: string }[]
  managerNotes: string
  avatar: string
}

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleUserClick = (user: UserProfile) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-4 w-full max-w-full px-2 sm:px-4">
      <div className="relative mb-4 sm:mb-6 w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0083BF]" size={18} />
        <Input
          placeholder="Search team members..."
          className="pl-10 bg-white border-[#b8e2f2] focus-visible:ring-[#0083BF] w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow transition-shadow flex flex-col"
            onClick={() => handleUserClick(user)}
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-14 w-14 bg-[#0083BF] text-white">
                <AvatarFallback className="bg-[#0083BF] text-white font-medium text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-[#003750] text-lg">{user.name}</div>
                <div className="text-[#00375d]">{user.position}</div>
              </div>
            </div>

            <div className="text-[#00375d] mb-auto">
              <span className="text-[#0083BF] text-sm">Location:</span>{" "}
              <span className="text-sm">{user.office}, {user.country}</span>
            </div>

            <div className="flex justify-between items-center mt-4">
              {user.onboarded ? (
                <Badge className="bg-[#84ccd4] hover:bg-[#84ccd4] text-[#003750] font-normal px-3 py-1 rounded-md">
                  Onboarded
                </Badge>
              ) : (
                <Badge variant="outline" className="border-[#0083BF] text-[#00375d] font-normal px-3 py-1 rounded-md">
                  Pending
                </Badge>
              )}
              <div className="text-[#0083BF] font-medium text-sm">View Profile</div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-8 text-center text-[#00375d] bg-white rounded-lg border border-[#e0e7eb]">
          No team members found matching your search criteria.
        </div>
      )}

      {selectedUser && (
        <UserProfileModal user={selectedUser} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
