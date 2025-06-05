"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingBag,
  CreditCard,
  TrendingUp,
  Link,
  Gift,
  Settings,
  PlusCircle,
  ChevronRight,
  ExternalLink,
  Loader2,
} from "lucide-react"

export default function MonetizationCenter() {
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)

  const handleCreateStore = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monetization Center</h1>
          <p className="text-muted-foreground">Manage all your revenue streams in one place</p>
        </div>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" /> Add Revenue Stream
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">$12,845</div>
              <div className="flex items-center text-green-500 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                12.5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. previous month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Merchandise Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">$5,240</div>
              <div className="flex items-center text-green-500 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                8.3%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">142 items sold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">NFT Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">$3,680</div>
              <div className="flex items-center text-green-500 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                24.1%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">18 NFTs sold</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Affiliate Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">$3,925</div>
              <div className="flex items-center text-green-500 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                15.7%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">89 conversions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="nft">NFT Marketplace</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliate Programs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Merchandise Store
                </CardTitle>
                <CardDescription>AI-generated designs for your brand</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Store Status</span>
                  <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Products</span>
                  <span className="font-medium">24 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$5,240</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">75% of monthly goal reached</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Store
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  NFT Marketplace
                </CardTitle>
                <CardDescription>Create and sell digital assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Collection Status</span>
                  <Badge className="bg-blue-500/20 text-blue-500">Minting</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">NFTs Created</span>
                  <span className="font-medium">47 items</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$3,680</span>
                </div>
                <Progress value={62} className="h-2" />
                <p className="text-xs text-muted-foreground">62% of monthly goal reached</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View Collection
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  Affiliate Programs
                </CardTitle>
                <CardDescription>Earn from product recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Programs</span>
                  <span className="font-medium">12 programs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conversion Rate</span>
                  <span className="font-medium">3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$3,925</span>
                </div>
                <Progress value={89} className="h-2" />
                <p className="text-xs text-muted-foreground">89% of monthly goal reached</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <Settings className="h-4 w-4" />
                  Manage Programs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Revenue Opportunities
                </CardTitle>
                <CardDescription>Suggested monetization strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Sponsored Posts</p>
                    <p className="text-xs text-muted-foreground">Potential: $2,500/month</p>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Course Creation</p>
                    <p className="text-xs text-muted-foreground">Potential: $5,000/month</p>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Membership Program</p>
                    <p className="text-xs text-muted-foreground">Potential: $3,200/month</p>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Explore Opportunities
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Track your monetization performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Revenue analytics chart would be displayed here</p>
                  <p className="text-sm">Showing trends, comparisons, and forecasts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchandise" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>Use AI to generate designs for your merchandise</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-type">Product Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirt">T-Shirt</SelectItem>
                      <SelectItem value="hoodie">Hoodie</SelectItem>
                      <SelectItem value="mug">Mug</SelectItem>
                      <SelectItem value="poster">Poster</SelectItem>
                      <SelectItem value="sticker">Sticker Pack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="design-prompt">Design Prompt</Label>
                  <Input
                    id="design-prompt"
                    placeholder="Describe your design idea..."
                    value="Cyberpunk-style logo with neon colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tech Enthusiasts</SelectItem>
                      <SelectItem value="gaming">Gamers</SelectItem>
                      <SelectItem value="fitness">Fitness Community</SelectItem>
                      <SelectItem value="general">General Audience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2" onClick={handleCreateStore} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
                  Generate Design
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Store Performance</CardTitle>
                <CardDescription>Your merchandise store analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">142</div>
                    <div className="text-sm text-muted-foreground">Items Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">$5,240</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Products</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>T-Shirts</span>
                    <span>68 sold</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Hoodies</span>
                    <span>34 sold</span>
                  </div>
                  <Progress value={34} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Mugs</span>
                    <span>25 sold</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Manage your merchandise inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">Cyberpunk T-Shirt #{item}</h3>
                      <p className="text-xs text-muted-foreground">$29.99</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          In Stock
                        </Badge>
                        <span className="text-xs">12 sold</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create NFT Collection</CardTitle>
                <CardDescription>Turn your viral content into valuable NFTs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="collection-name">Collection Name</Label>
                  <Input id="collection-name" placeholder="Enter collection name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content-source">Content Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content to mint" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viral-posts">Viral Posts</SelectItem>
                      <SelectItem value="ai-generated">AI Generated Art</SelectItem>
                      <SelectItem value="custom-upload">Custom Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mint-price">Mint Price (ETH)</Label>
                  <Input id="mint-price" placeholder="0.05" type="number" step="0.01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="royalty">Royalty Percentage</Label>
                  <Input id="royalty" placeholder="10" type="number" max="20" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <CreditCard className="h-4 w-4" />
                  Create Collection
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NFT Performance</CardTitle>
                <CardDescription>Track your NFT sales and metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm text-muted-foreground">NFTs Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-sm text-muted-foreground">NFTs Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.4 ETH</div>
                    <div className="text-sm text-muted-foreground">Total Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">0.8 ETH</div>
                    <div className="text-sm text-muted-foreground">Floor Price</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Collection 1</span>
                    <span>12 sold</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Collection 2</span>
                    <span>6 sold</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>NFT Gallery</CardTitle>
              <CardDescription>Your NFT collections and marketplace listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <CreditCard className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm">Viral Moment #{item}</h3>
                      <p className="text-xs text-muted-foreground">0.15 ETH</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge className="text-xs bg-purple-500/20 text-purple-500">Listed</Badge>
                        <span className="text-xs">3 bids</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliate" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Affiliate Program</CardTitle>
                <CardDescription>Connect with brands and earn commissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="program-name">Program Name</Label>
                  <Input id="program-name" placeholder="Enter program name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input id="commission-rate" placeholder="5" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Product Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-approve" />
                  <Label htmlFor="auto-approve">Auto-approve applications</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <Link className="h-4 w-4" />
                  Add Program
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Affiliate Performance</CardTitle>
                <CardDescription>Track your affiliate marketing success</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Active Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">89</div>
                    <div className="text-sm text-muted-foreground">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">3.2%</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">$3,925</div>
                    <div className="text-sm text-muted-foreground">Total Earnings</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tech Products</span>
                    <span>$1,850</span>
                  </div>
                  <Progress value={47} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Fashion</span>
                    <span>$1,240</span>
                  </div>
                  <Progress value={32} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Fitness</span>
                    <span>$835</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Affiliate Programs</CardTitle>
              <CardDescription>Manage your current affiliate partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "TechGear Pro",
                    category: "Technology",
                    commission: "8%",
                    earnings: "$1,850",
                    status: "Active",
                  },
                  { name: "StyleHub", category: "Fashion", commission: "12%", earnings: "$1,240", status: "Active" },
                  { name: "FitLife", category: "Fitness", commission: "15%", earnings: "$835", status: "Active" },
                  { name: "BeautyBox", category: "Beauty", commission: "10%", earnings: "$0", status: "Pending" },
                ].map((program, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Link className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{program.name}</h3>
                        <p className="text-sm text-muted-foreground">{program.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{program.commission} commission</p>
                        <p className="text-sm text-muted-foreground">{program.earnings} earned</p>
                      </div>
                      <Badge
                        className={
                          program.status === "Active"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }
                      >
                        {program.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure how you receive payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-method">Primary Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-threshold">Minimum Payout Threshold</Label>
                <Input id="payout-threshold" placeholder="$100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payout-frequency">Payout Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax information for your earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / SSN</Label>
                <Input id="tax-id" placeholder="Enter your tax ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-type">Business Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-tax" />
                <Label htmlFor="auto-tax">Automatically calculate taxes</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Choose how you want to be notified about earnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your earnings</p>
                </div>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get instant notifications for new sales</p>
                </div>
                <Switch id="push-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly performance summaries</p>
                </div>
                <Switch id="weekly-reports" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
