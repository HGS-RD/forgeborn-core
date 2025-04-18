import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardView() {
  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>🧠 Welcome to Forgeborn</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Your agent-powered software factory is ready.</p>
        </CardContent>
      </Card>
    </div>
  )
}
