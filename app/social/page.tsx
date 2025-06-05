import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SocialMediaDashboard from "@/components/social-media-dashboard"
import SocialMediaAccounts from "@/components/social-media-accounts"
import MarketingCampaigns from "@/components/marketing-campaigns"
import ContentCalendar from "@/components/content-calendar"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "ChurnX - Social Media",
  description: "Manage your social media platforms and marketing campaigns",
}

export default function SocialMediaPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Social Media</h1>
            <Badge className="bg-accent text-white">Connected</Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your social media platforms, create marketing campaigns, and track performance
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 w-full">
            <TabsTrigger
              value="dashboard"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-primary/10"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-secondary/10"
            >
              Connected Accounts
            </TabsTrigger>
            <TabsTrigger
              value="campaigns"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/30 data-[state=active]:to-accent/10"
            >
              Marketing Campaigns
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-purple-500/10"
            >
              Content Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card className="cyberpunk-card border-primary/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Social Media Dashboard</CardTitle>
                <CardDescription>Overview of your social media performance across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <SocialMediaDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <Card className="cyberpunk-card border-secondary/30">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Connected Accounts</CardTitle>
                <CardDescription>Manage your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <SocialMediaAccounts />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="cyberpunk-card border-accent/30">
              <CardHeader>
                <CardTitle className="text-xl text-accent">Marketing Campaigns</CardTitle>
                <CardDescription>Create and manage your marketing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketingCampaigns />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card className="cyberpunk-card border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-purple-500">Content Calendar</CardTitle>
                <CardDescription>Schedule and manage your social media content</CardDescription>
              </CardHeader>
              <CardContent>
                <ContentCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
