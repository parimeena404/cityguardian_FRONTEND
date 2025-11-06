"use client"

import { Card } from "@/components/ui/card"
import GamificationEffects from "@/components/gamification-effects"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EffectsDemoPage() {
  const router = useRouter()

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-foreground/70 hover:text-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground neon-glow">GAMING EFFECTS</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 border-accent/20 bg-card/50 backdrop-blur mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-2">Advanced Gaming & Animation Effects</h2>
          <p className="text-foreground/70">
            Explore all the gamification features, particle effects, and interactive animations built into City
            Guardian.
          </p>
        </Card>

        <GamificationEffects />
      </main>
    </div>
  )
}
