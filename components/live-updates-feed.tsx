"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Trophy, AlertTriangle } from "lucide-react"
import { useLiveFeed, formatTimeAgo } from "@/hooks/use-live-feed"

export default function LiveUpdatesFeed() {
  const updates = useLiveFeed(5)

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "issue":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "resolution":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-secondary" />
      case "achievement":
        return <Trophy className="w-5 h-5 text-accent" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/30 text-destructive"
      case "medium":
        return "bg-secondary/10 border-secondary/30 text-secondary"
      case "low":
        return "bg-accent/10 border-accent/30 text-accent"
      default:
        return "bg-muted/10 border-muted/30"
    }
  }

  return (
    <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
      <h2 className="text-xl font-bold text-foreground mb-4">Live Updates</h2>
      <div className="space-y-3">
        {updates.map((update) => (
          <div
            key={update.id}
            className="p-4 rounded-lg bg-card/50 border border-border/30 hover:border-accent/50 transition-all animate-slide-in-bottom"
            style={{
              animationDelay: `${updates.indexOf(update) * 0.1}s`,
            }}
          >
            <div className="flex items-start gap-3">
              {getUpdateIcon(update.type)}
              <div className="flex-1">
                <p className="text-foreground font-semibold text-sm">{update.message}</p>
                <p className="text-xs text-foreground/50 mt-1">{formatTimeAgo(update.timestamp)}</p>
              </div>
              <Badge className={getPriorityColor(update.priority)} variant="outline">
                {update.priority}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
