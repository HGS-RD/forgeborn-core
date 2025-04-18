import * as React from "react"
import { Section } from "@/components/ui/section"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-4 text-xl font-bold">🧠 Forgeborn Dashboard</header>
      <Section>{children}</Section>
    </div>
  )
}
