import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardHomeView() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>🚀 Welcome to Forgeborn</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your agent-powered software factory is ready.</p>
        </CardContent>
      </Card>
    </div>
  )
}