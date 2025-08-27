import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "gradient-card-blue text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-0",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 hover:shadow-xl hover:scale-105 active:scale-95",
        outline:
          "border border-slate-300 bg-white/80 backdrop-blur-sm shadow-sm hover:bg-slate-100 hover:text-slate-900 hover:shadow-md hover:scale-105 active:scale-95",
        secondary:
          "gradient-card-purple text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-0",
        ghost: "hover:bg-slate-100 hover:text-slate-900 hover:scale-105 active:scale-95",
        link: "text-blue-500 underline-offset-4 hover:underline",
        hero: "gradient-card-cyan text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 font-semibold border-0",
        accent: "gradient-card-dark text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-0",
        success: "bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl hover:scale-105 active:scale-95",
        premium: "gradient-card-purple text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-0",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
