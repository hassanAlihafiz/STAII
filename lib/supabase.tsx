"use client"

import React, { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getUserDetails, logoutUser } from "@/async-functions/account"
import { getUsersIBDetails } from "@/async-functions/account/ib"
import { generateUserQuiltToken } from "@/async-functions/bank"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  setMfaFactorId,
  toggelMfaChallenge,
  toggelMfaEnrollment,
} from "@/store/slices/app-slice"
import { setToken } from "@/store/slices/user-slice"
import { useQuilttSession } from "@quiltt/react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { toast } from "@/components/ui/use-toast"

const unprotected_routes = [
  "/reset-password",
  "/sign-up/verification",
  "/sign-up/address",
]
let logoutTimer: any = null
const HandleSignInAndOut = () => {
  const supabase = createClientComponentClient()

  const profile = useAppSelector((state) => state.user.profile)
  const { importSession } = useQuilttSession()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const showMfa = useAppSelector((state) => state.app.showMfaEnrollment)

  const showMfaChallenge = useAppSelector((state) => state.app.showMfaChallenge)
  const setQuilttSession = async (session: any) => {
    const { token } = await generateUserQuiltToken(session?.user.id!)
    if (typeof token === "string") {
      importSession(token)
    }
  }
  const handleMfa = async () => {
    try {
      const { data, error } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

      if (error) {
        throw error
      }
      if (pathname === "/transfer") return
      // commented for ib video
      // if (data.currentLevel === "aal1") {
      //   if (data.nextLevel === "aal2") {
      //     dispatch(toggelMfaChallenge("must"))
      //   } else {
      //     if (showMfa !== false) dispatch(toggelMfaEnrollment("optional"))
      //   }
      // }
    } catch (error) {
      console.error(error)
    }
  }

  const closeMfaModal = () => {
    if (showMfa !== null) dispatch(toggelMfaEnrollment(false))
    if (showMfaChallenge !== null) dispatch(toggelMfaChallenge(false))
  }
  const handleSignIn = async (event: string, session: any) => {
    let user = session?.user
    if (user) {
      if (user?.factors) dispatch(setMfaFactorId(user.factors[0]?.id))
      dispatch(setToken(session?.access_token))
      await getUserDetails(supabase, user.id!)(dispatch)
      const ibDetails = await getUsersIBDetails(user.id)(supabase, dispatch)
      if (event === "PASSWORD_RECOVERY") {
        router.push("/reset-password")
      } else if (user && !ibDetails) {
        if (unprotected_routes.includes(pathname)) return
        toast({
          variant: "default",
          title: " Application Pending!",
          description: "Please complete your application",
        })
        router.push("/sign-up/verification")
      }
    }

    // await handleMfa()
    // if (session?.access_token) {
    //   dispatch(setToken(session?.access_token))
    //   console.log(session?.access_token)
    //   // setAxiosInstanceToken(session?.access_token)
    // }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (profile?.uid) {
        startLogoutTimer()
      }
    } else {
      clearLogoutTimer()
    }
  }
  const startLogoutTimer = () => {
    clearLogoutTimer()
    logoutTimer = setTimeout(() => {
      logout()
    }, 60000)
  }

  const clearLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer)
      logoutTimer = null
    }
  }

  const logout = async () => {
    if (!profile?.uid || !logoutTimer) return
    if (pathname?.includes("/meet/")) return
    await logoutUser(supabase)(dispatch)
    router.push("/login")
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      handleSignIn(event, session)
      if (!session?.user) closeMfaModal()
    })
    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase, router])

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearLogoutTimer()
    }
  }, [profile])

  return <></>
}

export default HandleSignInAndOut
