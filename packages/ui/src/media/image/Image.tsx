import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, ...props }, ref) => {
    return (
      <img ref={ref} src={src} className={twMerge("", className)} {...props} />
    )
  }
)
