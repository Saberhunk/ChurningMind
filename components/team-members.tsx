"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  UserPlus,
  Shield,
  Trash,
  Crown,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react"

type MemberRole = "owner" | "admin" | "editor" | "viewer"
type MemberStatus = "active" | "pending" | "inactive"

interface TeamMember {
  id: string
  name: string
  email: string
  role: MemberRole
  avatar?: string
  status: MemberStatus
  lastActive?: string
}

// Sample team members data
const initialMembers: TeamMember[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "owner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "Just now",
  },
  {
    id: "user2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: "user3",
    name: "Mike Brown",
    email: "mike@example.com",
    role: "editor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: "user4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    lastActive: "3 days ago",
  },
  {
    id: "user5",
    name: "David Wilson",
    email: "david@example.com",
    role: "editor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastActive: "5 hours ago",
  },
]

export default function TeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "editor" as MemberRole,
  })
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing information",
        description: "Please provide both name and email",
        type: "error",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newMember.email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address",
        type: "error",
      })
      return
    }

    setIsAdding(true)

    // Simulate API call
    setTimeout(() => {
      const newTeamMember: TeamMember = {
        id: `user${members.length + 1}`,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: "active",
        avatar: "/placeholder.svg?height=40&width=40",
        lastActive: "Just now",
      }

      setMembers([...members, newTeamMember])
      setIsAdding(false)
      setIsAddMemberOpen(false)
      setNewMember({
        name: "",
        email: "",
        role: "editor",
      })

      toast({
        title: "Team member added",
        description: `${newMember.name} has been added to your team`,
        type: "success",
      })
    }, 1500)
  }

  const handleRemoveMember = (id: string) => {
    const memberToRemove = members.find((member) => member.id === id)

    if (memberToRemove?.role === "owner") {
      toast({
        title: "Cannot remove owner",
        description: "You cannot remove the team owner",
        type: "error",
      })
      return
    }

    setMembers(members.filter((member) => member.id !== id))

    toast({
      title: "Team member removed",
      description: `${memberToRemove?.name} has been removed from your team`,
      type: "default",
    })
  }

  const handleChangeRole = (id: string, newRole: MemberRole) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, role: newRole } : member)))

    const memberUpdated = members.find((member) => member.id === id)

    toast({
      title: "Role updated",
      description: `${memberUpdated?.name}'s role has been updated to ${newRole}`,
      type: "success",
    })
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getRoleBadgeStyles = (role: MemberRole) => {
    switch (role) {
      case "owner":
        return "bg-primary/10 text-primary border-primary/20"
      case "admin":
        return "bg-secondary/10 text-secondary border-secondary/20"
      case "editor":
        return "bg-accent/10 text-accent border-accent/20"
      case "viewer":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: MemberStatus) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "inactive":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
            <TabsList className="bg-muted/50 h-9">
              <TabsTrigger value="grid" className="h-7 px-3 data-[state=active]:bg-primary/20">
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="h-7 px-3 data-[state=active]:bg-primary/20">
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Member</span>
                <span className="inline sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Team Member</DialogTitle>
                <DialogDescription>Invite a new member to join your team</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="Enter full name"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                    placeholder="Enter email address"
                    className="border-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    value={newMember.role}
                    onValueChange={(value) => setNewMember({ ...newMember, role: value as MemberRole })}
                  >
                    <SelectTrigger id="role" className="border-primary/20">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {newMember.role === "admin" && "Can manage team members and all content."}
                    {newMember.role === "editor" && "Can create and edit content but cannot manage team members."}
                    {newMember.role === "viewer" && "Can only view content but cannot make changes."}
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleAddMember}
                  disabled={isAdding}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add Member
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="border rounded-lg p-4 bg-gradient-to-br from-background to-muted/20 hover:from-primary/5 hover:to-muted/20 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className={member.role === "owner" ? "bg-primary/20" : ""}>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.name}</h3>
                      {member.role === "owner" && <Crown className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => {
                        navigator.clipboard.writeText(member.email)
                        toast({
                          title: "Email copied",
                          description: "Email address copied to clipboard",
                          type: "success",
                        })
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      Copy Email
                    </DropdownMenuItem>

                    {member.role !== "owner" && (
                      <>
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleChangeRole(member.id, "admin")}
                          disabled={member.role === "admin"}
                        >
                          <Shield className="h-4 w-4" />
                          Make Admin
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleChangeRole(member.id, "editor")}
                          disabled={member.role === "editor"}
                        >
                          <Shield className="h-4 w-4" />
                          Make Editor
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleChangeRole(member.id, "viewer")}
                          disabled={member.role === "viewer"}
                        >
                          <Shield className="h-4 w-4" />
                          Make Viewer
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          className="flex items-center gap-2 text-destructive focus:text-destructive"
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <Trash className="h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge className={`${getRoleBadgeStyles(member.role)} border`}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {getStatusIcon(member.status)}
                  <span>{member.lastActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Member
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell"
                >
                  Last Active
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-border">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className={member.role === "owner" ? "bg-primary/20" : ""}>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{member.name}</div>
                          {member.role === "owner" && <Crown className="h-4 w-4 text-yellow-500" />}
                        </div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={`${getRoleBadgeStyles(member.role)} border`}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(member.status)}
                      <span className="text-sm capitalize">{member.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden sm:table-cell">
                    {member.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => {
                            navigator.clipboard.writeText(member.email)
                            toast({
                              title: "Email copied",
                              description: "Email address copied to clipboard",
                              type: "success",
                            })
                          }}
                        >
                          <Mail className="h-4 w-4" />
                          Copy Email
                        </DropdownMenuItem>

                        {member.role !== "owner" && (
                          <>
                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleChangeRole(member.id, "admin")}
                              disabled={member.role === "admin"}
                            >
                              <Shield className="h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleChangeRole(member.id, "editor")}
                              disabled={member.role === "editor"}
                            >
                              <Shield className="h-4 w-4" />
                              Make Editor
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="flex items-center gap-2"
                              onClick={() => handleChangeRole(member.id, "viewer")}
                              disabled={member.role === "viewer"}
                            >
                              <Shield className="h-4 w-4" />
                              Make Viewer
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                              onClick={() => handleRemoveMember(member.id)}
                            >
                              <Trash className="h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No team members found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
