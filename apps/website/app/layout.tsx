import type { Metadata } from "next"
import { Box, UIProvider } from "@zind/ui"
import "../style/globals.css"

export const metadata: Metadata = {
  title: "zind",
  description: "We’re building a truly capable and personal AI.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="dark:bg-grayscale-800 bg-grayscale-25 font-sans font-normal">
        <UIProvider>
          <Box className="mt-12 flex p-5">{children}</Box>
        </UIProvider>
      </body>
    </html>
  )
}
