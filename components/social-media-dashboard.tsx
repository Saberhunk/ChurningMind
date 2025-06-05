"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Users, MessageSquare, Eye } from "lucide-react"

// Sample data for the charts
const engagementData = [
  { name: "Instagram", followers: 12500, engagement: 3.8, reach: 45000, posts: 28 },
  { name: "Twitter", followers: 8200, engagement: 2.1, reach: 32000, posts: 42 },
  { name: "Facebook", followers: 15800, engagement: 1.5, reach: 38000, posts: 22 },
  { name: "LinkedIn", followers: 5400, engagement: 4.2, reach: 18000, posts: 15 },
  { name: "TikTok", followers: 22000, engagement: 5.7, reach: 120000, posts: 35 },
  { name: "YouTube", followers: 3800, engagement: 6.3, reach: 28000, posts: 8 },
]

const weeklyData = [
  { day: "Mon", instagram: 1200, twitter: 800, facebook: 1500, linkedin: 600, tiktok: 2200, youtube: 400 },
  { day: "Tue", instagram: 1400, twitter: 1000, facebook: 1300, linkedin: 700, tiktok: 2500, youtube: 450 },
  { day: "Wed", instagram: 1800, twitter: 1200, facebook: 1600, linkedin: 900, tiktok: 3000, youtube: 600 },
  { day: "Thu", instagram: 1600, twitter: 900, facebook: 1400, linkedin: 800, tiktok: 2800, youtube: 550 },
  { day: "Fri", instagram: 2000, twitter: 1300, facebook: 1800, linkedin: 1000, tiktok: 3200, youtube: 700 },
  { day: "Sat", instagram: 2400, twitter: 1500, facebook: 2000, linkedin: 1200, tiktok: 3800, youtube: 850 },
  { day: "Sun", instagram: 1900, twitter: 1100, facebook: 1700, linkedin: 900, tiktok: 3000, youtube: 650 },
]

const contentTypeData = [
  { name: "Images", value: 35 },
  { name: "Videos", value: 40 },
  { name: "Carousels", value: 15 },
  { name: "Text", value: 10 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]
const PLATFORM_COLORS = {
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  facebook: "#4267B2",
  linkedin: "#0077B5",
  tiktok: "#000000",
  youtube: "#FF0000",
}

export default function SocialMediaDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("engagement")

  const getMetricValue = (platform: string, metric: string) => {
    const data = engagementData.find((item) => item.name.toLowerCase() === platform.toLowerCase())
    if (!data) return 0

    switch (metric) {
      case "followers":
        return data.followers
      case "engagement":
        return data.engagement
      case "reach":
        return data.reach
      case "posts":
        return data.posts
      default:
        return 0
    }
  }

  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "followers":
        return "Followers"
      case "engagement":
        return "Engagement Rate (%)"
      case "reach":
        return "Reach"
      case "posts":
        return "Posts"
      default:
        return ""
    }
  }

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "followers":
        return <Users className="h-4 w-4" />
      case "engagement":
        return <TrendingUp className="h-4 w-4" />
      case "reach":
        return <Eye className="h-4 w-4" />
      case "posts":
        return <MessageSquare className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[180px] border-primary/20">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="followers">Followers</SelectItem>
              <SelectItem value="engagement">Engagement Rate</SelectItem>
              <SelectItem value="reach">Reach</SelectItem>
              <SelectItem value="posts">Posts</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] border-primary/20">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(PLATFORM_COLORS).map((platform) => (
          <Card key={platform} className="overflow-hidden">
            <div
              className="h-1"
              style={{ backgroundColor: PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] }}
            />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS]}20` }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS] }}
                    >
                      {platform.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium capitalize">{platform}</h3>
                </div>
                <Badge
                  className="bg-green-500/10 text-green-500"
                  style={{
                    backgroundColor: `${PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS]}20`,
                    color: PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS],
                  }}
                >
                  Active
                </Badge>
              </div>

              <div className="mt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {getMetricIcon(selectedMetric)}
                      {getMetricLabel(selectedMetric)}
                    </p>
                    <h2 className="text-2xl font-bold">
                      {selectedMetric === "engagement"
                        ? `${getMetricValue(platform, selectedMetric)}%`
                        : getMetricValue(platform, selectedMetric).toLocaleString()}
                    </h2>
                  </div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="text-sm font-medium">+{Math.floor(Math.random() * 10) + 1}%</span>
                  </div>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${Math.min(getMetricValue(platform, selectedMetric) / (selectedMetric === "engagement" ? 0.1 : 1000), 100)}%`,
                      backgroundColor: PLATFORM_COLORS[platform as keyof typeof PLATFORM_COLORS],
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="cyberpunk-card">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Weekly Performance</CardTitle>
            <CardDescription>Engagement across platforms for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
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
                  <Line
                    type="monotone"
                    dataKey="instagram"
                    name="Instagram"
                    stroke={PLATFORM_COLORS.instagram}
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="twitter" name="Twitter" stroke={PLATFORM_COLORS.twitter} />
                  <Line type="monotone" dataKey="facebook" name="Facebook" stroke={PLATFORM_COLORS.facebook} />
                  <Line type="monotone" dataKey="linkedin" name="LinkedIn" stroke={PLATFORM_COLORS.linkedin} />
                  <Line type="monotone" dataKey="tiktok" name="TikTok" stroke={PLATFORM_COLORS.tiktok} />
                  <Line type="monotone" dataKey="youtube" name="YouTube" stroke={PLATFORM_COLORS.youtube} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="cyberpunk-card">
          <CardHeader>
            <CardTitle className="text-lg text-secondary">Content Performance</CardTitle>
            <CardDescription>Performance by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Insights</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Videos</p>
                    <Badge className="bg-[#82ca9d]/20 text-[#82ca9d]">Highest Engagement</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[40%] rounded-full bg-[#82ca9d]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Images</p>
                    <Badge className="bg-[#8884d8]/20 text-[#8884d8]">Most Posted</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[35%] rounded-full bg-[#8884d8]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Carousels</p>
                    <Badge className="bg-[#ffc658]/20 text-[#ffc658]">Growing</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[15%] rounded-full bg-[#ffc658]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Text</p>
                    <Badge className="bg-[#ff8042]/20 text-[#ff8042]">Low Engagement</Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[10%] rounded-full bg-[#ff8042]" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="cyberpunk-card">
        <CardHeader>
          <CardTitle className="text-lg text-accent">Platform Comparison</CardTitle>
          <CardDescription>Compare metrics across different platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
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
                <Bar dataKey="followers" name="Followers" fill="#8884d8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="engagement" name="Engagement Rate (%)" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reach" name="Reach" fill="#ffc658" radius={[4, 4, 0, 0]} />
                <Bar dataKey="posts" name="Posts" fill="#ff8042" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
