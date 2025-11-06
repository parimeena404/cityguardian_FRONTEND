"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, AlertCircle, Award, Target } from "lucide-react"

export default function CitizenStats() {
  const stats = [
    {
      label: "Issues Reported",
      value: "0",
      icon: AlertCircle,
      color: "from-accent to-blue-600",
    },
    {
      label: "Points Earned",
      value: "0",
      icon: Award,
      color: "from-secondary to-orange-600",
    },
    {
      label: "Resolved Issues",
      value: "0",
      icon: Target,
      color: "from-primary to-blue-500",
    },
    {
      label: "Impact Score",
      value: "0%",
      icon: TrendingUp,
      color: "from-accent/80 to-green-600",
    },
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-foreground/60 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
              </div>
              <Icon className="w-6 h-6 text-accent/70" />
            </div>
            <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-gradient-to-r from-accent to-secondary transition-all" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
