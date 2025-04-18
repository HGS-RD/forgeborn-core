import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShadcnTestCard() {
  return (
    <Card className="max-w-md mx-auto my-6">
      <CardHeader>
        <CardTitle>🎨 Shadcn + Tailwind</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a styled card using Shadcn UI and Tailwind CSS v3!</p>
      </CardContent>
    </Card>
  );
}
