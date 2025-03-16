import type { Metadata } from "next"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import { UIProvider } from "@zind/ui"
import { Navbar } from "./navbar/Navbar"
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
      <UserProvider>
        <body className="bg-grayscale dark:bg-grayscale-800 font-sans font-normal">
          <UIProvider>
            <AssistantProvider>
              <Navbar />
              {children}
            </AssistantProvider>
          </UIProvider>
        </body>
      </UserProvider>
    </html>
  )
}
