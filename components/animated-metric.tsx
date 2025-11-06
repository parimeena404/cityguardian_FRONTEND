"use client"

import { useAnimatedCounter, useRealtimeData } from "@/hooks/use-real-time-data"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AnimatedMetricProps {
  label: string
  value: number
  target?: number
  isLive?: boolean
  maxValue?: number
}

export default function AnimatedMetric({ label, value, target, isLive = false, maxValue }: AnimatedMetricProps) {
  const liveData = useRealtimeData(value, maxValue, 2000)
  const animatedValue = useAnimatedCounter(value, 500)

  const displayValue = liveData ? liveData.value : animatedValue
  const trend = liveData ? liveData.trend : "stable"

  return (
    <div className="space-y-2">
      <p className="text-foreground/60 text-sm">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-foreground">{displayValue}</p>
        {isLive && (
          <>
            {trend === "up" && <TrendingUp className="w-5 h-5 text-secondary animate-pulse" />}
            {trend === "down" && <TrendingDown className="w-5 h-5 text-accent animate-pulse" />}
            {trend === "stable" && <div className="w-1 h-1 rounded-full bg-foreground/40" />}
          </>
        )}
      </div>
      {target && <p className="text-xs text-foreground/50">Target: {target}</p>}
    </div>
  )
}
