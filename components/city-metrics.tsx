"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Target, Users, AlertTriangle } from "lucide-react"

export default function CityMetrics() {
  const metrics = [
    {
      label: "Average AQI",
      value: "78",
      target: "85",
      icon: Activity,
      color: "from-accent to-blue-600",
      status: "good",
    },
    {
      label: "Target Achievement",
      value: "92%",
      target: "90%",
      icon: Target,
      color: "from-secondary to-orange-600",
      status: "excellent",
    },
    {
      label: "Active Employees",
      value: "127",
      target: "150",
      icon: Users,
      color: "from-primary to-blue-500",
      status: "good",
    },
    {
      label: "Zone Alerts",
      value: "3",
      target: "0",
      icon: AlertTriangle,
      color: "from-destructive to-red-600",
      status: "warning",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        const progressValue =
          metric.label === "Zone Alerts"
            ? 0
            : metric.label === "Average AQI"
              ? (78 / 100) * 100
              : metric.label === "Active Employees"
                ? (127 / 150) * 100
                : 92
        return (
          <Card key={i} className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-foreground/60 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
                <p className="text-xs text-foreground/50 mt-1">Target: {metric.target}</p>
              </div>
              <Icon className="w-6 h-6 text-accent/70" />
            </div>
            <Progress value={progressValue} className="h-2" />
          </Card>
        )
      })}
    </div>
  )
}
