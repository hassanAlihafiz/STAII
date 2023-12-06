"use client"

import { useLayoutEffect } from "react"
import { useAppDispatch } from "@/store"
import {
  toggelMfaChallenge,
  toggelMfaEnrollment,
} from "@/store/slices/app-slice"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import MobileNavigation from "@/components/footer/mobile-navigatoin"
import { SiteHeader } from "@/components/header/site-header"

interface IndexLayoutProps {
  children: React.ReactNode
}

export default function IndexLayout({ children }: IndexLayoutProps) {
  const supabase = createClientComponentClient()
  const dispatch = useAppDispatch()
  const handleMfa = async () => {
    try {
      const { data, error } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      console.log(data)
      if (error) {
        throw error
      }
      if (data.currentLevel === "aal1") {
        if (data.nextLevel === "aal2") {
          dispatch(toggelMfaChallenge("must"))
        } else {
          dispatch(toggelMfaEnrollment("must"))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  useLayoutEffect(() => {
    handleMfa()
  }, [])
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader isMvp />
      {/* <OfflineAlert /> */}
      <div className="flex-1 pb-[105px] md:pb-105 lg:pb-10">{children}</div>

      <MobileNavigation isMvp={true} />
    </div>
  )
}
