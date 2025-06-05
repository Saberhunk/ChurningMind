"use client"

import { useState } from "react"
import { CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function BillingInfo() {
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your current subscription plan and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-medium">
                Pro Plan
                <Badge className="bg-primary/10 text-primary">Current</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">$29.99/month, billed monthly</p>
            </div>
            <Button variant="outline">Change Plan</Button>
          </div>
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Usage</h4>
                <p className="text-sm text-muted-foreground">Next billing cycle on May 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium">250 / 500 credits used</p>
                <p className="text-sm text-muted-foreground">50% of your monthly credits</p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-2 w-1/2 rounded-full bg-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="card1">
            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value="card1" id="card1" />
                <Label htmlFor="card1" className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                  </div>
                </Label>
              </div>
              <Badge className="bg-green-500/10 text-green-500">Default</Badge>
            </div>
            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value="card2" id="card2" />
                <Label htmlFor="card2" className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Mastercard ending in 5678</p>
                    <p className="text-sm text-muted-foreground">Expires 08/2025</p>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
          <Button variant="outline" className="mt-2">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Update your billing address and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input id="name" defaultValue="Alex Johnson" />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">
                Company (Optional)
              </label>
              <Input id="company" defaultValue="Acme Inc." />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Address
            </label>
            <Input id="address" defaultValue="123 Main St" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <Input id="city" defaultValue="San Francisco" />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">
                State / Province
              </label>
              <Input id="state" defaultValue="CA" />
            </div>
            <div className="space-y-2">
              <label htmlFor="zip" className="text-sm font-medium">
                ZIP / Postal Code
              </label>
              <Input id="zip" defaultValue="94103" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium">
              Country
            </label>
            <Input id="country" defaultValue="United States" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your billing history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
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
    </div>
  )
}
