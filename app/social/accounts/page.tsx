"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Plus, Instagram, Twitter, Linkedin, TrendingUp, Users, Heart } from "lucide-react"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      platform: "Instagram",
      username: "@yourhandle",
      followers: "125K",
      engagement: "8.5%",
      connected: true,
      icon: Instagram,
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 2,
      platform: "TikTok",
      username: "@yourhandle",
      followers: "89K",
      engagement: "12.3%",
      connected: true,
      icon: TrendingUp,
      color: "from-black to-gray-800",
    },
    {
      id: 3,
      platform: "Twitter",
      username: "@yourhandle",
      followers: "45K",
      engagement: "6.2%",
      connected: false,
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 4,
      platform: "LinkedIn",
      username: "Your Name",
      followers: "12K",
      engagement: "4.8%",
      connected: true,
      icon: Linkedin,
      color: "from-blue-600 to-blue-800",
    },
  ])

  const { toast } = useToast()

  const toggleConnection = (id: number) => {
    setAccounts((prev) =>
      prev.map((account) => (account.id === id ? { ...account, connected: !account.connected } : account)),
    )
    toast({
      title: "Account Updated! 🎉",
      description: "Connection status changed successfully",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Connected Accounts 🔗
              </h1>
              <p className="text-muted-foreground mt-2">Manage all your social media connections</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Connect New Account
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Connected Accounts</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Users className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Followers</p>
                  <p className="text-3xl font-bold">271K</p>
                </div>
                <Heart className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Avg. Engagement</p>
                  <p className="text-3xl font-bold">7.9%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => {
            const IconComponent = account.icon
            return (
              <Card
                key={account.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${account.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{account.platform}</CardTitle>
                        <CardDescription>{account.username}</CardDescription>
                      </div>
                    </div>
                    <Switch checked={account.connected} onCheckedChange={() => toggleConnection(account.id)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge
                        className={
                          account.connected
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
                        }
                      >
                        {account.connected ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Followers</p>
                        <p className="text-xl font-bold">{account.followers}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-xl font-bold">{account.engagement}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300"
                    >
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
