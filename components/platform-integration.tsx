"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  Plus,
  Check,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  TwitterIcon as TikTok,
  MessageCircle,
  Camera,
  BarChart2,
  AlertCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

type Platform = {
  id: string
  name: string
  icon: React.ReactNode
  connected: boolean
  color: string
  username?: string
}

export default function PlatformIntegration() {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      connected: false,
      color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      connected: false,
      color: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      connected: false,
      color: "bg-blue-600/10 text-blue-600 border-blue-600/20",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      connected: false,
      color: "bg-blue-700/10 text-blue-700 border-blue-700/20",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-5 w-5" />,
      connected: false,
      color: "bg-red-600/10 text-red-600 border-red-600/20",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: <TikTok className="h-5 w-5" />,
      connected: false,
      color: "bg-black/10 text-black dark:text-white border-black/20 dark:border-white/20",
    },
    {
      id: "threads",
      name: "Threads",
      icon: <MessageCircle className="h-5 w-5" />,
      connected: false,
      color: "bg-black/10 text-black dark:text-white border-black/20 dark:border-white/20",
    },
    {
      id: "snapchat",
      name: "Snapchat",
      icon: <Camera className="h-5 w-5" />,
      connected: false,
      color: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    },
    {
      id: "reddit",
      name: "Reddit",
      icon: <BarChart2 className="h-5 w-5" />,
      connected: false,
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: <AlertCircle className="h-5 w-5" />,
      connected: false,
      color: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  ])

  const [isConnecting, setIsConnecting] = useState(false)
  const [platformToConnect, setPlatformToConnect] = useState<Platform | null>(null)
  const [isAddPlatformOpen, setIsAddPlatformOpen] = useState(false)
  const [newPlatformName, setNewPlatformName] = useState("")
  const [newPlatformUrl, setNewPlatformUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleToggle = (id: string) => {
    const platform = platforms.find((p) => p.id === id)

    if (platform?.connected) {
      // Disconnect platform
      setPlatforms(
        platforms.map((platform) => {
          if (platform.id === id) {
            return { ...platform, connected: false, username: undefined }
          }
          return platform
        }),
      )

      toast({
        title: `${platform.name} disconnected`,
        description: `Your ${platform.name} account has been disconnected successfully`,
        type: "default",
      })
    } else {
      // Connect platform
      setPlatformToConnect(platform || null)
    }
  }

  const handleConnect = () => {
    if (!platformToConnect || !username.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your username or email",
        type: "error",
      })
      return
    }

    setIsConnecting(true)

    // Simulate API call
    setTimeout(() => {
      setPlatforms(
        platforms.map((platform) => {
          if (platform.id === platformToConnect.id) {
            return { ...platform, connected: true, username: username }
          }
          return platform
        }),
      )
      setIsConnecting(false)
      setPlatformToConnect(null)
      setUsername("")
      setPassword("")

      toast({
        title: `${platformToConnect.name} connected`,
        description: `Your ${platformToConnect.name} account has been connected successfully`,
        type: "success",
      })
    }, 1500)
  }

  const handleAddPlatform = () => {
    if (!newPlatformName.trim() || !newPlatformUrl.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both platform name and API URL",
        type: "error",
      })
      return
    }

    // Create new platform
    const newPlatform: Platform = {
      id: `custom-${Date.now()}`,
      name: newPlatformName,
      icon: <AlertCircle className="h-5 w-5" />,
      connected: false,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }

    setPlatforms([...platforms, newPlatform])
    setIsAddPlatformOpen(false)
    setNewPlatformName("")
    setNewPlatformUrl("")

    toast({
      title: "Platform added",
      description: `${newPlatformName} has been added to your available platforms`,
      type: "success",
    })
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
        type: "success",
      })
    }
  }

  const connectedPlatforms = platforms.filter((platform) => platform.connected)
  const disconnectedPlatforms = platforms.filter((platform) => !platform.connected)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Connected Platforms</h3>
        {connectedPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {connectedPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${platform.color.split(" ")[0]}`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {platform.username ? `@${platform.username}` : "Connected"}
                      <Badge variant="outline" className="ml-2 text-[10px] py-0">
                        Active
                      </Badge>
                    </p>
                  </div>
                </div>
                <Switch checked={platform.connected} onCheckedChange={() => handleToggle(platform.id)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">No platforms connected</p>
            <Button
              variant="link"
              className="mt-2 text-primary"
              onClick={() => {
                if (disconnectedPlatforms.length > 0) {
                  setPlatformToConnect(disconnectedPlatforms[0])
                }
              }}
            >
              Connect your first platform
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Available Platforms</h3>
          <div className="flex gap-2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
            <Button variant="outline" size="sm" className="gap-1" onClick={handleFileUpload}>
              <Plus className="h-4 w-4" />
              Upload Media
            </Button>
            <Dialog open={isAddPlatformOpen} onOpenChange={setIsAddPlatformOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Platform
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Platform</DialogTitle>
                  <DialogDescription>Enter the details of the platform you want to add.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="platform-name" className="text-sm font-medium">
                      Platform Name
                    </label>
                    <Input
                      id="platform-name"
                      placeholder="Enter platform name"
                      value={newPlatformName}
                      onChange={(e) => setNewPlatformName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="platform-url" className="text-sm font-medium">
                      API URL
                    </label>
                    <Input
                      id="platform-url"
                      placeholder="Enter API URL"
                      value={newPlatformUrl}
                      onChange={(e) => setNewPlatformUrl(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPlatformOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPlatform}>Add Platform</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {disconnectedPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {disconnectedPlatforms.map((platform) => (
              <div
                key={platform.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${platform.color.split(" ")[0]}`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <p className="font-medium">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">Not connected</p>
                  </div>
                </div>
                <Switch checked={platform.connected} onCheckedChange={() => handleToggle(platform.id)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">All available platforms are connected</p>
          </div>
        )}
      </div>

      {/* Connect Platform Dialog */}
      <Dialog open={!!platformToConnect} onOpenChange={(open) => !open && setPlatformToConnect(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {platformToConnect?.name}</DialogTitle>
            <DialogDescription>
              Enter your {platformToConnect?.name} credentials to connect your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username or Email
              </label>
              <Input
                id="username"
                placeholder="Enter your username or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="rounded border-gray-300" />
              <label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember this account
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPlatformToConnect(null)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Connect
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
