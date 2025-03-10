import type { Metadata } from "next"
import { Provider } from "@zind/ui"
import "../style/globals.css"

export const metadata: Metadata = {
  title: "zind",
  description: "",
  icons: {
    icon: "/favicon-story.ico",
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
      <body className="bg-grayscale dark:bg-grayscale-800 font-sans font-normal">
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
