import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background w-full",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-white hover:bg-secondary-foreground text-base font-semibold capitalize",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground rounded-lg",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "border-[#C1F0DB] bg-[#DAFBEC] font-medium text-primary-foreground hover:bg-[#DAFBEC] hover:text-secondary dark:hover:text-secondary",
        link: "underline-offset-4 hover:underline text-primary",
        nlink:
          "text-base font-medium capitalize text-[#6A7381] dark:text-[#D7DBE0]text-[#6A7381] dark:text-[#D7DBE0]",
      },
      size: {
        default: "h-[52px] py-2 px-4",
        sm: "h-10 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
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
