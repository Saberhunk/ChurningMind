import type { Metadata } from "next"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScheduledContent from "@/components/scheduled-content"
import ScheduleForm from "@/components/schedule-form"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "ChurnX - Content Scheduler",
  description: "Schedule and manage your content across platforms",
}

export default function SchedulerPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Content Scheduler</h1>
            <Badge className="bg-green-500 text-white">Enhanced</Badge>
          </div>
          <p className="text-muted-foreground">
            Plan and schedule your content across multiple platforms with AI-powered optimization
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1">
            <Card className="cyberpunk-card shadow-[0_0_15px_rgba(34,197,94,0.2)] border-green-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Calendar</CardTitle>
                <CardDescription>View and manage your content schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-secondary"></div>
                    <span className="text-sm">Twitter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-accent"></div>
                    <span className="text-sm">Facebook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="text-sm">TikTok</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList className="bg-gradient-to-r from-green-500/20 via-green-500/10 to-green-500/5">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-500/20">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger value="published" className="data-[state=active]:bg-green-500/20">
                  Published
                </TabsTrigger>
                <TabsTrigger value="drafts" className="data-[state=active]:bg-green-500/20">
                  Drafts
                </TabsTrigger>
                <TabsTrigger value="schedule" className="data-[state=active]:bg-green-500/20">
                  Schedule New
                </TabsTrigger>
                <TabsTrigger value="ai-optimize" className="data-[state=active]:bg-green-500/20">
                  AI Optimize
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <Card className="cyberpunk-card border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Upcoming Content</CardTitle>
                    <CardDescription>Content scheduled to be published in the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScheduledContent filter="upcoming" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="published">
                <Card className="cyberpunk-card border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-secondary">Published Content</CardTitle>
                    <CardDescription>Content that has been published in the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScheduledContent filter="published" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="drafts">
                <Card className="cyberpunk-card border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-accent">Draft Content</CardTitle>
                    <CardDescription>Content saved as drafts for future scheduling</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScheduledContent filter="drafts" />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="schedule">
                <Card className="cyberpunk-card border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">Schedule New Content</CardTitle>
                    <CardDescription>Create and schedule new content for publication</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScheduleForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai-optimize">
                <Card className="cyberpunk-card border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-500">AI Content Optimization</CardTitle>
                    <CardDescription>Optimize your content schedule with AI recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                        <h3 className="text-lg font-medium text-green-500">AI Recommendations</h3>
                        <p className="mt-1 text-sm">
                          Our AI has analyzed your content performance and audience engagement patterns to suggest
                          optimal posting times.
                        </p>

                        <div className="mt-4 space-y-3">
                          <div className="flex items-start gap-3 rounded-md bg-card/50 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                              <span className="text-sm font-medium text-green-500">1</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Optimal Posting Time</h4>
                              <p className="text-sm text-muted-foreground">
                                Your Instagram audience is most active between 6-8 PM on weekdays. Consider scheduling
                                your posts during this time frame.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 rounded-md bg-card/50 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                              <span className="text-sm font-medium text-green-500">2</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Content Gap</h4>
                              <p className="text-sm text-muted-foreground">
                                You haven't posted any content on LinkedIn in the past 7 days. Consider scheduling a
                                post for this platform.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 rounded-md bg-card/50 p-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                              <span className="text-sm font-medium text-green-500">3</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Content Type Recommendation</h4>
                              <p className="text-sm text-muted-foreground">
                                Video content is performing 35% better than images on your TikTok account. Consider
                                creating more video content.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-green-500/30 p-4">
                        <h3 className="text-lg font-medium">AI Content Enhancement</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Let our AI enhance your scheduled content for better engagement.
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="rounded-md border p-3 hover:border-green-500/50 hover:bg-green-500/5 transition-colors cursor-pointer">
                            <h4 className="font-medium">Hashtag Optimization</h4>
                            <p className="text-sm text-muted-foreground">
                              Generate the most effective hashtags for your content based on current trends.
                            </p>
                          </div>

                          <div className="rounded-md border p-3 hover:border-green-500/50 hover:bg-green-500/5 transition-colors cursor-pointer">
                            <h4 className="font-medium">Caption Enhancement</h4>
                            <p className="text-sm text-muted-foreground">
                              Improve your captions for better engagement and clarity.
                            </p>
                          </div>

                          <div className="rounded-md border p-3 hover:border-green-500/50 hover:bg-green-500/5 transition-colors cursor-pointer">
                            <h4 className="font-medium">Content Repurposing</h4>
                            <p className="text-sm text-muted-foreground">
                              Automatically adapt your content for different platforms.
                            </p>
                          </div>

                          <div className="rounded-md border p-3 hover:border-green-500/50 hover:bg-green-500/5 transition-colors cursor-pointer">
                            <h4 className="font-medium">Engagement Prediction</h4>
                            <p className="text-sm text-muted-foreground">
                              Predict how well your content will perform before posting.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
