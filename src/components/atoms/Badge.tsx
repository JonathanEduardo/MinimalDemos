import * as React from "react"
import { cn } from "@/lib/utils"

/* ========================================
   BADGE ATOM
   Uses @apply utility classes from index.css
   ======================================== */

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral"
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "neutral", children, ...props }, ref) => {
    const variantClass = {
      primary: "badge-primary",
      secondary: "badge-secondary",
      success: "badge-success",
      warning: "badge-warning",
      danger: "badge-danger",
      neutral: "badge-neutral",
    }[variant]

    return (
      <div
        ref={ref}
        className={cn(variantClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"
