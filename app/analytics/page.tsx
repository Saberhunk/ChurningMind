"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Loader2, RefreshCw, AlertCircle, TrendingUp, Users, Eye, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for analytics visualizations
const generateMockData = () => {
  // Platform performance data
  const platforms = [
    "Instagram",
    "Twitter",
    "Facebook",
    "LinkedIn",
    "TikTok",
    "Threads",
    "Snapchat",
    "Reddit",
    "Pinterest",
  ]
  const platformData = platforms.map((platform) => ({
    platform,
    views: Math.floor(Math.random() * 50000) + 10000,
    engagement: Math.floor(Math.random() * 30) + 5,
    followers: Math.floor(Math.random() * 5000) + 1000,
    growth: Math.floor(Math.random() * 20) - 5,
  }))

  // Engagement over time data (last 7 days)
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  })

  const engagementData = days.map((day) => ({
    day,
    likes: Math.floor(Math.random() * 1000) + 500,
    comments: Math.floor(Math.random() * 300) + 100,
    shares: Math.floor(Math.random() * 200) + 50,
  }))

  // Audience demographics
  const ageGroups = ["18-24", "25-34", "35-44", "45-54", "55+"]
  const demographicsData = ageGroups.map((age) => ({
    age,
    percentage: Math.floor(Math.random() * 30) + 5,
  }))

  // Sort demographics by percentage
  demographicsData.sort((a, b) => b.percentage - a.percentage)

  // Content performance data
  const contentTypes = ["Image Posts", "Video Posts", "Carousels", "Text Posts", "Stories", "Reels", "Shorts"]
  const contentData = contentTypes.map((type) => ({
    type,
    engagement: Math.floor(Math.random() * 25) + 5,
    reach: Math.floor(Math.random() * 70) + 30,
    conversion: Math.floor(Math.random() * 15) + 1,
  }))

  // Top performing content
  const topContent = [
    {
      id: 1,
      title: "10 Ways AI is Changing Social Media Marketing",
      platform: "Instagram",
      type: "Carousel",
      views: 24500,
      engagement: 8.7,
      date: "2 days ago",
    },
    {
      id: 2,
      title: "The Future of Digital Marketing in 2023",
      platform: "LinkedIn",
      type: "Article",
      views: 18200,
      engagement: 6.2,
      date: "5 days ago",
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Product Development",
      platform: "TikTok",
      type: "Video",
      views: 35800,
      engagement: 12.3,
      date: "1 day ago",
    },
    {
      id: 4,
      title: "Customer Success Story: How Company X Grew 300%",
      platform: "Twitter",
      type: "Thread",
      views: 15600,
      engagement: 5.8,
      date: "3 days ago",
    },
    {
      id: 5,
      title: "5 Trending Topics in Tech This Week",
      platform: "Reddit",
      type: "Discussion",
      views: 22300,
      engagement: 9.4,
      date: "4 days ago",
    },
    {
      id: 6,
      title: "New Product Launch Sneak Peek",
      platform: "Snapchat",
      type: "Story",
      views: 19700,
      engagement: 7.1,
      date: "2 days ago",
    },
  ]

  // Sentiment analysis data
  const sentimentData = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ]

  // Competitor comparison
  const competitorData = [
    { name: "Your Brand", followers: 45000, engagement: 8.3, growth: 12 },
    { name: "Competitor A", followers: 62000, engagement: 6.7, growth: 8 },
    { name: "Competitor B", followers: 38000, engagement: 7.2, growth: 15 },
    { name: "Competitor C", followers: 51000, engagement: 5.9, growth: 6 },
  ]

  return {
    platforms: platformData,
    engagement: engagementData,
    demographics: demographicsData,
    content: contentData,
    topContent: topContent,
    sentiment: sentimentData,
    competitors: competitorData,
    totalViews: 257400,
    totalEngagement: 8.3,
    totalFollowers: 124500,
    totalGrowth: 18,
  }
}

// Platform colors
const PLATFORM_COLORS = {
  Instagram: "#E1306C",
  Twitter: "#1DA1F2",
  Facebook: "#4267B2",
  LinkedIn: "#0077B5",
  TikTok: "#000000",
  YouTube: "#FF0000",
  Threads: "#000000",
  Snapchat: "#FFFC00",
  Reddit: "#FF4500",
  Pinterest: "#E60023",
}

// Sentiment colors
const SENTIMENT_COLORS = ["#4ade80", "#94a3b8", "#f87171"]

export default function AnalyticsPage() {
  const [data, setData] = useState(generateMockData())
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      const newData = generateMockData()
      setData(newData)
      setIsLoading(false)

      toast({
        title: "Analytics refreshed",
        description: "Your analytics data has been updated with the latest information.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">Track your content performance across all platforms</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="threads">Threads</SelectItem>
              <SelectItem value="snapchat">Snapchat</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
              <SelectItem value="pinterest">Pinterest</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2" onClick={refreshData} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Eye className="h-4 w-4" /> Total Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">
                    {isLoading ? "..." : `${(data.totalViews / 1000).toFixed(1)}K`}
                  </div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    {isLoading ? "..." : `${data.totalGrowth}%`}
                  </div>
                </div>
                <div className="mt-4 h-[80px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.engagement}>
                        <Bar dataKey="likes" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Engagement Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">{isLoading ? "..." : `${data.totalEngagement}%`}</div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    2.4%
                  </div>
                </div>
                <div className="mt-4 h-[80px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.engagement}>
                        <Line type="monotone" dataKey="comments" stroke="#10b981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Total Followers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">
                    {isLoading ? "..." : `${(data.totalFollowers / 1000).toFixed(1)}K`}
                  </div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    5.2%
                  </div>
                </div>
                <div className="mt-4 h-[80px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {data.platforms.slice(0, 3).map((platform, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span>{platform.platform}</span>
                          <span>{(platform.followers / 1000).toFixed(1)}K</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">{isLoading ? "..." : "65%"}</div>
                  <div className="flex items-center text-green-500 text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    3.1%
                  </div>
                </div>
                <div className="mt-4 h-[80px]">
                  {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.sentiment}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {data.sentiment.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="col-span-1 bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Views and engagement by platform</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.platforms}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 70,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="platform"
                          stroke="#888"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: "4px",
                          }}
                        />
                        <Bar dataKey="views" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-1 bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.demographics}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="percentage"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {data.demographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best performing content across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[200px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-4">
                  {data.topContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                PLATFORM_COLORS[content.platform as keyof typeof PLATFORM_COLORS] || "#888",
                            }}
                          ></div>
                          <span className="text-sm text-muted-foreground">{content.platform}</span>
                          <Badge variant="outline" className="ml-2">
                            {content.type}
                          </Badge>
                        </div>
                        <h3 className="font-medium mt-1">{content.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">{content.views.toLocaleString()} views</span>
                          <span className="text-sm text-muted-foreground">{content.engagement}% engagement</span>
                          <span className="text-sm text-muted-foreground">{content.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Boost
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Detailed engagement analytics</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={data.engagement}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="day" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="likes" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
                        <Line
                          type="monotone"
                          dataKey="comments"
                          stroke="#10b981"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="shares" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Likes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.engagement.reduce((sum, item) => sum + item.likes, 0).toLocaleString()}
                        </div>
                        <Progress value={75} className="h-2 mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Comments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.engagement.reduce((sum, item) => sum + item.comments, 0).toLocaleString()}
                        </div>
                        <Progress value={62} className="h-2 mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Shares</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {data.engagement.reduce((sum, item) => sum + item.shares, 0).toLocaleString()}
                        </div>
                        <Progress value={48} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Platform Engagement Breakdown</h3>
                    <div className="space-y-3">
                      {data.platforms.map((platform, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{platform.platform}</span>
                            <span className="text-sm">{platform.engagement}% engagement rate</span>
                          </div>
                          <Progress value={platform.engagement * 3} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>Detailed audience analytics</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="h-[400px] grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.demographics}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="percentage"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {data.demographics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 60%)`} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1a1a1a",
                              border: "1px solid #333",
                              borderRadius: "4px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Top Locations</h3>
                    <div className="space-y-4">
                      {["United States", "India", "United Kingdom", "Canada", "Australia"].map((country, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{country}</span>
                          <div className="w-[60%] bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${80 - index * 15}%` }} />
                          </div>
                          <span className="text-sm">{80 - index * 15}%</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-lg font-medium mb-4 mt-8">Active Hours</h3>
                    <div className="grid grid-cols-12 gap-1 h-20">
                      {Array.from({ length: 24 }).map((_, index) => {
                        const height = Math.floor(Math.random() * 80) + 20
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div className="w-full bg-primary/60 rounded-t-sm" style={{ height: `${height}%` }}></div>
                            {index % 6 === 0 && <span className="text-[10px] text-muted-foreground mt-1">{index}</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Detailed content analytics</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="h-[300px]">
                    <h3 className="text-lg font-medium mb-4">Performance by Content Type</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.content}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 70,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis
                          dataKey="type"
                          stroke="#888"
                          angle={-45}
                          textAnchor="end"
                          height={70}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: "4px",
                          }}
                        />
                        <Bar dataKey="engagement" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Best Performing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500">Video Posts</Badge>
                          <span className="text-sm text-muted-foreground">12.3% engagement</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>Videos receive 2.4x more engagement than other content types</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-500">Text Posts</Badge>
                          <span className="text-sm text-muted-foreground">3.1% engagement</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>Consider adding visuals to improve engagement rates</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Recommendation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Increase video content</span>
                        </div>
                        <div className="mt-2 text-sm">
                          <p>Aim for 40% video content in your content mix</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Conversion Rates</h3>
                    <div className="space-y-3">
                      {data.content.map((content, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{content.type}</span>
                            <span className="text-sm">{content.conversion}% conversion rate</span>
                          </div>
                          <Progress value={content.conversion * 5} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="competitors">
          <Card className="bg-card hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>Compare your performance with competitors</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-[400px] flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.competitors}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 10,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1a1a1a",
                            border: "1px solid #333",
                            borderRadius: "4px",
                          }}
                        />
                        <Legend />
                        <Bar name="Followers (K)" dataKey="followers" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        <Bar name="Engagement (%)" dataKey="engagement" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar name="Growth (%)" dataKey="growth" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Competitive Strengths & Weaknesses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Your Strengths</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 list-disc pl-5">
                            <li>Higher engagement rate than 2 competitors</li>
                            <li>Fastest growing audience (18% growth)</li>
                            <li>Better video content performance</li>
                            <li>Higher comment-to-like ratio</li>
                          </ul>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Areas to Improve</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 list-disc pl-5">
                            <li>Lower total follower count than Competitor A</li>
                            <li>Less consistent posting schedule</li>
                            <li>Fewer collaborations with influencers</li>
                            <li>Lower reach on text-based content</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Content Strategy Comparison</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Brand</th>
                            <th className="text-left py-2 px-4">Post Frequency</th>
                            <th className="text-left py-2 px-4">Top Content Type</th>
                            <th className="text-left py-2 px-4">Avg. Response Time</th>
                            <th className="text-left py-2 px-4">Hashtag Strategy</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Your Brand</td>
                            <td className="py-2 px-4">5 posts/week</td>
                            <td className="py-2 px-4">Video (45%)</td>
                            <td className="py-2 px-4">3.2 hours</td>
                            <td className="py-2 px-4">5-7 targeted hashtags</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Competitor A</td>
                            <td className="py-2 px-4">7 posts/week</td>
                            <td className="py-2 px-4">Carousel (52%)</td>
                            <td className="py-2 px-4">1.8 hours</td>
                            <td className="py-2 px-4">10+ broad hashtags</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Competitor B</td>
                            <td className="py-2 px-4">4 posts/week</td>
                            <td className="py-2 px-4">Video (38%)</td>
                            <td className="py-2 px-4">5.5 hours</td>
                            <td className="py-2 px-4">3-5 niche hashtags</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">Competitor C</td>
                            <td className="py-2 px-4">6 posts/week</td>
                            <td className="py-2 px-4">Image (60%)</td>
                            <td className="py-2 px-4">2.4 hours</td>
                            <td className="py-2 px-4">Mix of trending & branded</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
