"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfileInfo() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@example.com",
    username: "alexjohnson",
    bio: "Digital marketer and content creator specializing in AI-driven strategies.",
    timezone: "utc-8",
    language: "en",
  })
  const [avatar, setAvatar] = useState("/placeholder.svg?height=96&width=96")
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleAvatarUpload = () => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      // Randomly select a different placeholder
      const randomId = Math.floor(Math.random() * 100)
      setAvatar(`/placeholder.svg?height=96&width=96&text=AJ${randomId}`)
      setUploading(false)
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      })
    }, 1500)
  }

  const handleAvatarRemove = () => {
    setAvatar("/placeholder.svg?height=96&width=96")
    toast({
      title: "Avatar removed",
      description: "Your profile picture has been removed.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Avatar className="h-24 w-24 border-2 border-primary/50">
          <AvatarImage src={avatar} alt="Profile" />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">AJ</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-medium">Profile Picture</h3>
          <p className="text-sm text-muted-foreground">Upload a new profile picture</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAvatarUpload}
              disabled={uploading}
              className="relative overflow-hidden"
            >
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Upload
              <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 transition-opacity hover:opacity-100"></span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleAvatarRemove} className="relative overflow-hidden">
              Remove
              <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-destructive/20 to-destructive/10 opacity-0 transition-opacity hover:opacity-100"></span>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <Input
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="text-sm font-medium">
            Bio
          </label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            className="border-primary/20 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="timezone" className="text-sm font-medium">
              Timezone
            </label>
            <Select value={formData.timezone} onValueChange={(value) => handleSelectChange("timezone", value)}>
              <SelectTrigger id="timezone" className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-12">UTC-12:00</SelectItem>
                <SelectItem value="utc-11">UTC-11:00</SelectItem>
                <SelectItem value="utc-10">UTC-10:00</SelectItem>
                <SelectItem value="utc-9">UTC-09:00</SelectItem>
                <SelectItem value="utc-8">UTC-08:00 (PST)</SelectItem>
                <SelectItem value="utc-7">UTC-07:00 (MST)</SelectItem>
                <SelectItem value="utc-6">UTC-06:00 (CST)</SelectItem>
                <SelectItem value="utc-5">UTC-05:00 (EST)</SelectItem>
                <SelectItem value="utc-4">UTC-04:00</SelectItem>
                <SelectItem value="utc-3">UTC-03:00</SelectItem>
                <SelectItem value="utc-2">UTC-02:00</SelectItem>
                <SelectItem value="utc-1">UTC-01:00</SelectItem>
                <SelectItem value="utc">UTC+00:00</SelectItem>
                <SelectItem value="utc+1">UTC+01:00</SelectItem>
                <SelectItem value="utc+2">UTC+02:00</SelectItem>
                <SelectItem value="utc+3">UTC+03:00</SelectItem>
                <SelectItem value="utc+4">UTC+04:00</SelectItem>
                <SelectItem value="utc+5">UTC+05:00</SelectItem>
                <SelectItem value="utc+5:30">UTC+05:30</SelectItem>
                <SelectItem value="utc+6">UTC+06:00</SelectItem>
                <SelectItem value="utc+7">UTC+07:00</SelectItem>
                <SelectItem value="utc+8">UTC+08:00</SelectItem>
                <SelectItem value="utc+9">UTC+09:00</SelectItem>
                <SelectItem value="utc+10">UTC+10:00</SelectItem>
                <SelectItem value="utc+11">UTC+11:00</SelectItem>
                <SelectItem value="utc+12">UTC+12:00</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">
              Language
            </label>
            <Select value={formData.language} onValueChange={(value) => handleSelectChange("language", value)}>
              <SelectTrigger id="language" className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="relative overflow-hidden">
          Cancel
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-muted/20 to-muted/10 opacity-0 transition-opacity hover:opacity-100"></span>
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading || success}
          className={`relative overflow-hidden ${success ? "bg-green-600" : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"}`}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : success ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  )
}
