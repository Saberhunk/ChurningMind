"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"

const projectData = [
  { month: "Jan", completed: 4, inProgress: 2, delayed: 1 },
  { month: "Feb", completed: 6, inProgress: 3, delayed: 2 },
  { month: "Mar", completed: 8, inProgress: 4, delayed: 1 },
  { month: "Apr", completed: 5, inProgress: 6, delayed: 3 },
  { month: "May", completed: 9, inProgress: 5, delayed: 0 },
  { month: "Jun", completed: 7, inProgress: 4, delayed: 2 },
]

export default function ProjectMetrics() {
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold">Project Performance</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/10 bg-primary/5">
          <CardContent className="flex items-center p-4 gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">24</p>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3" /> 18%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/10 bg-secondary/5">
          <CardContent className="flex items-center p-4 gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
              <Clock className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">15</p>
                <span className="flex items-center text-xs text-blue-500">
                  <ArrowUpRight className="h-3 w-3" /> 5%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/10 bg-accent/5">
          <CardContent className="flex items-center p-4 gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <AlertCircle className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Delayed</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">5</p>
                <span className="flex items-center text-xs text-red-500">
                  <ArrowUpRight className="h-3 w-3" /> 2%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/10 bg-purple-500/5">
          <CardContent className="flex items-center p-4 gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold">12</p>
                <span className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="h-3 w-3" /> 10%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "4px",
                  }}
                />
                <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inProgress" name="In Progress" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" name="Delayed" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
