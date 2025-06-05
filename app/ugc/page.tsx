"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Upload,
  Users,
  TrendingUp,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

export default function UGCPage() {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      creator: "@sarah_creates",
      content: "Amazing product review video!",
      type: "video",
      platform: "TikTok",
      engagement: "12.5K",
      likes: 8900,
      comments: 234,
      shares: 156,
      status: "approved",
      submittedAt: "2024-01-15",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Video",
    },
    {
      id: 2,
      creator: "@mike_lifestyle",
      content: "Unboxing experience post",
      type: "image",
      platform: "Instagram",
      engagement: "8.2K",
      likes: 6700,
      comments: 89,
      shares: 45,
      status: "pending",
      submittedAt: "2024-01-14",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Image",
    },
    {
      id: 3,
      creator: "@tech_reviewer",
      content: "Detailed product breakdown",
      type: "video",
      platform: "YouTube",
      engagement: "25.8K",
      likes: 18900,
      comments: 567,
      shares: 234,
      status: "rejected",
      submittedAt: "2024-01-13",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Video",
    },
  ])

  const { toast } = useToast()

  const handleApprove = (id: number) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "approved" } : sub)))
    toast({
      title: "✅ Content Approved!",
      description: "The submission has been approved and published",
    })
  }

  const handleReject = (id: number) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status: "rejected" } : sub)))
    toast({
      title: "❌ Content Rejected",
      description: "The submission has been rejected",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "pending":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "rejected":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                UGC Management 📸
              </h1>
              <p className="text-muted-foreground mt-2">Curate and manage user-generated content like a pro</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Submissions</p>
                  <p className="text-3xl font-bold">247</p>
                </div>
                <Upload className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Approved Content</p>
                  <p className="text-3xl font-bold">189</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active Creators</p>
                  <p className="text-3xl font-bold">89</p>
                </div>
                <Users className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Avg. Engagement</p>
                  <p className="text-3xl font-bold">15.2K</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search submissions..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="hover:bg-purple-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" className="hover:bg-blue-50">
                  All Platforms
                </Button>
                <Button variant="outline" className="hover:bg-green-50">
                  All Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-lg">
            <TabsTrigger
              value="submissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Submissions
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="creators"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              Creators
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((submission) => (
                <Card
                  key={submission.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={submission.thumbnail || "/placeholder.svg"}
                        alt={submission.content}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{submission.creator}</CardTitle>
                      <Badge className={getStatusColor(submission.status)}>
                        {getStatusIcon(submission.status)}
                        <span className="ml-1 capitalize">{submission.status}</span>
                      </Badge>
                    </div>
                    <CardDescription>{submission.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{submission.platform}</Badge>
                        <Badge variant="outline">{submission.type}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{submission.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                          <span>{submission.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="h-4 w-4 text-green-500" />
                          <span>{submission.shares}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Engagement</p>
                        <p className="text-xl font-bold">{submission.engagement}</p>
                      </div>
                      {submission.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(submission.id)}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(submission.id)}
                            variant="outline"
                            className="flex-1 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                      {submission.status !== "pending" && (
                        <Button variant="outline" className="w-full hover:bg-purple-50">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">UGC Campaigns</h3>
              <p className="text-muted-foreground mb-6">Create and manage user-generated content campaigns</p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="creators">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Creator Network</h3>
              <p className="text-muted-foreground mb-6">Manage your community of content creators</p>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Users className="h-4 w-4 mr-2" />
                Invite Creators
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
