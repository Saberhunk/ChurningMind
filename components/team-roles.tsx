"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PenSquare, Save, Trash, Users, Shield, FileText, Settings, Loader2, BarChart } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  checked: boolean
}

interface RoleType {
  id: string
  name: string
  description: string
  isDefault: boolean
  isSystem: boolean
  permissions: Permission[]
  memberCount: number
}

const defaultPermissions: Permission[] = [
  { id: "content-create", name: "Create Content", description: "Can create new content", checked: true },
  { id: "content-edit", name: "Edit Content", description: "Can edit existing content", checked: true },
  { id: "content-delete", name: "Delete Content", description: "Can delete content", checked: false },
  { id: "content-publish", name: "Publish Content", description: "Can publish content", checked: true },
  { id: "member-view", name: "View Members", description: "Can view team members", checked: true },
  { id: "member-invite", name: "Invite Members", description: "Can invite new team members", checked: false },
  { id: "member-remove", name: "Remove Members", description: "Can remove team members", checked: false },
  { id: "analytics-view", name: "View Analytics", description: "Can view analytics data", checked: true },
  { id: "settings-edit", name: "Edit Settings", description: "Can edit team settings", checked: false },
]

// Sample roles data
const initialRoles: RoleType[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full access to all resources",
    isDefault: false,
    isSystem: true,
    permissions: defaultPermissions.map((p) => ({ ...p, checked: true })),
    memberCount: 1,
  },
  {
    id: "admin",
    name: "Admin",
    description: "Can manage team members and content",
    isDefault: false,
    isSystem: true,
    permissions: defaultPermissions.map((p) => ({ ...p, checked: true })),
    memberCount: 1,
  },
  {
    id: "editor",
    name: "Editor",
    description: "Can create and edit content",
    isDefault: true,
    isSystem: true,
    permissions: defaultPermissions.map((p) => {
      if (["content-create", "content-edit", "content-publish", "analytics-view", "member-view"].includes(p.id)) {
        return { ...p, checked: true }
      }
      return { ...p, checked: false }
    }),
    memberCount: 2,
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to content",
    isDefault: false,
    isSystem: true,
    permissions: defaultPermissions.map((p) => {
      if (["analytics-view", "member-view"].includes(p.id)) {
        return { ...p, checked: true }
      }
      return { ...p, checked: false }
    }),
    memberCount: 1,
  },
  {
    id: "custom-1",
    name: "Content Manager",
    description: "Manages content but not team members",
    isDefault: false,
    isSystem: false,
    permissions: defaultPermissions.map((p) => {
      if (
        [
          "content-create",
          "content-edit",
          "content-delete",
          "content-publish",
          "analytics-view",
          "member-view",
        ].includes(p.id)
      ) {
        return { ...p, checked: true }
      }
      return { ...p, checked: false }
    }),
    memberCount: 0,
  },
]

export default function TeamRoles() {
  const [roles, setRoles] = useState<RoleType[]>(initialRoles)
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<RoleType | null>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    isDefault: false,
    permissions: defaultPermissions.map((p) => ({ ...p, checked: false })),
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleCreateRole = () => {
    if (!newRole.name) {
      toast({
        title: "Missing information",
        description: "Please provide a role name",
        type: "error",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const createdRole: RoleType = {
        id: `custom-${roles.filter((r) => !r.isSystem).length + 1}`,
        name: newRole.name,
        description: newRole.description,
        isDefault: newRole.isDefault,
        isSystem: false,
        permissions: newRole.permissions,
        memberCount: 0,
      }

      // If new role is set as default, update other roles
      let updatedRoles = roles
      if (newRole.isDefault) {
        updatedRoles = roles.map((role) => ({
          ...role,
          isDefault: false,
        }))
      }

      setRoles([...updatedRoles, createdRole])
      setIsSaving(false)
      setIsCreateRoleOpen(false)
      setNewRole({
        name: "",
        description: "",
        isDefault: false,
        permissions: defaultPermissions.map((p) => ({ ...p, checked: false })),
      })

      toast({
        title: "Role created",
        description: `${createdRole.name} role has been created successfully`,
        type: "success",
      })
    }, 1500)
  }

  const handleEditRole = () => {
    if (!currentRole) return

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // If edited role is set as default, update other roles
      let updatedRoles = roles
      if (currentRole.isDefault) {
        updatedRoles = roles.map((role) => ({
          ...role,
          isDefault: role.id === currentRole.id,
        }))
      }

      setRoles(updatedRoles.map((role) => (role.id === currentRole.id ? currentRole : role)))

      setIsSaving(false)
      setIsEditRoleOpen(false)
      setCurrentRole(null)

      toast({
        title: "Role updated",
        description: `${currentRole.name} role has been updated successfully`,
        type: "success",
      })
    }, 1500)
  }

  const handleDeleteRole = (roleId: string) => {
    const roleToDelete = roles.find((role) => role.id === roleId)

    if (!roleToDelete) return

    if (roleToDelete.isSystem) {
      toast({
        title: "Cannot delete system role",
        description: "System roles cannot be deleted",
        type: "error",
      })
      return
    }

    if (roleToDelete.memberCount > 0) {
      toast({
        title: "Role in use",
        description: `This role is assigned to ${roleToDelete.memberCount} member(s). Please reassign them before deleting.`,
        type: "error",
      })
      return
    }

    setRoles(roles.filter((role) => role.id !== roleId))

    toast({
      title: "Role deleted",
      description: `${roleToDelete.name} role has been deleted successfully`,
      type: "default",
    })
  }

  const handleTogglePermission = (roleId: string, permissionId: string, checked: boolean) => {
    setRoles(
      roles.map((role) => {
        if (role.id === roleId) {
          return {
            ...role,
            permissions: role.permissions.map((permission) =>
              permission.id === permissionId ? { ...permission, checked } : permission,
            ),
          }
        }
        return role
      }),
    )
  }

  const handleEditCurrentRole = (roleId: string) => {
    const roleToEdit = roles.find((role) => role.id === roleId)
    if (!roleToEdit) return

    setCurrentRole(roleToEdit)
    setIsEditRoleOpen(true)
  }

  const handleToggleDefault = (roleId: string) => {
    setRoles(
      roles.map((role) => ({
        ...role,
        isDefault: role.id === roleId,
      })),
    )

    const defaultRole = roles.find((role) => role.id === roleId)

    toast({
      title: "Default role updated",
      description: `${defaultRole?.name} is now the default role for new members`,
      type: "success",
    })
  }

  const getPermissionIcon = (permissionId: string) => {
    if (permissionId.startsWith("content")) {
      return <FileText className="h-4 w-4" />
    } else if (permissionId.startsWith("member")) {
      return <Users className="h-4 w-4" />
    } else if (permissionId.startsWith("analytics")) {
      return <BarChart className="h-4 w-4" />
    } else if (permissionId.startsWith("settings")) {
      return <Settings className="h-4 w-4" />
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Team Roles and Permissions</h2>

        <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Shield className="h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with custom permissions</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Enter role name"
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Enter role description"
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="default"
                  checked={newRole.isDefault}
                  onCheckedChange={(checked) => setNewRole({ ...newRole, isDefault: checked as boolean })}
                />
                <label
                  htmlFor="default"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make this the default role for new members
                </label>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-3">Permissions</h4>
                <div className="space-y-4">
                  {newRole.permissions.map((permission) => (
                    <div key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <Checkbox
                        id={`new-${permission.id}`}
                        checked={permission.checked}
                        onCheckedChange={(checked) => {
                          setNewRole({
                            ...newRole,
                            permissions: newRole.permissions.map((p) =>
                              p.id === permission.id ? { ...p, checked: checked as boolean } : p,
                            ),
                          })
                        }}
                      />
                      <div className="space-y-1 leading-none">
                        <label
                          htmlFor={`new-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                        >
                          {getPermissionIcon(permission.id)}
                          {permission.name}
                        </label>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                Cancel
              </Button>
              <Button
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                onClick={handleCreateRole}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    Create Role
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <Card key={role.id} className={`border ${role.isDefault ? "border-primary/30" : ""}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                {role.isDefault && (
                  <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">Default</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>
                    {role.memberCount} {role.memberCount === 1 ? "member" : "members"}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Permissions</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {role.permissions
                      .filter((p) => p.checked)
                      .slice(0, 4)
                      .map((permission) => (
                        <div key={permission.id} className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getPermissionIcon(permission.id)}
                          <span>{permission.name}</span>
                        </div>
                      ))}
                    {role.permissions.filter((p) => p.checked).length > 4 && (
                      <div className="text-xs text-muted-foreground">
                        +{role.permissions.filter((p) => p.checked).length - 4} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              {!role.isSystem && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteRole(role.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}

              <div className="flex gap-2">
                {!role.isDefault && !role.isSystem && (
                  <Button variant="outline" size="sm" onClick={() => handleToggleDefault(role.id)}>
                    Make Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditCurrentRole(role.id)}
                  disabled={role.isSystem && role.id === "owner"}
                >
                  <PenSquare className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Role: {currentRole?.name}</DialogTitle>
            <DialogDescription>Modify role details and permissions</DialogDescription>
          </DialogHeader>

          {currentRole && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-name" className="text-sm font-medium">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="edit-name"
                  value={currentRole.name}
                  onChange={(e) => setCurrentRole({ ...currentRole, name: e.target.value })}
                  placeholder="Enter role name"
                  className="border-primary/20 focus:border-primary"
                  disabled={currentRole.isSystem}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="edit-description"
                  value={currentRole.description}
                  onChange={(e) => setCurrentRole({ ...currentRole, description: e.target.value })}
                  placeholder="Enter role description"
                  className="border-primary/20 focus:border-primary"
                  disabled={currentRole.isSystem}
                />
              </div>

              {!currentRole.isSystem && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-default"
                    checked={currentRole.isDefault}
                    onCheckedChange={(checked) => setCurrentRole({ ...currentRole, isDefault: checked as boolean })}
                  />
                  <label
                    htmlFor="edit-default"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Make this the default role for new members
                  </label>
                </div>
              )}

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-3">Permissions</h4>
                <div className="space-y-4">
                  {currentRole.permissions.map((permission) => (
                    <div key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                      <Checkbox
                        id={`edit-${permission.id}`}
                        checked={permission.checked}
                        onCheckedChange={(checked) =>
                          handleTogglePermission(currentRole.id, permission.id, checked as boolean)
                        }
                        disabled={currentRole.isSystem && currentRole.id === "owner"}
                      />
                      <div className="space-y-1 leading-none">
                        <label
                          htmlFor={`edit-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
                        >
                          {getPermissionIcon(permission.id)}
                          {permission.name}
                        </label>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              onClick={handleEditRole}
              disabled={isSaving || !currentRole || (currentRole.isSystem && currentRole.id === "owner")}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
