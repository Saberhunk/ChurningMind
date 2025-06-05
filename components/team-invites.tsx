"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RefreshCw, Trash, MailCheck, Loader2, Send, MailQuestion, MailX } from "lucide-react"

type InviteStatus = "pending" | "accepted" | "expired"
type InviteRole = "admin" | "editor" | "viewer"

interface TeamInvite {
  id: string
  email: string
  role: InviteRole
  status: InviteStatus
  sentAt: string
  expiresAt: string
}

// Sample team invites data
const initialInvites: TeamInvite[] = [
  {
    id: "inv1",
    email: "john@example.com",
    role: "editor",
    status: "pending",
    sentAt: "2023-08-15",
    expiresAt: "2023-08-22",
  },
  {
    id: "inv2",
    email: "lisa@example.com",
    role: "admin",
    status: "accepted",
    sentAt: "2023-08-10",
    expiresAt: "2023-08-17",
  },
  {
    id: "inv3",
    email: "mark@example.com",
    role: "viewer",
    status: "expired",
    sentAt: "2023-07-20",
    expiresAt: "2023-07-27",
  },
]

export default function TeamInvites() {
  const [invites, setInvites] = useState<TeamInvite[]>(initialInvites)
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [newInvite, setNewInvite] = useState({
    email: "",
    role: "editor" as InviteRole,
    message: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const { toast } = useToast()

  const handleSendInvite = () => {
    if (!newInvite.email) {
      toast({
        title: "Missing information",
        description: "Please provide an email address",
        type: "error",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(newInvite.email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address",
        type: "error",
      })
      return
    }

    // Check if already invited
    if (invites.some((invite) => invite.email === newInvite.email && invite.status === "pending")) {
      toast({
        title: "Already invited",
        description: "This email already has a pending invitation",
        type: "error",
      })
      return
    }

    setIsInviting(true)

    // Simulate API call
    setTimeout(() => {
      const today = new Date()
      const expirationDate = new Date()
      expirationDate.setDate(today.getDate() + 7)

      const newTeamInvite: TeamInvite = {
        id: `inv${invites.length + 1}`,
        email: newInvite.email,
        role: newInvite.role,
        status: "pending",
        sentAt: today.toISOString().split("T")[0],
        expiresAt: expirationDate.toISOString().split("T")[0],
      }

      setInvites([...invites, newTeamInvite])
      setIsInviting(false)
      setIsInviteOpen(false)
      setNewInvite({
        email: "",
        role: "editor",
        message: "",
      })

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${newInvite.email}`,
        type: "success",
      })
    }, 1500)
  }

  const handleDeleteInvite = (id: string) => {
    const inviteToRemove = invites.find((invite) => invite.id === id)
    setInvites(invites.filter((invite) => invite.id !== id))

    toast({
      title: "Invitation deleted",
      description: `Invitation to ${inviteToRemove?.email} has been deleted`,
      type: "default",
    })
  }

  const handleResendInvite = (id: string) => {
    const inviteToResend = invites.find((invite) => invite.id === id)

    if (!inviteToResend) return

    toast({
      title: "Invitation resent",
      description: `Invitation has been resent to ${inviteToResend.email}`,
      type: "success",
    })
  }

  const filteredInvites = invites.filter((invite) => invite.email.toLowerCase().includes(searchQuery.toLowerCase()))

  const getRoleBadgeStyles = (role: InviteRole) => {
    switch (role) {
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

  const getStatusBadgeStyles = (status: InviteStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "accepted":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "expired":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getStatusIcon = (status: InviteStatus) => {
    switch (status) {
      case "pending":
        return <MailQuestion className="h-4 w-4 text-yellow-500" />
      case "accepted":
        return <MailCheck className="h-4 w-4 text-green-500" />
      case "expired":
        return <MailX className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Input
            placeholder="Search by email..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Send className="h-4 w-4" />
              Send Invitation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>Send an invitation to join your team</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                  placeholder="Enter email address"
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={newInvite.role}
                  onValueChange={(value) => setNewInvite({ ...newInvite, role: value as InviteRole })}
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
                  {newInvite.role === "admin" && "Can manage team members and all content."}
                  {newInvite.role === "editor" && "Can create and edit content but cannot manage team members."}
                  {newInvite.role === "viewer" && "Can only view content but cannot make changes."}
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Personal Message (optional)
                </label>
                <Textarea
                  id="message"
                  value={newInvite.message}
                  onChange={(e) => setNewInvite({ ...newInvite, message: e.target.value })}
                  placeholder="Add a personal message to your invitation"
                  className="border-primary/20 focus:border-primary"
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={handleSendInvite}
                disabled={isInviting}
              >
                {isInviting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell"
              >
                Sent
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell"
              >
                Expires
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {filteredInvites.map((invite) => (
              <tr key={invite.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{invite.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={`${getRoleBadgeStyles(invite.role)} border`}>
                    {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(invite.status)}
                    <Badge className={`${getStatusBadgeStyles(invite.status)} border`}>
                      {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                    </Badge>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden sm:table-cell">
                  {invite.sentAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground hidden md:table-cell">
                  {invite.expiresAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {invite.status === "pending" && (
                        <DropdownMenuItem
                          className="flex items-center gap-2"
                          onClick={() => handleResendInvite(invite.id)}
                        >
                          <RefreshCw className="h-4 w-4" />
                          Resend Invitation
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onClick={() => handleDeleteInvite(invite.id)}
                      >
                        <Trash className="h-4 w-4" />
                        Delete Invitation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredInvites.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No invitations found</p>
          </div>
        )}
      </div>
    </div>
  )
}
