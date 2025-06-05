"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Sparkles, CreditCard, Zap, TrendingUp, ShoppingBag, Gift, Users, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MonetizationPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")
  const { toast } = useToast()

  const handlePlanSelection = (plan: string) => {
    toast({
      title: "Plan selected",
      description: `You've selected the ${plan} plan. Redirecting to checkout...`,
    })
  }

  const plans = {
    monthly: [
      {
        name: "Starter",
        price: "$29",
        description: "Perfect for individuals and small creators",
        features: [
          "5 social media accounts",
          "Basic analytics",
          "Content scheduling",
          "Basic AI post generation",
          "Email support",
        ],
        limitations: ["No team collaboration", "Limited AI features", "No advanced analytics"],
        cta: "Start Free Trial",
        popular: false,
      },
      {
        name: "Pro",
        price: "$79",
        description: "For growing creators and small businesses",
        features: [
          "15 social media accounts",
          "Advanced analytics",
          "Unlimited content scheduling",
          "Full AI post generation",
          "Auto-reply generation",
          "Priority email support",
          "Team collaboration (up to 3)",
          "Content calendar",
        ],
        limitations: ["Limited API access", "No white labeling"],
        cta: "Start Free Trial",
        popular: true,
      },
      {
        name: "Business",
        price: "$199",
        description: "For agencies and established businesses",
        features: [
          "Unlimited social media accounts",
          "Enterprise-grade analytics",
          "Unlimited content scheduling",
          "Advanced AI features",
          "Custom auto-reply generation",
          "24/7 priority support",
          "Team collaboration (unlimited)",
          "Content calendar",
          "API access",
          "White labeling",
          "Dedicated account manager",
        ],
        limitations: [],
        cta: "Contact Sales",
        popular: false,
      },
    ],
    annual: [
      {
        name: "Starter",
        price: "$24",
        description: "Perfect for individuals and small creators",
        features: [
          "5 social media accounts",
          "Basic analytics",
          "Content scheduling",
          "Basic AI post generation",
          "Email support",
        ],
        limitations: ["No team collaboration", "Limited AI features", "No advanced analytics"],
        cta: "Start Free Trial",
        popular: false,
        savings: "Save $60/year",
      },
      {
        name: "Pro",
        price: "$65",
        description: "For growing creators and small businesses",
        features: [
          "15 social media accounts",
          "Advanced analytics",
          "Unlimited content scheduling",
          "Full AI post generation",
          "Auto-reply generation",
          "Priority email support",
          "Team collaboration (up to 3)",
          "Content calendar",
        ],
        limitations: ["Limited API access", "No white labeling"],
        cta: "Start Free Trial",
        popular: true,
        savings: "Save $168/year",
      },
      {
        name: "Business",
        price: "$169",
        description: "For agencies and established businesses",
        features: [
          "Unlimited social media accounts",
          "Enterprise-grade analytics",
          "Unlimited content scheduling",
          "Advanced AI features",
          "Custom auto-reply generation",
          "24/7 priority support",
          "Team collaboration (unlimited)",
          "Content calendar",
          "API access",
          "White labeling",
          "Dedicated account manager",
        ],
        limitations: [],
        cta: "Contact Sales",
        popular: false,
        savings: "Save $360/year",
      },
    ],
  }

  const addOns = [
    {
      name: "AI Credits Pack",
      price: "$49",
      description: "500 additional AI credits for content generation",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      name: "Advanced Analytics",
      price: "$29",
      description: "Deeper insights and competitor analysis",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Merchandise Store",
      price: "$99",
      description: "Set up your own merch store with AI-generated designs",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "NFT Marketplace",
      price: "$149",
      description: "Create and sell NFTs from your viral content",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      name: "Priority Support",
      price: "$39",
      description: "24/7 priority support with 1-hour response time",
      icon: <Zap className="h-5 w-5" />,
    },
  ]

  const enterpriseFeatures = [
    {
      name: "Custom AI Training",
      description: "Train AI on your brand voice and content style",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      name: "Dedicated Account Manager",
      description: "Personal support from a dedicated specialist",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Custom Integrations",
      description: "Connect with your existing tools and workflows",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Advanced Security",
      description: "Enhanced security features and compliance",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "White Labeling",
      description: "Rebrand ChurnX as your own platform",
      icon: <Star className="h-5 w-5" />,
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Monetization Plans
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan to grow your social media presence and maximize your revenue streams
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="bg-card rounded-lg p-1 inline-flex">
          <button
            className={`px-4 py-2 rounded-md ${
              billingCycle === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              billingCycle === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setBillingCycle("annual")}
          >
            Annual <Badge className="bg-green-500/20 text-green-500 text-xs">Save 20%</Badge>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans[billingCycle].map((plan, index) => (
          <Card
            key={index}
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              plan.popular ? "border-primary shadow-md" : "border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">/month</span>
                {plan.savings && <Badge className="ml-2 bg-green-500/20 text-green-500">{plan.savings}</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Features:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, i) => (
                      <li key={i} className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={() => handlePlanSelection(plan.name)}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Add-ons & Enhancements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOns.map((addon, index) => (
            <Card key={index} className="flex hover:shadow-md transition-shadow">
              <div className="p-4 flex items-center justify-center bg-muted">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {addon.icon}
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-medium">{addon.name}</h3>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
              <div className="p-4 flex flex-col items-end justify-between">
                <span className="font-bold">{addon.price}</span>
                <Button variant="outline" size="sm">
                  Add
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise Solutions</CardTitle>
            <CardDescription>Custom solutions for large organizations and agencies with advanced needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" className="gap-2">
              <Gift className="h-5 w-5" /> Schedule a Demo
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for
                annual plans. Enterprise customers can also pay via invoice.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I change my plan later?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while
                downgrades will take effect at the end of your current billing cycle.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We offer a 14-day money-back guarantee for all new subscriptions. If you're not satisfied with our
                service, contact our support team within 14 days of your purchase for a full refund.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What happens when I run out of AI credits?</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                You can purchase additional AI credits at any time. We also offer automatic top-ups to ensure you never
                run out of credits during critical campaigns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Our team is here to help you find the perfect solution for your needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
          <Button size="lg">Book a Demo</Button>
        </div>
      </div>
    </div>
  )
}
