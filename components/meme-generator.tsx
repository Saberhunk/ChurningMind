"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Loader2, Download, RefreshCw, Zap, Check, Video, Upload, Sparkles, Trash, Pin, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

// Meme templates
const MEME_TEMPLATES = [
  {
    id: "drake",
    name: "Drake Hotline Bling",
    url: "https://i.imgflip.com/30b1gx.jpg",
    width: 1200,
    height: 1200,
    thumbnail: "https://i.imgflip.com/30b1gx.jpg",
  },
  {
    id: "distracted",
    name: "Distracted Boyfriend",
    url: "https://i.imgflip.com/1ur9b0.jpg",
    width: 1200,
    height: 800,
    thumbnail: "https://i.imgflip.com/1ur9b0.jpg",
  },
  {
    id: "buttons",
    name: "Two Buttons",
    url: "https://i.imgflip.com/1g8my4.jpg",
    width: 600,
    height: 908,
    thumbnail: "https://i.imgflip.com/1g8my4.jpg",
  },
  {
    id: "change-mind",
    name: "Change My Mind",
    url: "https://i.imgflip.com/24y43o.jpg",
    width: 482,
    height: 361,
    thumbnail: "https://i.imgflip.com/24y43o.jpg",
  },
  {
    id: "doge",
    name: "Doge",
    url: "https://i.imgflip.com/4t0m5.jpg",
    width: 620,
    height: 620,
    thumbnail: "https://i.imgflip.com/4t0m5.jpg",
  },
  {
    id: "disaster-girl",
    name: "Disaster Girl",
    url: "https://i.imgflip.com/23ls.jpg",
    width: 500,
    height: 375,
    thumbnail: "https://i.imgflip.com/23ls.jpg",
  },
]

// Taglines and hashtags for memes
const MEME_TAGLINES = [
  {
    text: "When the code finally works after 5 hours of debugging",
    hashtags: ["#CodingLife", "#ProgrammerHumor", "#ItWorks", "#TechMemes"],
  },
  {
    text: "Me explaining to my boss why the project is delayed",
    hashtags: ["#WorkLife", "#ProjectManagement", "#DeadlineMissed", "#TechHumor"],
  },
  {
    text: "Nobody: \nMe at 3AM debugging my code:",
    hashtags: ["#NightOwl", "#Debugging", "#CodingProblems", "#TechLife"],
  },
  {
    text: "When you find a solution on Stack Overflow",
    hashtags: ["#StackOverflow", "#CodingSavior", "#DeveloperLife", "#TechMemes"],
  },
  {
    text: "My brain during a job interview vs. my brain at work",
    hashtags: ["#JobInterview", "#WorkReality", "#TechJobs", "#ProgrammerLife"],
  },
]

export default function MemeGenerator() {
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generationSuccess, setGenerationSuccess] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [topText, setTopText] = useState("WHEN YOU FINALLY")
  const [bottomText, setBottomText] = useState("FINISH YOUR CODE")
  const [fontSize, setFontSize] = useState(36)
  const [textColor, setTextColor] = useState("#FFFFFF")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [template, setTemplate] = useState(MEME_TEMPLATES[0].url)
  const [font, setFont] = useState("Impact")
  const [selectedTemplate, setSelectedTemplate] = useState(0)
  const [showVideoEnhancer, setShowVideoEnhancer] = useState(false)
  const [videoProcessing, setVideoProcessing] = useState(false)
  const [videoEnhanced, setVideoEnhanced] = useState(false)
  const [pinnedVideos, setPinnedVideos] = useState<string[]>([])
  const [uploadedVideos, setUploadedVideos] = useState([
    { id: "v1", name: "funny-reaction.mp4", thumbnail: "https://i.imgflip.com/30b1gx.jpg" },
    { id: "v2", name: "meme-compilation.mp4", thumbnail: "https://i.imgflip.com/1ur9b0.jpg" },
  ])
  const [uploadedImages, setUploadedImages] = useState<any[]>([])
  const [tagline, setTagline] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [allTemplates, setAllTemplates] = useState(MEME_TEMPLATES)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    renderMeme()
  }, [topText, bottomText, fontSize, textColor, strokeColor, strokeWidth, template, font])

  const renderMeme = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setLoading(true)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Load template image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Resize canvas to match image dimensions with max size constraints
      const maxWidth = 500
      const maxHeight = 500
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (maxWidth / width) * height
        width = maxWidth
      }

      if (height > maxHeight) {
        width = (maxHeight / height) * width
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      // Draw image
      ctx.drawImage(img, 0, 0, width, height)

      // Set text style
      ctx.font = `${fontSize}px ${font}`
      ctx.textAlign = "center"
      ctx.fillStyle = textColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = strokeWidth

      // Draw top text
      if (topText) {
        const lines = wrapText(ctx, topText, width - 20, fontSize)
        lines.forEach((line, i) => {
          const y = 20 + (i + 1) * fontSize
          ctx.strokeText(line, width / 2, y)
          ctx.fillText(line, width / 2, y)
        })
      }

      // Draw bottom text
      if (bottomText) {
        const lines = wrapText(ctx, bottomText, width - 20, fontSize)
        lines.forEach((line, i) => {
          const y = height - 20 - (lines.length - i - 1) * fontSize
          ctx.strokeText(line, width / 2, y)
          ctx.fillText(line, width / 2, y)
        })
      }

      setLoading(false)
    }
    img.onerror = () => {
      // Draw fallback placeholder on error
      ctx.fillStyle = "#f0f0f0"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#333333"
      ctx.font = "24px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Meme template not available", canvas.width / 2, canvas.height / 2)
      setLoading(false)

      toast({
        title: "Error loading template",
        description: "Could not load the selected template. Please try another one.",
        type: "error",
      })
    }
    img.src = template
  }

  // Function to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number) => {
    const words = text.split(" ")
    const lines = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + " " + word).width
      if (width < maxWidth) {
        currentLine += " " + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  const handleGenerateAI = () => {
    setGenerating(true)

    // Generate random meme content
    setTimeout(() => {
      // Select random template
      const randomTemplateIndex = Math.floor(Math.random() * allTemplates.length)

      // Select random tagline
      const randomTaglineIndex = Math.floor(Math.random() * MEME_TAGLINES.length)
      const randomTagline = MEME_TAGLINES[randomTaglineIndex]

      // Split tagline into top and bottom text if it contains a newline
      const textParts = randomTagline.text.split("\n")
      const newTopText = textParts[0].toUpperCase()
      const newBottomText = textParts.length > 1 ? textParts[1].toUpperCase() : ""

      // Update state
      setSelectedTemplate(randomTemplateIndex)
      setTemplate(allTemplates[randomTemplateIndex].url)
      setTopText(newTopText)
      setBottomText(newBottomText)
      setTagline(randomTagline.text)
      setHashtags(randomTagline.hashtags)

      // Random style changes
      setFontSize(Math.floor(Math.random() * 20) + 30) // 30-50

      const colors = ["#FFFFFF", "#FFFF00", "#00FFFF", "#FF00FF"]
      setTextColor(colors[Math.floor(Math.random() * colors.length)])

      setGenerating(false)
      setGenerationSuccess(true)

      toast({
        title: "Meme generated!",
        description: "Your AI-powered meme has been created with optimal viral potential.",
        type: "success",
      })

      // Reset success state after 3 seconds
      setTimeout(() => {
        setGenerationSuccess(false)
      }, 3000)
    }, 2000)
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "churnx-meme.png"
    link.href = canvas.toDataURL("image/png")
    link.click()

    setDownloadSuccess(true)

    toast({
      title: "Meme downloaded!",
      description: "Your meme has been downloaded successfully.",
      type: "success",
    })

    // Reset success state after 3 seconds
    setTimeout(() => {
      setDownloadSuccess(false)
    }, 3000)
  }

  const handleTemplateSelect = (index: number) => {
    setSelectedTemplate(index)
    setTemplate(allTemplates[index].url)
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file)
      return {
        id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        url,
        file,
      }
    })

    setUploadedImages([...uploadedImages, ...newImages])

    // Add uploaded images to templates
    const newTemplates = newImages.map((img, index) => ({
      id: `custom-${img.id}`,
      name: `Custom ${uploadedImages.length + index + 1}`,
      url: img.url,
      width: 500,
      height: 500,
      thumbnail: img.url,
    }))

    setAllTemplates([...allTemplates, ...newTemplates])

    toast({
      title: "Images uploaded",
      description: `${newImages.length} image(s) have been uploaded successfully.`,
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

    const newVideos = Array.from(files).map((file) => {
      return {
        id: `v${uploadedVideos.length + Math.floor(Math.random() * 1000)}`,
        name: file.name,
        thumbnail: URL.createObjectURL(file),
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        file,
      }
    })

    setUploadedVideos([...uploadedVideos, ...newVideos])

    toast({
      title: "Videos uploaded",
      description: `${newVideos.length} video(s) have been uploaded successfully.`,
      type: "success",
    })

    // Reset file input
    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  const togglePinVideo = (id: string) => {
    if (pinnedVideos.includes(id)) {
      setPinnedVideos((prev) => prev.filter((videoId) => videoId !== id))
    } else {
      setPinnedVideos((prev) => [...prev, id])
    }
  }

  const handleEnhanceVideo = () => {
    if (pinnedVideos.length === 0) {
      toast({
        title: "No videos selected",
        description: "Please pin at least one video to enhance.",
        type: "error",
      })
      return
    }

    setVideoProcessing(true)

    // Simulate video processing
    setTimeout(() => {
      setVideoProcessing(false)
      setVideoEnhanced(true)

      toast({
        title: "Videos enhanced",
        description: `${pinnedVideos.length} video(s) have been enhanced with AI.`,
        type: "success",
      })

      // Reset success state after 5 seconds
      setTimeout(() => {
        setVideoEnhanced(false)
      }, 5000)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="meme" className="w-full">
        <TabsList className="w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
          <TabsTrigger
            value="meme"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-secondary/30"
          >
            Meme Generator
          </TabsTrigger>
          <TabsTrigger
            value="video"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-accent/30"
          >
            Video Enhancer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meme" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-center">
                <div className="relative">
                  <canvas ref={canvasRef} width={500} height={500} className="rounded-md border bg-black shadow-lg" />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tagline and hashtags */}
              {tagline && (
                <div className="mt-4 p-3 border rounded-md">
                  <p className="font-medium text-sm">{tagline}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-4">
                <Button
                  className={`glow-effect relative overflow-hidden ${downloadSuccess ? "bg-green-600" : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"}`}
                  onClick={handleDownload}
                  disabled={downloadSuccess}
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Meme
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <Tabs defaultValue="text" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
                  <TabsTrigger
                    value="text"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-secondary/30"
                  >
                    Text
                  </TabsTrigger>
                  <TabsTrigger
                    value="style"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-accent/30"
                  >
                    Style
                  </TabsTrigger>
                  <TabsTrigger
                    value="template"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/30 data-[state=active]:to-primary/30"
                  >
                    Template
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="top-text" className="text-sm font-medium">
                      Top Text
                    </label>
                    <Input
                      id="top-text"
                      value={topText}
                      onChange={(e) => setTopText(e.target.value.toUpperCase())}
                      placeholder="Top text"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="bottom-text" className="text-sm font-medium">
                      Bottom Text
                    </label>
                    <Input
                      id="bottom-text"
                      value={bottomText}
                      onChange={(e) => setBottomText(e.target.value.toUpperCase())}
                      placeholder="Bottom text"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>
                  <Button
                    className={`w-full relative overflow-hidden ${generationSuccess ? "bg-green-600" : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"}`}
                    onClick={handleGenerateAI}
                    disabled={generating || generationSuccess}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : generationSuccess ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Generated!
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Generate AI Text
                      </>
                    )}
                  </Button>
                </TabsContent>
                <TabsContent value="style" className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="font-size" className="text-sm font-medium">
                      Font Size: {fontSize}px
                    </label>
                    <Slider
                      id="font-size"
                      min={20}
                      max={60}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="[&>span]:bg-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="font-family" className="text-sm font-medium">
                      Font Family
                    </label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger id="font-family" className="border-primary/20 focus:border-primary">
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Impact">Impact</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="text-color" className="text-sm font-medium">
                        Text Color
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md border" style={{ backgroundColor: textColor }} />
                        <Input
                          id="text-color"
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="h-10 w-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="stroke-color" className="text-sm font-medium">
                        Stroke Color
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md border" style={{ backgroundColor: strokeColor }} />
                        <Input
                          id="stroke-color"
                          type="color"
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="h-10 w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="stroke-width" className="text-sm font-medium">
                      Stroke Width: {strokeWidth}px
                    </label>
                    <Slider
                      id="stroke-width"
                      min={0}
                      max={5}
                      step={0.5}
                      value={[strokeWidth]}
                      onValueChange={(value) => setStrokeWidth(value[0])}
                      className="[&>span]:bg-secondary"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="template" className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {allTemplates.map((temp, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-md cursor-pointer border-2 transition-all ${selectedTemplate === index ? "border-primary scale-105" : "border-transparent opacity-70 hover:opacity-100"}`}
                        onClick={() => handleTemplateSelect(index)}
                      >
                        <img
                          src={temp.thumbnail || "/placeholder.svg"}
                          alt={`Template ${index + 1}`}
                          className="h-full w-full object-cover rounded-sm"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="template-url" className="text-sm font-medium">
                      Template URL
                    </label>
                    <Input
                      id="template-url"
                      value={template}
                      onChange={(e) => setTemplate(e.target.value)}
                      placeholder="Enter image URL"
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Template</label>
                    <div
                      className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all"
                      onClick={handleImageUpload}
                    >
                      <div className="flex flex-col items-center gap-1 text-center">
                        <p className="text-sm text-muted-foreground">Drag and drop image here or click to browse</p>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                          multiple
                        />
                        <Button variant="outline" size="sm" className="mt-2 border-primary/20">
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Your Uploaded Images</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {uploadedImages.map((img, index) => (
                          <div
                            key={img.id}
                            className="aspect-square rounded-md cursor-pointer border hover:border-primary"
                            onClick={() => setTemplate(img.url)}
                          >
                            <img
                              src={img.url || "/placeholder.svg"}
                              alt={img.name}
                              className="h-full w-full object-cover rounded-sm"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full border-primary/20 hover:bg-primary/10"
                    onClick={renderMeme}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Template
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-secondary">Video Enhancement</h3>
            <Button
              variant="outline"
              className="border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
              onClick={handleVideoUpload}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Video
            </Button>
            <input
              type="file"
              ref={videoInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleVideoChange}
              multiple
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {uploadedVideos.map((video) => (
              <Card
                key={video.id}
                className={`overflow-hidden transition-all ${pinnedVideos.includes(video.id) ? "border-secondary/50 bg-secondary/5" : "hover:border-secondary/30 hover:bg-secondary/5"}`}
              >
                <div className="relative aspect-video overflow-hidden mb-3">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.name}
                    className="h-full w-full object-cover"
                  />
                  {videoEnhanced && pinnedVideos.includes(video.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Badge className="bg-green-500">AI Enhanced</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-black/60 text-white border-none">
                      {video.size || "Video"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{video.name}</p>
                      <p className="text-xs text-muted-foreground">00:15 • 720p</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-secondary"
                        onClick={() => togglePinVideo(video.id)}
                      >
                        <Pin
                          className={`h-4 w-4 ${pinnedVideos.includes(video.id) && "fill-secondary text-secondary"}`}
                        />
                        <span className="sr-only">{pinnedVideos.includes(video.id) ? "Unpin" : "Pin"}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setUploadedVideos(uploadedVideos.filter((v) => v.id !== video.id))}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {uploadedVideos.length === 0 && (
            <div
              className="flex h-40 cursor-pointer items-center justify-center rounded-md border border-dashed border-secondary/30 bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 transition-all"
              onClick={handleVideoUpload}
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <Video className="h-8 w-8 text-secondary/50 mb-2" />
                <p className="text-sm text-muted-foreground">No videos uploaded yet</p>
                <p className="text-xs text-muted-foreground">Upload videos to enhance them with AI</p>
                <Button variant="outline" size="sm" className="mt-2 border-secondary/20">
                  Upload Video
                </Button>
              </div>
            </div>
          )}

          {uploadedVideos.length > 0 && (
            <div className="space-y-4 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  <h3 className="text-lg font-medium text-secondary">AI Video Enhancement</h3>
                </div>
                <Badge className="bg-secondary/20 text-secondary">{pinnedVideos.length} video(s) selected</Badge>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="resolution" className="text-sm font-medium">
                        Resolution Enhancement
                      </label>
                      <Switch id="resolution" defaultChecked />
                    </div>
                    <Select defaultValue="720p">
                      <SelectTrigger className="border-secondary/20">
                        <SelectValue placeholder="Select resolution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="720p">720p</SelectItem>
                        <SelectItem value="1080p">1080p</SelectItem>
                        <SelectItem value="4k">4K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="stabilization" className="text-sm font-medium">
                        Video Stabilization
                      </label>
                      <Switch id="stabilization" defaultChecked />
                    </div>
                    <Select defaultValue="medium">
                      <SelectTrigger className="border-secondary/20">
                        <SelectValue placeholder="Select stabilization level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="noise-reduction" className="text-sm font-medium">
                        Noise Reduction
                      </label>
                      <Switch id="noise-reduction" />
                    </div>
                    <Slider
                      id="noise-reduction"
                      min={0}
                      max={100}
                      step={10}
                      defaultValue={[50]}
                      className="[&>span]:bg-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="color-correction" className="text-sm font-medium">
                        Color Correction
                      </label>
                      <Switch id="color-correction" defaultChecked />
                    </div>
                    <Slider
                      id="color-correction"
                      min={0}
                      max={100}
                      step={10}
                      defaultValue={[70]}
                      className="[&>span]:bg-secondary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="frame-interpolation" className="text-sm font-medium">
                      Frame Interpolation (Smoother Motion)
                    </label>
                    <Switch id="frame-interpolation" defaultChecked />
                  </div>
                  <Select defaultValue="2x">
                    <SelectTrigger className="border-secondary/20">
                      <SelectValue placeholder="Select frame rate multiplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.5x">1.5x (36fps from 24fps)</SelectItem>
                      <SelectItem value="2x">2x (48fps from 24fps)</SelectItem>
                      <SelectItem value="4x">4x (96fps from 24fps)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
                  onClick={handleEnhanceVideo}
                  disabled={videoProcessing || videoEnhanced || pinnedVideos.length === 0}
                >
                  {videoProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : videoEnhanced ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Enhanced
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Enhance Selected Videos
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
