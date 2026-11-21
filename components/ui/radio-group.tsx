"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { RiCheckLine as Check } from "@remixicon/react"

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid gap-3", className)}
        role="radiogroup"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<RadioGroupItemProps>(child)) return child
          return React.cloneElement(child, {
            value: child.props.value,
            checked: child.props.value === value,
            onChange: () => onValueChange?.(child.props.value),
          })
        })}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends React.HTMLAttributes<HTMLLabelElement> {
  value: string
  checked?: boolean
  onChange?: () => void
}

const RadioGroupItem = React.forwardRef<HTMLLabelElement, RadioGroupItemProps>(
  ({ className, value, checked, onChange, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "flex items-center gap-3 p-4 border cursor-pointer transition-colors",
          checked && "border-primary bg-primary/5",
          !checked && "hover:bg-accent/50",
          className
        )}
        onClick={onChange}
        {...props}
      >
        <div
          className={cn(
            "relative flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors",
            checked ? "border-primary bg-primary" : "border-input bg-background"
          )}
        >
          {checked && (
            <Check className="h-3 w-3 text-primary-foreground" aria-hidden="true" />
          )}
        </div>
        <div className="flex-1 text-left">{children}</div>
      </label>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }