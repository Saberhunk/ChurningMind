import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Template = {
  title: string
  description: string
  platforms: string[]
  category: string
}

const templates: Template[] = [
  {
    title: "Trending Topic Commentary",
    description: "Generate content relating to trending topics with your unique perspective",
    platforms: ["Twitter", "Instagram", "TikTok"],
    category: "Viral",
  },
  {
    title: "Educational Carousel",
    description: "Create educational slides that teach your audience something new",
    platforms: ["Instagram", "LinkedIn", "Facebook"],
    category: "Educational",
  },
  {
    title: "Meme Generator",
    description: "Create viral memes related to your industry or niche",
    platforms: ["Instagram", "Twitter", "TikTok", "Facebook"],
    category: "Humorous",
  },
  {
    title: "Behind the Scenes",
    description: "Share authentic behind-the-scenes content to connect with your audience",
    platforms: ["Instagram", "TikTok", "YouTube"],
    category: "Authentic",
  },
  {
    title: "Product or Service Spotlight",
    description: "Highlight features and benefits of your products or services",
    platforms: ["LinkedIn", "Instagram", "Facebook"],
    category: "Marketing",
  },
  {
    title: "Motivational Quote",
    description: "Share inspirational quotes with beautiful visuals",
    platforms: ["Instagram", "Twitter", "Pinterest"],
    category: "Inspirational",
  },
]

export default function ContentTemplates() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <div
          key={template.title}
          className="glowing-border rounded-lg border bg-card/50 p-4 transition-all hover:bg-card/70"
        >
          <h3 className="mb-2 text-lg font-medium text-primary">{template.title}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{template.description}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {template.platforms.map((platform) => (
              <span key={platform} className="rounded-full bg-muted px-2 py-1 text-xs">
                {platform}
              </span>
            ))}
          </div>
          <Button variant="outline" className="w-full justify-between">
            Use Template
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
