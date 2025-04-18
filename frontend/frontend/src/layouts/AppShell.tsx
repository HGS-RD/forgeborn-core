import React from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-lg font-bold">Forgeborn</h1>
        <ThemeToggle />
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
