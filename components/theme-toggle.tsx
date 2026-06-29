"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = (mounted ? resolvedTheme : "dark") === "dark"

  return (
    <button
      aria-label="تبديل الوضع"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="pressable relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-200"
    >
      <Sun
        className="h-4 w-4 transition-all duration-300"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? "scale(0) rotate(-90deg)" : "scale(1) rotate(0deg)" }}
      />
      <Moon
        className="absolute h-4 w-4 transition-all duration-300"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? "scale(1) rotate(0deg)" : "scale(0) rotate(90deg)" }}
      />
    </button>
  )
}
