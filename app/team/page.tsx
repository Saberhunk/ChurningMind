import type { Metadata } from "next"
import TeamDashboard from "@/components/team-dashboard"

export const metadata: Metadata = {
  title: "ChurnX - Team Management",
  description: "Manage your team members and collaboration settings",
}

export default function TeamPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-muted-foreground">Manage your team members, roles, and collaboration settings</p>
        </div>

        <TeamDashboard />
      </div>
    </div>
  )
}
