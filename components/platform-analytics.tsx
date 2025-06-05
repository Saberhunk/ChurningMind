"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the charts
const platformData = {
  instagram: [
    { date: "Jan", followers: 1200, engagement: 4500, reach: 15000 },
    { date: "Feb", followers: 1500, engagement: 5200, reach: 18000 },
    { date: "Mar", followers: 1800, engagement: 6100, reach: 21000 },
    { date: "Apr", followers: 2200, engagement: 7000, reach: 25000 },
    { date: "May", followers: 2500, engagement: 7800, reach: 28000 },
    { date: "Jun", followers: 2800, engagement: 8500, reach: 32000 },
  ],
  twitter: [
    { date: "Jan", followers: 800, engagement: 2200, reach: 9000 },
    { date: "Feb", followers: 950, engagement: 2800, reach: 11000 },
    { date: "Mar", followers: 1100, engagement: 3300, reach: 13000 },
    { date: "Apr", followers: 1300, engagement: 3800, reach: 15000 },
    { date: "May", followers: 1450, engagement: 4200, reach: 17000 },
    { date: "Jun", followers: 1600, engagement: 4600, reach: 19000 },
  ],
  facebook: [
    { date: "Jan", followers: 2000, engagement: 3000, reach: 25000 },
    { date: "Feb", followers: 2200, engagement: 3400, reach: 28000 },
    { date: "Mar", followers: 2400, engagement: 3800, reach: 31000 },
    { date: "Apr", followers: 2600, engagement: 4200, reach: 34000 },
    { date: "May", followers: 2800, engagement: 4600, reach: 37000 },
    { date: "Jun", followers: 3000, engagement: 5000, reach: 40000 },
  ],
  linkedin: [
    { date: "Jan", followers: 500, engagement: 1200, reach: 8000 },
    { date: "Feb", followers: 600, engagement: 1500, reach: 10000 },
    { date: "Mar", followers: 700, engagement: 1800, reach: 12000 },
    { date: "Apr", followers: 800, engagement: 2100, reach: 14000 },
    { date: "May", followers: 900, engagement: 2400, reach: 16000 },
    { date: "Jun", followers: 1000, engagement: 2700, reach: 18000 },
  ],
}

export default function PlatformAnalytics() {
  const [platform, setPlatform] = useState("instagram")
  const [metric, setMetric] = useState("engagement")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
          </SelectContent>
        </Select>

        <Tabs value={metric} onValueChange={setMetric} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="reach">Reach</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="cyberpunk-card">
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={platformData[platform as keyof typeof platformData]}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#888" />
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
                  dataKey={metric}
                  stroke={metric === "followers" ? "#8884d8" : metric === "engagement" ? "#82ca9d" : "#ffc658"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="cyberpunk-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Followers</p>
              <h3 className="mt-2 text-3xl font-bold text-primary">
                {platform === "instagram"
                  ? "2,800"
                  : platform === "twitter"
                    ? "1,600"
                    : platform === "facebook"
                      ? "3,000"
                      : "1,000"}
              </h3>
              <p className="mt-1 text-sm text-green-500">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cyberpunk-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Avg. Engagement Rate</p>
              <h3 className="mt-2 text-3xl font-bold text-secondary">
                {platform === "instagram"
                  ? "5.8%"
                  : platform === "twitter"
                    ? "3.2%"
                    : platform === "facebook"
                      ? "2.1%"
                      : "4.5%"}
              </h3>
              <p className="mt-1 text-sm text-green-500">+2.3% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="cyberpunk-card">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
              <h3 className="mt-2 text-3xl font-bold text-accent">
                {platform === "instagram"
                  ? "32K"
                  : platform === "twitter"
                    ? "19K"
                    : platform === "facebook"
                      ? "40K"
                      : "18K"}
              </h3>
              <p className="mt-1 text-sm text-green-500">+15% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
