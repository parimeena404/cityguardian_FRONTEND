"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface InteractiveButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export function InteractiveButton({ children, onClick, variant = "primary", className = "" }: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variantClasses = {
    primary: "bg-gradient-to-r from-accent to-secondary",
    secondary: "bg-secondary/20 border-secondary/50",
    accent: "bg-accent/20 border-accent/50",
  }

  const handleClick = () => {
    setIsPressed(true)
    onClick?.()

    setTimeout(() => {
      setIsPressed(false)
    }, 200)
  }

  return (
    <Button
      onClick={handleClick}
      className={`relative overflow-hidden ${variantClasses[variant]} text-foreground font-bold transition-all ${
        isPressed ? "scale-95" : "scale-100"
      } ${className}`}
    >
      {/* Ripple effect */}
      {isPressed && (
        <div className="absolute inset-0 animate-pulse-ring pointer-events-none">
          <div className="absolute inset-0 bg-white/20 rounded-full" />
        </div>
      )}

      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}
