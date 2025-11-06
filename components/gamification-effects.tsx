"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AchievementPopup, type Achievement } from "@/components/achievement-popup"
import { triggerParticleEffect } from "@/components/particle-effect"
import { Flame, Zap, Target } from "lucide-react"

export default function GamificationEffects() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null)

  const mockAchievements: Achievement[] = [
    {
      id: "1",
      title: "First Step",
      description: "Report your first issue",
      icon: "star",
      color: "gold",
    },
    {
      id: "2",
      title: "On Fire",
      description: "Complete 10 tasks in a day",
      icon: "zap",
      color: "silver",
    },
    {
      id: "3",
      title: "Legend",
      description: "Reach top of leaderboard",
      icon: "trophy",
      color: "gold",
    },
  ]

  const handleUnlockAchievement = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setAchievements((prev) => [...prev, achievement])

    // Trigger particle effect at center of screen
    triggerParticleEffect(window.innerWidth / 2, window.innerHeight / 2, "success")
  }

  return (
    <div className="space-y-6">
      {currentAchievement && (
        <AchievementPopup achievement={currentAchievement} onComplete={() => setCurrentAchievement(null)} />
      )}

      {/* Interactive Gamification Demo */}
      <Card className="p-8 border-accent/20 bg-card/50 backdrop-blur">
        <h2 className="text-2xl font-bold text-foreground mb-6">Gamification Effects Demo</h2>

        {/* Points Multiplier */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Point Multipliers</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Speed Bonus", multiplier: "2x", icon: Zap, color: "from-accent to-blue-600" },
              { label: "Accuracy Bonus", multiplier: "1.5x", icon: Target, color: "from-secondary to-orange-600" },
              { label: "Streak Bonus", multiplier: "3x", icon: Flame, color: "from-red-500 to-red-600" },
            ].map((bonus, i) => {
              const Icon = bonus.icon
              return (
                <div
                  key={i}
                  className={`p-6 rounded-lg border-2 border-accent/20 bg-gradient-to-br ${bonus.color} bg-opacity-10 hover:bg-opacity-20 transition-all cursor-pointer group`}
                >
                  <Icon className="w-8 h-8 text-accent mb-3 group-hover:animate-pulse" />
                  <p className="text-foreground/70 text-sm mb-1">{bonus.label}</p>
                  <p className="text-2xl font-bold text-accent">{bonus.multiplier}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Achievement Showcase */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Unlock Achievements</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {mockAchievements.map((achievement) => {
              const isUnlocked = achievements.some((a) => a.id === achievement.id)
              return (
                <Button
                  key={achievement.id}
                  onClick={() => handleUnlockAchievement(achievement)}
                  className={`p-6 h-auto rounded-lg border-2 transition-all ${
                    isUnlocked
                      ? "border-accent/60 bg-accent/10 text-foreground"
                      : "border-border/30 bg-card/50 text-foreground hover:border-accent/60"
                  }`}
                  variant="outline"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {achievement.icon === "trophy" ? "🏆" : achievement.icon === "star" ? "⭐" : "⚡"}
                    </div>
                    <p className="font-bold text-sm">{achievement.title}</p>
                    <p className="text-xs text-foreground/60 mt-1">{achievement.description}</p>
                    {isUnlocked && <Badge className="mt-3 bg-accent/20 border-accent/50 text-accent">Unlocked</Badge>}
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Streak Display */}
        <div className="p-6 rounded-lg border border-secondary/30 bg-secondary/5 flex items-center gap-4">
          <Flame className="w-12 h-12 text-secondary animate-pulse" />
          <div>
            <p className="text-foreground/70 text-sm">Current Streak</p>
            <p className="text-3xl font-bold text-secondary">15 Days</p>
            <p className="text-xs text-foreground/60 mt-1">Keep it up to unlock streak bonuses!</p>
          </div>
        </div>
      </Card>

      {/* Active Achievements List */}
      {achievements.length > 0 && (
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recently Unlocked</h3>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 rounded-lg bg-card/50 border border-accent/20 hover:border-accent/50 transition-colors animate-slide-in-bottom"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {achievement.icon === "trophy" ? "🏆" : achievement.icon === "star" ? "⭐" : "⚡"}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground">{achievement.title}</h4>
                    <p className="text-sm text-foreground/60">{achievement.description}</p>
                  </div>
                  <Badge className={`bg-${achievement.color}/20 border-${achievement.color}/50`}>+100 pts</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
