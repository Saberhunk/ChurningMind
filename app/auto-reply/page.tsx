import type { Metadata } from "next"
import AutoReplyGenerator from "@/components/auto-reply-generator"

export const metadata: Metadata = {
  title: "ChurnX - Auto-Reply Generator",
  description: "Generate customized, engaging replies to comments on your viral posts",
}

export default function AutoReplyPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Auto-Reply Generator
          </h1>
          <p className="text-muted-foreground">
            Create customized, engaging, and respectful replies to comments on your viral posts
          </p>
        </div>

        <AutoReplyGenerator />
      </div>
    </div>
  )
}
