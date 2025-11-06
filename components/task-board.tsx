"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, AlertCircle, CheckCircle2 } from "lucide-react"

interface Task {
  id: number
  title: string
  description: string
  category: string
  categoryEmoji: string
  location: string
  priority: "low" | "medium" | "high"
  dueTime: string
  reward: number
  status: "pending" | "in-progress" | "completed"
  citizenReport?: string
}

const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Fix Pothole on Main Street",
    description: "Fill and repair the large pothole at Main St & 5th Ave. Citizen reported damage risk.",
    category: "Road Maintenance",
    categoryEmoji: "🕳️",
    location: "Main St & 5th Ave",
    priority: "high",
    dueTime: "3 hours",
    reward: 250,
    status: "in-progress",
    citizenReport: "Alex Johnson",
  },
  {
    id: 2,
    title: "Inspect Street Lights",
    description: "Check and repair non-functional street lights on Oak Road.",
    category: "Street Maintenance",
    categoryEmoji: "💡",
    location: "Oak Rd & Park Ave",
    priority: "high",
    dueTime: "5 hours",
    reward: 200,
    status: "pending",
    citizenReport: "Sarah Chen",
  },
  {
    id: 3,
    title: "Air Quality Monitoring",
    description: "Investigate unusual emissions reported. Take AQI readings and document findings.",
    category: "Environmental",
    categoryEmoji: "💨",
    location: "Industrial Zone",
    priority: "high",
    dueTime: "2 hours",
    reward: 300,
    status: "pending",
    citizenReport: "Mike Torres",
  },
  {
    id: 4,
    title: "Waste Collection",
    description: "Empty overflowing garbage bins and clean up debris.",
    category: "Sanitation",
    categoryEmoji: "🗑️",
    location: "Central Park Junction",
    priority: "medium",
    dueTime: "24 hours",
    reward: 120,
    status: "pending",
    citizenReport: "Emma Davis",
  },
]

const STATUS_COLORS = {
  pending: "bg-secondary/10 border-secondary/30 text-secondary",
  "in-progress": "bg-accent/10 border-accent/30 text-accent",
  completed: "bg-green-500/10 border-green-500/30 text-green-400",
}

const PRIORITY_COLORS = {
  low: "border-green-500/30 bg-green-500/10",
  medium: "border-secondary/30 bg-secondary/10",
  high: "border-destructive/30 bg-destructive/10",
}

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const filteredTasks = tasks.filter((task) => filter === "all" || task.status === filter)

  const updateTaskStatus = (taskId: number, newStatus: "pending" | "in-progress" | "completed") => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "in-progress", "completed"] as const).map((status) => (
          <Button
            key={status}
            onClick={() => setFilter(status)}
            variant={filter === status ? "default" : "outline"}
            className={`capitalize ${
              filter === status
                ? "bg-gradient-to-r from-accent to-secondary text-foreground"
                : "border-accent/30 text-foreground/70 hover:text-foreground"
            }`}
          >
            {status === "all"
              ? "All Tasks"
              : status === "in-progress"
                ? "In Progress"
                : status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center border-accent/20 bg-card/50">
            <CheckCircle2 className="w-12 h-12 text-accent/30 mx-auto mb-4" />
            <p className="text-foreground/60">All tasks completed! Great work.</p>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4 flex-1">
                  {/* Category Emoji */}
                  <div className="text-3xl flex-shrink-0">{task.categoryEmoji}</div>

                  {/* Task Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{task.title}</h3>
                      <Badge className={`capitalize ${STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]}`}>
                        {task.status}
                      </Badge>
                      {task.priority === "high" && (
                        <Badge className="bg-destructive/10 border-destructive/30 text-destructive">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent
                        </Badge>
                      )}
                    </div>

                    <p className="text-foreground/70 text-sm mb-3">{task.description}</p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm text-foreground/60 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {task.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due in {task.dueTime}
                      </span>
                      {task.citizenReport && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded bg-card/50 border border-accent/20">
                          Reported by {task.citizenReport}
                        </span>
                      )}
                    </div>

                    {/* Reward */}
                    <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-secondary to-accent/50 text-sm font-bold text-foreground">
                      +{task.reward} points
                    </div>
                  </div>
                </div>

                {/* Status Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  {task.status !== "in-progress" && (
                    <Button
                      onClick={() => updateTaskStatus(task.id, "in-progress")}
                      size="sm"
                      className="bg-accent/20 hover:bg-accent/30 border-accent/30 text-accent"
                      variant="outline"
                    >
                      Start
                    </Button>
                  )}
                  {task.status === "in-progress" && (
                    <Button
                      onClick={() => updateTaskStatus(task.id, "completed")}
                      size="sm"
                      className="bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400"
                      variant="outline"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
