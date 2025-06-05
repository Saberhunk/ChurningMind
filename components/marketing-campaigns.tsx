"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  PlusCircle,
  Loader2,
  Sparkles,
  Target,
  Calendar,
  DollarSign,
  Users,
  ImageIcon,
  Video,
  FileText,
  Check,
  Edit,
  Copy,
  Wand2,
  Zap,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Campaign = {
  id: string
  name: string
  status: "active" | "paused" | "draft" | "completed"
  platform: string
  budget: string
  audience: string
  startDate: string
  endDate: string
  impressions?: number
  clicks?: number
  conversions?: number
  roi?: number
}

type AdTemplate = {
  id: string
  name: string
  type: "image" | "video" | "carousel" | "text"
  platform: string
  preview: string
  description: string
}

const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Vibes 2024 🌞",
    status: "active",
    platform: "Instagram, TikTok",
    budget: "$2,500",
    audience: "18-35, Urban Areas",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    impressions: 125000,
    clicks: 8900,
    conversions: 342,
    roi: 4.2,
  },
  {
    id: "2",
    name: "Product Launch Hype 🚀",
    status: "active",
    platform: "TikTok, Instagram",
    budget: "$3,200",
    audience: "25-40, Tech Enthusiasts",
    startDate: "2024-05-15",
    endDate: "2024-07-15",
    impressions: 189000,
    clicks: 12600,
    conversions: 567,
    roi: 3.8,
  },
  {
    id: "3",
    name: "Brand Awareness Boost 💫",
    status: "paused",
    platform: "LinkedIn, Twitter",
    budget: "$1,800",
    audience: "30-55, Professionals",
    startDate: "2024-04-10",
    endDate: "2024-06-10",
    impressions: 67000,
    clicks: 4200,
    conversions: 156,
    roi: 2.1,
  },
]

const adTemplates: AdTemplate[] = [
  {
    id: "1",
    name: "Product Showcase ✨",
    type: "image",
    platform: "Instagram, Facebook",
    preview: "/placeholder.svg?height=200&width=200&text=Product+Showcase",
    description: "Highlight your product features with a clean, modern design",
  },
  {
    id: "2",
    name: "Customer Testimonial 💬",
    type: "video",
    platform: "All Platforms",
    preview: "/placeholder.svg?height=200&width=200&text=Testimonial",
    description: "Share authentic customer reviews and experiences",
  },
  {
    id: "3",
    name: "Limited Time Offer ⏰",
    type: "carousel",
    platform: "Instagram, Facebook",
    preview: "/placeholder.svg?height=200&width=200&text=Limited+Offer",
    description: "Create urgency with time-sensitive promotions",
  },
  {
    id: "4",
    name: "Brand Story 📖",
    type: "video",
    platform: "YouTube, TikTok",
    preview: "/placeholder.svg?height=200&width=200&text=Brand+Story",
    description: "Tell your brand story with an engaging video narrative",
  },
]

export default function MarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false)
  const [isAdGeneratorOpen, setIsAdGeneratorOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [generatingAd, setGeneratingAd] = useState(false)
  const [adGenerated, setAdGenerated] = useState(false)
  const [adPreview, setAdPreview] = useState<string | null>(null)
  const { toast } = useToast()

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "",
    objective: "",
    budget: "",
    startDate: "",
    endDate: "",
    audience: "",
  })

  const [adSettings, setAdSettings] = useState({
    platform: "instagram",
    objective: "awareness",
    targetAudience: "18-35",
    tone: "professional",
    includeOffer: true,
    includeCTA: true,
    enhancementLevel: 70,
    productName: "",
    brandVoice: "",
  })

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.platform || !newCampaign.budget) {
      toast({
        title: "Missing Information ⚠️",
        description: "Please fill in all required fields",
        type: "error",
      })
      return
    }

    const campaign: Campaign = {
      id: `${campaigns.length + 1}`,
      name: newCampaign.name,
      status: "draft",
      platform: newCampaign.platform,
      budget: `$${newCampaign.budget}`,
      audience: newCampaign.audience || "General Audience",
      startDate: newCampaign.startDate || new Date().toISOString().split("T")[0],
      endDate: newCampaign.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }

    setCampaigns((prev) => [...prev, campaign])
    setIsNewCampaignOpen(false)
    setNewCampaign({
      name: "",
      platform: "",
      objective: "",
      budget: "",
      startDate: "",
      endDate: "",
      audience: "",
    })

    toast({
      title: "🎉 Campaign Created!",
      description: "Your new campaign has been created successfully",
      type: "success",
    })
  }

  const handleGenerateAd = () => {
    if (!selectedTemplate) {
      toast({
        title: "No Template Selected ⚠️",
        description: "Please select a template to generate an ad",
        type: "error",
      })
      return
    }

    setGeneratingAd(true)

    // Simulate AI ad generation
    setTimeout(() => {
      const template = adTemplates.find((t) => t.id === selectedTemplate)
      if (template) {
        setAdPreview(`/placeholder.svg?height=400&width=400&text=AI+Generated+${template.type}`)
      }

      setGeneratingAd(false)
      setAdGenerated(true)

      toast({
        title: "✨ Ad Generated!",
        description: "Your AI-powered ad is ready for review",
        type: "success",
      })
    }, 3000)
  }

  const handleSaveAd = () => {
    setIsAdGeneratorOpen(false)
    setAdGenerated(false)
    setSelectedTemplate(null)
    setAdPreview(null)

    toast({
      title: "💾 Ad Saved!",
      description: "Your ad has been saved to your library",
      type: "success",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "paused":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "draft":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      case "completed":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "carousel":
        return <FileText className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Marketing Campaigns 🎯
        </h3>
        <div className="flex gap-2">
          <Dialog open={isAdGeneratorOpen} onOpenChange={setIsAdGeneratorOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Ad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ✨ AI Ad Generator
                </DialogTitle>
                <DialogDescription>
                  Create professional ads for your marketing campaigns with AI magic
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="template" className="mt-4">
                <TabsList className="w-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                  <TabsTrigger
                    value="template"
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                  >
                    Choose Template
                  </TabsTrigger>
                  <TabsTrigger
                    value="customize"
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                  >
                    Customize
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="template" className="space-y-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {adTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`
                          rounded-lg border p-4 cursor-pointer transition-all hover:shadow-lg
                          ${
                            selectedTemplate === template.id
                              ? "border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 shadow-lg"
                              : "hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50"
                          }
                        `}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="relative aspect-video overflow-hidden rounded-md mb-3 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          <img
                            src={template.preview || "/placeholder.svg"}
                            alt={template.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                            {selectedTemplate === template.id ? (
                              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                                <Check className="h-4 w-4 mr-1" />
                                Selected
                              </Badge>
                            ) : (
                              <Badge className="bg-white/90 text-gray-900">
                                <Sparkles className="h-4 w-4 mr-1" />
                                Select
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{template.name}</h4>
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getTypeIcon(template.type)}
                              <span className="capitalize">{template.type}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Platforms:</span> {template.platform}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="customize" className="space-y-6 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="platform" className="text-sm font-medium">
                        Platform
                      </label>
                      <Select
                        value={adSettings.platform}
                        onValueChange={(value) => setAdSettings((prev) => ({ ...prev, platform: value }))}
                      >
                        <SelectTrigger id="platform" className="border-purple-200 focus:border-purple-500">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="objective" className="text-sm font-medium">
                        Campaign Objective
                      </label>
                      <Select
                        value={adSettings.objective}
                        onValueChange={(value) => setAdSettings((prev) => ({ ...prev, objective: value }))}
                      >
                        <SelectTrigger id="objective" className="border-purple-200 focus:border-purple-500">
                          <SelectValue placeholder="Select objective" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                          <SelectItem value="consideration">Consideration</SelectItem>
                          <SelectItem value="conversion">Conversion</SelectItem>
                          <SelectItem value="traffic">Website Traffic</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="productName" className="text-sm font-medium">
                        Product/Service Name
                      </label>
                      <Input
                        id="productName"
                        placeholder="Enter your product name"
                        value={adSettings.productName}
                        onChange={(e) => setAdSettings((prev) => ({ ...prev, productName: e.target.value }))}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="audience" className="text-sm font-medium">
                        Target Audience
                      </label>
                      <Select
                        value={adSettings.targetAudience}
                        onValueChange={(value) => setAdSettings((prev) => ({ ...prev, targetAudience: value }))}
                      >
                        <SelectTrigger id="audience" className="border-purple-200 focus:border-purple-500">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18-24">Gen Z (18-24 years)</SelectItem>
                          <SelectItem value="18-35">Millennials (18-35 years)</SelectItem>
                          <SelectItem value="25-45">Gen X (25-45 years)</SelectItem>
                          <SelectItem value="35-55">Boomers (35-55 years)</SelectItem>
                          <SelectItem value="all">All ages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="brandVoice" className="text-sm font-medium">
                      Brand Voice & Message
                    </label>
                    <Textarea
                      id="brandVoice"
                      placeholder="Describe your brand voice and key message..."
                      value={adSettings.brandVoice}
                      onChange={(e) => setAdSettings((prev) => ({ ...prev, brandVoice: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <label htmlFor="include-offer" className="text-sm font-medium">
                          Include Special Offer 🎁
                        </label>
                        <p className="text-xs text-muted-foreground">Add a special offer or discount to your ad</p>
                      </div>
                      <Switch
                        id="include-offer"
                        checked={adSettings.includeOffer}
                        onCheckedChange={(checked) => setAdSettings((prev) => ({ ...prev, includeOffer: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <label htmlFor="include-cta" className="text-sm font-medium">
                          Include Call-to-Action 📢
                        </label>
                        <p className="text-xs text-muted-foreground">Add a clear call-to-action button</p>
                      </div>
                      <Switch
                        id="include-cta"
                        checked={adSettings.includeCTA}
                        onCheckedChange={(checked) => setAdSettings((prev) => ({ ...prev, includeCTA: checked }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="enhancement-level" className="text-sm font-medium">
                          AI Enhancement Level: {adSettings.enhancementLevel}% ⚡
                        </label>
                      </div>
                      <Slider
                        id="enhancement-level"
                        min={0}
                        max={100}
                        step={10}
                        value={[adSettings.enhancementLevel]}
                        onValueChange={(value) => setAdSettings((prev) => ({ ...prev, enhancementLevel: value[0] }))}
                        className="[&>span]:bg-gradient-to-r [&>span]:from-purple-500 [&>span]:to-pink-500"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Subtle ✨</span>
                        <span>Balanced 🎯</span>
                        <span>Maximum 🚀</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="space-y-4 py-4">
                  {adGenerated ? (
                    <div className="flex flex-col items-center">
                      <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border shadow-lg">
                        <img
                          src={adPreview || "/placeholder.svg?height=400&width=400&text=AI+Generated+Ad"}
                          alt="AI Generated Ad Preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <h3 className="text-lg font-bold text-white">✨ Your AI-Generated Ad</h3>
                          <p className="text-sm text-white/80">
                            {adSettings.includeOffer && "🎁 Special Offer: 20% Off Limited Time! "}
                            Discover {adSettings.productName || "our amazing products"} today.
                          </p>
                          {adSettings.includeCTA && (
                            <Button size="sm" className="mt-2 bg-white text-black hover:bg-white/90">
                              Shop Now 🛍️
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 w-full max-w-md space-y-4">
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200">
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-3 text-purple-800 dark:text-purple-200">Ad Details 📊</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Platform:</span>
                                <span className="capitalize font-medium">{adSettings.platform}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Objective:</span>
                                <span className="capitalize font-medium">{adSettings.objective}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Target Audience:</span>
                                <span className="font-medium">{adSettings.targetAudience}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Enhancement:</span>
                                <span className="font-medium">{adSettings.enhancementLevel}%</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 border-purple-200 hover:bg-purple-50">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            onClick={handleSaveAd}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Save Ad
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-6 mb-4">
                        <Zap className="h-12 w-12 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Generate Your AI Ad ✨</h3>
                      <p className="text-center text-muted-foreground mb-6 max-w-md">
                        Select a template and customize your settings, then let our AI create the perfect ad for your
                        campaign
                      </p>
                      <Button
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={handleGenerateAd}
                        disabled={!selectedTemplate || generatingAd}
                        size="lg"
                      >
                        {generatingAd ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating Magic...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-5 w-5" />
                            Generate Ad
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-200 hover:bg-purple-50 hover:border-purple-300">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  🚀 Create New Campaign
                </DialogTitle>
                <DialogDescription>Set up a new marketing campaign that'll go viral</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="campaign-name" className="text-sm font-medium">
                    Campaign Name *
                  </label>
                  <Input
                    id="campaign-name"
                    placeholder="e.g., Summer Vibes 2024 🌞"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign((prev) => ({ ...prev, name: e.target.value }))}
                    className="border-purple-200 focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="platform" className="text-sm font-medium">
                      Platform *
                    </label>
                    <Select
                      value={newCampaign.platform}
                      onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, platform: value }))}
                    >
                      <SelectTrigger id="platform" className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Instagram, TikTok">Instagram + TikTok</SelectItem>
                        <SelectItem value="All Platforms">All Platforms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="objective" className="text-sm font-medium">
                      Campaign Objective
                    </label>
                    <Select
                      value={newCampaign.objective}
                      onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, objective: value }))}
                    >
                      <SelectTrigger id="objective" className="border-purple-200 focus:border-purple-500">
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                        <SelectItem value="consideration">Consideration</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                        <SelectItem value="traffic">Website Traffic</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="start-date" className="text-sm font-medium">
                      Start Date
                    </label>
                    <Input
                      id="start-date"
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, startDate: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="end-date" className="text-sm font-medium">
                      End Date
                    </label>
                    <Input
                      id="end-date"
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">
                    Budget *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="1000"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, budget: e.target.value }))}
                      className="border-purple-200 focus:border-purple-500 pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="audience" className="text-sm font-medium">
                    Target Audience
                  </label>
                  <Textarea
                    id="audience"
                    placeholder="Describe your target audience (e.g., 18-35, Urban millennials, Tech enthusiasts)"
                    value={newCampaign.audience}
                    onChange={(e) => setNewCampaign((prev) => ({ ...prev, audience: e.target.value }))}
                    className="border-purple-200 focus:border-purple-500"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewCampaignOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateCampaign}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  🚀 Create Campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{campaign.name}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    📅 {campaign.startDate} to {campaign.endDate}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                  {campaign.status === "active" ? (
                    <Button variant="outline" size="sm" className="border-yellow-200 hover:bg-yellow-50">
                      ⏸️ Pause
                    </Button>
                  ) : campaign.status === "paused" ? (
                    <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                      ▶️ Resume
                    </Button>
                  ) : campaign.status === "draft" ? (
                    <Button variant="outline" size="sm" className="border-green-200 hover:bg-green-50">
                      🚀 Activate
                    </Button>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-purple-500 p-1">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Platform</span>
                  </div>
                  <p className="font-semibold">{campaign.platform}</p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-green-500 p-1">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Budget</span>
                  </div>
                  <p className="font-semibold">{campaign.budget}</p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-blue-500 p-1">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Audience</span>
                  </div>
                  <p className="font-semibold">{campaign.audience}</p>
                </div>

                <div className="rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-orange-500 p-1">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Duration</span>
                  </div>
                  <p className="font-semibold">
                    {Math.ceil(
                      (new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    days
                  </p>
                </div>
              </div>

              {(campaign.status === "active" || campaign.status === "completed") && (
                <div className="mt-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
                  <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">📊 Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Impressions</p>
                      <p className="text-2xl font-bold text-blue-600">{campaign.impressions?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Clicks</p>
                      <p className="text-2xl font-bold text-green-600">{campaign.clicks?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="text-2xl font-bold text-purple-600">{campaign.conversions?.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">ROI</p>
                      <p className="text-2xl font-bold text-orange-600">{campaign.roi}x</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
