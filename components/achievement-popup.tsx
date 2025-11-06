"use client"

import { useEffect, useState } from "react"
import { Trophy, Star, Zap } from "lucide-react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: "trophy" | "star" | "zap"
  color: "gold" | "silver" | "bronze"
}

const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
}

const ACHIEVEMENT_COLORS = {
  gold: "from-yellow-500 to-yellow-600",
  silver: "from-gray-400 to-gray-500",
  bronze: "from-orange-500 to-orange-600",
}

interface AchievementPopupProps {
  achievement: Achievement
  onComplete?: () => void
}

export function AchievementPopup({ achievement, onComplete }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(true)
  const Icon = ACHIEVEMENT_ICONS[achievement.icon]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in-scale">
      <div
        className={`p-6 rounded-lg border-2 border-${achievement.color}/50 bg-gradient-to-br ${ACHIEVEMENT_COLORS[achievement.color]} shadow-2xl animate-pulse-neon`}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-background/80 backdrop-blur">
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <p className="text-sm text-foreground/80 font-semibold">ACHIEVEMENT UNLOCKED</p>
            <h3 className="text-lg font-bold text-foreground mb-1">{achievement.title}</h3>
            <p className="text-sm text-foreground/70">{achievement.description}</p>
          </div>
        </div>
      </div>

      {/* Particle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 30}%`,
              top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 30}%`,
              animation: `pulse-ring 1s ease-out ${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// Hook to manage achievement queue
export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  const unlockAchievement = (achievement: Achievement) => {
    setAchievements((prev) => [...prev, achievement])
  }

  const removeAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((a) => a.id !== id))
  }

  return { achievements, unlockAchievement, removeAchievement }
}
