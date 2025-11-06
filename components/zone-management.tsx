"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Map, AlertCircle } from "lucide-react"

interface Zone {
  id: string
  name: string
  manager: string
  employees: number
  activeIssues: number
  status: "operational" | "alert" | "maintenance"
  coverage: number
  aqi: number
}

const MOCK_ZONES: Zone[] = [
  {
    id: "z1",
    name: "Downtown Core",
    manager: "Sarah Chen",
    employees: 18,
    activeIssues: 3,
    status: "operational",
    coverage: 98,
    aqi: 65,
  },
  {
    id: "z2",
    name: "Industrial East",
    manager: "Mike Torres",
    employees: 22,
    activeIssues: 7,
    status: "alert",
    coverage: 85,
    aqi: 110,
  },
  {
    id: "z3",
    name: "Residential West",
    manager: "Jordan Blake",
    employees: 16,
    activeIssues: 2,
    status: "operational",
    coverage: 95,
    aqi: 78,
  },
  {
    id: "z4",
    name: "Harbor District",
    manager: "Casey Morgan",
    employees: 14,
    activeIssues: 1,
    status: "operational",
    coverage: 92,
    aqi: 82,
  },
  {
    id: "z5",
    name: "Airport Zone",
    manager: "Riley Kim",
    employees: 25,
    activeIssues: 5,
    status: "alert",
    coverage: 88,
    aqi: 95,
  },
]

export default function ZoneManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Map className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Zone Management</h2>
      </div>

      {/* Zones Grid */}
      <div className="space-y-3">
        {MOCK_ZONES.map((zone) => (
          <Card key={zone.id} className="p-6 border-accent/20 bg-card/50 backdrop-blur hover:bg-card/80 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-foreground">{zone.name}</h3>
                  <Badge
                    className={
                      zone.status === "operational"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : zone.status === "alert"
                          ? "bg-destructive/10 border-destructive/30 text-destructive"
                          : "bg-secondary/10 border-secondary/30 text-secondary"
                    }
                  >
                    {zone.status === "operational" ? "Operational" : zone.status === "alert" ? "Alert" : "Maintenance"}
                  </Badge>
                </div>
                <p className="text-sm text-foreground/60">Managed by {zone.manager}</p>
              </div>
              <Button variant="outline" className="border-accent/30 text-foreground hover:text-accent bg-transparent">
                Edit Zone
              </Button>
            </div>

            {/* Zone Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4 pb-4 border-b border-border/30">
              <div>
                <p className="text-xs text-foreground/60 mb-1">Active Employees</p>
                <p className="text-2xl font-bold text-foreground">{zone.employees}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Active Issues</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{zone.activeIssues}</p>
                  {zone.activeIssues > 3 && <AlertCircle className="w-5 h-5 text-destructive" />}
                </div>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Coverage</p>
                <p className="text-2xl font-bold text-accent">{zone.coverage}%</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Current AQI</p>
                <p className="text-2xl font-bold text-foreground">{zone.aqi}</p>
              </div>
              <div>
                <p className="text-xs text-foreground/60 mb-1">Resolution Time</p>
                <p className="text-2xl font-bold text-secondary">2.3h</p>
              </div>
            </div>

            {/* Coverage Bar */}
            <div>
              <p className="text-xs text-foreground/60 mb-2">Zone Coverage</p>
              <div className="h-2 bg-border/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-secondary"
                  style={{ width: `${zone.coverage}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Zone */}
      <Card className="p-8 border-accent/30 bg-card/50 backdrop-blur text-center">
        <p className="text-foreground/60 mb-4">Managing all city zones</p>
        <Button className="bg-gradient-to-r from-accent to-secondary text-foreground font-bold">Add New Zone</Button>
      </Card>
    </div>
  )
}
