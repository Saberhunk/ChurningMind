"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  MessageSquare,
  Monitor,
  Menu,
  Search,
  Settings,
  User,
  LogOut,
  X,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Logo } from "./logo"
import { useToast } from "@/hooks/use-toast"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [unreadMessages, setUnreadMessages] = useState(2)
  const [showSearch, setShowSearch] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Add these state variables after the existing useState declarations
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Add this news data array after the state declarations
  const newsItems = [
    { id: 1, text: "🔥 Trending: AI-generated content reaches 2B views", category: "trending" },
    { id: 2, text: "📈 Social media engagement up 45% this quarter", category: "updates" },
    { id: 3, text: "🌍 Global: New privacy regulations affect content creators", category: "global" },
    { id: 4, text: "💡 Tech: Revolutionary meme generation algorithm launched", category: "tech" },
    { id: 5, text: "🚀 Breaking: ChurnX hits 1M active users milestone", category: "trending" },
  ]

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add this useEffect after the existing useEffect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsItems.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPaused, newsItems.length])

  const handleClearNotifications = () => {
    setNotifications(0)
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
      type: "success",
    })
  }

  const handleClearMessages = () => {
    setUnreadMessages(0)
    toast({
      title: "Messages marked as read",
      description: "All messages have been marked as read",
      type: "success",
    })
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme activated`,
      description: `The application is now using the ${newTheme} theme`,
      type: "default",
    })
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      {/* Unified Header Content with News Ticker */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2 md:hidden">
            <Logo size="default" />
            <span className="font-space text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              ChurnX
            </span>
          </div>

          {/* Inline News Ticker */}
          <div className="hidden md:flex items-center gap-4 ml-8 flex-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="font-medium text-red-600 text-xs">LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <div
                className="flex items-center gap-8 animate-scroll whitespace-nowrap"
                style={{
                  animation: "scroll 60s linear infinite",
                }}
              >
                {newsItems.concat(newsItems).map((item, index) => (
                  <span key={`${item.id}-${index}`} className="text-xs text-muted-foreground flex-shrink-0">
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            .animate-scroll {
              animation: scroll 60s linear infinite;
            }
          `}</style>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSearch} className="relative overflow-hidden">
            <Search className="h-5 w-5" />
            <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity hover:opacity-100"></span>
          </Button>
          <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/ai-assistant")}>
            <Bot className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
              AI
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
                {notifications > 0 && (
                  <div className="absolute -right-1 -top-1">
                    <Badge
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-secondary to-accent p-0 text-xs pulse"
                      aria-label={`${notifications} unread notifications`}
                    >
                      {notifications}
                    </Badge>
                  </div>
                )}
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity hover:opacity-100"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <p className="text-sm font-medium">Notifications</p>
                {notifications > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearNotifications}>
                    Clear all
                  </Button>
                )}
              </div>
              {notifications > 0 ? (
                <div className="max-h-80 overflow-auto">
                  <div className="p-2 hover:bg-accent/10 rounded-md cursor-pointer">
                    <p className="text-sm font-medium">New follower</p>
                    <p className="text-xs text-muted-foreground">Sarah Williams started following you</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-2 hover:bg-accent/10 rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Content published</p>
                    <p className="text-xs text-muted-foreground">Your scheduled post has been published</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                  <div className="p-2 hover:bg-accent/10 rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Analytics update</p>
                    <p className="text-xs text-muted-foreground">Your latest post is performing well</p>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Messages">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <div className="absolute -right-1 -top-1">
                    <Badge
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary p-0 text-xs pulse"
                      aria-label={`${unreadMessages} unread messages`}
                    >
                      {unreadMessages}
                    </Badge>
                  </div>
                )}
                <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity hover:opacity-100"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <p className="text-sm font-medium">Messages</p>
                {unreadMessages > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleClearMessages}>
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-80 overflow-auto">
                <div className="p-2 hover:bg-secondary/10 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Michael Brown" />
                      <AvatarFallback>MB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Michael Brown</p>
                      <p className="text-xs text-muted-foreground truncate">Hey, can you check the latest design?</p>
                    </div>
                    <p className="text-xs text-muted-foreground">5m</p>
                  </div>
                </div>
                <div className="p-2 hover:bg-secondary/10 rounded-md cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah Williams" />
                      <AvatarFallback>SW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Williams</p>
                      <p className="text-xs text-muted-foreground truncate">The campaign is ready to launch!</p>
                    </div>
                    <p className="text-xs text-muted-foreground">1h</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {mounted && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle theme" className="relative overflow-hidden">
                  {theme === "light" && <SunIcon className="h-5 w-5 text-yellow-500" />}
                  {theme === "dark" && <MoonIcon className="h-5 w-5 text-blue-400" />}
                  {theme === "system" && <Monitor className="h-5 w-5" />}
                  <span className="sr-only">Toggle theme</span>
                  <span className="absolute inset-0 rounded-md bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 transition-opacity hover:opacity-100"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("light")} className="flex items-center gap-2">
                  <SunIcon className="h-4 w-4 text-yellow-500" />
                  <span>Light</span>
                  {theme === "light" && (
                    <Badge variant="outline" className="ml-auto h-auto py-0">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")} className="flex items-center gap-2">
                  <MoonIcon className="h-4 w-4 text-blue-400" />
                  <span>Dark</span>
                  {theme === "dark" && (
                    <Badge variant="outline" className="ml-auto h-auto py-0">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("system")} className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                  {theme === "system" && (
                    <Badge variant="outline" className="ml-auto h-auto py-0">
                      Active
                    </Badge>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/50 transition-all hover:ring-primary">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">CX</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">CX</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-xs text-muted-foreground">alex@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showSearch && (
        <div className="absolute left-0 top-0 flex h-16 w-full items-center justify-center bg-background/95 px-4 backdrop-blur">
          <Input placeholder="Search..." className="max-w-md flex-1" autoFocus />
          <Button variant="ghost" size="icon" className="ml-2" onClick={toggleSearch}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </header>
  )
}
