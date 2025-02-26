import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export const Box = forwardRef<HTMLDivElement, props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={twMerge("w-full", className)} {...props}>
        {children}
      </div>
    )
  }
)
