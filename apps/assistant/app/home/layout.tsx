import type { Metadata } from "next"
import { Box, Provider } from "@zind/ui"
import "../../style/globals.css"

export const metadata: Metadata = {
  title: "zind",
  description: "",
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
      <body className="bg-grayscale-25 dark:bg-grayscale-800 font-sans">
        <Provider>
          <Box className="mt-12 flex p-5">{children}</Box>
        </Provider>
      </body>
    </html>
  )
}
