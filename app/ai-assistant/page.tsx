"use client"

import { useState } from "react"
import { Bot, Sparkles, FileText, ImageIcon, Video, Music, Code, Upload, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function AIAssistantPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  const handleGenerate = () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGeneratedContent(null)

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)

      // Sample responses based on the active tab
      const responses: Record<string, string> = {
        chat: "Based on your request, I recommend focusing on short-form video content for Instagram and TikTok. The current trends show that videos under 30 seconds with quick transitions and bold text overlays are performing exceptionally well. Would you like me to generate some specific content ideas for these platforms?",
        text: "# Viral Content Strategy for Q2\n\n## Platform Focus\n- Instagram: Short-form Reels with trending audio\n- TikTok: Challenge-based content with branded hashtag\n- LinkedIn: Thought leadership articles with data visualization\n\n## Content Themes\n1. Behind-the-scenes of product development\n2. Customer success stories with emotional hooks\n3. Industry trend analysis with actionable takeaways\n\n## Call-to-Action Strategy\nImplement a tiered CTA approach:\n- Soft CTA: Like and comment\n- Medium CTA: Share with a friend\n- Hard CTA: Visit landing page for exclusive content",
        image:
          "I've analyzed current visual trends and created a mood board for your campaign. The dominant colors should be teal, coral, and neutral tones. Use bold typography with sans-serif fonts for headlines and script fonts for accents. Incorporate organic shapes and subtle gradients for background elements.",
        video:
          "Your video strategy should focus on 3 key formats:\n\n1. 15-second hook videos for Instagram/TikTok\n2. 60-second storytelling videos for Facebook/LinkedIn\n3. 5-minute deep dives for YouTube\n\nMaintain consistent intro/outro animations and use dynamic text overlays to emphasize key points. Vertical aspect ratio (9:16) should be prioritized for most content.",
      }

      setGeneratedContent(responses[activeTab] || responses.chat)
    }, 2000)
  }

  const capabilities = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Content Creation",
      description: "Generate blog posts, social media captions, and ad copy",
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Image Prompts",
      description: "Create detailed prompts for AI image generation",
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: "Video Scripts",
      description: "Write engaging scripts for various video formats",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Campaign Ideas",
      description: "Generate viral marketing campaign concepts",
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "SEO Optimization",
      description: "Optimize content for search engines",
    },
    {
      icon: <Music className="h-5 w-5" />,
      title: "Trend Analysis",
      description: "Identify trending topics and hashtags",
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl space-y-6 pb-16">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">Your personal AI assistant for content creation and marketing strategy</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>ChurnX AI Assistant</CardTitle>
              <CardDescription>
                Ask me anything about content creation, marketing, or social media strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b px-6">
                  <TabsList className="w-full justify-start rounded-none border-b-0 bg-transparent p-0">
                    <TabsTrigger
                      value="chat"
                      className="relative rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Chat
                    </TabsTrigger>
                    <TabsTrigger
                      value="text"
                      className="relative rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Text
                    </TabsTrigger>
                    <TabsTrigger
                      value="image"
                      className="relative rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Image
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className="relative rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Video
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <Label htmlFor="prompt">What can I help you with today?</Label>
                    <Textarea
                      id="prompt"
                      placeholder={
                        activeTab === "chat"
                          ? "Ask me anything about content creation or marketing strategy..."
                          : activeTab === "text"
                            ? "Describe the text content you'd like me to generate..."
                            : activeTab === "image"
                              ? "Describe the image concept you'd like me to help with..."
                              : "Describe the video content you'd like me to script..."
                      }
                      className="mt-2 min-h-[120px] resize-none"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>

                  {activeTab !== "chat" && (
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tone">Tone</Label>
                        <Input id="tone" placeholder="Professional, Casual, Humorous..." className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="platform">Platform</Label>
                        <Input id="platform" placeholder="Instagram, TikTok, LinkedIn..." className="mt-2" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button type="button" variant="outline" size="icon" className="h-9 w-9">
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload file</span>
                      </Button>
                      <span className="text-xs text-muted-foreground">Upload files to provide context</span>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {generatedContent && (
                  <div className="border-t px-6 py-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">AI Response</h3>
                      </div>
                      <Badge variant="outline" className="bg-green-50">
                        Marketing Campaign Ready
                      </Badge>
                    </div>
                    <ScrollArea className="h-[300px] rounded-md border p-4">
                      <div className="whitespace-pre-wrap">{generatedContent}</div>

                      {activeTab === "chat" && (
                        <div className="mt-6 border-t pt-4">
                          <h4 className="font-medium text-primary mb-2">Marketing Campaign Generator</h4>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="p-3 border rounded-md bg-muted/20">
                                <h5 className="font-medium text-sm mb-1">Campaign Overview</h5>
                                <p className="text-xs text-muted-foreground">
                                  "Summer Product Launch" - A multi-platform campaign to introduce your new product line
                                  with engaging content across Instagram, TikTok, and Facebook.
                                </p>
                              </div>
                              <div className="p-3 border rounded-md bg-muted/20">
                                <h5 className="font-medium text-sm mb-1">Target Audience</h5>
                                <p className="text-xs text-muted-foreground">
                                  18-35 year olds interested in technology, innovation, and early adoption. Urban
                                  demographics with disposable income.
                                </p>
                              </div>
                              <div className="p-3 border rounded-md bg-muted/20">
                                <h5 className="font-medium text-sm mb-1">Content Strategy</h5>
                                <p className="text-xs text-muted-foreground">
                                  Mix of product showcase videos, user testimonials, behind-the-scenes content, and
                                  interactive polls/quizzes.
                                </p>
                              </div>
                              <div className="p-3 border rounded-md bg-muted/20">
                                <h5 className="font-medium text-sm mb-1">Ad Budget Allocation</h5>
                                <p className="text-xs text-muted-foreground">
                                  Total: $2,500 - Instagram (40%), TikTok (35%), Facebook (25%). Focus on video ads and
                                  story promotions.
                                </p>
                              </div>
                            </div>

                            <div className="border rounded-md p-3">
                              <h5 className="font-medium text-sm mb-2">Campaign Timeline</h5>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                                  <span className="text-xs font-medium">Week 1-2:</span>
                                  <span className="text-xs text-muted-foreground">
                                    Teaser content and audience building
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                  <span className="text-xs font-medium">Week 3:</span>
                                  <span className="text-xs text-muted-foreground">
                                    Product launch and main campaign push
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                                  <span className="text-xs font-medium">Week 4-6:</span>
                                  <span className="text-xs text-muted-foreground">
                                    User-generated content and testimonials
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                                  <span className="text-xs font-medium">Week 7-8:</span>
                                  <span className="text-xs text-muted-foreground">Promotion and special offers</span>
                                </div>
                              </div>
                            </div>

                            <div className="border rounded-md p-3">
                              <h5 className="font-medium text-sm mb-2">Content Examples</h5>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div className="space-y-1">
                                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                    Instagram Post
                                  </div>
                                  <p className="text-xs">Product showcase with lifestyle context</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                    TikTok Video
                                  </div>
                                  <p className="text-xs">15-sec demo with trending audio</p>
                                </div>
                                <div className="space-y-1">
                                  <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                                    Facebook Ad
                                  </div>
                                  <p className="text-xs">Carousel showing product features</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Copy Response
                      </Button>
                      <Button variant="outline" size="sm">
                        Save to Library
                      </Button>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                      <Button size="sm" className="ml-auto gap-1">
                        <Sparkles className="h-3 w-3" />
                        Create Campaign
                      </Button>
                    </div>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>Explore what our AI assistant can do for you</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {capability.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{capability.title}</h3>
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Capabilities
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Prompts</CardTitle>
              <CardDescription>Your recently used AI prompts</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {[
                "Generate a viral Instagram post about sustainable fashion",
                "Create a content calendar for product launch",
                "Write a LinkedIn article about AI in marketing",
                "Suggest hashtags for fitness campaign",
              ].map((prompt, index) => (
                <div
                  key={index}
                  className="flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-accent/10"
                >
                  <p className="text-sm">{prompt}</p>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {index === 0 || index === 3 ? "Text" : index === 1 ? "Strategy" : "Article"}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View Prompt History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
