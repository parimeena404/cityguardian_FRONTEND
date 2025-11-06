"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Flame } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string
  score: number
  tasksCompleted: number
  streak: number
  badge?: "gold" | "silver" | "bronze"
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Jordan Blake",
    avatar: "JB",
    score: 5420,
    tasksCompleted: 45,
    streak: 32,
    badge: "gold",
  },
  {
    rank: 2,
    name: "Casey Morgan",
    avatar: "CM",
    score: 4850,
    tasksCompleted: 42,
    streak: 28,
    badge: "silver",
  },
  {
    rank: 3,
    name: "Riley Kim",
    avatar: "RK",
    score: 4620,
    tasksCompleted: 40,
    streak: 25,
    badge: "bronze",
  },
  {
    rank: 4,
    name: "You",
    avatar: "YOU",
    score: 3250,
    tasksCompleted: 28,
    streak: 15,
  },
  {
    rank: 5,
    name: "Taylor Chen",
    avatar: "TC",
    score: 3100,
    tasksCompleted: 27,
    streak: 12,
  },
  {
    rank: 6,
    name: "Morgan Davis",
    avatar: "MD",
    score: 2980,
    tasksCompleted: 25,
    streak: 10,
  },
  {
    rank: 7,
    name: "Sam Wilson",
    avatar: "SW",
    score: 2850,
    tasksCompleted: 24,
    streak: 8,
  },
  {
    rank: 8,
    name: "Alex Johnson",
    avatar: "AJ",
    score: 2720,
    tasksCompleted: 22,
    streak: 6,
  },
]

interface LeaderboardProps {
  team?: boolean
}

export default function Leaderboard({ team = false }: LeaderboardProps) {
  const getBadgeIcon = (badge?: "gold" | "silver" | "bronze") => {
    switch (badge) {
      case "gold":
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case "silver":
        return <Medal className="w-5 h-5 text-gray-400" />
      case "bronze":
        return <Medal className="w-5 h-5 text-orange-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Leaderboard Title */}
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-foreground">{team ? "Team Rankings" : "Global Leaderboard"}</h2>
      </div>

      {/* Leaderboard Table */}
      <Card className="border-accent/20 bg-card/50 backdrop-blur overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-card/80">
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Rank</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Employee</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Score</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Tasks</th>
                <th className="px-6 py-4 text-left text-foreground/60 font-semibold text-sm">Streak</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((entry, index) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-border/20 hover:bg-card/80 transition-colors ${
                    entry.name === "You" ? "bg-accent/10" : ""
                  }`}
                >
                  {/* Rank */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {entry.badge ? (
                        getBadgeIcon(entry.badge)
                      ) : (
                        <span className="text-lg font-bold text-foreground w-6">{entry.rank}</span>
                      )}
                    </div>
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          entry.name === "You"
                            ? "bg-gradient-to-br from-accent to-secondary text-foreground"
                            : "bg-gradient-to-br from-primary to-secondary/50 text-foreground"
                        }`}
                      >
                        {entry.avatar}
                      </div>
                      <span className={`font-semibold ${entry.name === "You" ? "text-accent" : "text-foreground"}`}>
                        {entry.name}
                      </span>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-6 py-4">
                    <Badge className="bg-accent/20 border-accent/50 text-accent font-bold">
                      {entry.score.toLocaleString()}
                    </Badge>
                  </td>

                  {/* Tasks */}
                  <td className="px-6 py-4">
                    <span className="text-foreground font-semibold">{entry.tasksCompleted}</span>
                  </td>

                  {/* Streak */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-secondary" />
                      <span className="font-semibold text-foreground">{entry.streak} days</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Leaderboard Info */}
      <Card className="p-6 border-secondary/20 bg-secondary/5 backdrop-blur">
        <h3 className="font-bold text-foreground mb-3">How to Climb</h3>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Complete assigned tasks to earn points</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Finish tasks quickly for bonus multipliers</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Maintain daily streaks for streak bonuses</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Top 3 get monthly rewards</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
