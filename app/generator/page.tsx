"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Sparkles,
  Loader2,
  Edit,
  Rocket,
  Check,
  X,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  TrendingUp,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"

// Platform data with icons
const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-blue-400" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-600" },
  { id: "tiktok", name: "TikTok", icon: TrendingUp, color: "bg-black" },
  { id: "threads", name: "Threads", icon: Instagram, color: "bg-gray-800" },
  { id: "snapchat", name: "Snapchat", icon: AlertCircle, color: "bg-yellow-400" },
  { id: "reddit", name: "Reddit", icon: AlertCircle, color: "bg-orange-600" },
  { id: "pinterest", name: "Pinterest", icon: AlertCircle, color: "bg-red-500" },
]

// Sample ad strategies
const adStrategies = [
  { id: "awareness", name: "Brand Awareness", description: "Maximize reach to new audiences", budget: "$500-1000" },
  {
    id: "engagement",
    name: "Engagement Boost",
    description: "Increase interactions with your content",
    budget: "$300-700",
  },
  { id: "conversion", name: "Conversion Focus", description: "Drive direct actions and sales", budget: "$700-1500" },
  {
    id: "retargeting",
    name: "Retargeting Campaign",
    description: "Re-engage with previous visitors",
    budget: "$400-800",
  },
]

export default function GeneratorPage() {
  const [generating, setGenerating] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>({})
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [selectedAdStrategies, setSelectedAdStrategies] = useState<string[]>([])
  const [adBudget, setAdBudget] = useState(500)
  const [launchingCampaign, setLaunchingCampaign] = useState(false)
  const { toast } = useToast()
  const [showContentDialog, setShowContentDialog] = useState(false)
  const [showScheduleOptions, setShowScheduleOptions] = useState(false)

  // Toggle platform selection
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  // Select all platforms
  const selectAllPlatforms = () => {
    if (selectedPlatforms.length === platforms.length) {
      setSelectedPlatforms([])
    } else {
      setSelectedPlatforms(platforms.map((p) => p.id))
    }
  }

  // Toggle ad strategy selection
  const toggleAdStrategy = (strategyId: string) => {
    setSelectedAdStrategies((prev) =>
      prev.includes(strategyId) ? prev.filter((id) => id !== strategyId) : [...prev, strategyId],
    )
  }

  // Generate sample content for selected platforms
  const generateSampleContent = () => {
    const content: Record<string, any> = {}

    selectedPlatforms.forEach((platformId) => {
      const platform = platforms.find((p) => p.id === platformId)

      switch (platformId) {
        case "instagram":
          content[platformId] = {
            caption:
              "Revolutionizing how businesses connect with customers! Our AI-powered platform helps you create engaging content in seconds. #DigitalTransformation #AIMarketing #GrowthHacking",
            hashtags: ["#DigitalTransformation", "#AIMarketing", "#GrowthHacking", "#ContentCreation"],
            imageUrl: "/placeholder.svg?height=400&width=400&text=Instagram+Post",
          }
          break
        case "twitter":
          content[platformId] = {
            text: "Just launched our new AI content generator! Create engaging posts across all platforms with one click. Try it now and see the difference. #AIContent #MarketingTools",
            hashtags: ["#AIContent", "#MarketingTools", "#ContentStrategy"],
            imageUrl: "/placeholder.svg?height=300&width=500&text=Twitter+Image",
          }
          break
        case "facebook":
          content[platformId] = {
            text: "Exciting news! We've just released our new AI-powered content creation tool that helps businesses create engaging content across multiple platforms simultaneously. Say goodbye to hours of content planning and hello to efficiency!",
            cta: "Try it free for 14 days",
            imageUrl: "/placeholder.svg?height=400&width=600&text=Facebook+Post",
          }
          break
        case "linkedin":
          content[platformId] = {
            title: "Introducing Our Revolutionary AI Content Generator",
            text: "I'm thrilled to announce the launch of our new AI-powered content creation platform. After months of development and testing, we've created a tool that helps marketers and businesses create professional, engaging content across multiple platforms with just one click.\n\nOur early users are reporting 3x faster content creation and 45% higher engagement rates.",
            hashtags: ["#ProductLaunch", "#AIInnovation", "#MarketingTechnology", "#ContentStrategy"],
            imageUrl: "/placeholder.svg?height=400&width=600&text=LinkedIn+Post",
          }
          break
        default:
          content[platformId] = {
            text: `Sample content for ${platform?.name}. This is automatically generated based on your inputs and optimized for this platform.`,
            hashtags: ["#ContentCreation", "#DigitalMarketing"],
            imageUrl: `/placeholder.svg?height=400&width=400&text=${platform?.name}+Content`,
          }
      }
    })

    return content
  }

  // Handle generate content
  const handleGenerate = () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to generate content",
        type: "error",
      })
      return
    }

    setGenerating(true)

    // Simulate generation
    setTimeout(() => {
      const content = generateSampleContent()
      setGeneratedContent(content)
      setGenerating(false)
      setShowContentDialog(true) // Open dialog instead of setting showPreview

      toast({
        title: "Content generated",
        description: `Content generated for ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? "s" : ""}`,
        type: "success",
      })
    }, 2000)
  }

  // Start editing content for a specific platform
  const startEditing = (platformId: string, content: any) => {
    setEditingPlatform(platformId)
    setEditedContent(content.text || content.caption || "")
  }

  // Save edited content
  const saveEditedContent = () => {
    if (!editingPlatform) return

    setGeneratedContent((prev) => ({
      ...prev,
      [editingPlatform]: {
        ...prev[editingPlatform],
        text: editedContent,
        caption: editedContent,
      },
    }))

    setEditingPlatform(null)

    toast({
      title: "Content updated",
      description: "Your changes have been saved",
      type: "success",
    })
  }

  // Launch campaign
  const launchCampaign = () => {
    setLaunchingCampaign(true)

    // Simulate launch
    setTimeout(() => {
      setLaunchingCampaign(false)

      toast({
        title: "Campaign launched!",
        description: `Content published to ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? "s" : ""}${selectedAdStrategies.length > 0 ? " with strategic ads" : ""}`,
        type: "success",
      })

      // Reset state
      setShowPreview(false)
      setGeneratedContent({})
      setSelectedAdStrategies([])
      setAdBudget(500)
    }, 3000)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Content Generator
        </h1>
        <p className="text-muted-foreground">Create viral content with AI assistance</p>
      </div>

      {!showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate New Content</CardTitle>
            <CardDescription>Fill in the details to generate content</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="post" className="space-y-4">
              <TabsList>
                <TabsTrigger value="post">Social Post</TabsTrigger>
                <TabsTrigger value="article">Article</TabsTrigger>
                <TabsTrigger value="video">Video Script</TabsTrigger>
              </TabsList>

              <TabsContent value="post" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Target Platforms</Label>
                    <Button variant="outline" size="sm" onClick={selectAllPlatforms} className="text-xs h-7">
                      {selectedPlatforms.length === platforms.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedPlatforms.includes(platform.id)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                        onClick={() => togglePlatform(platform.id)}
                      >
                        <div className={`p-2 rounded-full ${platform.color} text-white`}>
                          <platform.icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">{platform.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <Select defaultValue="casual">
                      <SelectTrigger id="tone">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspirational">Inspirational</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select defaultValue="general">
                      <SelectTrigger id="content-type">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Post</SelectItem>
                        <SelectItem value="product-launch">Product Launch</SelectItem>
                        <SelectItem value="promotion">Promotion/Sale</SelectItem>
                        <SelectItem value="event">Event Announcement</SelectItem>
                        <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                        <SelectItem value="testimonial">Testimonial/Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic/Product</Label>
                  <Input id="topic" placeholder="Enter a topic, product, or service" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you want to create in detail. Include key points, target audience, and any specific messaging."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (optional)</Label>
                  <Input id="keywords" placeholder="Enter keywords separated by commas" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="include-media" />
                  <label
                    htmlFor="include-media"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Generate AI images for posts
                  </label>
                </div>

                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating Viral Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Viral Content
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="article" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="article-title">Article Title</Label>
                  <Input id="article-title" placeholder="Enter article title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article-description">Description</Label>
                  <Textarea id="article-description" placeholder="Describe what you want to write about" rows={3} />
                </div>

                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Article
                    </>
                  )}
                </Button>
              </TabsContent>

              <TabsContent value="video" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input id="video-title" placeholder="Enter video title" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-description">Description</Label>
                  <Textarea id="video-description" placeholder="Describe what your video is about" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-length">Video Length</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="video-length">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short (1-3 minutes)</SelectItem>
                      <SelectItem value="medium">Medium (3-10 minutes)</SelectItem>
                      <SelectItem value="long">Long (10+ minutes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleGenerate}
                  disabled={generating}
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Script
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Generated Content Preview</CardTitle>
                <CardDescription>Review and edit your content before publishing</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(false)}>
                Back to Generator
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={selectedPlatforms[0]} className="space-y-4">
                <ScrollArea className="w-full whitespace-nowrap">
                  <TabsList className="w-full justify-start">
                    {selectedPlatforms.map((platformId) => {
                      const platform = platforms.find((p) => p.id === platformId)
                      return (
                        <TabsTrigger key={platformId} value={platformId} className="gap-2">
                          <platform.icon className="h-4 w-4" />
                          {platform?.name}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                </ScrollArea>

                {selectedPlatforms.map((platformId) => {
                  const platform = platforms.find((p) => p.id === platformId)
                  const content = generatedContent[platformId]

                  if (!content) return null

                  return (
                    <TabsContent key={platformId} value={platformId} className="space-y-4">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Content preview */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-full ${platform?.color} text-white`}>
                              <platform.icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-medium">{platform?.name} Preview</h3>
                          </div>

                          <div className="border rounded-lg p-4 space-y-3">
                            {content.imageUrl && (
                              <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
                                <img
                                  src={content.imageUrl || "/placeholder.svg"}
                                  alt={`${platform?.name} content`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}

                            {content.title && <h3 className="text-lg font-bold">{content.title}</h3>}

                            {(content.text || content.caption) && (
                              <p className="whitespace-pre-line">{content.text || content.caption}</p>
                            )}

                            {content.hashtags && content.hashtags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {content.hashtags.map((tag: string) => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {content.cta && (
                              <Button size="sm" className="mt-2">
                                {content.cta}
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Edit panel */}
                        <div className="w-full md:w-1/3 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Edit Content</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => startEditing(platformId, content)}
                            >
                              <Edit className="h-3.5 w-3.5" />
                              Edit
                            </Button>
                          </div>

                          {editingPlatform === platformId ? (
                            <div className="space-y-3">
                              <Textarea
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                                rows={6}
                                className="w-full"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={saveEditedContent} className="gap-1">
                                  <Check className="h-3.5 w-3.5" />
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingPlatform(null)}
                                  className="gap-1"
                                >
                                  <X className="h-3.5 w-3.5" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="border rounded-lg p-3 bg-muted/30">
                                <h4 className="text-sm font-medium mb-1">Platform Insights</h4>
                                <p className="text-xs text-muted-foreground">
                                  Content optimized for {platform?.name} with ideal length and format.
                                  {platformId === "instagram" && " Includes engaging hashtags for discovery."}
                                  {platformId === "linkedin" && " Professional tone for business audience."}
                                  {platformId === "twitter" && " Concise with relevant hashtags."}
                                </p>
                              </div>

                              <div className="border rounded-lg p-3 bg-muted/30">
                                <h4 className="text-sm font-medium mb-1">AI Recommendations</h4>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                  <li>• Add a question to increase engagement</li>
                                  <li>• Include a clear call-to-action</li>
                                  <li>• Consider adding relevant emojis</li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Launch Campaign</CardTitle>
              <CardDescription>Configure your campaign settings before publishing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Strategic Ad Launch</h3>
                  <Switch
                    checked={selectedAdStrategies.length > 0}
                    onCheckedChange={(checked) => {
                      if (!checked) setSelectedAdStrategies([])
                      else if (selectedAdStrategies.length === 0) setSelectedAdStrategies(["awareness"])
                    }}
                  />
                </div>

                {selectedAdStrategies.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {adStrategies.map((strategy) => (
                        <div
                          key={strategy.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedAdStrategies.includes(strategy.id)
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => toggleAdStrategy(strategy.id)}
                        >
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={selectedAdStrategies.includes(strategy.id)}
                              onCheckedChange={() => toggleAdStrategy(strategy.id)}
                              className="mt-1"
                            />
                            <div>
                              <h4 className="font-medium">{strategy.name}</h4>
                              <p className="text-sm text-muted-foreground">{strategy.description}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <DollarSign className="h-3.5 w-3.5 text-green-500" />
                                <span className="text-xs font-medium text-green-500">{strategy.budget}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Ad Budget: ${adBudget}</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm">
                              Advanced Options
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-4">
                              <h4 className="font-medium">Advanced Ad Settings</h4>
                              <div className="space-y-2">
                                <Label>Target Audience</Label>
                                <Select defaultValue="custom">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select audience" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="custom">Custom Audience</SelectItem>
                                    <SelectItem value="lookalike">Lookalike Audience</SelectItem>
                                    <SelectItem value="retargeting">Retargeting</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Campaign Duration</Label>
                                <Select defaultValue="7">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 days</SelectItem>
                                    <SelectItem value="7">7 days</SelectItem>
                                    <SelectItem value="14">14 days</SelectItem>
                                    <SelectItem value="30">30 days</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Slider
                        value={[adBudget]}
                        min={100}
                        max={2000}
                        step={50}
                        onValueChange={(value) => setAdBudget(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>$100</span>
                        <span>$1000</span>
                        <span>$2000</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Publishing Options</h3>

                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="publish-now" defaultChecked />
                    <label htmlFor="publish-now" className="text-sm font-medium leading-none">
                      Publish immediately
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="schedule-later" />
                    <label htmlFor="schedule-later" className="text-sm font-medium leading-none">
                      Schedule for later
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-optimize" defaultChecked />
                  <label htmlFor="auto-optimize" className="text-sm font-medium leading-none">
                    Auto-optimize posting times for each platform
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="analytics" defaultChecked />
                  <label htmlFor="analytics" className="text-sm font-medium leading-none">
                    Enable advanced analytics tracking
                  </label>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    size="lg"
                  >
                    <Rocket className="h-4 w-4" />
                    Launch Viral Campaign
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Campaign Launch</DialogTitle>
                    <DialogDescription>
                      You're about to launch content to {selectedPlatforms.length} platform
                      {selectedPlatforms.length > 1 ? "s" : ""}.
                      {selectedAdStrategies.length > 0 &&
                        ` Strategic ads will be created with a budget of $${adBudget}.`}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Platforms</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlatforms.map((platformId) => {
                          const platform = platforms.find((p) => p.id === platformId)
                          return (
                            <Badge key={platformId} variant="outline" className="gap-1">
                              <platform.icon className="h-3.5 w-3.5" />
                              {platform?.name}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>

                    {selectedAdStrategies.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Ad Strategies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAdStrategies.map((strategyId) => {
                            const strategy = adStrategies.find((s) => s.id === strategyId)
                            return (
                              <Badge key={strategyId} variant="outline" className="gap-1">
                                {strategy?.name}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button
                      onClick={launchCampaign}
                      disabled={launchingCampaign}
                      className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      {launchingCampaign ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Launching...
                        </>
                      ) : (
                        <>
                          <Rocket className="h-4 w-4" />
                          Confirm Launch
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Content Review Dialog */}
      <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Review Your Generated Content</DialogTitle>
            <DialogDescription>
              Review and edit your content before publishing to your selected platforms
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto py-4">
            <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
              <ScrollArea className="w-full whitespace-nowrap">
                <TabsList className="w-full justify-start">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    return (
                      <TabsTrigger key={platformId} value={platformId} className="gap-2">
                        <platform.icon className="h-4 w-4" />
                        {platform?.name}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </ScrollArea>

              {selectedPlatforms.map((platformId) => {
                const platform = platforms.find((p) => p.id === platformId)
                const content = generatedContent[platformId]

                if (!content) return null

                return (
                  <TabsContent key={platformId} value={platformId} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Content preview */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-full ${platform?.color} text-white`}>
                            <platform.icon className="h-4 w-4" />
                          </div>
                          <h3 className="font-medium">{platform?.name} Preview</h3>
                        </div>

                        <div className="border rounded-lg p-4 space-y-3">
                          {content.imageUrl && (
                            <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
                              <img
                                src={content.imageUrl || "/placeholder.svg"}
                                alt={`${platform?.name} content`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {content.title && <h3 className="text-lg font-bold">{content.title}</h3>}

                          {(content.text || content.caption) && (
                            <p className="whitespace-pre-line">{content.text || content.caption}</p>
                          )}

                          {content.hashtags && content.hashtags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {content.hashtags.map((tag: string) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {content.cta && (
                            <Button size="sm" className="mt-2">
                              {content.cta}
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Edit panel */}
                      <div className="w-full md:w-1/3 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Edit Content</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => startEditing(platformId, content)}
                          >
                            <Edit className="h-3.5 w-3.5" />
                            Edit
                          </Button>
                        </div>

                        {editingPlatform === platformId ? (
                          <div className="space-y-3">
                            <Textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              rows={6}
                              className="w-full"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={saveEditedContent} className="gap-1">
                                <Check className="h-3.5 w-3.5" />
                                Save
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingPlatform(null)}
                                className="gap-1"
                              >
                                <X className="h-3.5 w-3.5" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="border rounded-lg p-3 bg-muted/30">
                              <h4 className="text-sm font-medium mb-1">Platform Insights</h4>
                              <p className="text-xs text-muted-foreground">
                                Content optimized for {platform?.name} with ideal length and format.
                                {platformId === "instagram" && " Includes engaging hashtags for discovery."}
                                {platformId === "linkedin" && " Professional tone for business audience."}
                                {platformId === "twitter" && " Concise with relevant hashtags."}
                              </p>
                            </div>

                            <div className="border rounded-lg p-3 bg-muted/30">
                              <h4 className="text-sm font-medium mb-1">AI Recommendations</h4>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                <li>• Add a question to increase engagement</li>
                                <li>• Include a clear call-to-action</li>
                                <li>• Consider adding relevant emojis</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:mr-auto">
              <Checkbox
                id="schedule-post"
                onClick={() => setShowScheduleOptions((showScheduleOptions) => !showScheduleOptions)}
              />
              <Label htmlFor="schedule-post">Schedule for later</Label>
            </div>

            {showScheduleOptions && (
              <div className="w-full p-3 mb-3 border rounded-md bg-background">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input
                      type="date"
                      id="schedule-date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input type="time" id="schedule-time" defaultValue="09:00" />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <Label htmlFor="schedule-frequency">Frequency</Label>
                  <Select defaultValue="once">
                    <SelectTrigger id="schedule-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox id="optimize-time" defaultChecked />
                  <label htmlFor="optimize-time" className="text-sm text-muted-foreground">
                    Optimize timing for maximum engagement
                  </label>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowContentDialog(false)}>
                Save as Draft
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={() => {
                  toast({
                    title: showScheduleOptions ? "Content scheduled!" : "Content published!",
                    description: showScheduleOptions
                      ? "Your content has been scheduled for publication"
                      : "Your content has been published to the selected platforms",
                    type: "success",
                  })
                  setShowContentDialog(false)
                }}
              >
                <Rocket className="h-4 w-4" />
                {showScheduleOptions ? "Schedule" : "Publish Now"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
