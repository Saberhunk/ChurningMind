import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MemeGenerator from "@/components/meme-generator"
import MemeTemplates from "@/components/meme-templates"

export const metadata: Metadata = {
  title: "ChurnX - Meme Generator",
  description: "Create viral memes with AI",
}

export default function MemeGeneratorPage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Meme Generator</h1>
          <p className="text-muted-foreground">Create viral memes optimized for social media engagement</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 lg:col-span-2">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Create Your Meme</CardTitle>
                <CardDescription>Customize your meme with text, images, and effects</CardDescription>
              </CardHeader>
              <CardContent>
                <MemeGenerator />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Meme Templates</CardTitle>
                <CardDescription>Choose from popular templates or trending formats</CardDescription>
              </CardHeader>
              <CardContent>
                <MemeTemplates />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
