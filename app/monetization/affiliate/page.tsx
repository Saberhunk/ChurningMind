"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, DollarSign, TrendingUp, Link, Star, Eye, ExternalLink } from "lucide-react"

export default function AffiliatePage() {
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "TechGear Pro",
      category: "Technology",
      commission: "8%",
      earnings: "$1,247.50",
      clicks: 3420,
      conversions: 89,
      rating: 4.8,
      status: "active",
      logo: "/placeholder.svg?height=50&width=50&text=TG",
    },
    {
      id: 2,
      name: "Fashion Forward",
      category: "Fashion",
      commission: "12%",
      earnings: "$892.30",
      clicks: 2156,
      conversions: 67,
      rating: 4.6,
      status: "active",
      logo: "/placeholder.svg?height=50&width=50&text=FF",
    },
    {
      id: 3,
      name: "Fitness Elite",
      category: "Health & Fitness",
      commission: "15%",
      earnings: "$2,134.80",
      clicks: 4567,
      conversions: 156,
      rating: 4.9,
      status: "pending",
      logo: "/placeholder.svg?height=50&width=50&text=FE",
    },
  ])

  const { toast } = useToast()

  const handleJoinProgram = () => {
    toast({
      title: "🤝 Application Sent!",
      description: "Your affiliate application is under review",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "pending":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case "rejected":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Technology":
        return "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
      case "Fashion":
        return "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
      case "Health & Fitness":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
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
                Affiliate Programs 🤝
              </h1>
              <p className="text-muted-foreground mt-2">Monetize your influence with brand partnerships</p>
            </div>
            <Button
              onClick={handleJoinProgram}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              Join Program
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Earnings</p>
                  <p className="text-3xl font-bold">$4.3K</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Active Programs</p>
                  <p className="text-3xl font-bold">8</p>
                </div>
                <Link className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Total Clicks</p>
                  <p className="text-3xl font-bold">10.1K</p>
                </div>
                <Eye className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Conversion Rate</p>
                  <p className="text-3xl font-bold">3.1%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card
              key={program.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center">
                      <img src={program.logo || "/placeholder.svg"} alt={program.name} className="w-8 h-8 rounded" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge className={getCategoryColor(program.category)}>{program.category}</Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(program.status)}>{program.status}</Badge>
                </div>
                <CardDescription className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">{program.commission} commission</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{program.rating}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Earnings</p>
                      <p className="text-lg font-bold">{program.earnings}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">Conversions</p>
                      <p className="text-lg font-bold">{program.conversions}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{program.clicks} clicks</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>{((program.conversions / program.clicks) * 100).toFixed(1)}% CVR</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 hover:bg-purple-50">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Get Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
