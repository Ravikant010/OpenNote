import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./ui/input"

export interface LargeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const LargeInput = React.forwardRef<HTMLInputElement, LargeInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn(
          "w-full h-20 px-6 py-2",
          "text-3xl xl:text-5xl font-bold",
          "bg-transparent",
          "border-x-0 border-t-0 border-b-2 border-primary/20",
          "rounded-none",
          "focus:outline-none focus:border-primary",
          "placeholder:text-muted-foreground/50",
          "transition-all duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
LargeInput.displayName = "LargeInput"

export { LargeInput }

