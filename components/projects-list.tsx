"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Calendar,
  Users,
  Star,
  BarChart,
  PlusCircle,
  Trash,
  Edit,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ProjectStatus = "in progress" | "completed" | "delayed" | "draft"

type Project = {
  id: string
  title: string
  description: string
  platform: string[]
  status: ProjectStatus
  progress: number
  team: { id: string; name: string; avatar?: string }[]
  dueDate: string
  createdAt: string
}

// Sample project data
const sampleProjects: Project[] = [
  {
    id: "proj-1",
    title: "Q3 Marketing Campaign",
    description: "Comprehensive marketing campaign for Q3 product launches",
    platform: ["Instagram", "Facebook", "TikTok"],
    status: "in progress",
    progress: 65,
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user2", name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user3", name: "Mike Brown", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2023-09-30",
    createdAt: "2023-06-15",
  },
  {
    id: "proj-2",
    title: "Brand Awareness Campaign",
    description: "Increase brand visibility and recognition among target demographics",
    platform: ["LinkedIn", "Twitter"],
    status: "completed",
    progress: 100,
    team: [
      { id: "user2", name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user4", name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2023-07-15",
    createdAt: "2023-05-10",
  },
  {
    id: "proj-3",
    title: "Product Launch Videos",
    description: "Create promotional videos for new product lineup",
    platform: ["YouTube", "TikTok", "Instagram"],
    status: "delayed",
    progress: 40,
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user5", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2023-08-20",
    createdAt: "2023-06-01",
  },
  {
    id: "proj-4",
    title: "Social Media Content Calendar",
    description: "Plan and create content for next quarter social media posts",
    platform: ["Instagram", "Facebook", "Twitter", "LinkedIn"],
    status: "in progress",
    progress: 30,
    team: [
      { id: "user3", name: "Mike Brown", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user4", name: "Emily Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2023-10-15",
    createdAt: "2023-07-01",
  },
  {
    id: "proj-5",
    title: "Rebranding Initiative",
    description: "Company-wide rebranding and design updates",
    platform: ["All Platforms"],
    status: "draft",
    progress: 10,
    team: [
      { id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user2", name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "user5", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    dueDate: "2023-12-01",
    createdAt: "2023-07-15",
  },
]

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    platform: [],
    dueDate: "",
  })
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const handleCreateProject = () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a project title",
        type: "error",
      })
      return
    }

    setIsCreating(true)

    // Simulate API call
    setTimeout(() => {
      const project: Project = {
        id: `proj-${projects.length + 1}`,
        title: newProject.title,
        description: newProject.description,
        platform: newProject.platform.length > 0 ? newProject.platform : ["All Platforms"],
        status: "draft",
        progress: 0,
        team: [{ id: "user1", name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" }],
        dueDate: newProject.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
      }

      setProjects([project, ...projects])
      setIsCreating(false)
      setIsNewProjectOpen(false)
      setNewProject({
        title: "",
        description: "",
        platform: [],
        dueDate: "",
      })

      toast({
        title: "Project created",
        description: `Your project "${project.title}" has been created successfully.`,
        type: "success",
      })
    }, 1500)
  }

  const deleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
    toast({
      title: "Project deleted",
      description: "The project has been deleted successfully.",
      type: "default",
    })
  }

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "in progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "delayed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="delayed">Delayed</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Add details about your new project</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Enter project title"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Enter project description"
                    className="border-primary/20 focus:border-primary"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="platform" className="text-sm font-medium">
                    Platforms
                  </label>
                  <Select
                    onValueChange={(value) =>
                      setNewProject({
                        ...newProject,
                        platform: [...newProject.platform, value],
                      })
                    }
                  >
                    <SelectTrigger id="platform" className="border-primary/20">
                      <SelectValue placeholder="Select platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="All Platforms">All Platforms</SelectItem>
                    </SelectContent>
                  </Select>

                  {newProject.platform.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newProject.platform.map((platform) => (
                        <Badge key={platform} variant="outline" className="bg-primary/5 hover:bg-primary/10">
                          {platform}
                          <button
                            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onClick={() =>
                              setNewProject({
                                ...newProject,
                                platform: newProject.platform.filter((p) => p !== platform),
                              })
                            }
                          >
                            <Trash className="h-3 w-3" />
                            <span className="sr-only">Remove {platform}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleCreateProject}
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <PlusCircle className="h-4 w-4" />
                      Create Project
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger
            value="grid"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10"
          >
            Grid View
          </TabsTrigger>
          <TabsTrigger
            value="list"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10"
          >
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="transition-all hover:shadow-md overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Manage Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Mark as Favorite
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive focus:text-destructive"
                          onClick={() => deleteProject(project.id)}
                        >
                          <Trash className="h-4 w-4" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.platform.map((platform) => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={`${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </Badge>
                    <div className="flex -space-x-2">
                      {project.team.map((member) => (
                        <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t p-4 bg-muted/10">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Due: {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View Details
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 border rounded-lg border-dashed text-center bg-muted/5">
              <div className="rounded-full p-3 bg-primary/10 mb-4">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">No projects found</h3>
              <p className="text-muted-foreground text-sm max-w-md mb-4">
                We couldn't find any projects matching your current filters. Try changing your search or create a new
                project.
              </p>
              <Button
                onClick={() => setIsNewProjectOpen(true)}
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              >
                <Plus className="h-4 w-4" />
                Create New Project
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="rounded-md">
                {filteredProjects.length > 0 ? (
                  <div className="relative">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b">
                        <tr>
                          <th className="text-left p-4 font-medium">Project</th>
                          <th className="text-left p-4 font-medium hidden md:table-cell">Status</th>
                          <th className="text-left p-4 font-medium hidden lg:table-cell">Team</th>
                          <th className="text-left p-4 font-medium hidden sm:table-cell">Due Date</th>
                          <th className="text-left p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.map((project) => (
                          <tr key={project.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <div>
                                <div className="font-medium">{project.title}</div>
                                <div className="text-xs text-muted-foreground hidden sm:block">
                                  {project.description}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <Badge className={`${getStatusColor(project.status)}`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-4 hidden lg:table-cell">
                              <div className="flex -space-x-2">
                                {project.team.map((member) => (
                                  <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>
                                      {member.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </td>
                            <td className="p-4 hidden sm:table-cell">
                              <div className="text-sm">{new Date(project.dueDate).toLocaleDateString()}</div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <BarChart className="h-4 w-4" />
                                  <span className="hidden sm:inline">Details</span>
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Open menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <Edit className="h-4 w-4" />
                                      Edit Project
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-2">
                                      <Users className="h-4 w-4" />
                                      Manage Team
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                      className="flex items-center gap-2 text-destructive focus:text-destructive"
                                      onClick={() => deleteProject(project.id)}
                                    >
                                      <Trash className="h-4 w-4" />
                                      Delete Project
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="rounded-full p-3 bg-primary/10 mb-4">
                      <AlertCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No projects found</h3>
                    <p className="text-muted-foreground text-sm max-w-md mb-4">
                      We couldn't find any projects matching your current filters.
                    </p>
                    <Button
                      onClick={() => setIsNewProjectOpen(true)}
                      className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                      <Plus className="h-4 w-4" />
                      Create New Project
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
