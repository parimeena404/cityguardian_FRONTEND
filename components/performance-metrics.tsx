"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, Zap, TrendingUp } from "lucide-react"

interface PerformanceMetricsProps {
  compact?: boolean
}

export default function PerformanceMetrics({ compact = false }: PerformanceMetricsProps) {
  const metrics = [
    {
      label: "Tasks Completed",
      value: "28",
      goal: "35",
      icon: CheckCircle2,
      color: "from-accent to-blue-600",
      progress: 80,
    },
    {
      label: "Avg Completion Time",
      value: "2.5h",
      goal: "2h",
      icon: Clock,
      color: "from-secondary to-orange-600",
      progress: 65,
    },
    {
      label: "Efficiency Score",
      value: "92%",
      goal: "95%",
      icon: Zap,
      color: "from-primary to-blue-500",
      progress: 92,
    },
    {
      label: "Current Streak",
      value: "15 days",
      goal: "30 days",
      icon: TrendingUp,
      color: "from-accent/80 to-green-600",
      progress: 50,
    },
  ]

  if (compact) {
    return (
      <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
        <h3 className="font-bold text-lg text-foreground mb-4">Your Performance</h3>
        <div className="space-y-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon
            return (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-foreground/60" />
                    <span className="text-sm text-foreground">{metric.label}</span>
                  </div>
                  <span className="font-bold text-accent">{metric.value}</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            )
          })}
        </div>
      </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <Card key={i} className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-foreground/60 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
                <p className="text-xs text-foreground/50 mt-1">Goal: {metric.goal}</p>
              </div>
              <Icon className="w-6 h-6 text-accent/70" />
            </div>
            <Progress value={metric.progress} className="h-2" />
          </Card>
        )
      })}
    </div>
  )
}
