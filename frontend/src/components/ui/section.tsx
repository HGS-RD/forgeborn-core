import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => (
    <section ref={ref} className={cn("py-6 px-4", className)} {...props} />
  )
)
Section.displayName = "Section"
