"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Bot,
  Calendar,
  Home,
  ImageIcon,
  Menu,
  MessageSquare,
  Settings,
  Share2,
  Users,
  Briefcase,
  Zap,
  DollarSign,
  FileText,
  Handshake,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  CreditCard,
  LinkIcon,
  Workflow,
  Target,
  Globe,
} from "lucide-react"
import { Logo } from "./logo"

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    current: false,
  },
  {
    name: "Content Generator",
    href: "/generator",
    icon: Sparkles,
    current: false,
    badge: "AI",
  },
  {
    name: "Scheduler",
    href: "/scheduler",
    icon: Calendar,
    current: false,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    current: false,
  },
  {
    name: "Social Media",
    href: "/social",
    icon: Share2,
    current: false,
    children: [
      { name: "Dashboard", href: "/social", icon: Globe },
      { name: "Campaigns", href: "/social/campaigns", icon: Target },
      { name: "Accounts", href: "/social/accounts", icon: Users },
    ],
  },
  {
    name: "AI Assistant",
    href: "/ai-assistant",
    icon: Bot,
    current: false,
    badge: "New",
  },
  {
    name: "Workflows",
    href: "/workflows",
    icon: Workflow,
    current: false,
    badge: "Pro",
  },
  {
    name: "Meme Generator",
    href: "/meme-generator",
    icon: ImageIcon,
    current: false,
  },
  {
    name: "Auto Reply",
    href: "/auto-reply",
    icon: MessageSquare,
    current: false,
    badge: "AI",
  },
  {
    name: "Monetization",
    href: "/monetization",
    icon: DollarSign,
    current: false,
    children: [
      { name: "Overview", href: "/monetization", icon: TrendingUp },
      { name: "Merchandise", href: "/monetization/merchandise", icon: ShoppingBag },
      { name: "NFT Marketplace", href: "/monetization/nft", icon: CreditCard },
      { name: "Affiliate Programs", href: "/monetization/affiliate", icon: LinkIcon },
    ],
  },
  {
    name: "UGC Management",
    href: "/ugc",
    icon: FileText,
    current: false,
    badge: "Beta",
  },
  {
    name: "Collaboration",
    href: "/collaboration",
    icon: Handshake,
    current: false,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Briefcase,
    current: false,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    current: false,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: Settings,
    current: false,
  },
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Logo />
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            ChurnX
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-hidden">
        <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4 h-full">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || (item.children && item.children.some((child) => pathname === child.href))
            const isExpanded = expandedItems.includes(item.name)
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.name}>
                <div className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        isActive && "bg-muted text-primary",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                        isActive && "bg-muted text-primary",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )}
                </div>

                {hasChildren && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                          pathname === child.href && "bg-muted text-primary",
                        )}
                      >
                        <child.icon className="h-3 w-3" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Separator className="mb-4" />
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>AI Credits: 2,847</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <TrendingUp className="h-3 w-3" />
            <span>Revenue: $12,845</span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden border-r bg-muted/40 md:block", className)}>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
