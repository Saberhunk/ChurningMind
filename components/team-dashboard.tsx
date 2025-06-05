"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TeamMembers from "@/components/team-members"
import TeamInvites from "@/components/team-invites"
import TeamRoles from "@/components/team-roles"
import TeamActivity from "@/components/team-activity"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Mail, Shield, Activity } from "lucide-react"

export default function TeamDashboard() {
  const [activeTab, setActiveTab] = useState("members")

  return (
    <Card className="border-primary/20">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
            <TabsTrigger
              value="members"
              className="flex gap-2 items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-primary/10"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team Members</span>
              <span className="inline sm:hidden">Members</span>
            </TabsTrigger>
            <TabsTrigger
              value="invites"
              className="flex gap-2 items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-secondary/10"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Invitations</span>
              <span className="inline sm:hidden">Invites</span>
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="flex gap-2 items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/30 data-[state=active]:to-accent/10"
            >
              <Shield className="h-4 w-4" />
              <span>Roles</span>
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="flex gap-2 items-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/30 data-[state=active]:to-purple-500/10"
            >
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4 mt-6 animate-in fade-in-50">
            <TeamMembers />
          </TabsContent>

          <TabsContent value="invites" className="space-y-4 mt-6 animate-in fade-in-50">
            <TeamInvites />
          </TabsContent>

          <TabsContent value="roles" className="space-y-4 mt-6 animate-in fade-in-50">
            <TeamRoles />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6 animate-in fade-in-50">
            <TeamActivity />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
