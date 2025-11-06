"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronLeft, LogIn } from "lucide-react"

export default function LoginPortal({ onBack }: { onBack: () => void }) {
  const [userType, setUserType] = useState<"citizen" | "employee" | "office" | null>(null)
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleLogin = (type: string) => {
    // Redirect to respective dashboard
    window.location.href = `/${type}-dashboard`
  }

  if (!userType) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-card/50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <button
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>

          <Card className="p-12 border-accent/30 bg-card/80 backdrop-blur neon-glow">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Choose Your Role</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  id: "citizen",
                  title: "Citizen",
                  description: "Report issues & earn rewards",
                  icon: "👥",
                  color: "from-accent",
                },
                {
                  id: "employee",
                  title: "Employee",
                  description: "Manage tasks & compete",
                  icon: "⚙️",
                  color: "from-secondary",
                },
                {
                  id: "office",
                  title: "Office Manager",
                  description: "Lead municipal operations",
                  icon: "🏢",
                  color: "from-primary",
                },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => setUserType(role.id as any)}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                    role.color === "from-accent"
                      ? "border-accent/50 bg-accent/10 hover:border-accent hover:shadow-accent/20"
                      : role.color === "from-secondary"
                        ? "border-secondary/50 bg-secondary/10 hover:border-secondary hover:shadow-secondary/20"
                        : "border-primary/50 bg-primary/10 hover:border-primary hover:shadow-primary/20"
                  }`}
                >
                  <div className="text-4xl mb-3">{role.icon}</div>
                  <h3 className="font-bold text-lg text-foreground mb-1">{role.title}</h3>
                  <p className="text-sm text-foreground/60">{role.description}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-card/50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={() => setUserType(null)}
          className="mb-8 flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <Card className="p-8 border-accent/30 bg-card/80 backdrop-blur neon-glow fade-in-scale">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground capitalize">{userType} Login</h2>

          <div className="space-y-4 mb-6">
            <Input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="bg-input border-border/50 text-foreground placeholder:text-foreground/40"
            />
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="bg-input border-border/50 text-foreground placeholder:text-foreground/40"
            />
          </div>

          <Button
            onClick={() => handleLogin(userType)}
            className="w-full bg-gradient-to-r from-accent to-secondary text-foreground font-bold h-12 neon-glow"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Enter Dashboard
          </Button>

          <p className="text-center text-foreground/60 text-sm mt-4">
            Demo credentials: any email@test.com / password123
          </p>
        </Card>
      </div>
    </div>
  )
}
