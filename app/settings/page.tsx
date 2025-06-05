"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Check, Save, RefreshCw, Bell, Moon, Sun, Globe, CreditCard, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const handleSave = () => {
    setSaving(true)

    // Simulate API call
    setTimeout(() => {
      setSaving(false)
      setSaved(true)

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
        type: "success",
      })

      setTimeout(() => {
        setSaved(false)
      }, 2000)
    }, 1500)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)

    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme activated`,
      description: `The application is now using the ${newTheme} theme`,
      type: "default",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="alexjohnson" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Secure your account with two-factor authentication</p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:border-primary ${theme === "light" ? "border-primary bg-primary/10" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm">
                    <Sun className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Light</span>
                </div>
                <div
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:border-primary ${theme === "dark" ? "border-primary bg-primary/10" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm">
                    <Moon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Dark</span>
                </div>
                <div
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:border-primary ${theme === "system" ? "border-primary bg-primary/10" : ""}`}
                  onClick={() => handleThemeChange("system")}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-900 text-white shadow-sm">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">System</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
              <CardDescription>Select your preferred language</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Customize accessibility settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch id="reduced-motion" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage your email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                </div>
                <Switch id="marketing-emails" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-emails">Activity Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                </div>
                <Switch id="activity-emails" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-emails">Security Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about your account security</p>
                </div>
                <Switch id="security-emails" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage your push notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-all">All Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable or disable all push notifications</p>
                </div>
                <Switch id="push-all" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-mentions">Mentions</Label>
                  <p className="text-sm text-muted-foreground">Notify when someone mentions you</p>
                </div>
                <Switch id="push-mentions" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-messages">Messages</Label>
                  <p className="text-sm text-muted-foreground">Notify when you receive a message</p>
                </div>
                <Switch id="push-messages" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">$29.99/month, billed monthly</p>
                  </div>
                  <Button variant="outline">Change Plan</Button>
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="mb-2 text-sm font-medium">Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited content generation
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Team collaboration
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <p className="font-medium">April 2023</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.99</p>
                    <p className="text-sm text-green-500">Paid</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between border-b p-4">
                  <div>
                    <p className="font-medium">March 2023</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.99</p>
                    <p className="text-sm text-green-500">Paid</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">February 2023</p>
                    <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.99</p>
                    <p className="text-sm text-green-500">Paid</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Changes discarded",
              description: "Your changes have been discarded",
              type: "default",
            })
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving || saved}
          className={saved ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
