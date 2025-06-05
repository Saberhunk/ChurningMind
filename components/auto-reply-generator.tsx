"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  MessageSquare,
  Sparkles,
  RefreshCw,
  Trash,
  Loader2,
  Save,
  Copy,
  SmilePlus,
  ThumbsUp,
  Frown,
  BookMarked,
} from "lucide-react"

type ToneType = "friendly" | "professional" | "humorous" | "witty" | "supportive" | "neutral" | "custom"

interface ReplyTemplate {
  id: string
  name: string
  content: string
  tone: ToneType
  tags: string[]
  usageCount: number
  isDefault?: boolean
}

// Sample reply templates
const initialTemplates: ReplyTemplate[] = [
  {
    id: "template1",
    name: "Appreciation",
    content:
      "Thank you for your wonderful comment! We're thrilled to hear you're enjoying our content. Keep the feedback coming! 😊",
    tone: "friendly",
    tags: ["positive", "thanking"],
    usageCount: 32,
    isDefault: true,
  },
  {
    id: "template2",
    name: "Humorous Response",
    content:
      "Haha, that's hilarious! You've got us laughing at the office. Thanks for brightening our day with your witty comment! 😂",
    tone: "humorous",
    tags: ["funny", "engaging"],
    usageCount: 24,
  },
  {
    id: "template3",
    name: "Question Response",
    content:
      "Great question! We appreciate your curiosity. Actually, {{custom_answer}}. Hope that helps, and please feel free to ask anything else!",
    tone: "supportive",
    tags: ["informative", "helpful"],
    usageCount: 18,
  },
  {
    id: "template4",
    name: "Handle Criticism",
    content:
      "We value your feedback and take all comments seriously. We're always working to improve and would love to hear more about your specific concerns. Please DM us so we can address this properly.",
    tone: "professional",
    tags: ["feedback", "customer service"],
    usageCount: 12,
  },
  {
    id: "template5",
    name: "Witty Comeback",
    content:
      "Well, you've certainly given us something to think about! Our team is equally amused and intrigued by your perspective. Let's just say we're professionally unprofessional about these things! 😏",
    tone: "witty",
    tags: ["engaging", "light"],
    usageCount: 8,
  },
]

export default function AutoReplyGenerator() {
  const [templates, setTemplates] = useState<ReplyTemplate[]>(initialTemplates)
  const [activeTab, setActiveTab] = useState("templates")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [commentToReply, setCommentToReply] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [tempTemplate, setTempTemplate] = useState<ReplyTemplate>({
    id: "",
    name: "",
    content: "",
    tone: "friendly",
    tags: [],
    usageCount: 0,
  })
  const [newTag, setNewTag] = useState("")
  const [aiSettings, setAiSettings] = useState({
    respectfulness: 90,
    humor: 60,
    engagement: 70,
    personalization: 80,
    emojis: true,
    hashtags: false,
    callToAction: true,
  })
  const { toast } = useToast()

  const handleSelectTemplate = (templateId: string) => {
    if (selectedTemplate === templateId) {
      setSelectedTemplate(null)
    } else {
      setSelectedTemplate(templateId)
      const template = templates.find((t) => t.id === templateId)
      if (template && !editMode) {
        setGeneratedReply(template.content)
      }
    }
  }

  const handleEditTemplate = () => {
    const template = templates.find((t) => t.id === selectedTemplate)
    if (!template) return

    setTempTemplate({ ...template })
    setEditMode(true)
  }

  const handleSaveTemplate = () => {
    if (!tempTemplate.name || !tempTemplate.content) {
      toast({
        title: "Missing information",
        description: "Please provide both name and content for the template",
        type: "error",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (tempTemplate.id) {
        // Update existing template
        setTemplates(templates.map((t) => (t.id === tempTemplate.id ? tempTemplate : t)))

        toast({
          title: "Template updated",
          description: "Your reply template has been updated successfully",
          type: "success",
        })
      } else {
        // Create new template
        const newTemplate = {
          ...tempTemplate,
          id: `template${templates.length + 1}`,
          usageCount: 0,
        }

        setTemplates([...templates, newTemplate])

        toast({
          title: "Template created",
          description: "Your new reply template has been created successfully",
          type: "success",
        })
      }

      setLoading(false)
      setEditMode(false)
      setTempTemplate({
        id: "",
        name: "",
        content: "",
        tone: "friendly",
        tags: [],
        usageCount: 0,
      })
    }, 1000)
  }

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (!template) return

    if (template.isDefault) {
      toast({
        title: "Cannot delete default template",
        description: "The default template cannot be deleted",
        type: "error",
      })
      return
    }

    setTemplates(templates.filter((t) => t.id !== templateId))

    if (selectedTemplate === templateId) {
      setSelectedTemplate(null)
    }

    toast({
      title: "Template deleted",
      description: "The reply template has been deleted successfully",
      type: "default",
    })
  }

  const handleAddTag = () => {
    if (!newTag || tempTemplate.tags.includes(newTag)) return

    setTempTemplate({
      ...tempTemplate,
      tags: [...tempTemplate.tags, newTag],
    })

    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    setTempTemplate({
      ...tempTemplate,
      tags: tempTemplate.tags.filter((t) => t !== tag),
    })
  }

  const handleGenerateReply = () => {
    if (!commentToReply) {
      toast({
        title: "No comment provided",
        description: "Please enter a comment to generate a reply",
        type: "error",
      })
      return
    }

    setGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const baseReplies = [
        "Thank you for your thoughtful comment! We really appreciate your engagement with our content. 😊",
        "Haha, that's an interesting perspective! Thanks for sharing your thoughts with us! 😄",
        "We're so glad you enjoyed this content! Your support means the world to us. ❤️",
        "What an insightful comment! You've given us something to think about. Thanks for engaging!",
        "You made our day with this comment! We're thrilled to have such engaged followers like you. 🙌",
      ]

      // Randomly select a base reply and customize it based on AI settings
      let reply = baseReplies[Math.floor(Math.random() * baseReplies.length)]

      // Add more humor if set high
      if (aiSettings.humor > 70) {
        reply += " Your comment literally made us spit out our coffee! 😂"
      }

      // Add personalization if set high
      if (aiSettings.personalization > 70) {
        reply += " It's followers like you who inspire us to create better content every day."
      }

      // Add call to action if enabled
      if (aiSettings.callToAction) {
        reply += " Don't forget to check out our latest posts and let us know what you think!"
      }

      // Add hashtags if enabled
      if (aiSettings.hashtags) {
        reply += " #ThankYou #CommunityLove #Engagement"
      }

      // Remove emojis if disabled
      if (!aiSettings.emojis) {
        reply = reply.replace(
          /[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}|\u{1F1E0}-\u{1F1FF}|\u{1F200}-\u{1F2FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}]/gu,
          "",
        )
      }

      setGeneratedReply(reply)
      setGenerating(false)

      toast({
        title: "Reply generated",
        description: "Your customized reply has been generated successfully",
        type: "success",
      })
    }, 2000)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply)

    toast({
      title: "Copied to clipboard",
      description: "Your reply has been copied to the clipboard",
      type: "success",
    })
  }

  const handleSetDefaultTemplate = (templateId: string) => {
    setTemplates(
      templates.map((t) => ({
        ...t,
        isDefault: t.id === templateId,
      })),
    )

    toast({
      title: "Default template updated",
      description: "The selected template is now set as the default",
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Auto-Reply Manager
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
          <TabsTrigger
            value="templates"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-primary/10"
          >
            Reply Templates
          </TabsTrigger>
          <TabsTrigger
            value="generate"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-secondary/10"
          >
            Generate Response
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/30 data-[state=active]:to-accent/10"
          >
            AI Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {!editMode ? (
            <>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-primary/20 hover:bg-primary/10 gap-2"
                  onClick={() => {
                    setEditMode(true)
                    setTempTemplate({
                      id: "",
                      name: "",
                      content: "",
                      tone: "friendly",
                      tags: [],
                      usageCount: 0,
                    })
                  }}
                >
                  <SmilePlus className="h-4 w-4" />
                  Create New Template
                </Button>

                {selectedTemplate && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-secondary/20 hover:bg-secondary/10 gap-2"
                      onClick={handleEditTemplate}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Edit Template
                    </Button>
                    <Button
                      variant="outline"
                      className="border-destructive/20 hover:bg-destructive/10 gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteTemplate(selectedTemplate)}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`transition-all cursor-pointer ${
                      selectedTemplate === template.id
                        ? "border-primary/30 bg-primary/5"
                        : "hover:border-primary/20 hover:bg-primary/5"
                    } ${template.isDefault ? "border-secondary/30" : ""}`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {template.name}
                            {template.isDefault && (
                              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Default</Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="capitalize">
                              {template.tone}
                            </Badge>
                            <span className="text-xs text-muted-foreground">Used {template.usageCount} times</span>
                          </CardDescription>
                        </div>
                        {!template.isDefault && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-secondary"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSetDefaultTemplate(template.id)
                            }}
                          >
                            <BookMarked className="h-4 w-4" />
                            <span className="sr-only">Set as default</span>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>

                      {template.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedTemplate && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{generatedReply}</p>

                    <Button className="mt-4 gap-2" onClick={handleCopyToClipboard}>
                      <Copy className="h-4 w-4" />
                      Copy to Clipboard
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{tempTemplate.id ? "Edit Template" : "Create New Template"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    placeholder="Enter template name"
                    value={tempTemplate.name}
                    onChange={(e) => setTempTemplate({ ...tempTemplate, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-content">Reply Content</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Enter reply content"
                    value={tempTemplate.content}
                    onChange={(e) => setTempTemplate({ ...tempTemplate, content: e.target.value })}
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use {{ custom_answer }} as placeholder for custom content when replying
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template-tone">Tone</Label>
                  <Select
                    value={tempTemplate.tone}
                    onValueChange={(value) => setTempTemplate({ ...tempTemplate, tone: value as ToneType })}
                  >
                    <SelectTrigger id="template-tone">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="witty">Witty</SelectItem>
                      <SelectItem value="supportive">Supportive</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>

                  {tempTemplate.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tempTemplate.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="flex items-center gap-1 py-1">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveTag(tag)}
                          >
                            <Trash className="h-3 w-3" />
                            <span className="sr-only">Remove tag</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox
                    id="default-template"
                    checked={tempTemplate.isDefault}
                    onCheckedChange={(checked) => setTempTemplate({ ...tempTemplate, isDefault: checked as boolean })}
                  />
                  <label
                    htmlFor="default-template"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Set as default template
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditMode(false)
                      setTempTemplate({
                        id: "",
                        name: "",
                        content: "",
                        tone: "friendly",
                        tags: [],
                        usageCount: 0,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveTemplate} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Template
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate Custom Reply</CardTitle>
              <CardDescription>Enter a comment and generate a customized, engaging response using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="comment">Comment to Reply</Label>
                <Textarea
                  id="comment"
                  placeholder="Enter the comment you want to reply to"
                  value={commentToReply}
                  onChange={(e) => setCommentToReply(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tone-select">Response Tone</Label>
                </div>
                <Select defaultValue="friendly">
                  <SelectTrigger id="tone-select">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="witty">Witty</SelectItem>
                    <SelectItem value="supportive">Supportive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Sentiment Analysis</Label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg border">
                    <ThumbsUp className="h-6 w-6 text-green-500" />
                    <span className="text-sm font-medium">Positive</span>
                    <span className="text-xs text-muted-foreground">75%</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg border">
                    <Frown className="h-6 w-6 text-yellow-500" />
                    <span className="text-sm font-medium">Negative</span>
                    <span className="text-xs text-muted-foreground">15%</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-lg border">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                    <span className="text-sm font-medium">Neutral</span>
                    <span className="text-xs text-muted-foreground">10%</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={handleGenerateReply}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Reply
                  </>
                )}
              </Button>

              {generatedReply && (
                <div className="mt-4 space-y-2">
                  <Label>Generated Reply</Label>
                  <div className="p-4 rounded-lg border whitespace-pre-wrap">{generatedReply}</div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="gap-2" onClick={handleCopyToClipboard}>
                      <Copy className="h-4 w-4" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Response Settings</CardTitle>
              <CardDescription>Configure how the AI generates replies to comments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="respectfulness">Respectfulness: {aiSettings.respectfulness}%</Label>
                  </div>
                  <Slider
                    id="respectfulness"
                    min={0}
                    max={100}
                    step={10}
                    value={[aiSettings.respectfulness]}
                    onValueChange={(value) => setAiSettings({ ...aiSettings, respectfulness: value[0] })}
                    className="[&>span]:bg-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values ensure more respectful and considerate responses
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="humor">Humor Level: {aiSettings.humor}%</Label>
                  </div>
                  <Slider
                    id="humor"
                    min={0}
                    max={100}
                    step={10}
                    value={[aiSettings.humor]}
                    onValueChange={(value) => setAiSettings({ ...aiSettings, humor: value[0] })}
                    className="[&>span]:bg-secondary"
                  />
                  <p className="text-xs text-muted-foreground">Adjust how humorous and witty the responses should be</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="engagement">Engagement Factor: {aiSettings.engagement}%</Label>
                  </div>
                  <Slider
                    id="engagement"
                    min={0}
                    max={100}
                    step={10}
                    value={[aiSettings.engagement]}
                    onValueChange={(value) => setAiSettings({ ...aiSettings, engagement: value[0] })}
                    className="[&>span]:bg-accent"
                  />
                  <p className="text-xs text-muted-foreground">
                    Higher values create more engaging and conversation-starting replies
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="personalization">Personalization: {aiSettings.personalization}%</Label>
                  </div>
                  <Slider
                    id="personalization"
                    min={0}
                    max={100}
                    step={10}
                    value={[aiSettings.personalization]}
                    onValueChange={(value) => setAiSettings({ ...aiSettings, personalization: value[0] })}
                    className="[&>span]:bg-purple-500"
                  />
                  <p className="text-xs text-muted-foreground">
                    How personalized the responses should be to the commenter
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-medium">Response Features</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emojis">Use Emojis</Label>
                    <p className="text-xs text-muted-foreground">
                      Include emojis in responses for more expressive replies
                    </p>
                  </div>
                  <Switch
                    id="emojis"
                    checked={aiSettings.emojis}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, emojis: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="hashtags">Include Hashtags</Label>
                    <p className="text-xs text-muted-foreground">
                      Add relevant hashtags to responses for better discoverability
                    </p>
                  </div>
                  <Switch
                    id="hashtags"
                    checked={aiSettings.hashtags}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, hashtags: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cta">Include Call-to-Action</Label>
                    <p className="text-xs text-muted-foreground">
                      Add subtle engagement prompts to encourage further interaction
                    </p>
                  </div>
                  <Switch
                    id="cta"
                    checked={aiSettings.callToAction}
                    onCheckedChange={(checked) => setAiSettings({ ...aiSettings, callToAction: checked })}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
