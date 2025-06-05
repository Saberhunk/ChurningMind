import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AIChatbot } from "@/components/ai-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ChurnX - AI-Powered Viral Content Platform",
  description: "Create, schedule, and analyze viral content across all social media platforms",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen">
            <div className="hidden md:block">
              <Sidebar />
            </div>
            <div className="flex flex-1 flex-col">
              <Header />
              <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
          <AIChatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
