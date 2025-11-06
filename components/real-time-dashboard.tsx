"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import AnimatedMetric from "@/components/animated-metric"
import LiveUpdatesFeed from "@/components/live-updates-feed"
import { Activity } from "lucide-react"

export default function RealtimeDashboard() {
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    // Simulate connection status
    const interval = setInterval(() => {
      setIsConnected((prev) => (Math.random() > 0.05 ? true : prev))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/50 border border-border/30 w-fit">
        <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-destructive"}`} />
        <p className="text-sm text-foreground/70">{isConnected ? "Live connection active" : "Connecting..."}</p>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Tasks", value: 47, target: 50, maxValue: 100 },
          { label: "Average AQI", value: 78, target: 85, maxValue: 150 },
          { label: "Citizen Reports", value: 234, target: 250, maxValue: 500 },
          { label: "Team Efficiency", value: 92, target: 95, maxValue: 100 },
        ].map((metric, i) => (
          <Card key={i} className="p-6 border-accent/20 bg-card/50 backdrop-blur">
            <AnimatedMetric
              label={metric.label}
              value={metric.value}
              target={metric.target}
              isLive={true}
              maxValue={metric.maxValue}
            />
          </Card>
        ))}
      </div>

      {/* Live Updates Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveUpdatesFeed />
        </div>

        {/* System Status */}
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-bold text-foreground">System Status</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Data API", status: "operational" },
              { label: "IoT Sensors", status: "operational" },
              { label: "Notifications", status: "operational" },
              { label: "Authentication", status: "operational" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 rounded-lg bg-card/50 border border-border/30"
              >
                <p className="text-sm text-foreground">{item.label}</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-green-400 font-semibold">Active</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
