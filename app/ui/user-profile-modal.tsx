"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Award, ClipboardList, Edit, User, Building, Globe, Check, X, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "@/context/locale-context"

// Add animation keyframes
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.98);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }

  .modal-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  
  .modal-fixed > * {
    pointer-events: auto;
  }
`

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
  languages: string[] // Add languages field
}

type UserProfileModalProps = {
  user: UserProfile
  isOpen: boolean
  onClose: () => void
}

export default function UserProfileModal({ user: initialUser, isOpen, onClose }: UserProfileModalProps) {
  // Get translation function
  const { t } = useLocale()

  // State for the user data that will be updated
  const [user, setUser] = useState<UserProfile>(initialUser)

  // State for tracking which sections are being edited
  const [editingSection, setEditingSection] = useState<string | null>(null)

  // State for form values
  const [formValues, setFormValues] = useState({
    name: user.name,
    position: user.position,
    office: user.office,
    country: user.country,
    expertise: [...user.expertise],
    projects: [...user.projects],
    experience: [...user.experience],
    managerNotes: user.managerNotes,
    languages: user.languages || [], // Add languages with fallback
  })

  // Update form values when user changes
  useEffect(() => {
    setFormValues({
      name: initialUser.name,
      position: initialUser.position,
      office: initialUser.office,
      country: initialUser.country,
      expertise: [...initialUser.expertise],
      projects: [...initialUser.projects],
      experience: [...initialUser.experience],
      managerNotes: initialUser.managerNotes,
      languages: initialUser.languages || [], // Add languages with fallback
    })
    setUser(initialUser)
  }, [initialUser])

  // Function to handle starting edit mode for a section
  const startEditing = (section: string) => {
    setEditingSection(section)
  }

  // Function to handle saving changes
  const saveChanges = () => {
    // Update the user data with the form values
    if (editingSection === "basic") {
      setUser((prev) => ({
        ...prev,
        name: formValues.name,
        position: formValues.position,
      }))
    } else if (editingSection === "expertise") {
      setUser((prev) => ({
        ...prev,
        expertise: [...formValues.expertise],
      }))
    } else if (editingSection === "location") {
      setUser((prev) => ({
        ...prev,
        office: formValues.office,
        country: formValues.country,
      }))
    } else if (editingSection === "languages") {
      // Add languages section
      setUser((prev) => ({
        ...prev,
        languages: [...formValues.languages],
      }))
    } else if (editingSection === "projects") {
      setUser((prev) => ({
        ...prev,
        projects: [...formValues.projects],
      }))
    } else if (editingSection === "experience") {
      setUser((prev) => ({
        ...prev,
        experience: [...formValues.experience],
      }))
    } else if (editingSection === "notes") {
      setUser((prev) => ({
        ...prev,
        managerNotes: formValues.managerNotes,
      }))
    }

    // Exit edit mode
    setEditingSection(null)
  }

  // Function to cancel editing
  const cancelEditing = () => {
    // Reset form values to current user values
    setFormValues({
      name: user.name,
      position: user.position,
      office: user.office,
      country: user.country,
      expertise: [...user.expertise],
      projects: [...user.projects],
      experience: [...user.experience],
      managerNotes: user.managerNotes,
      languages: user.languages || [],
    })
    setEditingSection(null)
  }

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Effect to disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <style jsx global>
        {animationStyles}
      </style>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
          onClick={onClose}
          style={{
            animation: isOpen ? "fadeIn 0.3s ease-in-out forwards" : "none",
          }}
        />

        {/* Modal - using inline style to ensure 80% width */}
        <div
          className="relative z-50 h-[90vh] bg-white overflow-y-auto rounded-lg shadow-xl transition-all duration-300 ease-in-out"
          style={{
            width: "80%",
            maxWidth: "80%",
            animation: isOpen ? "scaleIn 0.3s ease-in-out forwards" : "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white border-b border-[#d0e8eb] w-full">
            <h2 className="text-2xl font-bold text-[#003750]">{t("profile.title")}</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={onClose}>
                <XCircle className="h-6 w-6 text-[#003750]" />
                <span className="sr-only">{t("close")}</span>
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-6">
            {/* Basic info */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <CardTitle className="text-[#003750] text-lg flex items-center">
                    <User size={18} className="mr-2 text-[#0083BF]" />
                    {t("basic.info")}
                  </CardTitle>
                  {editingSection === "basic" ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={saveChanges}
                      >
                        <Check size={16} className="mr-1" />
                        {t("save")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={cancelEditing}
                      >
                        <X size={16} className="mr-1" />
                        {t("cancel")}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                      onClick={() => startEditing("basic")}
                    >
                      <Edit size={16} className="mr-1" />
                      {t("edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === "basic" ? (
                    <div className="space-y-4 p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb]">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-20 w-20 border-4 border-[#b8e2f2]">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#0083BF] text-white text-xl">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#003750] mb-1">
                              {t("name")}
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formValues.name}
                              onChange={handleInputChange}
                              className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                            />
                          </div>
                          <div>
                            <label htmlFor="position" className="block text-sm font-medium text-[#003750] mb-1">
                              {t("position")}
                            </label>
                            <Input
                              id="position"
                              name="position"
                              value={formValues.position}
                              onChange={handleInputChange}
                              className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb]">
                      <Avatar className="h-20 w-20 border-4 border-[#b8e2f2] mr-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#0083BF] text-white text-xl">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h2 className="text-xl font-bold text-[#003750]">{user.name}</h2>
                        <p className="text-[#00375d] mb-2">{user.position}</p>

                        <div className="flex items-center text-[#00375d] mb-2">
                          <MapPin size={16} className="mr-1 text-[#0083BF]" />
                          {user.office}, {user.country}
                        </div>

                        {user.onboarded ? (
                          <Badge className="bg-[#84ccd4] hover:bg-[#84ccd4] text-[#003750]">{t("onboarded")}</Badge>
                        ) : (
                          <Badge variant="outline" className="border-[#0083BF] text-[#00375d]">
                            {t("pending.onboarding")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <CardTitle className="text-[#003750] text-lg flex items-center">
                    <Award size={18} className="mr-2 text-[#0083BF]" />
                    {t("expertise")}
                  </CardTitle>
                  {editingSection === "expertise" ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={saveChanges}
                      >
                        <Check size={16} className="mr-1" />
                        {t("save")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={cancelEditing}
                      >
                        <X size={16} className="mr-1" />
                        {t("cancel")}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                      onClick={() => startEditing("expertise")}
                    >
                      <Edit size={16} className="mr-1" />
                      {t("edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === "expertise" ? (
                    <div className="p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb]">
                      <div className="mb-2 text-sm text-[#003750]">{t("skills.comma")}</div>
                      <Textarea
                        value={formValues.expertise.join(", ")}
                        onChange={(e) => {
                          const skills = e.target.value
                            .split(",")
                            .map((skill) => skill.trim())
                            .filter(Boolean)
                          setFormValues((prev) => ({
                            ...prev,
                            expertise: skills,
                          }))
                        }}
                        className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.expertise.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#eff6fb] text-[#00375d]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <CardTitle className="text-[#003750] text-lg flex items-center">
                    <Globe size={18} className="mr-2 text-[#0083BF]" />
                    {t("spoken.languages")}
                  </CardTitle>
                  {editingSection === "languages" ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={saveChanges}
                      >
                        <Check size={16} className="mr-1" />
                        {t("save")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={cancelEditing}
                      >
                        <X size={16} className="mr-1" />
                        {t("cancel")}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                      onClick={() => startEditing("languages")}
                    >
                      <Edit size={16} className="mr-1" />
                      {t("edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === "languages" ? (
                    <div className="p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb]">
                      <div className="mb-2 text-sm text-[#003750]">{t("languages.comma")}</div>
                      <Textarea
                        value={formValues.languages.join(", ")}
                        onChange={(e) => {
                          const languages = e.target.value
                            .split(",")
                            .map((lang) => lang.trim())
                            .filter(Boolean)
                          setFormValues((prev) => ({
                            ...prev,
                            languages: languages,
                          }))
                        }}
                        className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.languages && user.languages.length > 0 ? (
                        user.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="bg-[#eff6fb] text-[#00375d]">
                            {language}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-[#00375d] text-sm italic">{t("no.languages")}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-start justify-between">
                  <CardTitle className="text-[#003750] text-lg flex items-center">
                    <Building size={18} className="mr-2 text-[#0083BF]" />
                    {t("office.location")}
                  </CardTitle>
                  {editingSection === "location" ? (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                        onClick={saveChanges}
                      >
                        <Check size={16} className="mr-1" />
                        {t("save")}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={cancelEditing}
                      >
                        <X size={16} className="mr-1" />
                        {t("cancel")}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                      onClick={() => startEditing("location")}
                    >
                      <Edit size={16} className="mr-1" />
                      {t("edit")}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === "location" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb]">
                      <div>
                        <label htmlFor="office" className="block text-sm font-medium text-[#003750] mb-1">
                          {t("office")}
                        </label>
                        <Input
                          id="office"
                          name="office"
                          value={formValues.office}
                          onChange={handleInputChange}
                          className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-[#003750] mb-1">
                          {t("country")}
                        </label>
                        <Input
                          id="country"
                          name="country"
                          value={formValues.country}
                          onChange={handleInputChange}
                          className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 p-3 bg-[#eff6fb] rounded-md">
                        <Building size={18} className="text-[#0083BF]" />
                        <div>
                          <div className="text-sm text-[#0083BF]">{t("office")}</div>
                          <div className="font-medium text-[#003750]">{user.office}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-[#eff6fb] rounded-md">
                        <Globe size={18} className="text-[#0083BF]" />
                        <div>
                          <div className="text-sm text-[#0083BF]">{t("country")}</div>
                          <div className="font-medium text-[#003750]">{user.country}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Tabs with detailed info */}
            <div>
              <Tabs defaultValue="projects" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger
                    value="projects"
                    className="data-[state=active]:bg-[#0083BF] data-[state=active]:text-white"
                  >
                    {t("projects")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-[#0083BF] data-[state=active]:text-white"
                  >
                    {t("experience")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="data-[state=active]:bg-[#0083BF] data-[state=active]:text-white"
                  >
                    {t("manager.notes")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="projects">
                  <Card>
                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-[#003750] flex items-center">
                          <ClipboardList size={18} className="mr-2 text-[#0083BF]" />
                          {t("projects.worked")}
                        </CardTitle>
                        <CardDescription>{t("recent.projects")}</CardDescription>
                      </div>
                      {editingSection === "projects" ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            onClick={saveChanges}
                          >
                            <Check size={16} className="mr-1" />
                            {t("save")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={cancelEditing}
                          >
                            <X size={16} className="mr-1" />
                            {t("cancel")}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                          onClick={() => startEditing("projects")}
                        >
                          <Edit size={16} className="mr-1" />
                          {t("edit")}
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingSection === "projects" ? (
                        <div className="space-y-3">
                          {formValues.projects.map((project, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={project}
                                onChange={(e) => {
                                  const newProjects = [...formValues.projects]
                                  newProjects[index] = e.target.value
                                  setFormValues((prev) => ({
                                    ...prev,
                                    projects: newProjects,
                                  }))
                                }}
                                className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                onClick={() => {
                                  const newProjects = formValues.projects.filter((_, i) => i !== index)
                                  setFormValues((prev) => ({
                                    ...prev,
                                    projects: newProjects,
                                  }))
                                }}
                              >
                                <X size={16} />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full border-dashed border-[#b8e2f2] text-[#0083BF]"
                            onClick={() => {
                              setFormValues((prev) => ({
                                ...prev,
                                projects: [...prev.projects, "New Project"],
                              }))
                            }}
                          >
                            {t("add.project")}
                          </Button>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {user.projects.map((project, index) => (
                            <li key={index} className="bg-[#eff6fb] p-3 rounded-md text-[#00375d]">
                              {project}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience">
                  <Card>
                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-[#003750] flex items-center">
                          <Briefcase size={18} className="mr-2 text-[#0083BF]" />
                          {t("past.experience")}
                        </CardTitle>
                        <CardDescription>{t("professional.history")}</CardDescription>
                      </div>
                      {editingSection === "experience" ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            onClick={saveChanges}
                          >
                            <Check size={16} className="mr-1" />
                            {t("save")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={cancelEditing}
                          >
                            <X size={16} className="mr-1" />
                            {t("cancel")}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                          onClick={() => startEditing("experience")}
                        >
                          <Edit size={16} className="mr-1" />
                          {t("edit")}
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingSection === "experience" ? (
                        <div className="space-y-6">
                          {formValues.experience.map((exp, index) => (
                            <div key={index} className="p-4 bg-[#eff6fb] rounded-lg border border-[#d0e8eb] space-y-3">
                              <div>
                                <label
                                  htmlFor={`role-${index}`}
                                  className="block text-sm font-medium text-[#003750] mb-1"
                                >
                                  {t("role")}
                                </label>
                                <Input
                                  id={`role-${index}`}
                                  value={exp.role}
                                  onChange={(e) => {
                                    const newExperience = [...formValues.experience]
                                    newExperience[index] = { ...exp, role: e.target.value }
                                    setFormValues((prev) => ({
                                      ...prev,
                                      experience: newExperience,
                                    }))
                                  }}
                                  className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`company-${index}`}
                                  className="block text-sm font-medium text-[#003750] mb-1"
                                >
                                  {t("company")}
                                </label>
                                <Input
                                  id={`company-${index}`}
                                  value={exp.company}
                                  onChange={(e) => {
                                    const newExperience = [...formValues.experience]
                                    newExperience[index] = { ...exp, company: e.target.value }
                                    setFormValues((prev) => ({
                                      ...prev,
                                      experience: newExperience,
                                    }))
                                  }}
                                  className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`period-${index}`}
                                  className="block text-sm font-medium text-[#003750] mb-1"
                                >
                                  {t("period")}
                                </label>
                                <Input
                                  id={`period-${index}`}
                                  value={exp.period}
                                  onChange={(e) => {
                                    const newExperience = [...formValues.experience]
                                    newExperience[index] = { ...exp, period: e.target.value }
                                    setFormValues((prev) => ({
                                      ...prev,
                                      experience: newExperience,
                                    }))
                                  }}
                                  className="border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                                />
                              </div>
                              <div className="pt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                  onClick={() => {
                                    const newExperience = formValues.experience.filter((_, i) => i !== index)
                                    setFormValues((prev) => ({
                                      ...prev,
                                      experience: newExperience,
                                    }))
                                  }}
                                >
                                  <X size={16} className="mr-1" />
                                  {t("remove")}
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            className="w-full border-dashed border-[#b8e2f2] text-[#0083BF]"
                            onClick={() => {
                              setFormValues((prev) => ({
                                ...prev,
                                experience: [
                                  ...prev.experience,
                                  { role: "New Role", company: "New Company", period: "YYYY-YYYY" },
                                ],
                              }))
                            }}
                          >
                            {t("add.experience")}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {user.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-[#84ccd4] pl-4 pb-4">
                              <div className="font-medium text-[#003750]">{exp.role}</div>
                              <div className="text-[#00375d]">{exp.company}</div>
                              <div className="text-sm text-[#0083BF]">{exp.period}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes">
                  <Card>
                    <CardHeader className="pb-2 flex flex-row items-start justify-between">
                      <div>
                        <CardTitle className="text-[#003750] flex items-center">
                          <ClipboardList size={18} className="mr-2 text-[#0083BF]" />
                          {t("manager.notes")}
                        </CardTitle>
                        <CardDescription>{t("notes.from.manager")}</CardDescription>
                      </div>
                      {editingSection === "notes" ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                            onClick={saveChanges}
                          >
                            <Check size={16} className="mr-1" />
                            {t("save")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={cancelEditing}
                          >
                            <X size={16} className="mr-1" />
                            {t("cancel")}
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#0083BF] hover:text-[#0077ae] hover:bg-[#eff6fb]"
                          onClick={() => startEditing("notes")}
                        >
                          <Edit size={16} className="mr-1" />
                          {t("edit")}
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingSection === "notes" ? (
                        <Textarea
                          name="managerNotes"
                          value={formValues.managerNotes}
                          onChange={handleInputChange}
                          className="min-h-[150px] border-[#b8e2f2] focus-visible:ring-[#0083BF]"
                        />
                      ) : (
                        <div className="bg-[#eff6fb] p-4 rounded-md text-[#00375d]">{user.managerNotes}</div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

