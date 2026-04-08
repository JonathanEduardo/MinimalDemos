import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react"

/* ========================================
   ALERT ATOM
   Uses @apply utility classes from index.css
   ======================================== */

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger"
  children: React.ReactNode
  icon?: boolean
}

const iconMap = {
  primary: Info,
  secondary: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "primary", children, icon = true, ...props }, ref) => {
    const variantClass = {
      primary: "alert-primary",
      secondary: "alert-secondary",
      success: "alert-success",
      warning: "alert-warning",
      danger: "alert-danger",
    }[variant]

    const Icon = iconMap[variant]

    return (
      <div
        ref={ref}
        className={cn(variantClass, className)}
        {...props}
      >
        {icon && <Icon className="h-5 w-5 flex-shrink-0" />}
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)

Alert.displayName = "Alert"
