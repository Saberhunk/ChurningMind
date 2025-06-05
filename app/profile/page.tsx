import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileInfo from "@/components/profile-info"
import AccountSettings from "@/components/account-settings"
import TeamManagement from "@/components/team-management"
import BillingInfo from "@/components/billing-info"

export const metadata: Metadata = {
  title: "ChurnX - Profile",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <div className="grid-pattern">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Profile Information</CardTitle>
                <CardDescription>Update your profile information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileInfo />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-secondary">Account Settings</CardTitle>
                <CardDescription>Manage your account settings and security</CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="team">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-accent">Team Management</CardTitle>
                <CardDescription>Manage your team members and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <TeamManagement />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
            <Card className="cyberpunk-card">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Billing Information</CardTitle>
                <CardDescription>Manage your subscription and billing details</CardDescription>
              </CardHeader>
              <CardContent>
                <BillingInfo />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
