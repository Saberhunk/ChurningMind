"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Play,
  Pause,
  Settings,
  Zap,
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react"

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: "Auto-Post Scheduler",
      description: "Automatically post content at optimal times",
      status: "active",
      trigger: "Time-based",
      actions: 3,
      executions: 127,
      icon: Calendar,
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 2,
      name: "Engagement Booster",
      description: "Auto-reply to comments and DMs",
      status: "active",
      trigger: "New comment",
      actions: 2,
      executions: 89,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      name: "Viral Content Detector",
      description: "Identify trending content opportunities",
      status: "paused",
      trigger: "Engagement spike",
      actions: 4,
      executions: 45,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      name: "Analytics Reporter",
      description: "Weekly performance reports",
      status: "active",
      trigger: "Weekly",
      actions: 1,
      executions: 12,
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
    },
  ])

  const { toast } = useToast()

  const toggleWorkflow = (id: number) => {
    setWorkflows((prev) =>
      prev.map((workflow) =>
        workflow.id === id ? { ...workflow, status: workflow.status === "active" ? "paused" : "active" } : workflow,
      ),
    )
    toast({
      title: "Workflow Updated! ⚡",
      description: "Workflow status changed successfully",
    })
  }

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      : "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                AI Workflows ⚡
              </h1>
              <p className="text-muted-foreground mt-2">Automate your social media like a boss</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active Workflows</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Zap className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Executions</p>
                  <p className="text-3xl font-bold">273</p>
                </div>
                <Target className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Time Saved</p>
                  <p className="text-3xl font-bold">24h</p>
                </div>
                <Clock className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Success Rate</p>
                  <p className="text-3xl font-bold">98%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workflows.map((workflow) => {
            const IconComponent = workflow.icon
            return (
              <Card
                key={workflow.id}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${workflow.color}`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        <CardDescription>{workflow.description}</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={workflow.status === "active"}
                      onCheckedChange={() => toggleWorkflow(workflow.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status === "active" ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Trigger</p>
                        <p className="font-semibold text-sm">{workflow.trigger}</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Actions</p>
                        <p className="font-semibold text-sm">{workflow.actions}</p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Runs</p>
                        <p className="font-semibold text-sm">{workflow.executions}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 hover:bg-purple-50">
                        <Settings className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" className="flex-1 hover:bg-blue-50">
                        {workflow.status === "active" ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
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
