"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Loader2,
  ImageIcon,
  Video,
  Sparkles,
  X,
  Eye,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Hash,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample taglines and hashtags for different platforms
const PLATFORM_CONTENT = {
  instagram: {
    taglines: [
      "Elevate your social media game with our cutting-edge AI tools 🚀",
      "Transform your content strategy with just one click ✨",
      "Creating viral content has never been this easy 🔥",
      "Stand out from the crowd with AI-powered content creation 💯",
      "The future of content creation is here, and it's AI-powered 🤖",
    ],
    hashtags: [
      "#ContentCreation",
      "#DigitalMarketing",
      "#SocialMediaStrategy",
      "#AIMarketing",
      "#ContentCreator",
      "#ViralContent",
      "#InstagramTips",
      "#SocialMediaMarketing",
      "#MarketingTools",
      "#GrowthHacking",
    ],
  },
  twitter: {
    taglines: [
      "Revolutionizing content creation with AI. See how our platform is changing the game.",
      "Create, schedule, and analyze your content all in one place. Try it now!",
      "Struggling with content ideas? Our AI has you covered. Generate viral tweets in seconds.",
      "The smartest way to manage your social media presence. AI-powered and user-friendly.",
      "Boost your engagement rates with our data-driven content suggestions.",
    ],
    hashtags: [
      "#TwitterTips",
      "#ContentStrategy",
      "#SocialMedia",
      "#DigitalMarketing",
      "#AITech",
      "#MarketingTools",
      "#GrowthHacking",
      "#SMM",
      "#ContentCreation",
      "#TwitterMarketing",
    ],
  },
  facebook: {
    taglines: [
      "Discover how our AI platform is helping businesses increase engagement by 300%",
      "The all-in-one solution for your social media management needs",
      "Stop wasting time on content creation. Let our AI do the heavy lifting.",
      "Connect with your audience on a deeper level with our AI-generated content",
      "From ideation to analytics, we've got your social media strategy covered",
    ],
    hashtags: [
      "#FacebookMarketing",
      "#SocialMediaTips",
      "#DigitalStrategy",
      "#BusinessGrowth",
      "#MarketingAutomation",
      "#ContentCreation",
      "#SocialMediaManagement",
      "#FacebookTips",
      "#MarketingTools",
      "#SMM",
    ],
  },
  linkedin: {
    taglines: [
      "Transforming how professionals approach content creation in the digital age",
      "Our AI-powered platform is helping businesses achieve 45% higher engagement rates",
      "Streamline your content workflow and focus on what matters: growing your business",
      "Join thousands of professionals who've revolutionized their content strategy with our platform",
      "Data-driven content creation for the modern professional",
    ],
    hashtags: [
      "#ProfessionalDevelopment",
      "#BusinessStrategy",
      "#DigitalTransformation",
      "#ContentMarketing",
      "#B2BMarketing",
      "#ThoughtLeadership",
      "#Innovation",
      "#AIinBusiness",
      "#FutureOfWork",
      "#MarketingStrategy",
    ],
  },
}

type MediaItem = {
  id: string
  type: "image" | "video"
  name: string
  size: string
  preview: string
  file?: File
}

export default function ContentGeneratorForm() {
  const [loading, setLoading] = useState(false)
  const [contentLength, setContentLength] = useState<string>("medium")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [previewMode, setPreviewMode] = useState(false)
  const { toast } = useToast()
  const [generatedContent, setGeneratedContent] = useState<any>({})
  const [showContentDialog, setShowContentDialog] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [contentIdea, setContentIdea] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [contentType, setContentType] = useState("post")
  const [tone, setTone] = useState("professional")
  const [keywords, setKeywords] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [generatingTaglines, setGeneratingTaglines] = useState(false)
  const [generatingHashtags, setGeneratingHashtags] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleGenerate = () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to generate content for",
        type: "error",
      })
      return
    }
    
    if (!contentIdea.trim()) {
      toast({
        title: "Missing content idea",
        description: "Please enter a content idea or topic",
        type: "error",
      })
      return
    }
    
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const generatedContent: Record<string, any> = {}
      
      selectedPlatforms.forEach(platform => {
        // Get random tagline and hashtags for the platform
        const platformContent = PLATFORM_CONTENT[platform as keyof typeof PLATFORM_CONTENT] || PLATFORM_CONTENT.instagram
        const randomTaglineIndex = Math.floor(Math.random() * platformContent.taglines.length)
        const tagline = platformContent.taglines[randomTaglineIndex]
        
        // Select 4-6 random hashtags
        const numHashtags = Math.floor(Math.random() * 3) + 4 // 4-6 hashtags
        const shuffledHashtags = [...platformContent.hashtags].sort(() => 0.5 - Math.random())
        const selectedHashtags = shuffledHashtags.slice(0, numHashtags)
        
        // Add custom keywords as hashtags if provided
        if (keywords.trim()) {
          const keywordHashtags = keywords.split(',').map(k => `#${k.trim().replace(/\s+/g, '')}`).filter(Boolean)
          selectedHashtags.push(...keywordHashtags.slice(0, 3)) // Add up to 3 custom hashtags
        }
        
        // Generate platform-specific content
        generatedContent[platform] = {
          title: platform === "linkedin" ? `${contentType.charAt(0).toUpperCase() + contentType.slice(1)}: ${contentIdea}` : "",
          text: tagline,
          hashtags: selectedHashtags,
          imageUrl: mediaItems.length > 0 ? mediaItems[0].preview : `/placeholder.svg?height=400&width=400&text=${platform}+Post`,
        }
      })
      
      setGeneratedContent(generatedContent)
      setLoading(false)
      setShowContentDialog(true)
      
      toast({
        title: "Content generated successfully",
        description: `Generated content for ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}`,
        type: "success",
      })
    }, 2000)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const newMediaItems: MediaItem[] = Array.from(files).map(file => {
      const isImage = file.type.startsWith('image/')
      return {
        id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: isImage ? "image" : "video",
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        preview: URL.createObjectURL(file),
        file
      }
    })
    
    setMediaItems([...mediaItems, ...newMediaItems])
    
    toast({
      title: "Media uploaded",
      description: `${newMediaItems.length} file(s) have been uploaded successfully`,
      type: "success",
    })
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }
  
  const handleVideoUpload = () => {
    videoInputRef.current?.click()
  }
  
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    const newMediaItems: MediaItem[] = Array.from(files).map(file => {
      return {
        id: `video-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        type: "video",
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        preview: URL.createObjectURL(file),
        file
      }
    })
    
    setMediaItems([...mediaItems, ...newMediaItems])
    
    toast({
      title: "Videos uploaded",
      description: `${newMediaItems.length} video(s) have been uploaded successfully`,
      type: "success",
    })
    
    // Reset file input
    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  const removeMediaItem = (id: string) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id))
  }
  
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }
  
  const generateNewTaglines = () => {
    setGeneratingTaglines(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update taglines for all selected platforms
      const updatedContent = { ...generatedContent }
      
      selectedPlatforms.forEach(platform => {
        if (updatedContent[platform]) {
          const platformContent = PLATFORM_CONTENT[platform as keyof typeof PLATFORM_CONTENT] || PLATFORM_CONTENT.instagram
          const randomTaglineIndex = Math.floor(Math.random() * platformContent.taglines.length)
          updatedContent[platform].text = platformContent.taglines[randomTaglineIndex]
        }
      })
      
      setGeneratedContent(updatedContent)
      setGeneratingTaglines(false)
      
      toast({
        title: "Taglines refreshed",
        description: "New taglines have been generated for your content",
        type: "success",
      })
    }, 1500)
  }
  
  const generateNewHashtags = () => {
    setGeneratingHashtags(true)
    
    // Simulate API call
    setTimeout(() => {
      // Update hashtags for all selected platforms
      const updatedContent = { ...generatedContent }
      
      selectedPlatforms.forEach(platform => {
        if (updatedContent[platform]) {
          const platformContent = PLATFORM_CONTENT[platform as keyof typeof PLATFORM_CONTENT] || PLATFORM_CONTENT.instagram
          
          // Select 4-6 random hashtags
          const numHashtags = Math.floor(Math.random() * 3) + 4 // 4-6 hashtags
          const shuffledHashtags = [...platformContent.hashtags].sort(() => 0.5 - Math.random())
          const selectedHashtags = shuffledHashtags.slice(0, numHashtags)
          
          // Add custom keywords as hashtags if provided
          if (keywords.trim()) {
            const keywordHashtags = keywords.split(',').map(k => `#${k.trim().replace(/\s+/g, '')}`).filter(Boolean)
            selectedHashtags.push(...keywordHashtags.slice(0, 3)) // Add up to 3 custom hashtags
          }
          
          updatedContent[platform].hashtags = selectedHashtags
        }
      })
      
      setGeneratedContent(updatedContent)
      setGeneratingHashtags(false)
      
      toast({
        title: "Hashtags refreshed",
        description: "New hashtags have been generated for your content",
        type: "success",
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
          <TabsTrigger
            value="content"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-primary/10"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-secondary/10"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/30 data-[state=active]:to-accent/10"
          >
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 animate-in fade-in-50">
          <div className="space-y-2">
            <label htmlFor="content-idea" className="text-sm font-medium">
              Content Idea or Topic
            </label>
            <Input 
              id="content-idea" 
              placeholder="e.g., AI technology trends, sustainable fashion, crypto investing" 
              value={contentIdea}
              onChange={(e) => setContentIdea(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Target Platforms</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "instagram", name: "Instagram", icon: <Instagram className="h-4 w-4" />, color: "bg-pink-500" },
                { id: "twitter", name: "Twitter", icon: <Twitter className="h-4 w-4" />, color: "bg-blue-400" },
                { id: "facebook", name: "Facebook", icon: <Facebook className="h-4 w-4" />, color: "bg-blue-600" },
                { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, color: "bg-blue-700" },
              ].map((platform) => (
                <div
                  key={platform.id}
                  className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <div className={`p-1 rounded-full ${platform.color} text-white`}>
                    {platform.icon}
                  </div>
                  <span className="text-sm">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="target-audience" className="text-sm font-medium">
                Target Audience
              </label>
              <Input 
                id="target-audience" 
                placeholder="e.g., tech enthusiasts, young professionals" 
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content-type" className="text-sm font-medium">
                Content Type
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Social Media Post</SelectItem>
                  <SelectItem value="video">Video Script</SelectItem>
                  <SelectItem value="meme">Meme</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="text-sm font-medium">
              Tone of Voice
            </label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual & Friendly</SelectItem>
                <SelectItem value="humorous">Humorous</SelectItem>
                <SelectItem value="inspirational">Inspirational</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="keywords" className="text-sm font-medium">
              Keywords (optional)
            </label>
            <Input 
              id="keywords" 
              placeholder="Separate keywords with commas" 
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="additional-info" className="text-sm font-medium">
              Additional Instructions (optional)
            </label>
            <Textarea
              id="additional-info"
              placeholder="Any specific details or requirements for the content"
              rows={3}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 animate-in fade-in-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Your Media</h3>
            <div className="flex gap-2">
              <Button
                onClick={handleFileUpload}
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Upload Image
              </Button>
              <Button
                onClick={handleVideoUpload}
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 gap-2"
              >
                <Video className="h-4 w-4" />
                Upload Video
              </Button>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
                multiple
              />
              <input 
                type="file" 
                ref={videoInputRef}
                className="hidden" 
                accept="video/*"
                onChange={handleVideoChange}
                multiple
              />
            </div>
          </div>

          {mediaItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {mediaItems.map((item) => (
                <Card key={item.id} className="border-secondary/20 overflow-hidden group">
                  <div className="aspect-square relative">
                    <img
                      src={item.preview || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7 rounded-full"
                        onClick={() => removeMediaItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center gap-2">
                      <div className="truncate">
                        <p className="truncate text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {item.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border border-dashed rounded-lg flex flex-col items-center justify-center p-8 bg-muted/5">
              <div className="bg-secondary/10 rounded-full p-3 mb-3">
                <ImageIcon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No media uploaded</h3>
              <p className="text-muted-foreground text-sm text-center mb-4">
                Upload images and videos to include in your content
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleFileUpload}
                  variant="outline"
                  className="border-secondary/20 hover:bg-secondary/10 gap-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  Add Images
                </Button>
                <Button
                  onClick={handleVideoUpload}
                  variant="outline"
                  className="border-secondary/20 hover:bg-secondary/10 gap-2"
                >
                  <Video className="h-4 w-4" />
                  Add Videos
                </Button>
              </div>
            </div>
          )}

          <div className="rounded-lg border p-4 bg-secondary/5 border-secondary/20 mt-4">
            <h3 className="font-medium flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-secondary" />
              AI Media Recommendations
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your content, we recommend the following types of media:
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex gap-3 p-3 rounded-md bg-background">
                <ImageIcon className="h-10 w-10 p-2 bg-secondary/10 text-secondary rounded-md" />
                <div>
                  <h4 className="font-medium">Product Images</h4>
                  <p className="text-xs text-muted-foreground">Clean, professional product shots</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-md bg-background">
                <Video className="h-10 w-10 p-2 bg-secondary/10 text-secondary rounded-md" />
                <div>
                  <h4 className="font-medium">Demo Videos</h4>
                  <p className="text-xs text-muted-foreground">Show your product in action</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="animate-in fade-in-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Content Preview</h3>
            <Button
              variant="outline"
              className="border-accent/20 hover:bg-accent/10 gap-2"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4" />
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
          </div>

          {previewMode ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-accent/10 p-3 flex items-center gap-2 border-b">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium ml-2">Instagram Post Preview</p>
              </div>
              <div className="p-6 flex flex-col items-center gap-4">
                {mediaItems.length > 0 ? (
                  <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden">
                    <img
                      src={mediaItems[0].preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-md aspect-square rounded-lg bg-accent/5 flex items-center justify-center border">
                    <ImageIcon className="h-16 w-16 text-accent/30" />
                  </div>
                )}
                <div className="w-full max-w-md space-y-4">
                  <p className="font-medium">Your awesome caption here</p>
                  <p className="text-muted-foreground">
                    This is where your generated content will appear. It will be formatted appropriately for the
                    selected platform.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">#AIContent</Badge>
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">#DigitalMarketing</Badge>
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">#ContentCreation</Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
              <div className="rounded-full bg-accent/10 p-4 mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-medium mb-2">Generate Content First</h3>
              <p className="text-center text-muted-foreground max-w-md mb-6">
                Complete the content and media sections, then generate your content to see a preview
              </p>
              <Button
                className="gap-2 bg-gradient-to-r from-accent to-purple-500 hover:from-accent/90 hover:to-purple-500/90"
                onClick={() => {}}
              >
                <Sparkles className="h-4 w-4" />
                See Preview
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center pt-4">
        <Button
          className="glow-effect w-full max-w-md text-lg gap-2 bg-gradient-to-r from-primary via-secondary to-accent hover:bg-primary-foreground"
          size="lg"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate Viral Content
            </>
          )}
        </Button>
      </div>
      
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
              <TabsList className="w-full justify-start mb-4 overflow-auto">
                {selectedPlatforms.map((platformId) => {
                  const platformIcons = {
                    instagram: <Instagram className="h-4 w-4" />,
                    twitter: <Twitter className="h-4 w-4" />,
                    facebook: <Facebook className="h-4 w-4" />,
                    linkedin: <Linkedin className="h-4 w-4" />
                  };
                  return (
                    <TabsTrigger key={platformId} value={platformId} className="gap-2">
                      {platformIcons[platformId as keyof typeof platformIcons]}
                      {platformId.charAt(0).toUpperCase() + platformId.slice(1)}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.keys(generatedContent).map((platform) => (
                <TabsContent key={platform} value={platform} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Preview Panel */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Preview</h3>
                      <div className="border rounded-lg p-4 space-y-3">
                        {generatedContent[platform]?.imageUrl && (
                          <div className="aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
                            <img
                              src={generatedContent[platform]?.imageUrl || "/placeholder.svg"}
                              alt={`${platform} content`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {generatedContent[platform]?.title && (
                          <h3 className="text-lg font-bold">{generatedContent[platform]?.title}</h3>
                        )}

                        <p className="whitespace-pre-line">{generatedContent[platform]?.text}</p>

                        {generatedContent[platform]?.hashtags && (
                          <div className="flex flex-wrap gap-2">
                            {generatedContent[platform]?.hashtags.map((tag: string) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Edit Panel */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Edit Content</h3>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={generateNewTaglines}
                            disabled={generatingTaglines}
                          >
                            {generatingTaglines ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3.5 w-3.5" />
                            )}
                            Refresh Text
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={generateNewHashtags}
                            disabled={generatingHashtags}
                          >
                            {generatingHashtags ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Hash className="h-3.5 w-3.5" />
                            )}
                            Refresh Hashtags
                          </Button>
                        </div>
                      </div>

                      {generatedContent[platform]?.title && (
                        <div className="space-y-2">
                          <Label htmlFor={`${platform}-title`}>Title</Label>
                          <Input
                            id={`${platform}-title`}
                            defaultValue={generatedContent[platform]?.title}
                            onChange={(e) => {
                              setGeneratedContent({
                                ...generatedContent,
                                [platform]: {
                                  ...generatedContent[platform],
                                  title: e.target.value,
                                },
                              })
                            }}
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor={`${platform}-text`}>Content</Label>
                        <Textarea
                          id={`${platform}-text`}
                          rows={6}
                          defaultValue={generatedContent[platform]?.text}
                          onChange={(e) => {
                            setGeneratedContent({
                              ...generatedContent,
                              [platform]: {
                                ...generatedContent[platform],
                                text: e.target.value,
                              },
                            })
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`${platform}-hashtags`}>Hashtags</Label>
                        <Input
                          id={`${platform}-hashtags`}
                          defaultValue={generatedContent[platform]?.hashtags?.join(", ")}
                          onChange={(e) => {
                            setGeneratedContent({
                              ...generatedContent,
                              [platform]: {
                                ...generatedContent[platform],
                                hashtags: e.target.value.split(",").map((tag: string) => tag.trim()),
                              },
                            })
                          }}
                        />
                        <p className="text\
