import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/theme/useTheme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className="p-2 rounded text-foreground hover:bg-muted">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
