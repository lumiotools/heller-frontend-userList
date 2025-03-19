"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import UserProfileModal from "./user-profile-modal";
import { useLocale } from "@/context/locale-context";

// Update the sample user data to include languages
const users = [
  {
    id: 1,
    name: "Rajiv Patel",
    position: "Process Engineer",
    country: "India",
    office: "Bangalore",
    onboarded: true,
    expertise: [
      "Reflow Soldering",
      "Thermal Profiling",
      "Process Optimization",
    ],
    projects: [
      "MK Series Implementation",
      "Thermal Process Optimization",
      "Customer Training Program",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Process Engineer",
        period: "2019-Present",
      },
      {
        company: "Tech Manufacturing Ltd.",
        role: "Junior Engineer",
        period: "2016-2019",
      },
    ],
    managerNotes:
      "Rajiv has excellent technical knowledge and has successfully implemented several reflow systems across India.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Hindi", "English", "Gujarati"],
  },
  {
    id: 2,
    name: "Li Wei",
    position: "Technical Sales Manager",
    country: "China",
    office: "Shanghai",
    onboarded: true,
    expertise: [
      "Reflow Ovens",
      "Sales Engineering",
      "Customer Solutions",
      "Technical Demonstrations",
    ],
    projects: [
      "China Market Expansion",
      "VJ Series Promotion",
      "Electronics Manufacturing Expo",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Technical Sales Manager",
        period: "2018-Present",
      },
      {
        company: "Eastern Electronics",
        role: "Sales Engineer",
        period: "2015-2018",
      },
    ],
    managerNotes:
      "Li Wei has consistently exceeded sales targets and provides excellent technical support to customers.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Mandarin", "English", "Cantonese"],
  },
  {
    id: 3,
    name: "John Smith",
    position: "R&D Director",
    country: "United States",
    office: "Florham Park, NJ",
    onboarded: true,
    expertise: [
      "Product Development",
      "Thermal Engineering",
      "Patent Development",
      "Industry 4.0",
    ],
    projects: [
      "Next-Gen Reflow Technology",
      "Energy Efficiency Improvements",
      "IoT Integration",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "R&D Director",
        period: "2017-Present",
      },
      {
        company: "Advanced Thermal Systems",
        role: "Senior Engineer",
        period: "2012-2017",
      },
    ],
    managerNotes:
      "John leads our innovation efforts and has been instrumental in developing our latest energy-efficient systems.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["English", "Spanish"],
  },
  {
    id: 4,
    name: "Kim Min-ji",
    position: "Field Service Engineer",
    country: "South Korea",
    office: "Seoul",
    onboarded: false,
    expertise: [
      "Equipment Installation",
      "Preventive Maintenance",
      "Troubleshooting",
      "Customer Training",
    ],
    projects: [
      "Samsung Support Team",
      "Preventive Maintenance Program",
      "Remote Diagnostics Implementation",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Field Service Engineer",
        period: "2023-Present",
      },
      {
        company: "Korea Electronics",
        role: "Maintenance Technician",
        period: "2020-2023",
      },
    ],
    managerNotes:
      "Min-ji needs to complete the advanced troubleshooting certification by end of quarter.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Korean", "English", "Japanese"],
  },
  {
    id: 5,
    name: "Nguyen Thi Minh",
    position: "Application Engineer",
    country: "Vietnam",
    office: "Ho Chi Minh City",
    onboarded: true,
    expertise: [
      "Process Development",
      "Thermal Profiling",
      "Lead-Free Soldering",
      "Customer Support",
    ],
    projects: [
      "Vietnam Manufacturing Support",
      "Process Optimization for Electronics Assembly",
      "Training Program",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Application Engineer",
        period: "2020-Present",
      },
      {
        company: "VN Electronics Manufacturing",
        role: "Process Technician",
        period: "2017-2020",
      },
    ],
    managerNotes:
      "Minh has developed excellent relationships with key customers in the Vietnam market.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Vietnamese", "English", "French"],
  },
  // 10 new users with mechanical and civil engineering backgrounds
  {
    id: 6,
    name: "Carlos Rodriguez",
    position: "Mechanical Engineer",
    country: "Mexico",
    office: "Mexico City",
    onboarded: true,
    expertise: [
      "HVAC Systems",
      "Industrial Ventilation",
      "Mechanical Design",
      "AutoCAD",
    ],
    projects: [
      "Factory Ventilation Upgrade",
      "Energy Efficiency Project",
      "Production Line Redesign",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Mechanical Engineer",
        period: "2020-Present",
      },
      {
        company: "Grupo Bimbo",
        role: "Maintenance Engineer",
        period: "2017-2020",
      },
    ],
    managerNotes:
      "Carlos has excellent problem-solving skills and has significantly improved our factory ventilation systems.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Spanish", "English"],
  },
  {
    id: 7,
    name: "Sophia Chen",
    position: "Structural Engineer",
    country: "Taiwan",
    office: "Taipei",
    onboarded: true,
    expertise: [
      "Structural Analysis",
      "Seismic Design",
      "Building Codes",
      "Steel Structures",
    ],
    projects: [
      "Factory Expansion Project",
      "Equipment Foundation Design",
      "Seismic Retrofit",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Structural Engineer",
        period: "2019-Present",
      },
      {
        company: "Taiwan Construction Corp",
        role: "Junior Engineer",
        period: "2016-2019",
      },
    ],
    managerNotes:
      "Sophia's expertise in seismic design has been invaluable for our Asia-Pacific facility expansions.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Mandarin", "English", "Taiwanese"],
  },
  {
    id: 8,
    name: "Ahmed Hassan",
    position: "Civil Engineer",
    country: "United Arab Emirates",
    office: "Dubai",
    onboarded: true,
    expertise: [
      "Construction Management",
      "Site Planning",
      "Quality Control",
      "Infrastructure Development",
    ],
    projects: [
      "Dubai Facility Construction",
      "Clean Room Implementation",
      "Infrastructure Upgrade",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Civil Engineer",
        period: "2018-Present",
      },
      {
        company: "Emaar Properties",
        role: "Project Engineer",
        period: "2015-2018",
      },
    ],
    managerNotes:
      "Ahmed managed the construction of our Dubai facility on time and under budget with excellent quality standards.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Arabic", "English", "French"],
  },
  {
    id: 9,
    name: "Emma Wilson",
    position: "Mechanical Design Engineer",
    country: "United Kingdom",
    office: "Manchester",
    onboarded: true,
    expertise: [
      "3D Modeling",
      "Product Design",
      "Thermal Analysis",
      "Prototyping",
    ],
    projects: [
      "Next-Gen Conveyor System",
      "Cooling System Redesign",
      "Modular Equipment Platform",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Mechanical Design Engineer",
        period: "2021-Present",
      },
      { company: "Dyson Ltd", role: "Design Engineer", period: "2017-2021" },
    ],
    managerNotes:
      "Emma brings innovative design thinking and has significantly improved our product development process.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["English", "French"],
  },
  {
    id: 10,
    name: "Hiroshi Tanaka",
    position: "Manufacturing Engineer",
    country: "Japan",
    office: "Osaka",
    onboarded: true,
    expertise: [
      "Lean Manufacturing",
      "Process Automation",
      "Quality Systems",
      "Kaizen",
    ],
    projects: [
      "Production Line Automation",
      "Quality Improvement Initiative",
      "Lean Implementation",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Manufacturing Engineer",
        period: "2019-Present",
      },
      {
        company: "Toyota Motor Corporation",
        role: "Process Engineer",
        period: "2015-2019",
      },
    ],
    managerNotes:
      "Hiroshi has successfully implemented lean manufacturing principles that have increased our productivity by 30%.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Japanese", "English"],
  },
  {
    id: 11,
    name: "Maria Fernandez",
    position: "Civil Project Manager",
    country: "Brazil",
    office: "São Paulo",
    onboarded: false,
    expertise: [
      "Project Management",
      "Construction Supervision",
      "Budget Control",
      "Regulatory Compliance",
    ],
    projects: [
      "Brazil Manufacturing Facility",
      "Sustainable Building Initiative",
      "Site Expansion",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Civil Project Manager",
        period: "2023-Present",
      },
      { company: "Odebrecht", role: "Project Engineer", period: "2018-2023" },
    ],
    managerNotes:
      "Maria is currently onboarding and will be leading our sustainable building initiatives across South America.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Portuguese", "Spanish", "English"],
  },
  {
    id: 12,
    name: "Dmitri Petrov",
    position: "Mechanical Systems Engineer",
    country: "Russia",
    office: "Moscow",
    onboarded: true,
    expertise: [
      "Hydraulic Systems",
      "Pneumatics",
      "Industrial Automation",
      "Fluid Dynamics",
    ],
    projects: [
      "Automated Material Handling",
      "Hydraulic Press Redesign",
      "Energy Recovery System",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Mechanical Systems Engineer",
        period: "2020-Present",
      },
      { company: "Gazprom", role: "Systems Engineer", period: "2016-2020" },
    ],
    managerNotes:
      "Dmitri's expertise in fluid systems has led to significant improvements in our equipment efficiency.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Russian", "English"],
  },
  {
    id: 13,
    name: "Priya Sharma",
    position: "Structural Design Engineer",
    country: "India",
    office: "Mumbai",
    onboarded: true,
    expertise: [
      "Structural Engineering",
      "FEA Analysis",
      "Construction Materials",
      "Industrial Structures",
    ],
    projects: [
      "Mumbai Facility Expansion",
      "Heavy Equipment Foundations",
      "Vibration Analysis",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Structural Design Engineer",
        period: "2019-Present",
      },
      {
        company: "Larsen & Toubro",
        role: "Design Engineer",
        period: "2016-2019",
      },
    ],
    managerNotes:
      "Priya's innovative structural solutions have saved significant costs while improving safety standards.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Hindi", "English", "Marathi"],
  },
  {
    id: 14,
    name: "Lars Johansson",
    position: "Facilities Engineer",
    country: "Sweden",
    office: "Stockholm",
    onboarded: true,
    expertise: [
      "Facility Management",
      "Sustainable Design",
      "Energy Systems",
      "Building Automation",
    ],
    projects: [
      "Green Building Certification",
      "Energy Monitoring System",
      "Facility Modernization",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Facilities Engineer",
        period: "2018-Present",
      },
      { company: "IKEA", role: "Facility Planner", period: "2014-2018" },
    ],
    managerNotes:
      "Lars has transformed our Stockholm facility into a model of sustainability with significant energy savings.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Swedish", "English", "Norwegian"],
  },
  {
    id: 15,
    name: "Fatima Al-Mansour",
    position: "Civil Infrastructure Engineer",
    country: "Saudi Arabia",
    office: "Riyadh",
    onboarded: false,
    expertise: [
      "Infrastructure Planning",
      "Water Systems",
      "Desert Construction",
      "Sustainability",
    ],
    projects: [
      "Riyadh Facility Water Systems",
      "Sustainable Cooling Solutions",
      "Desert-Adapted Design",
    ],
    experience: [
      {
        company: "Heller Industries",
        role: "Civil Infrastructure Engineer",
        period: "2022-Present",
      },
      {
        company: "Saudi Aramco",
        role: "Infrastructure Engineer",
        period: "2018-2022",
      },
    ],
    managerNotes:
      "Fatima is finalizing her onboarding and will lead our water conservation initiatives in arid regions.",
    avatar:
      "https://imgs.search.brave.com/yZ4RcYMeuh-eJ8ZUpeZpOgkZiPIB7-OQOZUmh72L8kg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaHVkbC5jb20v/dXNlcnMvcHJvZC82/NzE3NzY1XzU5MmIw/YmFlODMzZDRjNGU5/YmFjNjU0MDRlNTk4/YzBiLmpwZw",
    languages: ["Arabic", "English"],
  },
];

// Update the UserProfile type to include languages
type UserProfile = {
  id: number;
  name: string;
  position: string;
  country: string;
  office: string;
  onboarded: boolean;
  expertise: string[];
  projects: string[];
  experience: { company: string; role: string; period: string }[];
  managerNotes: string;
  avatar: string;
  languages: string[];
};

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLocale();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (user: UserProfile) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 w-full max-w-full px-2 sm:px-4">
      <div className="relative mb-4 sm:mb-6 w-full">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0083BF]"
          size={18}
        />
        <Input
          placeholder={t("search.placeholder")}
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
                <div className="font-medium text-[#003750] text-lg">
                  {user.name}
                </div>
                <div className="text-[#00375d]">{user.position}</div>
              </div>
            </div>

            <div className="text-[#00375d] mb-auto">
              <span className="text-[#0083BF] text-sm">{t("location")}:</span>{" "}
              <span className="text-sm">
                {user.office}, {user.country}
              </span>
            </div>

            <div className="flex justify-between items-center mt-4">
              {user.onboarded ? (
                <Badge className="bg-[#84ccd4] hover:bg-[#84ccd4] text-[#003750] font-normal px-3 py-1 rounded-md">
                  {t("onboarded")}
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-[#0083BF] text-[#00375d] font-normal px-3 py-1 rounded-md"
                >
                  {t("pending")}
                </Badge>
              )}
              <div className="text-[#0083BF] font-medium text-sm">
                {t("view.profile")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="p-8 text-center text-[#00375d] bg-white rounded-lg border border-[#e0e7eb]">
          {t("no.results")}
        </div>
      )}

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
