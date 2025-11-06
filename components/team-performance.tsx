"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  zone: string
  tasksCompleted: number
  efficiency: number
  status: "active" | "break" | "offline"
}

const MOCK_TEAM: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Zone Manager",
    zone: "Downtown Core",
    tasksCompleted: 32,
    efficiency: 94,
    status: "active",
  },
  {
    name: "Mike Torres",
    role: "Zone Manager",
    zone: "Industrial East",
    tasksCompleted: 28,
    efficiency: 87,
    status: "active",
  },
  {
    name: "Jordan Blake",
    role: "Zone Manager",
    zone: "Residential West",
    tasksCompleted: 35,
    efficiency: 96,
    status: "active",
  },
  {
    name: "Casey Morgan",
    role: "Zone Manager",
    zone: "Harbor District",
    tasksCompleted: 30,
    efficiency: 92,
    status: "active",
  },
  {
    name: "Riley Kim",
    role: "Zone Manager",
    zone: "Airport Zone",
    tasksCompleted: 26,
    efficiency: 85,
    status: "break",
  },
]

interface TeamPerformanceProps {
  compact?: boolean
}

export default function TeamPerformance({ compact = false }: TeamPerformanceProps) {
  if (compact) {
    return (
      <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-bold text-foreground">Team Status</h2>
        </div>
        <div className="space-y-2">
          {MOCK_TEAM.map((member, i) => (
            <div key={i} className="flex justify-between items-center p-2 rounded bg-card/50 border border-border/30">
              <div>
                <p className="font-semibold text-sm text-foreground">{member.name}</p>
                <p className="text-xs text-foreground/60">{member.zone}</p>
              </div>
              <Badge
                className={
                  member.status === "active"
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : member.status === "break"
                      ? "bg-secondary/10 border-secondary/30 text-secondary"
                      : "bg-muted/10 border-muted/30"
                }
              >
                {member.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">Team Performance</h2>
      </div>

      {/* Team Table */}
      <Card className="border-accent/20 bg-card/50 backdrop-blur overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-card/80">
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Name</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Zone</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Completed</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TEAM.map((member, index) => (
                <tr key={index} className="border-b border-border/20 hover:bg-card/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-xs font-bold text-foreground">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-semibold text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-foreground/80">{member.zone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        member.status === "active"
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : member.status === "break"
                            ? "bg-secondary/10 border-secondary/30 text-secondary"
                            : "bg-muted/10 border-muted/30"
                      }
                    >
                      {member.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-accent/20 border-accent/50 text-accent">{member.tasksCompleted}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-border/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-secondary"
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground">{member.efficiency}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
