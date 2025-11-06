"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, TrendingDown, TrendingUp, Target } from "lucide-react"
import { useState } from "react"

interface AQIZone {
  zone: string
  current: number
  target: number
  status: "good" | "moderate" | "unhealthy" | "hazardous"
  trend: "up" | "down" | "stable"
}

const MOCK_AQI_DATA: AQIZone[] = [
  { zone: "Downtown Core", current: 65, target: 80, status: "good", trend: "down" },
  { zone: "Industrial East", current: 110, target: 100, status: "unhealthy", trend: "up" },
  { zone: "Residential West", current: 78, target: 85, status: "moderate", trend: "stable" },
  { zone: "Harbor District", current: 82, target: 90, status: "moderate", trend: "down" },
  { zone: "Airport Zone", current: 95, target: 85, status: "unhealthy", trend: "up" },
  { zone: "Agricultural North", current: 72, target: 85, status: "good", trend: "stable" },
]

interface AQIMonitoringProps {
  compact?: boolean
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-500/10 border-green-500/30 text-green-400"
    case "moderate":
      return "bg-secondary/10 border-secondary/30 text-secondary"
    case "unhealthy":
      return "bg-destructive/10 border-destructive/30 text-destructive"
    case "hazardous":
      return "bg-red-800/10 border-red-800/30 text-red-600"
    default:
      return "bg-muted/10 border-muted/30"
  }
}

export default function AQIMonitoring({ compact = false }: AQIMonitoringProps) {
  const [expandedZone, setExpandedZone] = useState<string | null>(null)

  if (compact) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_AQI_DATA.map((item) => (
          <Card
            key={item.zone}
            className="p-4 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-foreground text-sm">{item.zone}</h3>
              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <div>
                <p className="text-2xl font-bold text-foreground">{item.current}</p>
                <p className="text-xs text-foreground/60">Current AQI</p>
              </div>
              {item.trend === "up" ? (
                <TrendingUp className="w-5 h-5 text-destructive mb-1" />
              ) : item.trend === "down" ? (
                <TrendingDown className="w-5 h-5 text-green-400 mb-1" />
              ) : (
                <div className="w-5 h-5 bg-secondary/30 rounded mb-1" />
              )}
            </div>
            <p className="text-xs text-foreground/60">Target: {item.target}</p>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">AQI Zone Monitoring</h2>
      </div>

      {/* Zone Cards */}
      <div className="space-y-3">
        {MOCK_AQI_DATA.map((item) => (
          <Card
            key={item.zone}
            className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all cursor-pointer"
            onClick={() => setExpandedZone(expandedZone === item.zone ? null : item.zone)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-foreground">{item.zone}</h3>
                  <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  {item.current > item.target && (
                    <Badge className="bg-destructive/10 border-destructive/30 text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Exceeds Target
                    </Badge>
                  )}
                </div>

                {/* AQI Comparison */}
                <div className="flex items-center gap-8 mb-3">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Current AQI</p>
                    <p className="text-3xl font-bold text-foreground">{item.current}</p>
                  </div>
                  <div className="w-px h-12 bg-border/30" />
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Target AQI</p>
                    <p className="text-2xl font-bold text-accent">{item.target}</p>
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="h-3 bg-border/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-secondary"
                        style={{ width: `${Math.min((item.target / item.current) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-foreground/60 mt-1">
                      {item.current > item.target
                        ? `${(((item.current - item.target) / item.target) * 100).toFixed(0)}% above target`
                        : "Within target"}
                    </p>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-2">
                  {item.trend === "up" ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-destructive" />
                      <span className="text-sm text-destructive">Increasing</span>
                    </>
                  ) : item.trend === "down" ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Improving</span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 bg-secondary/50 rounded" />
                      <span className="text-sm text-secondary">Stable</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Button className="ml-4 bg-accent/20 hover:bg-accent/30 border-accent/30 text-accent" variant="outline">
                Set New Target
              </Button>
            </div>

            {/* Expanded Details */}
            {expandedZone === item.zone && (
              <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">24h Average</p>
                    <p className="font-semibold text-foreground">{item.current + Math.floor(Math.random() * 10)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">7d Average</p>
                    <p className="font-semibold text-foreground">{item.current + Math.floor(Math.random() * 15)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60 mb-1">Primary Source</p>
                    <p className="font-semibold text-foreground">Traffic</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* AQI Scale Reference */}
      <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
        <h3 className="font-bold text-foreground mb-4">AQI Scale Reference</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { range: "0-50", label: "Good", color: "bg-green-500/20 border-green-500/30" },
            { range: "51-100", label: "Moderate", color: "bg-secondary/20 border-secondary/30" },
            { range: "101-150", label: "Unhealthy", color: "bg-destructive/20 border-destructive/30" },
            { range: "150+", label: "Hazardous", color: "bg-red-900/20 border-red-900/30" },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-lg border ${item.color}`}>
              <p className="text-xs text-foreground/60 mb-1">{item.range}</p>
              <p className="font-semibold text-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
