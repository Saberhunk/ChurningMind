"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data for the charts
const contentData = [
  {
    id: 1,
    title: "10 Ways AI is Changing Social Media Marketing",
    type: "Carousel",
    platform: "Instagram",
    views: 15200,
    engagement: 2800,
    shares: 450,
    performance: "high",
  },
  {
    id: 2,
    title: "The Future of Web Development in 2023",
    type: "Thread",
    platform: "Twitter",
    views: 8500,
    engagement: 1200,
    shares: 320,
    performance: "medium",
  },
  {
    id: 3,
    title: "How to Boost Your Productivity with AI Tools",
    type: "Article",
    platform: "LinkedIn",
    views: 6200,
    engagement: 980,
    shares: 210,
    performance: "medium",
  },
  {
    id: 4,
    title: "Viral Marketing Strategies for 2023",
    type: "Post",
    platform: "Facebook",
    views: 12800,
    engagement: 1500,
    shares: 380,
    performance: "high",
  },
  {
    id: 5,
    title: "Emerging Tech Trends to Watch",
    type: "Video",
    platform: "TikTok",
    views: 25000,
    engagement: 3200,
    shares: 1200,
    performance: "very-high",
  },
]

const performanceData = [
  { name: "Views", carousel: 15200, thread: 8500, article: 6200, post: 12800, video: 25000 },
  { name: "Engagement", carousel: 2800, thread: 1200, article: 980, post: 1500, video: 3200 },
  { name: "Shares", carousel: 450, thread: 320, article: 210, post: 380, video: 1200 },
]

const performanceColors = {
  "very-high": "bg-green-500/10 text-green-500",
  high: "bg-primary/10 text-primary",
  medium: "bg-secondary/10 text-secondary",
  low: "bg-yellow-500/10 text-yellow-500",
  "very-low": "bg-red-500/10 text-red-500",
}

export default function ContentPerformance() {
  const [sortBy, setSortBy] = useState("views")

  const sortedContent = [...contentData].sort((a, b) => b[sortBy as keyof typeof b] - a[sortBy as keyof typeof a])

  return (
    <div className="space-y-6">
      <Card className="cyberpunk-card">
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
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
                <Bar dataKey="carousel" name="Carousel" fill="#8884d8" />
                <Bar dataKey="thread" name="Thread" fill="#82ca9d" />
                <Bar dataKey="article" name="Article" fill="#ffc658" />
                <Bar dataKey="post" name="Post" fill="#ff8042" />
                <Bar dataKey="video" name="Video" fill="#0088fe" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Content Performance</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="views">Sort by Views</SelectItem>
            <SelectItem value="engagement">Sort by Engagement</SelectItem>
            <SelectItem value="shares">Sort by Shares</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Engagement</TableHead>
              <TableHead className="text-right">Shares</TableHead>
              <TableHead className="text-right">Performance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedContent.map((content) => (
              <TableRow key={content.id}>
                <TableCell className="font-medium">{content.title}</TableCell>
                <TableCell>{content.type}</TableCell>
                <TableCell>{content.platform}</TableCell>
                <TableCell className="text-right">{content.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">{content.engagement.toLocaleString()}</TableCell>
                <TableCell className="text-right">{content.shares.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge className={performanceColors[content.performance as keyof typeof performanceColors]}>
                    {content.performance.replace("-", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
