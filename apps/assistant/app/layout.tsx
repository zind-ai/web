import { Suspense } from "react"
import type { Metadata } from "next"
import { UIProvider } from "@zind/ui"
import { Navbar } from "./navbar/Navbar"
import { UserProvider } from "./user/UserContext"
import { AssistantProvider } from "./assistant/AssistantContext"

import "../style/globals.css"

export const metadata: Metadata = {
  title: "zind",
  description: "",
  icons: {
    icon: "/assets/favicon.ico",
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
        <Suspense fallback={<div>Loading...</div>}>
          <UIProvider>
            <UserProvider>
              <AssistantProvider>
                <Navbar />
                {children}
              </AssistantProvider>
            </UserProvider>
          </UIProvider>
        </Suspense>
      </body>
    </html>
  )
}
