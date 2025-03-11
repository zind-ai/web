"use client"

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { ToastProvider } from "../data-display/toast/ToastContext"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const Provider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("system")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme("system")
    }
  }, [])

  useEffect(() => {
    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches

      root.classList.remove("light", "dark")

      if (currentTheme === "light") {
        root.classList.add("light")
      } else if (currentTheme === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.add(prefersDark ? "dark" : "light")
      }
    }

    applyTheme(theme)

    if (theme !== "system") {
      localStorage.setItem("theme", theme)
    } else {
      localStorage.removeItem("theme")
    }
  }, [theme])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (theme === "system") {
        const prefersDark = mediaQuery.matches
        const root = document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(prefersDark ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeContext.Provider>
  )
}
