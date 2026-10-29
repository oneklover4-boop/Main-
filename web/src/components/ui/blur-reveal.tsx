import * as React from "react"

import { cn } from "@/lib/utils"

interface BlurRevealProps {
  className?: string
  children: React.ReactNode
  delay?: number
  duration?: number
}

export function BlurReveal({ className, children }: BlurRevealProps) {
  return <span className={cn("inline-block", className)}>{children}</span>
}
