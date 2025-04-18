import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardWelcomeCard() {
  return (
    <Card className="max-w-md mx-auto my-6">
      <CardHeader>
        <CardTitle>Welcome to Forgeborn</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your agent-powered software factory is ready.</p>
      </CardContent>
    </Card>
  );
}
