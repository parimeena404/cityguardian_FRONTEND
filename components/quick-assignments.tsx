"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Zap } from "lucide-react"

export default function QuickAssignments() {
  return (
    <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-bold text-foreground">Performance Analytics</h2>
      </div>

      <div className="space-y-6">
        {/* Weekly Performance */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Weekly Performance</h3>
          <div className="space-y-2">
            {[
              { day: "Mon", completed: 4, target: 5 },
              { day: "Tue", completed: 5, target: 5 },
              { day: "Wed", completed: 3, target: 5 },
              { day: "Thu", completed: 6, target: 5 },
              { day: "Fri", completed: 4, target: 5 },
            ].map((day, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-foreground/70">{day.day}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-border/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-secondary"
                      style={{ width: `${(day.completed / day.target) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-foreground/60">
                    {day.completed}/{day.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Avg Speed", value: "2.5h", icon: Zap, color: "accent" },
            { label: "Quality", value: "94%", icon: TrendingUp, color: "secondary" },
          ].map((metric, i) => {
            const Icon = metric.icon
            return (
              <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/30">
                <Icon className={`w-4 h-4 text-${metric.color} mb-2`} />
                <p className="text-xs text-foreground/60 mb-1">{metric.label}</p>
                <p className="font-bold text-foreground">{metric.value}</p>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            <Badge className="bg-accent/20 border-accent/50 text-accent block w-full justify-start">
              🎯 Perfect Accuracy - 5 consecutive perfect scores
            </Badge>
            <Badge className="bg-secondary/20 border-secondary/50 text-secondary block w-full justify-start">
              ⚡ Speed Demon - Completed 5 tasks in under 2 hours
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
