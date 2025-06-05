"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Activity,
  UserPlus,
  FileEdit,
  Trash,
  Upload,
  Send,
  Shield,
  Settings,
  LogIn,
  PenSquare,
  RotateCw,
  Clock,
} from "lucide-react"

type ActivityType =
  | "member_added"
  | "member_removed"
  | "role_changed"
  | "content_created"
  | "content_edited"
  | "content_deleted"
  | "media_uploaded"
  | "invitation_sent"
  | "settings_changed"
  | "login"
  | "logout"

interface ActivityItem {
  id: string
  type: ActivityType
  user: {
    id: string
    name: string
    avatar?: string
  }
  description: string
  timestamp: Date
  details?: string
}

// Sample activity data
const generateActivityData = (): ActivityItem[] => {
  const now = new Date()
  const activities: ActivityItem[] = [
    {
      id: "act1",
      type: "member_added",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Added Sarah Williams to the team",
      timestamp: new Date(now.getTime() - 1000 * 60 * 10), // 10 minutes ago
    },
    {
      id: "act2",
      type: "content_created",
      user: {
        id: "user2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Created a new content campaign",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: "act3",
      type: "login",
      user: {
        id: "user3",
        name: "Mike Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Logged in",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "act4",
      type: "media_uploaded",
      user: {
        id: "user2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Uploaded 3 new images",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 3), // 3 hours ago
    },
    {
      id: "act5",
      type: "content_edited",
      user: {
        id: "user3",
        name: "Mike Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Edited Summer Campaign post",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 5), // 5 hours ago
    },
    {
      id: "act6",
      type: "invitation_sent",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Sent invitation to david@example.com",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 8), // 8 hours ago
    },
    {
      id: "act7",
      type: "settings_changed",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Updated team notification settings",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
    },
    {
      id: "act8",
      type: "role_changed",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Changed Mike Brown's role to Editor",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "act9",
      type: "content_deleted",
      user: {
        id: "user2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Deleted draft post",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    },
    {
      id: "act10",
      type: "member_removed",
      user: {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      description: "Removed John Doe from the team",
      timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
  ]

  return activities
}

export default function TeamActivity() {
  const [timeFilter, setTimeFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activities, setActivities] = useState<ActivityItem[]>(generateActivityData())

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "member_added":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "member_removed":
        return <Trash className="h-4 w-4 text-red-500" />
      case "role_changed":
        return <Shield className="h-4 w-4 text-secondary" />
      case "content_created":
        return <PenSquare className="h-4 w-4 text-primary" />
      case "content_edited":
        return <FileEdit className="h-4 w-4 text-primary" />
      case "content_deleted":
        return <Trash className="h-4 w-4 text-red-500" />
      case "media_uploaded":
        return <Upload className="h-4 w-4 text-accent" />
      case "invitation_sent":
        return <Send className="h-4 w-4 text-blue-500" />
      case "settings_changed":
        return <Settings className="h-4 w-4 text-yellow-500" />
      case "login":
        return <LogIn className="h-4 w-4 text-green-500" />
      case "logout":
        return <RotateCw className="h-4 w-4 text-blue-500" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredActivities = activities.filter((activity) => {
    // Filter by time
    if (timeFilter !== "all") {
      const now = new Date()
      if (timeFilter === "today") {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        if (activity.timestamp < today) return false
      } else if (timeFilter === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (activity.timestamp < weekAgo) return false
      } else if (timeFilter === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (activity.timestamp < monthAgo) return false
      }
    }

    // Filter by type
    if (typeFilter !== "all") {
      if (typeFilter === "members") {
        if (!["member_added", "member_removed", "role_changed", "invitation_sent"].includes(activity.type)) return false
      } else if (typeFilter === "content") {
        if (!["content_created", "content_edited", "content_deleted", "media_uploaded"].includes(activity.type))
          return false
      } else if (typeFilter === "system") {
        if (!["settings_changed", "login", "logout"].includes(activity.type)) return false
      }
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5 text-purple-500" />
          Team Activity Log
        </h2>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[150px] border-purple-500/20">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px] border-purple-500/20">
              <SelectValue placeholder="Activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="members">Members</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/20 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>
                      {activity.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{activity.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      {getActivityIcon(activity.type)}
                      <p className="text-sm">{activity.description}</p>
                    </div>

                    {activity.details && <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No activity found</p>
                <p className="text-sm text-muted-foreground">No activity logs match your selected filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
