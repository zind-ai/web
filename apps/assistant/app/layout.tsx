import type { Metadata } from "next"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { UIProvider } from "@zind/ui"
import { Navbar } from "./navbar/Navbar"
import { AssistantProvider } from "./assistant/AssistantContext"

import "../style/globals.css"
import { Suspense } from "react"

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
          <UserProvider>
            <UIProvider>
              <AssistantProvider>
                <Navbar />
                {children}
              </AssistantProvider>
            </UIProvider>
          </UserProvider>
        </Suspense>
      </body>
    </html>
  )
}
