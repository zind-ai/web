import React, { forwardRef, ReactNode } from "react"
import { twMerge } from "tailwind-merge"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  href: string
  children?: ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, href, target = "_blank", rel, className, ...props }, ref) => {
    const isExternal = target === "_blank"
    return (
      <a
        href={href}
        ref={ref}
        target={target}
        rel={isExternal ? "noopener noreferrer" : rel}
        className={twMerge("text-blue-500 dark:text-blue-400", className)}
        {...props}
      >
        {children}
      </a>
    )
  }
)
