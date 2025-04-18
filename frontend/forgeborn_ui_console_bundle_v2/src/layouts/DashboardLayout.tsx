import React from "react"
import { MainSidebar } from "@/components/nav/MainSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100 text-gray-900">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}