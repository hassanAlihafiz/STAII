import "@/styles/globals.css"
import { Metadata } from "next"
import { ThemeProvider } from "@/containers/theme-provider"
import { StoreProvider } from "@/store/provider"
import SetThemeColor from "@/utils/theme-bg"
import { websocketClient } from "@polygon.io/client-js"

import { siteConfig } from "@/config/site"
import { poppins } from "@/lib/fonts"
import HandleSignInAndOut from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import ChallengeMfa from "@/components/modal/2fa/mfa-challenge"
import MfaEnrollment from "@/components/modal/2fa/mfa-enrollment"
import { LogoutModal } from "@/components/modal/logout-modal"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon-16x16.png",
    apple: "/favicons/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            poppins.className
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <StoreProvider>
              <HandleSignInAndOut />
              <SetThemeColor />
              {children}
              <MfaEnrollment />
              <ChallengeMfa />
              <LogoutModal />
              <Toaster />
            </StoreProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
