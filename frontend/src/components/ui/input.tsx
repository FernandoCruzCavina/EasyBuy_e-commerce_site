import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex max-w-80 rounded-lg px-4 py-1 space-x-2 hover:outline ",
  {
    variants: {
      variant: {
        background: "bg-[--placeholder] outline-[--text-bold]",
        menu: "bg-[--input-menu] outline-[--outline-menu]",
      },
      
    },
    defaultVariants: {
      variant: "background"
    }
  }
)

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants>{
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, variant, type, ...props }, ref) => {
    return (
      <div className={cn(inputVariants({ variant, className}))}>
        {children}
        <input
          type={type}
          className={"flex flex-1 h-full w-full bg-transparent shadow-sm transition-colors file:bg-transparent file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-slate-900 outline-none"}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
