import React, {
  forwardRef,
  TextareaHTMLAttributes,
  useEffect,
  useState,
} from "react"
import { Check, CheckCheck } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { IconButton } from "../icon-button/IconButton"
import { Box } from "../../layout/box/Box"
import { LoadingIcon } from "../../data-display/loading/LoadingIcon"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  onSubmit?: () => void
  submitDisabled?: boolean
  submitLoading?: boolean
  submitSuccess?: boolean
  submitShow?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      onSubmit,
      submitDisabled,
      submitLoading,
      submitSuccess,
      submitShow = true,
      ...props
    },
    ref
  ) => {
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
      if (submitSuccess) {
        setShowSuccess(true)
        const timer = setTimeout(() => setShowSuccess(false), 2000)
        return () => clearTimeout(timer)
      }
    }, [submitSuccess])
    return (
      <Box className="relative">
        {onSubmit && submitShow && (
          <IconButton
            className="absolute top-1/2 right-1.5 z-1 -translate-y-[57%]"
            size="sm"
            onClick={onSubmit}
            disabled={submitDisabled || submitLoading}
          >
            {submitLoading ? (
              <LoadingIcon />
            ) : showSuccess ? (
              <CheckCheck className="h-5 w-5" />
            ) : (
              <Check className="h-5 w-5" />
            )}
          </IconButton>
        )}
        <textarea
          ref={ref}
          className={twMerge(
            "text-grayscale-700 dark:text-grayscale-200 placeholder-grayscale-400 dark:placeholder-grayscale-400 border-grayscale-150 dark:border-grayscale-700 dark:hover:border-grayscale-650 hover:border-grayscale-300 focus:border-grayscale-300 dark:focus:border-grayscale-650 w-full rounded-2xl border-1 px-4 py-2 text-lg focus:outline-none disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </Box>
    )
  }
)
