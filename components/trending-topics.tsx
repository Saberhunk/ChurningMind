"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Hash, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type TrendingTopic = {
  id: string
  name: string
  count: number
  growth: number
  category: "technology" | "business" | "entertainment" | "health" | "sports"
}

// Initial data until API loads
const initialTopics: TrendingTopic[] = [
  {
    id: "1",
    name: "AI Tools",
    count: 12500,
    growth: 24,
    category: "technology",
  },
  {
    id: "2",
    name: "Remote Work",
    count: 8700,
    growth: 15,
    category: "business",
  },
  {
    id: "3",
    name: "Sustainable Fashion",
    count: 6300,
    growth: 32,
    category: "entertainment",
  },
  {
    id: "4",
    name: "Mental Health",
    count: 5800,
    growth: 18,
    category: "health",
  },
  {
    id: "5",
    name: "Crypto News",
    count: 4900,
    growth: -8,
    category: "business",
  },
]

const getCategoryColor = (category: string) => {
  switch (category) {
    case "technology":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "business":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "entertainment":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "health":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "sports":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export default function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>(initialTopics)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Function to fetch trending topics (simulated)
  const fetchTrendingTopics = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would be an API call to a service that provides Google Trends data
      // For simulation, we're generating random trending topics
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

      const categories = ["technology", "business", "entertainment", "health", "sports"]
      const techTopics = [
        "AI Tools",
        "Web3",
        "Blockchain",
        "Cloud Computing",
        "Quantum Computing",
        "Edge AI",
        "GPT-4",
        "5G Networks",
      ]
      const businessTopics = [
        "Remote Work",
        "Crypto News",
        "Sustainable Business",
        "Digital Nomad",
        "FinTech",
        "DeFi",
        "NFT Market",
      ]
      const entertainmentTopics = [
        "Streaming Wars",
        "Virtual Reality",
        "Gaming Industry",
        "Sustainable Fashion",
        "Celebrity NFTs",
      ]
      const healthTopics = ["Mental Health", "Telehealth", "Fitness Tech", "Nutrition Apps", "Sleep Optimization"]
      const sportsTopics = ["E-sports", "Olympic News", "Sports Analytics", "Fantasy Leagues", "Sports Tech"]

      const allTopicsByCategory = {
        technology: techTopics,
        business: businessTopics,
        entertainment: entertainmentTopics,
        health: healthTopics,
        sports: sportsTopics,
      }

      // Generate new trending topics
      const newTopics: TrendingTopic[] = []

      for (let i = 0; i < 5; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)] as
          | "technology"
          | "business"
          | "entertainment"
          | "health"
          | "sports"
        const topicsForCategory = allTopicsByCategory[category]
        const name = topicsForCategory[Math.floor(Math.random() * topicsForCategory.length)]

        newTopics.push({
          id: (i + 1).toString(),
          name,
          count: Math.floor(Math.random() * 15000) + 3000,
          growth: Math.floor(Math.random() * 50) - 10, // -10 to 40
          category,
        })
      }

      setTopics(newTopics)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching trending topics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch topics on initial load
  useEffect(() => {
    fetchTrendingTopics()

    // Auto-refresh every 5 minutes
    const intervalId = setInterval(fetchTrendingTopics, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl text-accent">
            <TrendingUp className="h-5 w-5" />
            Trending Topics
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTrendingTopics}
            disabled={isLoading}
            className="h-8 w-8 p-0"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1">
          Popular topics to create content about
          <span className="text-xs text-muted-foreground ml-1">(Updated: {lastUpdated.toLocaleTimeString()})</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                  <Hash className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">{topic.name}</p>
                  <p className="text-xs text-muted-foreground">{topic.count.toLocaleString()} posts</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Zap className={`h-3 w-3 ${topic.growth >= 0 ? "text-green-500" : "text-red-500"}`} />
                <span className={`text-xs font-medium ${topic.growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {topic.growth >= 0 ? "+" : ""}
                  {topic.growth}%
                </span>
                <Badge variant="outline" className={`ml-2 ${getCategoryColor(topic.category)}`}>
                  {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
