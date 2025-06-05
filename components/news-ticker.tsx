"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Newspaper, TrendingUp, Globe, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type NewsItem = {
  id: string
  text: string
  category: "trending" | "update" | "global" | "tech"
  url?: string
}

const initialNews: NewsItem[] = [
  {
    id: "1",
    text: "Instagram launches new creator monetization features",
    category: "update",
    url: "#",
  },
  {
    id: "2",
    text: "#SummerVibes trending worldwide with over 2M posts",
    category: "trending",
    url: "#",
  },
  {
    id: "3",
    text: "TikTok algorithm update: What content creators need to know",
    category: "tech",
    url: "#",
  },
  {
    id: "4",
    text: "Twitter introduces new API pricing for developers",
    category: "update",
    url: "#",
  },
  {
    id: "5",
    text: "Global social media usage increases by 9% in Q2",
    category: "global",
    url: "#",
  },
  {
    id: "6",
    text: "Meta announces new AR features for Instagram",
    category: "tech",
    url: "#",
  },
]

export function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>(initialNews)
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [news.length, isHovered])

  // Simulate fetching new news items periodically
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        text: getRandomNewsItem(),
        category: ["trending", "update", "global", "tech"][Math.floor(Math.random() * 4)] as NewsItem["category"],
        url: "#",
      }

      setNews((prev) => {
        const updated = [...prev, newItem]
        if (updated.length > 10) {
          // Keep only the 10 most recent news items
          return updated.slice(updated.length - 10)
        }
        return updated
      })
    }, 30000) // Fetch new news every 30 seconds

    return () => clearInterval(fetchInterval)
  }, [])

  const getRandomNewsItem = () => {
    const newsItems = [
      "Pinterest reports 15% increase in user engagement",
      "YouTube Shorts reaches 2 billion daily views",
      "New study reveals best times to post on LinkedIn",
      "Facebook introduces AI-powered content moderation tools",
      "Snapchat launches new AR filters for businesses",
      "#SocialMediaMarketing trending in business circles",
      "Reddit announces new community features",
      "Instagram tests new Stories layout",
      "Twitter Blue subscription gains traction among creators",
      "TikTok Shop expands to new markets",
    ]

    return newsItems[Math.floor(Math.random() * newsItems.length)]
  }

  const getCategoryIcon = (category: NewsItem["category"]) => {
    switch (category) {
      case "trending":
        return <TrendingUp className="h-3 w-3" />
      case "update":
        return <Zap className="h-3 w-3" />
      case "global":
        return <Globe className="h-3 w-3" />
      case "tech":
        return <Newspaper className="h-3 w-3" />
      default:
        return <Newspaper className="h-3 w-3" />
    }
  }

  const getCategoryColor = (category: NewsItem["category"]) => {
    switch (category) {
      case "trending":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "update":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "global":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "tech":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20"
    }
  }

  return (
    <div
      className="relative h-8 overflow-hidden border-b bg-background/50 backdrop-blur"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center h-full">
          <Badge variant="outline" className="mr-2 bg-primary/5 text-xs">
            <Newspaper className="mr-1 h-3 w-3" />
            LIVE
          </Badge>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={news[currentNewsIndex].id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center h-full"
              >
                <Badge
                  variant="outline"
                  className={`mr-2 text-xs ${getCategoryColor(news[currentNewsIndex].category)}`}
                >
                  {getCategoryIcon(news[currentNewsIndex].category)}
                </Badge>

                <a
                  href={news[currentNewsIndex].url || "#"}
                  className="text-sm hover:underline truncate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {news[currentNewsIndex].text}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 ml-2">
            {news.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  index === currentNewsIndex ? "bg-primary" : "bg-primary/20"
                }`}
                onClick={() => setCurrentNewsIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
