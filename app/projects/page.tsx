import type { Metadata } from "next"
import ProjectsList from "@/components/projects-list"
import ProjectMetrics from "@/components/project-metrics"

export const metadata: Metadata = {
  title: "ChurnX - Projects",
  description: "Manage and track your content projects",
}

export default function ProjectsPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Projects
          </h1>
          <p className="text-muted-foreground">Create, manage, and track your content projects</p>
        </div>

        <ProjectMetrics />
        <ProjectsList />
      </div>
    </div>
  )
}
