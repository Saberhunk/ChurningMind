"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Check, X, Sparkles, Rocket, Copy, Save, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ArticleContentReviewProps {
  content: any
  onClose: () => void
  onPublish: () => void
}

export function ArticleContentReview({ content, onClose, onPublish }: ArticleContentReviewProps) {
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
      title: "Content updated",
      description: "Your changes have been saved",
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{content.title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <div className="border rounded-lg p-6 space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              <img
                src={content.imageUrl || "/placeholder.svg?height=400&width=800&text=Article+Header+Image"}
                alt="Article header"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold">{content.title}</h1>

            <div className="flex flex-wrap gap-2">
              {content.tags?.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="prose max-w-none">
              {content.sections?.map((section: any, index: number) => (
                <div key={index} className="mb-6">
                  {section.heading && <h2 className="text-xl font-bold mb-3">{section.heading}</h2>}
                  <div className="whitespace-pre-line">{section.content}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="article-title">Title</Label>
              <Input id="article-title" defaultValue={content.title} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="article-tags">Tags</Label>
              <Input id="article-tags" defaultValue={content.tags?.join(", ")} />
              <p className="text-xs text-muted-foreground">Separate tags with commas</p>
            </div>

            <div className="space-y-2">
              <Label>Sections</Label>
              <ScrollArea className="h-[400px] rounded-md border p-4">
                {content.sections?.map((section: any, index: number) => (
                  <div key={index} className="mb-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`section-heading-${index}`}>Section {index + 1} Heading</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => startEditing(`section-${index}`, section.content)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    </div>
                    <Input id={`section-heading-${index}`} defaultValue={section.heading} />

                    {editingSection === `section-${index}` ? (
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
                      <Textarea
                        id={`section-content-${index}`}
                        defaultValue={section.content}
                        rows={6}
                        disabled={editingSection === `section-${index}`}
                      />
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Meta Title</Label>
              <Input id="meta-title" defaultValue={content.title} />
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: "70%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">70% optimized - Good length for search engines</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-description">Meta Description</Label>
              <Textarea
                id="meta-description"
                defaultValue={
                  content.metaDescription ||
                  "An AI-generated article about digital marketing strategies and content creation."
                }
                rows={3}
              />
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full" style={{ width: "50%" }}></div>
              </div>
              <p className="text-xs text-muted-foreground">50% optimized - Consider adding more keywords</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="focus-keyword">Focus Keyword</Label>
              <Input id="focus-keyword" defaultValue="content creation, AI marketing" />
            </div>

            <div className="border rounded-lg p-4 bg-muted/20 space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                SEO Recommendations
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Title contains focus keyword</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Content length is good (1200+ words)</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Add more internal links to improve SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5" />
                  <span>Add alt text to images for better accessibility</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-end">
        <div className="flex items-center gap-2 sm:mr-auto">
          <Checkbox id="schedule-article" />
          <Label htmlFor="schedule-article" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Schedule for later
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
            <Rocket className="h-4 w-4" />
            Publish Now
          </Button>
        </div>
      </div>
    </div>
  )
}
