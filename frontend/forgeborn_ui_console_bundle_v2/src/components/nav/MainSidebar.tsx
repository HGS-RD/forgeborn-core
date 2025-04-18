import React from "react"
import { Home, FileText, Brain, List, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard" },
  { icon: <FileText size={18} />, label: "Blueprints" },
  { icon: <Brain size={18} />, label: "Agents" },
  { icon: <List size={18} />, label: "Memory" },
  { icon: <Activity size={18} />, label: "Logs" }
]

export function MainSidebar() {
  return (
    <div className="w-64 bg-white border-r px-4 py-6 hidden md:block">
      <h2 className="text-xl font-bold mb-6">⚙️ Forgeborn</h2>
      <ul className="space-y-2">
        {navItems.map((item, index) => (
          <li key={index} className={cn("flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black cursor-pointer")}>
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}