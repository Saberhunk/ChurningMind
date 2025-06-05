import type { Metadata } from "next"
import CollaborationForum from "@/components/collaboration-forum"

export const metadata: Metadata = {
  title: "ChurnX - Collaboration Forum",
  description: "Connect with other content creators and collaborate on projects",
}

export default function CollaborationPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Collaboration Forum
          </h1>
          <p className="text-muted-foreground">
            Connect with other content creators, collaborate on projects, and grow together
          </p>
        </div>

        <CollaborationForum />
      </div>
    </div>
  )
}
