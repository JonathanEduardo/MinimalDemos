import * as React from "react"
import { cn } from "@/lib/utils"

/* ========================================
   CARD ATOMS
   Uses @apply utility classes from index.css
   ======================================== */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "base" | "primary" | "secondary" | "success" | "warning" | "danger"
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "base", children, ...props }, ref) => {
    const variantClass = {
      base: "card-base",
      primary: "card-primary",
      secondary: "card-secondary",
      success: "card-success",
      warning: "card-warning",
      danger: "card-danger",
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

Card.displayName = "Card"

/* ---- STAT CARD VARIANT ---- */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  icon?: React.ReactNode
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, icon, variant = "primary", ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn("card-stat", className)}
        {...props}
      >
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex flex-col">
          <span className="card-stat-label">{label}</span>
          <span className="card-stat-value">{value}</span>
        </div>
      </Card>
    )
  }
)

StatCard.displayName = "StatCard"
