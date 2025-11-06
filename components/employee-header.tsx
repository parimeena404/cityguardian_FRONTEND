"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Bell, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EmployeeHeader() {
  const router = useRouter()

  return (
    <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-foreground/70 hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground neon-glow">CITY GUARDIAN</h1>
            <p className="text-xs text-foreground/60">Employee Portal</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Stats */}
          <div className="hidden md:flex items-center gap-4 px-4 py-2 rounded-lg bg-card/50 border border-secondary/20">
            <div className="text-center">
              <p className="text-xs text-foreground/60">Rank</p>
              <p className="font-bold text-secondary text-lg">#12</p>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div className="text-center">
              <p className="text-xs text-foreground/60">Completed</p>
              <p className="font-bold text-accent text-lg">28</p>
            </div>
            <div className="w-px h-8 bg-border/30" />
            <div className="text-center">
              <p className="text-xs text-foreground/60">Score</p>
              <p className="font-bold text-secondary text-lg">3,250</p>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative text-foreground/70 hover:text-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
            <User className="w-5 h-5" />
          </Button>

          {/* Logout */}
          <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-destructive">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
