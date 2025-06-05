"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Twitter, Facebook, Linkedin, Youtube } from "lucide-react"

type ActivityItem = {
  id: string
  title: string
  description: string
  time: string
  platform: "instagram" | "twitter" | "facebook" | "linkedin" | "youtube"
  type: "post" | "comment" | "like" | "share" | "follow"
}

const activities: ActivityItem[] = [
  {
    id: "1",
    title: "New Post Published",
    description: "Your scheduled post about AI trends has been published",
    time: "10 minutes ago",
    platform: "instagram",
    type: "post",
  },
  {
    id: "2",
    title: "New Comment",
    description: "Sarah commented on your latest post",
    time: "25 minutes ago",
    platform: "twitter",
    type: "comment",
  },
  {
    id: "3",
    title: "Post Performance",
    description: "Your post is performing well with 120 likes",
    time: "1 hour ago",
    platform: "facebook",
    type: "like",
  },
  {
    id: "4",
    title: "New Share",
    description: "Your article was shared by Tech Insights",
    time: "2 hours ago",
    platform: "linkedin",
    type: "share",
  },
]

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="h-4 w-4 text-pink-500" />
    case "twitter":
      return <Twitter className="h-4 w-4 text-blue-400" />
    case "facebook":
      return <Facebook className="h-4 w-4 text-blue-600" />
    case "linkedin":
      return <Linkedin className="h-4 w-4 text-blue-700" />
    case "youtube":
      return <Youtube className="h-4 w-4 text-red-600" />
    default:
      return null
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "post":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "comment":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "like":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "share":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "follow":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export default function RecentActivity() {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <Card key={activity.id} className="p-3 hover:bg-muted/50 transition-colors">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`/placeholder.svg?height=32&width=32&text=${activity.platform.charAt(0).toUpperCase()}`}
              />
              <AvatarFallback>{activity.platform.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.title}</p>
                  {getPlatformIcon(activity.platform)}
                </div>
                <Badge variant="outline" className={getTypeColor(activity.type)}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
