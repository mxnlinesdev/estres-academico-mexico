"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { RiAlertLine as AlertCircle, RiCheckboxCircleFill as CheckCircle, RiInformationLine as Information, RiCloseCircleLine as CloseCircle } from "@remixicon/react"

const alertVariants = {
  default: "bg-background border-border",
  destructive: "bg-destructive/10 border-destructive/20 text-destructive dark:bg-destructive/20",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800",
} as const

const iconMap = {
  default: AlertCircle,
  destructive: CloseCircle,
  success: CheckCircle,
  warning: AlertCircle,
  info: Information,
} as const

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const Icon = iconMap[variant]
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
          alertVariants[variant],
          className
        )}
        {...props}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <div className="grid gap-1 leading-relaxed">{children}</div>
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }