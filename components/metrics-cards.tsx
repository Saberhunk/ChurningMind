"use client"

import { TrendingUp, Users, Zap, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function MetricsCards() {
  return (
    <>
      <Card className="cyberpunk-card border-primary/20 bg-gradient-to-br from-primary/10 to-transparent transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 animate-pulse">
              <Zap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Content Created</p>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                24
              </h3>
              <div className="mt-1 flex items-center text-sm">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">12% increase</span>
                <span className="ml-1 text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card border-secondary/20 bg-gradient-to-br from-secondary/10 to-transparent transition-all hover:shadow-lg hover:shadow-secondary/10">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20 animate-pulse">
              <Users className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Engagements</p>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-secondary-foreground">
                2.4K
              </h3>
              <div className="mt-1 flex items-center text-sm">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">18% increase</span>
                <span className="ml-1 text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cyberpunk-card border-accent/20 bg-gradient-to-br from-accent/10 to-transparent transition-all hover:shadow-lg hover:shadow-accent/10">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 animate-pulse">
              <BarChart3 className="h-7 w-7 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Engagement Rate</p>
              <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-foreground">
                6.8%
              </h3>
              <div className="mt-1 flex items-center text-sm">
                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium text-green-500">3.2% increase</span>
                <span className="ml-1 text-muted-foreground">from last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
