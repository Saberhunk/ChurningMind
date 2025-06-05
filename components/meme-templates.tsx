"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type MemeTemplate = {
  id: string
  name: string
  image: string
  category: string
}

const templates: MemeTemplate[] = [
  {
    id: "1",
    name: "Distracted Boyfriend",
    image: "/placeholder.svg?height=100&width=150&text=Distracted+Boyfriend",
    category: "classic",
  },
  {
    id: "2",
    name: "Drake Hotline Bling",
    image: "/placeholder.svg?height=100&width=150&text=Drake",
    category: "classic",
  },
  {
    id: "3",
    name: "Two Buttons",
    image: "/placeholder.svg?height=100&width=150&text=Two+Buttons",
    category: "classic",
  },
  {
    id: "4",
    name: "Change My Mind",
    image: "/placeholder.svg?height=100&width=150&text=Change+My+Mind",
    category: "classic",
  },
  {
    id: "5",
    name: "Expanding Brain",
    image: "/placeholder.svg?height=100&width=150&text=Expanding+Brain",
    category: "classic",
  },
  {
    id: "6",
    name: "Woman Yelling at Cat",
    image: "/placeholder.svg?height=100&width=150&text=Woman+and+Cat",
    category: "classic",
  },
  {
    id: "7",
    name: "Surprised Pikachu",
    image: "/placeholder.svg?height=100&width=150&text=Surprised+Pikachu",
    category: "classic",
  },
  {
    id: "8",
    name: "Disaster Girl",
    image: "/placeholder.svg?height=100&width=150&text=Disaster+Girl",
    category: "classic",
  },
  {
    id: "9",
    name: "AI Generated Meme",
    image: "/placeholder.svg?height=100&width=150&text=AI+Meme",
    category: "ai",
  },
  {
    id: "10",
    name: "Cyberpunk Style",
    image: "/placeholder.svg?height=100&width=150&text=Cyberpunk",
    category: "ai",
  },
  // Additional templates for more options
  {
    id: "11",
    name: "Stonks",
    image: "/placeholder.svg?height=100&width=150&text=Stonks",
    category: "classic",
  },
  {
    id: "12",
    name: "This is Fine",
    image: "/placeholder.svg?height=100&width=150&text=This+is+Fine",
    category: "classic",
  },
  {
    id: "13",
    name: "Futuristic AI Art",
    image: "/placeholder.svg?height=100&width=150&text=Futuristic+AI",
    category: "ai",
  },
  {
    id: "14",
    name: "Neural Style Transfer",
    image: "/placeholder.svg?height=100&width=150&text=Neural+Style",
    category: "ai",
  },
]

export default function MemeTemplates() {
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === "all" || template.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex space-x-2">
        <Button variant={category === "all" ? "default" : "outline"} size="sm" onClick={() => setCategory("all")}>
          All
        </Button>
        <Button
          variant={category === "classic" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("classic")}
        >
          Classic
        </Button>
        <Button variant={category === "ai" ? "default" : "outline"} size="sm" onClick={() => setCategory("ai")}>
          AI Generated
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="cursor-pointer overflow-hidden rounded-md border transition-all hover:border-primary"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  width={150}
                  height={100}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-sm">{template.name}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
