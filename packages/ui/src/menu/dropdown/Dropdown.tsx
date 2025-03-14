"use client"

import { useEffect, useRef, ReactNode, forwardRef, JSX } from "react"
import { Box } from "../../layout/box/Box"

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  items: JSX.Element[]
  open: boolean
  onClose: () => void
}

export const Dropdown = forwardRef<HTMLElement, DropdownProps>(
  ({ children, items, open, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          onClose()
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])

    return (
      <Box className="relative inline-block w-auto text-left" ref={dropdownRef}>
        {children}
        {open && (
          <Box className="bg-grayscale-125 dark:bg-grayscale-725 absolute right-0 mt-2 w-48 rounded-lg shadow-lg">
            <ul className="flex flex-col gap-2 py-2">
              {items.map((item, index) => (
                <li key={index} className="px-2">
                  {item}
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    )
  }
)
