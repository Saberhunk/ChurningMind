"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MessageSquare,
  Search,
  Filter,
  ThumbsUp,
  Share,
  MessageCircle,
  Plus,
  MoreHorizontal,
  Flag,
  UserPlus,
  Mail,
  FileText,
  AlertTriangle,
  Loader2,
  Trash,
} from "lucide-react"
import { HandshakeIcon } from "@/components/icons/handshake-icon"

type PostCategory =
  | "looking_for_collab"
  | "idea_sharing"
  | "team_up"
  | "feedback_wanted"
  | "resources"
  | "success_story"

interface ForumPost {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    verified?: boolean
  }
  title: string
  content: string
  category: PostCategory
  tags: string[]
  likes: number
  comments: number
  createdAt: string
  userLiked?: boolean
}

interface CollaborationAgreement {
  id: string
  title: string
  collaborators: {
    id: string
    name: string
    avatar?: string
    role: string
    agreed: boolean
  }[]
  description: string
  terms: string[]
  revenueShare: {
    id: string
    name: string
    percentage: number
  }[]
  createdAt: string
  status: "draft" | "pending" | "active" | "completed" | "cancelled"
}

// Sample forum posts
const initialPosts: ForumPost[] = [
  {
    id: "post1",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    title: "Looking for a TikTok creator to collaborate on viral dance challenges",
    content:
      "Hey everyone! I'm a choreographer looking to partner with a TikTok creator who has experience with viral dance challenges. I have some great ideas for unique choreography that could potentially go viral. If you're interested, let's connect and discuss how we can work together to create engaging content.",
    category: "looking_for_collab",
    tags: ["dance", "tiktok", "viral", "choreography"],
    likes: 45,
    comments: 12,
    createdAt: "2023-08-15",
    userLiked: false,
  },
  {
    id: "post2",
    author: {
      id: "user2",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    title: "Content creator specialized in educational content seeking collaboration",
    content:
      "Hello fellow creators! I run an educational channel focused on science and technology. I'm looking to collaborate with other creators who have expertise in these fields. My audience is highly engaged and always looking for new content. If you're passionate about making complex topics accessible, let's team up!",
    category: "team_up",
    tags: ["education", "science", "technology", "youtube"],
    likes: 32,
    comments: 8,
    createdAt: "2023-08-20",
    userLiked: true,
  },
  {
    id: "post3",
    author: {
      id: "user3",
      name: "Mike Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Seeking feedback on my new podcast concept before launch",
    content:
      "I'm about to launch a new podcast focused on entrepreneurship and startup culture. Before I go live, I'd love to get some feedback from this community. The podcast will feature interviews with successful entrepreneurs and dive deep into their journey. Would love your thoughts on the concept, potential guests, and any other suggestions!",
    category: "feedback_wanted",
    tags: ["podcast", "entrepreneurship", "startup", "feedback"],
    likes: 18,
    comments: 24,
    createdAt: "2023-08-22",
    userLiked: false,
  },
  {
    id: "post4",
    author: {
      id: "user4",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    title: "Success story: How our Instagram collaboration doubled our followers",
    content:
      "I wanted to share a success story from a recent collaboration I did with another creator in the fitness niche. By cross-promoting each other's content and creating a joint workout challenge, we both saw our followers double in just two weeks! Happy to share more details on how we structured the collaboration and what worked best for engagement.",
    category: "success_story",
    tags: ["success", "instagram", "fitness", "growth"],
    likes: 76,
    comments: 31,
    createdAt: "2023-08-10",
    userLiked: false,
  },
  {
    id: "post5",
    author: {
      id: "user5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    title: "Free resource: Legal template for content collaboration agreements",
    content:
      "As a content creator who's also a legal professional, I've created a template for collaboration agreements that protects both parties. It covers intellectual property rights, revenue sharing, and termination clauses. I'm making this available for free to the community. Let me know if you have any questions!",
    category: "resources",
    tags: ["legal", "template", "agreement", "free"],
    likes: 103,
    comments: 42,
    createdAt: "2023-08-05",
    userLiked: true,
  },
]

// Sample collaboration agreements
const initialAgreements: CollaborationAgreement[] = [
  {
    id: "agr1",
    title: "Instagram Fashion Series Collaboration",
    collaborators: [
      {
        id: "user1",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Fashion Stylist",
        agreed: true,
      },
      {
        id: "user4",
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Photographer",
        agreed: true,
      },
    ],
    description: "A 6-part Instagram fashion series showcasing sustainable fashion brands and styling tips.",
    terms: [
      "Both parties will contribute equally to content creation",
      "Content will be cross-posted on both accounts",
      "Collaboration will run for 6 weeks, with 1 post per week",
      "Any sponsored content will be agreed upon by both parties",
      "Both parties retain the right to use the content on their platforms",
    ],
    revenueShare: [
      { id: "user1", name: "Alex Johnson", percentage: 50 },
      { id: "user4", name: "Emily Davis", percentage: 50 },
    ],
    createdAt: "2023-08-01",
    status: "active",
  },
  {
    id: "agr2",
    title: "Educational YouTube Series on Technology",
    collaborators: [
      {
        id: "user2",
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Content Creator",
        agreed: true,
      },
      {
        id: "user3",
        name: "Mike Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Tech Expert",
        agreed: false,
      },
    ],
    description: "A 10-part YouTube series explaining complex technology concepts in simple terms for beginners.",
    terms: [
      "Sarah will handle content production and editing",
      "Mike will provide technical expertise and script review",
      "Series will be hosted on Sarah's YouTube channel",
      "Both parties will promote the content on their social media",
      "Agreement is valid for the duration of the 10-part series",
    ],
    revenueShare: [
      { id: "user2", name: "Sarah Williams", percentage: 70 },
      { id: "user3", name: "Mike Brown", percentage: 30 },
    ],
    createdAt: "2023-08-10",
    status: "pending",
  },
]

const getCategoryLabel = (category: PostCategory): string => {
  switch (category) {
    case "looking_for_collab":
      return "Looking for Collaboration"
    case "idea_sharing":
      return "Idea Sharing"
    case "team_up":
      return "Team Up"
    case "feedback_wanted":
      return "Feedback Wanted"
    case "resources":
      return "Resources"
    case "success_story":
      return "Success Story"
    default:
      return "Other"
  }
}

const getCategoryColor = (category: PostCategory): string => {
  switch (category) {
    case "looking_for_collab":
      return "bg-primary/10 text-primary border-primary/20"
    case "idea_sharing":
      return "bg-secondary/10 text-secondary border-secondary/20"
    case "team_up":
      return "bg-accent/10 text-accent border-accent/20"
    case "feedback_wanted":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "resources":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "success_story":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

const getStatusColor = (status: CollaborationAgreement["status"]): string => {
  switch (status) {
    case "draft":
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "active":
      return "bg-green-500/10 text-green-500 border-green-500/20"
    case "completed":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "cancelled":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export default function CollaborationForum() {
  const [activeTab, setActiveTab] = useState("posts")
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts)
  const [agreements, setAgreements] = useState<CollaborationAgreement[]>(initialAgreements)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [isAgreementOpen, setIsAgreementOpen] = useState(false)
  const [isCreateAgreementOpen, setIsCreateAgreementOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null)
  const [selectedAgreement, setSelectedAgreement] = useState<CollaborationAgreement | null>(null)
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "looking_for_collab" as PostCategory,
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")
  const [newAgreement, setNewAgreement] = useState({
    title: "",
    description: "",
    terms: [""] as string[],
    collaborators: [] as string[],
    revenueShare: [] as { id: string; name: string; percentage: number }[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for your post",
        type: "error",
      })
      return
    }

    // Content moderation check
    const moderationCheck = performContentModeration(newPost.title + " " + newPost.content)
    if (!moderationCheck.isAppropriate) {
      toast({
        title: "Content flagged",
        description: `Your post may contain inappropriate content: ${moderationCheck.reason}. Please revise before submitting.`,
        type: "error",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const createdPost: ForumPost = {
        id: `post${posts.length + 1}`,
        author: {
          id: "user1",
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
        },
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        tags: newPost.tags,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString().split("T")[0],
        userLiked: false,
      }

      setPosts([createdPost, ...posts])
      setIsSubmitting(false)
      setIsNewPostOpen(false)
      setNewPost({
        title: "",
        content: "",
        category: "looking_for_collab",
        tags: [],
      })

      toast({
        title: "Post created",
        description: "Your post has been published successfully",
        type: "success",
      })
    }, 1500)
  }

  // Content moderation function
  const performContentModeration = (text: string) => {
    // List of potentially inappropriate content categories
    const inappropriatePatterns = [
      {
        pattern: /\b(sex|nude|porn|xxx|adult content)\b/i,
        category: "adult content",
      },
      {
        pattern: /\b(kill|murder|death threat|harmful|violence)\b/i,
        category: "violence",
      },
      {
        pattern: /\b(hate|racist|discrimination|bigot)\b/i,
        category: "hate speech",
      },
      {
        pattern: /\b(gamble|gambling|casino|betting|bet)\b/i,
        category: "gambling",
      },
      {
        pattern: /\b(illegal|drugs|cocaine|heroin|substance abuse)\b/i,
        category: "illegal activity",
      },
    ]

    // Check for inappropriate content
    for (const item of inappropriatePatterns) {
      if (item.pattern.test(text)) {
        return {
          isAppropriate: false,
          reason: `Potentially contains ${item.category}`,
        }
      }
    }

    return {
      isAppropriate: true,
      reason: "",
    }
  }

  // Legal compliance check for Indian law
  const isLegallyCompliant = (agreement: any) => {
    // Check for basic legal compliance issues
    const legalChecklist = [
      // Terms must not be too short
      agreement.terms.every((term: string) => term.length > 10),

      // Check for potential intellectual property issues
      !agreement.terms.some((term: string) => /\b(copyright violation|steal|plagiarize)\b/i.test(term)),

      // Check for potential financial exploitation
      !agreement.terms.some((term: string) => /\b(unlimited liability|100% profits|no compensation)\b/i.test(term)),

      // Check for potential illegal requirements
      !agreement.terms.some((term: string) => /\b(illegal content|prohibited content|adult content)\b/i.test(term)),

      // Title and description should be appropriate
      agreement.title.length >= 5 && agreement.description.length >= 20,
    ]

    return legalChecklist.every((item) => item === true)
  }

  const handleAddTag = () => {
    if (!newTag || newPost.tags.includes(newTag)) return

    setNewPost({
      ...newPost,
      tags: [...newPost.tags, newTag],
    })

    setNewTag("")
  }

  const handleRemoveTag = (tag: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter((t) => t !== tag),
    })
  }

  const handleCreateAgreement = () => {
    if (!newAgreement.title || !newAgreement.description || newAgreement.terms.some((term) => !term)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        type: "error",
      })
      return
    }

    // Content moderation for agreement
    const moderationCheck = performContentModeration(
      newAgreement.title + " " + newAgreement.description + " " + newAgreement.terms.join(" "),
    )
    if (!moderationCheck.isAppropriate) {
      toast({
        title: "Content flagged",
        description: `Your agreement may contain inappropriate content: ${moderationCheck.reason}. Please revise.`,
        type: "error",
      })
      return
    }

    // Legal compliance check
    if (!isLegallyCompliant(newAgreement)) {
      toast({
        title: "Legal compliance issue",
        description: "Your agreement may not comply with Indian legal requirements. Please review the terms.",
        type: "error",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const createdAgreement: CollaborationAgreement = {
        id: `agr${agreements.length + 1}`,
        title: newAgreement.title,
        collaborators: [
          {
            id: "user1",
            name: "Alex Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Content Creator",
            agreed: true,
          },
          // Additional collaborators would be added here
        ],
        description: newAgreement.description,
        terms: newAgreement.terms,
        revenueShare: [
          { id: "user1", name: "Alex Johnson", percentage: 100 },
          // Revenue shares would be updated based on collaborators
        ],
        createdAt: new Date().toISOString().split("T")[0],
        status: "draft",
      }

      setAgreements([createdAgreement, ...agreements])
      setIsSubmitting(false)
      setIsCreateAgreementOpen(false)
      setNewAgreement({
        title: "",
        description: "",
        terms: [""],
        collaborators: [],
        revenueShare: [],
      })

      toast({
        title: "Agreement created",
        description: "Your collaboration agreement has been created as a draft",
        type: "success",
      })
    }, 1500)
  }

  const handleAddTerm = () => {
    setNewAgreement({
      ...newAgreement,
      terms: [...newAgreement.terms, ""],
    })
  }

  const handleUpdateTerm = (index: number, value: string) => {
    const updatedTerms = [...newAgreement.terms]
    updatedTerms[index] = value

    setNewAgreement({
      ...newAgreement,
      terms: updatedTerms,
    })
  }

  const handleRemoveTerm = (index: number) => {
    setNewAgreement({
      ...newAgreement,
      terms: newAgreement.terms.filter((_, i) => i !== index),
    })
  }

  const handleAgreeToTerms = () => {
    if (!selectedAgreement) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const updatedAgreements = agreements.map((agreement) => {
        if (agreement.id === selectedAgreement.id) {
          const updatedCollaborators = agreement.collaborators.map((collaborator) => {
            if (collaborator.id === "user1") {
              // Assuming user1 is the current user
              return { ...collaborator, agreed: true }
            }
            return collaborator
          })

          const allAgreed = updatedCollaborators.every((c) => c.agreed)

          return {
            ...agreement,
            collaborators: updatedCollaborators,
            status: allAgreed ? "active" : "pending",
          }
        }
        return agreement
      })

      setAgreements(updatedAgreements)
      setIsSubmitting(false)
      setIsTermsAgreed(false)
      setIsAgreementOpen(false)

      toast({
        title: "Agreement accepted",
        description: "You have successfully agreed to the collaboration terms",
        type: "success",
      })
    }, 1500)
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const userLiked = !post.userLiked
          return {
            ...post,
            likes: userLiked ? post.likes + 1 : post.likes - 1,
            userLiked,
          }
        }
        return post
      }),
    )
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleViewAgreement = (agreement: CollaborationAgreement) => {
    setSelectedAgreement(agreement)
    setIsAgreementOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/30 data-[state=active]:to-primary/10"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Forum Posts
            </TabsTrigger>
            <TabsTrigger
              value="agreements"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary/30 data-[state=active]:to-secondary/10"
            >
              <HandshakeIcon className="h-4 w-4 mr-2" />
              Collaboration Agreements
            </TabsTrigger>
          </TabsList>

          {activeTab === "posts" ? (
            <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>Share your ideas or find collaborators</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="post-title" className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="post-title"
                      placeholder="Enter a descriptive title"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="post-category" className="text-sm font-medium">
                      Category
                    </label>
                    <select
                      id="post-category"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value as PostCategory })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="looking_for_collab">Looking for Collaboration</option>
                      <option value="idea_sharing">Idea Sharing</option>
                      <option value="team_up">Team Up</option>
                      <option value="feedback_wanted">Feedback Wanted</option>
                      <option value="resources">Resources</option>
                      <option value="success_story">Success Story</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="post-content" className="text-sm font-medium">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="post-content"
                      placeholder="Describe your idea, request, or resource in detail"
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      className="border-primary/20 focus:border-primary"
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
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
                        className="border-primary/20 focus:border-primary"
                      />
                      <Button type="button" variant="outline" onClick={handleAddTag}>
                        Add
                      </Button>
                    </div>

                    {newPost.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newPost.tags.map((tag) => (
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

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={isTermsAgreed}
                        onCheckedChange={(checked) => setIsTermsAgreed(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree that my post complies with the community guidelines and does not contain inappropriate
                        content
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2" onClick={handleCreatePost} disabled={isSubmitting || !isTermsAgreed}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Create Post
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isCreateAgreementOpen} onOpenChange={setIsCreateAgreementOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="h-4 w-4" />
                  Create Agreement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create Collaboration Agreement</DialogTitle>
                  <DialogDescription>Define the terms of your collaboration</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="agreement-title" className="text-sm font-medium">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="agreement-title"
                      placeholder="Enter a descriptive title for the collaboration"
                      value={newAgreement.title}
                      onChange={(e) => setNewAgreement({ ...newAgreement, title: e.target.value })}
                      className="border-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="agreement-description" className="text-sm font-medium">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="agreement-description"
                      placeholder="Describe the collaboration project in detail"
                      value={newAgreement.description}
                      onChange={(e) => setNewAgreement({ ...newAgreement, description: e.target.value })}
                      className="border-primary/20 focus:border-primary"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Terms and Conditions <span className="text-red-500">*</span>
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Define the terms of your collaboration. Be clear and specific.
                    </p>

                    {newAgreement.terms.map((term, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Term ${index + 1}`}
                          value={term}
                          onChange={(e) => handleUpdateTerm(index, e.target.value)}
                          className="border-primary/20 focus:border-primary"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-10 w-10 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveTerm(index)}
                          disabled={newAgreement.terms.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove term</span>
                        </Button>
                      </div>
                    ))}

                    <Button type="button" variant="outline" className="mt-2 gap-2" onClick={handleAddTerm}>
                      <Plus className="h-4 w-4" />
                      Add Term
                    </Button>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreement-terms"
                        checked={isTermsAgreed}
                        onCheckedChange={(checked) => setIsTermsAgreed(checked as boolean)}
                      />
                      <label
                        htmlFor="agreement-terms"
                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm that this agreement complies with the Indian legal framework and ethical guidelines
                      </label>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateAgreementOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="gap-2" onClick={handleCreateAgreement} disabled={isSubmitting || !isTermsAgreed}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Create Agreement
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">All Categories</option>
                <option value="looking_for_collab">Looking for Collaboration</option>
                <option value="idea_sharing">Idea Sharing</option>
                <option value="team_up">Team Up</option>
                <option value="feedback_wanted">Feedback Wanted</option>
                <option value="resources">Resources</option>
                <option value="success_story">Success Story</option>
              </select>

              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="hover:border-primary/20 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-base">{post.author.name}</CardTitle>
                            {post.author.verified && (
                              <Badge
                                variant="outline"
                                className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs py-0"
                              >
                                Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-xs">Posted on {post.createdAt}</CardDescription>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Share className="h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Connect with Author
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive">
                            <Flag className="h-4 w-4" />
                            Report
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Badge className={`${getCategoryColor(post.category)} border mb-2`}>
                      {getCategoryLabel(post.category)}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.content}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1 ${post.userLiked ? "text-primary" : ""}`}
                        onClick={() => handleLikePost(post.id)}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No posts match your search criteria"
                    : "Be the first to create a post in this category"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="agreements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agreements.map((agreement) => (
              <Card
                key={agreement.id}
                className="hover:border-secondary/20 transition-colors cursor-pointer"
                onClick={() => handleViewAgreement(agreement)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{agreement.title}</CardTitle>
                    <Badge className={`${getStatusColor(agreement.status)} border`}>
                      {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{agreement.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Collaborators</h4>
                      <div className="flex -space-x-2">
                        {agreement.collaborators.map((collaborator) => (
                          <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>
                              {collaborator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Terms</h4>
                      <p className="text-xs text-muted-foreground">{agreement.terms.length} terms defined</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                    <span>Created on {agreement.createdAt}</span>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {agreements.length === 0 && (
            <div className="text-center py-12 border rounded-lg">
              <HandshakeIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No agreements found</h3>
              <p className="text-muted-foreground">Create your first collaboration agreement to get started</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* View Agreement Dialog */}
      <Dialog open={isAgreementOpen} onOpenChange={setIsAgreementOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedAgreement && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedAgreement.title}</DialogTitle>
                  <Badge className={`${getStatusColor(selectedAgreement.status)} border`}>
                    {selectedAgreement.status.charAt(0).toUpperCase() + selectedAgreement.status.slice(1)}
                  </Badge>
                </div>
                <DialogDescription>Created on {selectedAgreement.createdAt}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm">{selectedAgreement.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Collaborators</h3>
                  <div className="space-y-2">
                    {selectedAgreement.collaborators.map((collaborator) => (
                      <div key={collaborator.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>
                              {collaborator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{collaborator.name}</div>
                            <div className="text-xs text-muted-foreground">{collaborator.role}</div>
                          </div>
                        </div>
                        {collaborator.agreed ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Agreed</Badge>
                        ) : (
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Terms and Conditions</h3>
                  <div className="space-y-2 border rounded-lg p-3 bg-muted/10">
                    {selectedAgreement.terms.map((term, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm">{term}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Revenue Sharing</h3>
                  <div className="space-y-2">
                    {selectedAgreement.revenueShare.map((share) => (
                      <div key={share.id} className="flex items-center justify-between">
                        <div className="text-sm">{share.name}</div>
                        <Badge variant="outline">{share.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedAgreement.collaborators.some((c) => c.id === "user1" && !c.agreed) && (
                  <div className="pt-2 space-y-2 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agree-terms"
                        checked={isTermsAgreed}
                        onCheckedChange={(checked) => setIsTermsAgreed(checked as boolean)}
                      />
                      <label
                        htmlFor="agree-terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I have read and agree to the terms and conditions of this collaboration agreement
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p className="text-xs text-muted-foreground">
                        This agreement is legally binding under the Indian legal framework
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAgreementOpen(false)}>
                  Close
                </Button>

                {selectedAgreement.collaborators.some((c) => c.id === "user1" && !c.agreed) && (
                  <Button className="gap-2" onClick={handleAgreeToTerms} disabled={isSubmitting || !isTermsAgreed}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <HandshakeIcon className="h-4 w-4" />
                        Agree to Terms
                      </>
                    )}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
