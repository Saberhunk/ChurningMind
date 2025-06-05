"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart3, Zap, Sparkles, TrendingUp, ArrowUpRight, Plus, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import RecentActivity from "@/components/recent-activity"
import PlatformIntegration from "@/components/platform-integration"
import TrendingTopics from "@/components/trending-topics"
import MetricsCards from "@/components/metrics-cards"
import { useToast } from "@/hooks/use-toast"
import { AIChatbot } from "@/components/ai-chatbot"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleQuickCreate = () => {
    setIsCreateDialogOpen(true)
  }

  const handleCreateContent = () => {
    setIsCreateDialogOpen(false)

    toast({
      title: "Content created",
      description: "Your content has been created successfully",
      type: "success",
    })

    // Navigate to content generator
    router.push("/generator")
  }

  const handleViewAnalytics = () => {
    router.push("/analytics")

    toast({
      title: "Analytics",
      description: "View detailed analytics for your content",
      type: "default",
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)

      toast({
        title: "Dashboard refreshed",
        description: "Your dashboard has been updated with the latest data",
        type: "default",
      })
    }, 1500)
  }

  return (
    <div className="content-container">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Welcome to ChurnX
              </h1>
              <p className="text-muted-foreground">Your AI-powered viral content platform dashboard</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="relative overflow-hidden"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity hover:opacity-100"></span>
              </Button>
              <Button
                className="glow-effect gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto shine"
                onClick={handleQuickCreate}
              >
                <Sparkles className="h-4 w-4" />
                Quick Create
              </Button>
            </div>
          </div>
        </div>

        {/* Hero section with animated gradient */}
        <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-1">
          <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent/20 blur-3xl"></div>
          <CardContent className="rounded-lg bg-background/80 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-primary">One-Click Viral Strategy</h2>
                <p className="max-w-md text-muted-foreground">
                  Create AI-optimized content across all platforms and drive engagement with our powerful tools.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto shine"
                    onClick={handleCreateContent}
                  >
                    <Zap className="h-4 w-4" />
                    Create Content
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 border-primary/20 hover:bg-primary/10 w-full sm:w-auto"
                    onClick={handleViewAnalytics}
                  >
                    <TrendingUp className="h-4 w-4" />
                    View Analytics
                  </Button>
                </div>
              </div>
              <div className="hidden h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 md:flex animate-pulse">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30">
                  <Sparkles className="h-14 w-14 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MetricsCards />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-1 lg:col-span-2">
                <Card className="cyberpunk-card h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl text-primary">
                      <TrendingUp className="h-5 w-5" />
                      Content Performance
                    </CardTitle>
                    <CardDescription>Monitor your content engagement across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Content metrics cards */}
                      <Card className="border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
                        <CardContent className="flex flex-col gap-2 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">257.4K</span>
                            <Badge className="bg-green-500/10 text-green-500">+18%</Badge>
                          </div>
                          <div className="h-2 w-full rounded-full bg-primary/10">
                            <div className="h-2 w-4/5 rounded-full bg-primary/50 animate-pulse"></div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-secondary/10 bg-secondary/5 hover:bg-secondary/10 transition-colors">
                        <CardContent className="flex flex-col gap-2 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">8.3%</span>
                            <Badge className="bg-green-500/10 text-green-500">+2.4%</Badge>
                          </div>
                          <div className="h-2 w-full rounded-full bg-secondary/10">
                            <div className="h-2 w-2/3 rounded-full bg-secondary/50 animate-pulse"></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-medium">Recent Activity</h3>
                      <RecentActivity />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-1">
                <TrendingTopics />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="cyberpunk-card border-secondary/20">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Platform Integration</CardTitle>
                <CardDescription>Connect your social media platforms for automated posting</CardDescription>
              </CardHeader>
              <CardContent>
                <PlatformIntegration />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="cyberpunk-card border-accent/20">
              <CardHeader>
                <CardTitle className="text-xl text-accent">This Week's Performance</CardTitle>
                <CardDescription>Engagement metrics across all platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] rounded-md border">
                  <div className="flex h-full items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Analytics visualization will appear here</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push("/analytics")}>
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Content</DialogTitle>
            <DialogDescription>Quickly create new content for your social media platforms</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select defaultValue="post">
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Social Media Post</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video Script</SelectItem>
                  <SelectItem value="meme">Meme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="platform">Platform</Label>
              <Select defaultValue="all">
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="topic">Topic</Label>
              <Input id="topic" placeholder="Enter a topic or keyword" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe what you want to create" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateContent}
              className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              <Plus className="h-4 w-4" />
              Create Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* AI Assistant */}
      <AIChatbot />
    </div>
  )
}
