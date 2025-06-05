"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Check, X, Sparkles, Video, Clock, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface VideoScriptReviewProps {
  content: any
  onClose: () => void
  onPublish: () => void
}

export function VideoScriptReview({ content, onClose, onPublish }: VideoScriptReviewProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const { toast } = useToast()

  const startEditing = (section: string, content: string) => {
    setEditingSection(section)
    setEditedContent(content)
  }

  const saveEditedContent = () => {
    // In a real app, you would update the content state here
    setEditingSection(null)

    toast({
      title: "Script updated",
      description: "Your changes have been saved",
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3.5 w-3.5" />
          {content.duration || "3-5 min"}
        </Badge>
      </div>

      <Tabs defaultValue="script" className="space-y-4">
        <TabsList>
          <TabsTrigger value="script">Script</TabsTrigger>
          <TabsTrigger value="storyboard">Storyboard</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="script" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="video-title">Title</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => startEditing("title", content.title)}
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
              {editingSection === "title" ? (
                <div className="space-y-2">
                  <Input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEditedContent} className="gap-1">
                      <Check className="h-3.5 w-3.5" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSection(null)} className="gap-1">
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Input id="video-title" defaultValue={content.title} disabled={editingSection === "title"} />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="video-description">Description</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => startEditing("description", content.description || "")}
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
              {editingSection === "description" ? (
                <div className="space-y-2">
                  <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={3} />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEditedContent} className="gap-1">
                      <Check className="h-3.5 w-3.5" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSection(null)} className="gap-1">
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Textarea
                  id="video-description"
                  defaultValue={content.description || "A compelling video about content creation strategies."}
                  rows={3}
                  disabled={editingSection === "description"}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label>Script</Label>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {content.scenes?.map((scene: any, index: number) => (
                  <div key={index} className="mb-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-bold">
                        Scene {index + 1}: {scene.name}
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => startEditing(`scene-${index}`, scene.script)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground mb-2">
                      Duration: {scene.duration || "30s"} | Shot: {scene.shot || "Medium"}
                    </div>

                    {editingSection === `scene-${index}` ? (
                      <div className="space-y-2">
                        <Textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={6} />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={saveEditedContent} className="gap-1">
                            <Check className="h-3.5 w-3.5" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setEditingSection(null)} className="gap-1">
                            <X className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line border-l-2 pl-3 py-1">{scene.script}</div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="storyboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.scenes?.map((scene: any, index: number) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted">
                  <img
                    src={scene.imageUrl || `/placeholder.svg?height=200&width=400&text=Scene+${index + 1}`}
                    alt={`Scene ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium">
                    Scene {index + 1}: {scene.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {scene.duration || "30s"} | {scene.shot || "Medium Shot"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-tags">Tags</Label>
              <Input
                id="video-tags"
                defaultValue={content.tags?.join(", ") || "content creation, marketing, social media"}
              />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-platforms">Publishing Platforms</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="platform-youtube" defaultChecked />
                  <Label htmlFor="platform-youtube">YouTube</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="platform-tiktok" defaultChecked />
                  <Label htmlFor="platform-tiktok">TikTok</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="platform-instagram" defaultChecked />
                  <Label htmlFor="platform-instagram">Instagram</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="platform-facebook" />
                  <Label htmlFor="platform-facebook">Facebook</Label>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Video Recommendations
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Script is the optimal length for engagement (3-5 minutes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Good variety of shots and scenes</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Consider adding a stronger call-to-action at the end</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Add more B-roll suggestions for visual interest</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-end">
        <div className="flex items-center gap-2 sm:mr-auto">
          <Checkbox id="schedule-video" />
          <Label htmlFor="schedule-video" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Schedule for production
          </Label>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Save as Draft
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            onClick={onPublish}
          >
            <Video className="h-4 w-4" />
            Send to Production
          </Button>
        </div>
      </div>
    </div>
  )
}
