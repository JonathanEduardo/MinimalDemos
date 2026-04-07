import * as React from "react"
import { cn } from "@/lib/utils"

/* ========================================
   BUTTON ATOM
   Uses @apply utility classes from index.css
   ======================================== */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantClass = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      warning: "btn-warning",
      danger: "btn-danger",
      ghost: "btn-ghost",
      outline: "btn-outline",
    }[variant]

    const sizeClass = {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    }[size]

    return (
      <button
        ref={ref}
        className={cn(variantClass, sizeClass, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"
