"use client"

import { useState } from "react"
import { MoreHorizontal, UserPlus, Mail, Trash, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "active" | "pending" | "inactive"
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "owner",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "editor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
  },
]

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-primary/10 text-primary"
      case "admin":
        return "bg-secondary/10 text-secondary"
      case "editor":
        return "bg-accent/10 text-accent"
      case "viewer":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "inactive":
        return "bg-red-500/10 text-red-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Invite a new member to join your team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message (Optional)
                </label>
                <Input id="message" placeholder="Add a personal message" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsInviteDialogOpen(false)}>Send Invitation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <div className="p-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between border-b py-4 last:border-0">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={getRoleBadgeColor(member.role)}>
                  {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </Badge>
                <Badge className={getStatusBadgeColor(member.status)}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Role
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Invitation
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
