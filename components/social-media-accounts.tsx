"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Trash2, RefreshCw, Link, ExternalLink, PlusCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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

type SocialAccount = {
  id: string
  platform: string
  username: string
  profileUrl: string
  avatar: string
  status: "connected" | "disconnected" | "pending"
  autoPost: boolean
  color: string
}

const initialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "Instagram",
    username: "@yourcompany",
    profileUrl: "https://instagram.com/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=IG",
    status: "connected",
    autoPost: true,
    color: "#E1306C",
  },
  {
    id: "2",
    platform: "Twitter",
    username: "@yourcompany",
    profileUrl: "https://twitter.com/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=TW",
    status: "connected",
    autoPost: true,
    color: "#1DA1F2",
  },
  {
    id: "3",
    platform: "Facebook",
    username: "Your Company",
    profileUrl: "https://facebook.com/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=FB",
    status: "connected",
    autoPost: false,
    color: "#4267B2",
  },
  {
    id: "4",
    platform: "LinkedIn",
    username: "Your Company",
    profileUrl: "https://linkedin.com/company/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=LI",
    status: "disconnected",
    autoPost: false,
    color: "#0077B5",
  },
  {
    id: "5",
    platform: "TikTok",
    username: "@yourcompany",
    profileUrl: "https://tiktok.com/@yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=TT",
    status: "connected",
    autoPost: true,
    color: "#000000",
  },
  {
    id: "6",
    platform: "YouTube",
    username: "Your Company",
    profileUrl: "https://youtube.com/c/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=YT",
    status: "pending",
    autoPost: false,
    color: "#FF0000",
  },
  {
    id: "7",
    platform: "Threads",
    username: "@yourcompany",
    profileUrl: "https://threads.net/@yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=TH",
    status: "disconnected",
    autoPost: false,
    color: "#000000",
  },
  {
    id: "8",
    platform: "Snapchat",
    username: "@yourcompany",
    profileUrl: "https://snapchat.com/add/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    status: "disconnected",
    autoPost: false,
    color: "#FFFC00",
  },
  {
    id: "9",
    platform: "Reddit",
    username: "u/yourcompany",
    profileUrl: "https://reddit.com/user/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=RD",
    status: "disconnected",
    autoPost: false,
    color: "#FF4500",
  },
  {
    id: "10",
    platform: "Pinterest",
    username: "@yourcompany",
    profileUrl: "https://pinterest.com/yourcompany",
    avatar: "/placeholder.svg?height=40&width=40&text=PT",
    status: "disconnected",
    autoPost: false,
    color: "#E60023",
  },
]

export default function SocialMediaAccounts() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [newPlatform, setNewPlatform] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const [connecting, setConnecting] = useState(false)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [isDisconnecting, setIsDisconnecting] = useState<string | null>(null)
  const { toast } = useToast()

  const handleToggleAutoPost = (id: string) => {
    setAccounts((prev) =>
      prev.map((account) => (account.id === id ? { ...account, autoPost: !account.autoPost } : account)),
    )

    const account = accounts.find((a) => a.id === id)
    if (account) {
      toast({
        title: `Auto-post ${account.autoPost ? "disabled" : "enabled"}`,
        description: `Auto-posting has been ${account.autoPost ? "disabled" : "enabled"} for ${account.platform}`,
        type: account.autoPost ? "default" : "success",
      })
    }
  }

  const handleDisconnect = (id: string) => {
    setIsDisconnecting(id)

    // Simulate API call
    setTimeout(() => {
      setAccounts((prev) =>
        prev.map((account) => (account.id === id ? { ...account, status: "disconnected", autoPost: false } : account)),
      )

      const account = accounts.find((a) => a.id === id)
      if (account) {
        toast({
          title: "Account disconnected",
          description: `Your ${account.platform} account has been disconnected`,
          type: "default",
        })
      }

      setIsDisconnecting(null)
    }, 1500)
  }

  const handleReconnect = (id: string) => {
    setIsConnecting(id)

    // Simulate API call
    setTimeout(() => {
      setAccounts((prev) => prev.map((account) => (account.id === id ? { ...account, status: "connected" } : account)))

      const account = accounts.find((a) => a.id === id)
      if (account) {
        toast({
          title: "Account reconnected",
          description: `Your ${account.platform} account has been reconnected`,
          type: "success",
        })
      }

      setIsConnecting(null)
    }, 1500)
  }

  const handleDelete = (id: string) => {
    const account = accounts.find((a) => a.id === id)
    setAccounts((prev) => prev.filter((account) => account.id !== id))

    if (account) {
      toast({
        title: "Account removed",
        description: `Your ${account.platform} account has been removed`,
        type: "default",
      })
    }
  }

  const handleConnectNew = () => {
    if (!newPlatform || !newUsername) {
      toast({
        title: "Missing information",
        description: "Please provide both platform and username",
        type: "error",
      })
      return
    }

    setConnecting(true)

    // Simulate connection process
    setTimeout(() => {
      const newAccount: SocialAccount = {
        id: `${accounts.length + 1}`,
        platform: newPlatform,
        username: newUsername.startsWith("@") ? newUsername : `@${newUsername}`,
        profileUrl: `https://${newPlatform.toLowerCase()}.com/${newUsername.replace("@", "")}`,
        avatar: `/placeholder.svg?height=40&width=40&text=${newPlatform.substring(0, 2).toUpperCase()}`,
        status: "connected",
        autoPost: true,
        color: "#6366F1", // Default color
      }

      setAccounts((prev) => [...prev, newAccount])
      setConnecting(false)
      setIsConnectDialogOpen(false)
      setNewPlatform("")
      setNewUsername("")

      toast({
        title: "Account connected",
        description: `Your ${newPlatform} account has been connected successfully`,
        type: "success",
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Connected Accounts</h3>
        <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect New Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Social Media Account</DialogTitle>
              <DialogDescription>Connect a new social media account to manage it through ChurnX</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="platform" className="text-sm font-medium">
                  Platform
                </label>
                <Input
                  id="platform"
                  placeholder="e.g., Pinterest, Reddit"
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="border-secondary/20 focus:border-secondary"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="e.g., @yourcompany"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border-secondary/20 focus:border-secondary"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleConnectNew}
                disabled={connecting}
                className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90"
              >
                {connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Account"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {accounts.map((account) => (
          <Card key={account.id} className="overflow-hidden h-full">
            <div className="h-1" style={{ backgroundColor: account.color }} />
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${account.color}20` }}
                >
                  <img src={account.avatar || "/placeholder.svg"} alt={account.platform} className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium">{account.platform}</h3>
                  <p className="text-sm text-muted-foreground truncate">{account.username}</p>
                </div>
                <Badge
                  className={`
                    ${
                      account.status === "connected"
                        ? "bg-green-500/10 text-green-500"
                        : account.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-red-500/10 text-red-500"
                    }
                  `}
                >
                  {account.status === "connected"
                    ? "Connected"
                    : account.status === "pending"
                      ? "Pending"
                      : "Disconnected"}
                </Badge>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id={`autopost-${account.id}`}
                    checked={account.autoPost}
                    onCheckedChange={() => handleToggleAutoPost(account.id)}
                    disabled={account.status !== "connected"}
                  />
                  <label htmlFor={`autopost-${account.id}`} className="text-sm cursor-pointer">
                    Auto-post
                  </label>
                </div>

                <a
                  href={account.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Profile
                </a>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                {account.status === "connected" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDisconnect(account.id)}
                    disabled={isDisconnecting === account.id}
                  >
                    {isDisconnecting === account.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <Link className="mr-1 h-3 w-3" />
                    )}
                    {isDisconnecting === account.id ? "Disconnecting..." : "Disconnect"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/20 text-green-500 hover:bg-green-500/10"
                    onClick={() => handleReconnect(account.id)}
                    disabled={isConnecting === account.id}
                  >
                    {isConnecting === account.id ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-1 h-3 w-3" />
                    )}
                    {isConnecting === account.id ? "Connecting..." : "Connect"}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(account.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
