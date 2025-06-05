"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Bot,
  User,
  Send,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  Paperclip,
  Loader2,
  Mic,
  MicOff,
  Trash,
  Clock,
  ArrowRight,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  attachments?: {
    type: "image" | "file"
    url: string
    name: string
  }[]
}

type SuggestionCategory = {
  name: string
  suggestions: string[]
}

type ChatHistory = {
  id: string
  title: string
  preview: string
  date: Date
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm ChurnX AI, your personal content assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: "hist1",
      title: "Content Strategy",
      preview: "We discussed content strategy for Q3...",
      date: new Date(Date.now() - 86400000), // yesterday
    },
    {
      id: "hist2",
      title: "Instagram Campaign",
      preview: "Planning for the summer campaign...",
      date: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: "hist3",
      title: "TikTok Analytics",
      preview: "Analysis of recent TikTok performance...",
      date: new Date(Date.now() - 345600000), // 4 days ago
    },
  ])
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const suggestionCategories: SuggestionCategory[] = [
    {
      name: "Content Ideas",
      suggestions: [
        "Generate a viral post idea for Instagram",
        "What's trending on TikTok right now?",
        "Create a LinkedIn post about AI marketing",
      ],
    },
    {
      name: "Analytics",
      suggestions: [
        "Analyze my recent post performance",
        "How can I improve my engagement rate?",
        "What's the best time to post on Twitter?",
      ],
    },
    {
      name: "Campaign Help",
      suggestions: [
        "Create a multi-platform campaign strategy",
        "How to optimize my ad budget?",
        "Suggest hashtags for my fashion campaign",
      ],
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages, isMinimized])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your request and created some content options for you. Would you like to see them?",
        "Based on current trends, I recommend focusing on short-form video content for maximum engagement.",
        "I've generated a campaign strategy that could increase your engagement by up to 30%. Would you like me to show you?",
        "Your recent posts are performing well, but I see opportunities to optimize your hashtag strategy.",
        "I've analyzed your audience data and found that your followers are most active between 6-8pm. Would you like me to schedule your posts for these times?",
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    // Focus the input after selecting a suggestion
    inputRef.current?.focus()
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Process each file
    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith("image/")
      const fileUrl = URL.createObjectURL(file)

      // Create a message with the attachment
      const userMessage: Message = {
        id: Date.now().toString() + Math.random(),
        content: isImage ? "I've uploaded an image." : `I've uploaded a file: ${file.name}`,
        role: "user",
        timestamp: new Date(),
        attachments: [
          {
            type: isImage ? "image" : "file",
            url: fileUrl,
            name: file.name,
          },
        ],
      }

      setMessages((prev) => [...prev, userMessage])

      // Simulate AI response for the uploaded file
      setIsLoading(true)
      setTimeout(() => {
        const aiMessage: Message = {
          id: Date.now().toString() + Math.random(),
          content: isImage
            ? "I've analyzed the image you uploaded. Would you like me to suggest some captions or content ideas based on it?"
            : `I've processed the file "${file.name}". How would you like me to help with this content?`,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      }, 2000)
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      if (recordingInterval) {
        clearInterval(recordingInterval)
        setRecordingInterval(null)
      }

      // Simulate processing the voice recording
      setIsLoading(true)
      setTimeout(() => {
        const userMessage: Message = {
          id: Date.now().toString(),
          content: "Can you help me create a content strategy for my new product launch?",
          role: "user",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])

        // Simulate AI response
        setTimeout(() => {
          const aiMessage: Message = {
            id: Date.now().toString() + Math.random(),
            content:
              "I'd be happy to help with your product launch content strategy! To create an effective plan, I recommend a multi-platform approach with teaser content, launch day materials, and follow-up engagement posts. Would you like me to create a detailed timeline with content suggestions for each phase?",
            role: "assistant",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, aiMessage])
          setIsLoading(false)
        }, 1500)
      }, 1000)

      setRecordingTime(0)
    } else {
      // Start recording
      setIsRecording(true)
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
      setRecordingInterval(interval)
    }
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const clearChat = () => {
    // Save current chat to history
    if (messages.length > 1) {
      const userMessages = messages.filter((m) => m.role === "user")
      const newHistory: ChatHistory = {
        id: Date.now().toString(),
        title:
          userMessages.length > 0
            ? userMessages[0].content.substring(0, 20) + (userMessages[0].content.length > 20 ? "..." : "")
            : "New Conversation",
        preview: messages[messages.length - 1].content.substring(0, 40) + "...",
        date: new Date(),
      }

      setChatHistories((prev) => [newHistory, ...prev])
    }

    // Reset chat
    setMessages([
      {
        id: "1",
        content: "Hi there! I'm ChurnX AI, your personal content assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    setShowSuggestions(true)
  }

  const loadChatHistory = (historyId: string) => {
    // In a real app, you would load the actual messages from a database
    // For this demo, we'll just simulate loading a chat history
    const history = chatHistories.find((h) => h.id === historyId)
    if (!history) return

    setMessages([
      {
        id: "hist-1",
        content: "Hi there! I'm ChurnX AI, your personal content assistant. How can I help you today?",
        role: "assistant",
        timestamp: new Date(history.date.getTime() - 300000), // 5 minutes before
      },
      {
        id: "hist-2",
        content: history.title.replace("...", ""),
        role: "user",
        timestamp: new Date(history.date.getTime() - 240000), // 4 minutes before
      },
      {
        id: "hist-3",
        content: "I'll help you with that! Let me analyze your request.",
        role: "assistant",
        timestamp: new Date(history.date.getTime() - 180000), // 3 minutes before
      },
      {
        id: "hist-4",
        content: "Can you provide more details about the target audience?",
        role: "assistant",
        timestamp: new Date(history.date.getTime() - 120000), // 2 minutes before
      },
      {
        id: "hist-5",
        content: "My target audience is primarily millennials interested in sustainable fashion.",
        role: "user",
        timestamp: new Date(history.date.getTime() - 60000), // 1 minute before
      },
      {
        id: "hist-6",
        content: history.preview.replace("...", ""),
        role: "assistant",
        timestamp: history.date,
      },
    ])

    setActiveTab("chat")
    setShowSuggestions(false)
  }

  return (
    <>
      {/* Chat Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleChat}
              className={cn(
                "fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg",
                "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90",
                isOpen && "bg-muted hover:bg-muted",
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">{isOpen ? "Close AI Assistant" : "Open AI Assistant"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-40 w-full max-w-md"
          >
            <Card className="flex h-[600px] flex-col overflow-hidden border-2 border-primary/20 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-primary/10 to-accent/10 p-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">ChurnX AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Powered by AI</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={toggleMinimize}>
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleChat}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="flex flex-1 flex-col overflow-hidden"
                  >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="chat">Chat</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                      </TabsList>

                      <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
                        <ScrollArea className="flex-1 p-4">
                          <div className="flex flex-col gap-4">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className={cn(
                                  "flex w-max max-w-[80%] flex-col gap-2 rounded-lg p-4",
                                  message.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  {message.role === "assistant" ? (
                                    <Bot className="h-4 w-4" />
                                  ) : (
                                    <User className="h-4 w-4" />
                                  )}
                                  <span className="text-xs font-medium">
                                    {message.role === "assistant" ? "ChurnX AI" : "You"}
                                  </span>
                                </div>
                                <p className="text-sm">{message.content}</p>

                                {/* Display attachments if any */}
                                {message.attachments && message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {message.attachments.map((attachment, index) => (
                                      <div key={index} className="rounded-md overflow-hidden border">
                                        {attachment.type === "image" ? (
                                          <img
                                            src={attachment.url || "/placeholder.svg"}
                                            alt={attachment.name}
                                            className="max-h-40 w-full object-cover"
                                          />
                                        ) : (
                                          <div className="flex items-center gap-2 p-2 bg-background/50">
                                            <Paperclip className="h-4 w-4" />
                                            <span className="text-xs truncate">{attachment.name}</span>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                <span className="text-xs opacity-70">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            ))}
                            {isLoading && (
                              <div className="flex w-max max-w-[80%] flex-col gap-2 rounded-lg bg-muted p-4">
                                <div className="flex items-center gap-2">
                                  <Bot className="h-4 w-4" />
                                  <span className="text-xs font-medium">ChurnX AI</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <p className="text-sm">Thinking...</p>
                                </div>
                              </div>
                            )}
                            <div ref={messagesEndRef} />
                          </div>
                        </ScrollArea>

                        {showSuggestions && messages.length === 1 && (
                          <div className="px-4 pb-4">
                            <div className="rounded-lg border bg-card p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <h4 className="text-sm font-medium">Suggested questions</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => setShowSuggestions(false)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="space-y-4">
                                {suggestionCategories.map((category) => (
                                  <div key={category.name} className="space-y-2">
                                    <h5 className="text-xs font-medium text-muted-foreground">{category.name}</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {category.suggestions.map((suggestion) => (
                                        <Button
                                          key={suggestion}
                                          variant="outline"
                                          size="sm"
                                          className="h-auto py-1.5 text-xs"
                                          onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                          {suggestion}
                                        </Button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-end px-4 py-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground"
                            onClick={clearChat}
                          >
                            <Trash className="mr-1 h-3 w-3" />
                            Clear chat
                          </Button>
                        </div>

                        <CardFooter className="border-t bg-card p-4">
                          {isRecording ? (
                            <div className="flex w-full items-center justify-between rounded-md border border-destructive bg-destructive/10 px-4 py-2">
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                                <span className="text-sm font-medium text-destructive">
                                  Recording... {formatRecordingTime(recordingTime)}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:bg-destructive/20 hover:text-destructive"
                                onClick={toggleRecording}
                              >
                                <MicOff className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                              }}
                              className="flex w-full items-center gap-2"
                            >
                              <div className="relative flex-1">
                                <Input
                                  ref={inputRef}
                                  placeholder="Ask me anything..."
                                  value={inputValue}
                                  onChange={(e) => setInputValue(e.target.value)}
                                  onKeyDown={handleKeyDown}
                                  className="pr-20"
                                  disabled={isLoading}
                                />
                                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground"
                                    onClick={handleFileUpload}
                                  >
                                    <Paperclip className="h-4 w-4" />
                                  </Button>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                    multiple
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground"
                                    onClick={toggleRecording}
                                  >
                                    <Mic className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <Button
                                type="submit"
                                size="icon"
                                disabled={inputValue.trim() === "" || isLoading}
                                className="bg-primary hover:bg-primary/90"
                              >
                                {isLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Send className="h-4 w-4" />
                                )}
                              </Button>
                            </form>
                          )}
                        </CardFooter>
                      </TabsContent>

                      <TabsContent value="history" className="flex-1 flex flex-col overflow-hidden">
                        <ScrollArea className="flex-1 p-4">
                          {chatHistories.length > 0 ? (
                            <div className="space-y-3">
                              {chatHistories.map((history) => (
                                <div
                                  key={history.id}
                                  className="rounded-lg border p-3 hover:bg-accent/10 cursor-pointer transition-colors"
                                  onClick={() => loadChatHistory(history.id)}
                                >
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{history.title}</h4>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span>
                                        {history.date.toLocaleDateString(undefined, {
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1">{history.preview}</p>
                                  <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs text-primary">
                                    Continue conversation
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center text-center p-4">
                              <Clock className="h-8 w-8 text-muted-foreground mb-2" />
                              <h3 className="font-medium">No conversation history</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Your conversations will appear here once you start chatting with the AI assistant.
                              </p>
                              <Button variant="outline" size="sm" className="mt-4" onClick={() => setActiveTab("chat")}>
                                Start a new conversation
                              </Button>
                            </div>
                          )}
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
