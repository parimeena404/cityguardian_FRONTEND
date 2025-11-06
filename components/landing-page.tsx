"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Zap, Users, Target, BarChart3 } from "lucide-react"

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? "rgba(96, 165, 250, 0.6)" : "rgba(249, 115, 22, 0.6)",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(13, 27, 42, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        particles.forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.2 * (1 - dist / 150)})`
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="w-full min-h-screen bg-background overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-accent to-primary neon-glow flex items-center justify-center font-bold text-foreground">
              CG
            </div>
            <h1 className="text-2xl font-bold text-foreground neon-glow">CITY GUARDIAN</h1>
          </div>
          <Button
            onClick={onGetStarted}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold neon-glow"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-5 min-h-screen flex flex-col justify-center items-center px-4 text-center pt-20">
        <div className="max-w-4xl fade-in-scale">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-accent/50 bg-accent/10 text-accent">
            <p className="text-sm font-semibold">The Future of Urban Governance</p>
          </div>

          <h2 className="text-6xl md:text-7xl font-black mb-6 text-foreground leading-tight">
            <span className="text-accent neon-glow">Protect</span> Your City.{" "}
            <span className="text-secondary">Earn Rewards.</span>
          </h2>

          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            Real-time environmental monitoring. Gamified citizen engagement. Smart municipal coordination. All in one
            platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-accent to-secondary text-foreground font-bold text-lg h-14 neon-glow"
            >
              <Zap className="w-5 h-5 mr-2" />
              Launch Platform
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-accent/50 text-foreground hover:bg-accent/10 font-bold text-lg h-14 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-accent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-5 py-20 px-4 max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-16 text-foreground">
          Three <span className="text-accent neon-glow">Powerful Interfaces</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Citizen Portal",
              description: "Report issues, upload photos, track resolution. Earn points for community contribution.",
              color: "from-accent to-blue-600",
            },
            {
              icon: Target,
              title: "Employee Dashboard",
              description: "Manage tasks, compete in leaderboards, earn incentives. Real-time performance tracking.",
              color: "from-secondary to-orange-600",
            },
            {
              icon: BarChart3,
              title: "Office Manager Console",
              description: "Set AQI targets, track team performance, receive IoT data. Lead your municipal zone.",
              color: "from-primary to-blue-500",
            },
          ].map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group relative p-8 rounded-lg border border-accent/30 bg-card/50 hover:bg-card hover:border-accent/60 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 slide-in-bottom"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}
                />
                <Icon className="w-12 h-12 text-accent mb-4 relative z-10" />
                <h4 className="text-xl font-bold text-foreground mb-2 relative z-10">{feature.title}</h4>
                <p className="text-foreground/70 relative z-10">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-5 py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "50K+" },
            { label: "Issues Resolved", value: "15K+" },
            { label: "Cities Connected", value: "25+" },
            { label: "Air Quality Improved", value: "32%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-lg border border-accent/20 bg-card/30 hover:bg-card/50 transition-colors"
            >
              <p className="text-4xl font-black text-accent mb-2">{stat.value}</p>
              <p className="text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
