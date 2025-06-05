"use client"

import { useState, useEffect } from "react"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  addHours,
} from "date-fns"
import { ChevronLeft, ChevronRight, Plus, MoreHorizontal, CalendarIcon, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

type CalendarEvent = {
  id: string
  title: string
  description?: string
  date: Date
  platform: string
  type: string
  status: "scheduled" | "published" | "draft"
  time?: string
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  facebook: "#4267B2",
  linkedin: "#0077B5",
  tiktok: "#000000",
  youtube: "#FF0000",
  all: "#6366F1",
}

// Sample events
const generateEvents = (): CalendarEvent[] => {
  const today = new Date()
  const events: CalendarEvent[] = []

  // Generate some events for the current month
  for (let i = 0; i < 15; i++) {
    const date = new Date(today)
    date.setDate(Math.floor(Math.random() * 28) + 1)

    // Random hour between 8 AM and 8 PM
    date.setHours(Math.floor(Math.random() * 12) + 8, 0, 0, 0)

    const platforms = ["instagram", "twitter", "facebook", "linkedin", "tiktok", "youtube"]
    const types = ["post", "story", "reel", "video", "carousel", "article"]
    const statuses: ("scheduled" | "published" | "draft")[] = ["scheduled", "published", "draft"]

    const platform = platforms[Math.floor(Math.random() * platforms.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const status = statuses[Math.floor(Math.random() * statuses.length)]

    events.push({
      id: `event-${i}`,
      title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} ${type} ${i + 1}`,
      description: `This is a ${type} for ${platform} scheduled for ${format(date, "PPP")}`,
      date,
      platform,
      type,
      status,
      time: format(date, "HH:mm"),
    })
  }

  return events
}

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>(generateEvents())
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Add states for the scheduling dialog
  const [isSchedulingDialogOpen, setIsSchedulingDialogOpen] = useState(false)
  const [schedulingDate, setSchedulingDate] = useState<Date | null>(null)
  const [schedulingEvent, setSchedulingEvent] = useState({
    title: "",
    description: "",
    platform: "instagram",
    type: "post",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "12:00",
    status: "scheduled" as const,
  })

  // Add state for event editing
  const [isEditingEvent, setIsEditingEvent] = useState(false)
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)

  // Add state for view mode
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  useEffect(() => {
    // Simulate loading events
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const filteredEvents = filter === "all" ? events : events.filter((event) => event.platform === filter)

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.date, day))
  }

  const handleSelectDate = (day: Date) => {
    setSelectedDate(isSameDay(day, selectedDate as Date) ? null : day)
  }

  // Update the handleAddEvent function
  const handleAddEvent = (day?: Date) => {
    if (day) {
      setSchedulingDate(day)
      setSchedulingEvent({
        ...schedulingEvent,
        title: "",
        description: "",
        date: format(day, "yyyy-MM-dd"),
      })
    } else {
      setSchedulingDate(new Date())
      setSchedulingEvent({
        ...schedulingEvent,
        title: "",
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
      })
    }
    setIsEditingEvent(false)
    setIsSchedulingDialogOpen(true)
  }

  // Add function to handle event editing
  const handleEditEvent = (event: CalendarEvent) => {
    setEventToEdit(event)
    setSchedulingDate(event.date)
    setSchedulingEvent({
      title: event.title,
      description: event.description || "",
      platform: event.platform,
      type: event.type,
      date: format(event.date, "yyyy-MM-dd"),
      time: event.time || format(event.date, "HH:mm"),
      status: event.status,
    })
    setIsEditingEvent(true)
    setIsSchedulingDialogOpen(true)
  }

  // Add function to handle event deletion
  const handleDeleteEvent = (eventId: string) => {
    setEventToDelete(eventId)
    setIsDeleting(true)
  }

  const confirmDeleteEvent = () => {
    if (!eventToDelete) return

    setEvents(events.filter((event) => event.id !== eventToDelete))
    setIsDeleting(false)
    setEventToDelete(null)

    toast({
      title: "Event deleted",
      description: "The event has been deleted successfully",
      type: "success",
    })
  }

  // Add function to create or update event
  const handleCreateOrUpdateEvent = () => {
    if (!schedulingEvent.title || !schedulingDate) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a date",
        type: "error",
      })
      return
    }

    // Create date from selected date and time
    const [hours, minutes] = schedulingEvent.time.split(":").map(Number)
    const eventDate = new Date(schedulingDate)
    eventDate.setHours(hours, minutes, 0, 0)

    if (isEditingEvent && eventToEdit) {
      // Update existing event
      setEvents(
        events.map((event) => {
          if (event.id === eventToEdit.id) {
            return {
              ...event,
              title: schedulingEvent.title,
              description: schedulingEvent.description,
              date: eventDate,
              platform: schedulingEvent.platform,
              type: schedulingEvent.type,
              status: schedulingEvent.status,
              time: schedulingEvent.time,
            }
          }
          return event
        }),
      )

      toast({
        title: "Event updated",
        description: `"${schedulingEvent.title}" has been updated`,
        type: "success",
      })
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`,
        title: schedulingEvent.title,
        description: schedulingEvent.description,
        date: eventDate,
        platform: schedulingEvent.platform,
        type: schedulingEvent.type,
        status: schedulingEvent.status,
        time: schedulingEvent.time,
      }

      setEvents([...events, newEvent])

      toast({
        title: "Event scheduled",
        description: `"${schedulingEvent.title}" has been scheduled for ${format(eventDate, "PPpp")}`,
        type: "success",
      })
    }

    setIsSchedulingDialogOpen(false)
    setEventToEdit(null)
    setIsEditingEvent(false)
  }

  // Function to duplicate an event
  const handleDuplicateEvent = (event: CalendarEvent) => {
    const duplicatedEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}`,
      title: `Copy of ${event.title}`,
      date: addHours(event.date, 24), // Schedule for next day
    }

    setEvents([...events, duplicatedEvent])

    toast({
      title: "Event duplicated",
      description: `"${duplicatedEvent.title}" has been created`,
      type: "success",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">{format(currentDate, "MMMM yyyy")}</h3>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px] border-purple-500/20">
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select value={viewMode} onValueChange={(value) => setViewMode(value as "month" | "week" | "day")}>
            <SelectTrigger className="w-[120px] border-purple-500/20">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>

          <Button
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            onClick={() => handleAddEvent()}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2 text-sm font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, index) => (
              <div key={`empty-start-${index}`} className="h-24 rounded-md border border-transparent p-1" />
            ))}

            {monthDays.map((day) => {
              const dayEvents = getEventsForDay(day)
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false

              return (
                <div
                  key={day.toISOString()}
                  className={`
                    h-24 overflow-hidden rounded-md border p-1 transition-colors cursor-pointer
                    ${isToday(day) ? "border-purple-500/50 bg-purple-500/5" : "border-border hover:border-purple-500/30"}
                    ${isSelected ? "border-purple-500 bg-purple-500/10" : ""}
                    ${!isSameMonth(day, currentDate) ? "opacity-50" : ""}
                  `}
                  onClick={() => handleSelectDate(day)}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`
                      text-sm font-medium
                      ${isToday(day) ? "rounded-full bg-purple-500 px-1.5 py-0.5 text-white" : ""}
                    `}
                    >
                      {format(day, "d")}
                    </span>
                    {dayEvents.length > 0 && (
                      <Badge className="bg-purple-500/10 text-purple-500">{dayEvents.length}</Badge>
                    )}
                  </div>

                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center gap-1 rounded-sm px-1 py-0.5 text-xs"
                        style={{ backgroundColor: `${PLATFORM_COLORS[event.platform]}20` }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: PLATFORM_COLORS[event.platform] }}
                        />
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="px-1 text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                    )}
                  </div>
                </div>
              )
            })}

            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, index) => (
              <div key={`empty-end-${index}`} className="h-24 rounded-md border border-transparent p-1" />
            ))}
          </div>
        </>
      )}

      {selectedDate && (
        <Card className="border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/20 hover:bg-purple-500/10"
                onClick={() => handleAddEvent(selectedDate)}
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Event
              </Button>
            </div>

            <div className="mt-4 space-y-2">
              {getEventsForDay(selectedDate).length > 0 ? (
                getEventsForDay(selectedDate).map((event) => (
                  <div key={event.id} className="flex items-center justify-between rounded-md border p-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-1 rounded-full"
                        style={{ backgroundColor: PLATFORM_COLORS[event.platform] }}
                      />
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="capitalize"
                            style={{
                              borderColor: `${PLATFORM_COLORS[event.platform]}50`,
                              color: PLATFORM_COLORS[event.platform],
                            }}
                          >
                            {event.platform}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {event.type}
                          </Badge>
                          <Badge
                            className={`
                              ${
                                event.status === "scheduled"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : event.status === "published"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                              }
                            `}
                          >
                            {event.status}
                          </Badge>
                        </div>
                        {event.time && <p className="text-xs text-muted-foreground mt-1">{event.time}</p>}
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditEvent(event)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateEvent(event)}>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteEvent(event.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="flex h-24 items-center justify-center rounded-md border border-dashed">
                  <p className="text-sm text-muted-foreground">No events scheduled for this day</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scheduling Dialog */}
      <Dialog open={isSchedulingDialogOpen} onOpenChange={setIsSchedulingDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditingEvent ? "Edit Event" : "Schedule New Content"}</DialogTitle>
            <DialogDescription>
              {schedulingDate
                ? `${isEditingEvent ? "Edit" : "Schedule"} content for ${format(parseISO(schedulingEvent.date), "PPPP")}`
                : "Select date and time to schedule your content"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Content Title</Label>
                <Input
                  id="title"
                  placeholder="Enter content title or description"
                  value={schedulingEvent.title}
                  onChange={(e) => setSchedulingEvent({ ...schedulingEvent, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Enter additional details about this content"
                  value={schedulingEvent.description}
                  onChange={(e) => setSchedulingEvent({ ...schedulingEvent, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    value={schedulingEvent.platform}
                    onValueChange={(value) => setSchedulingEvent({ ...schedulingEvent, platform: value })}
                  >
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select
                    value={schedulingEvent.type}
                    onValueChange={(value) => setSchedulingEvent({ ...schedulingEvent, type: value })}
                  >
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">Post</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="reel">Reel</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    id="date"
                    value={schedulingEvent.date}
                    onChange={(e) => setSchedulingEvent({ ...schedulingEvent, date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    type="time"
                    id="time"
                    value={schedulingEvent.time}
                    onChange={(e) => setSchedulingEvent({ ...schedulingEvent, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={schedulingEvent.status}
                  onValueChange={(value: "scheduled" | "published" | "draft") =>
                    setSchedulingEvent({ ...schedulingEvent, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="optimize-time" defaultChecked />
                <label htmlFor="optimize-time" className="text-sm text-muted-foreground">
                  Optimize posting time for maximum engagement
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSchedulingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOrUpdateEvent}>{isEditingEvent ? "Update Event" : "Schedule Content"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-4">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <p className="text-sm">This will permanently remove the event from your calendar.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteEvent}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
