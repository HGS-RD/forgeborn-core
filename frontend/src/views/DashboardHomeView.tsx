import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function DashboardHomeView() {
  return (
    <Card className="max-w-xl mx-auto my-12">
      <CardHeader>
        <CardTitle>Welcome to Forgeborn</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Your agent-powered software factory is ready.</p>
      </CardContent>
    </Card>
  )
}
