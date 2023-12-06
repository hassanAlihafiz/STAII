"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { setOnboardingStep } from "@/store/slices/user-slice"

import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/header/theme-toggle"

import Logo from "../logo"
import ProfileDropDown from "./profile-dropdown"

export function AuthHeader() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.user.profile)
  const currentStep = useAppSelector((state) => state.user.onBoardingStep)
  const checkOnBoardingProgress = () => {
    switch (pathname) {
      case "/sign-up/verification":
        dispatch(setOnboardingStep(1))
        break
      case "/sign-up/address":
        dispatch(setOnboardingStep(2))
        break
      case "/sign-up/connect-bank":
        dispatch(setOnboardingStep(3))
        break
      case "/sign-up/financial-goal":
        dispatch(setOnboardingStep(4))
        break
      case "/sign-up/annual-income":
        dispatch(setOnboardingStep(5))
        break
      case "/sign-up/net-worth":
        dispatch(setOnboardingStep(6))
        break
      case "/sign-up/investing-experience":
        dispatch(setOnboardingStep(7))
        break
      case "/sign-up/investing-duration":
        dispatch(setOnboardingStep(8))
        break
      case "/sign-up/risk-tolerance":
        dispatch(setOnboardingStep(9))
        break
      case "/sign-up/analyze":
        dispatch(setOnboardingStep(10))
        break
      case "/sign-up/investment-recommendation":
        dispatch(setOnboardingStep(11))
        break
      case "/sign-up/personalized-portfolio":
        dispatch(setOnboardingStep(12))
        break
      case "/sign-up/robo-trader":
        dispatch(setOnboardingStep(13))
        break
      case "/sign-up/member":
        dispatch(setOnboardingStep(14))
        break
      case "/sign-up/robo-autonomy":
        dispatch(setOnboardingStep(15))
        break
      case "/sign-up/trading-community":
        dispatch(setOnboardingStep(16))
        break
      case "/sign-up/join-community":
        dispatch(setOnboardingStep(17))
        break
    }
  }
  useEffect(() => {
    checkOnBoardingProgress()
  }, [pathname])

  return (
    <header className="flex w-full flex-col bg-transparent   ">
      <div className="container flex h-16 items-center  sm:justify-between sm:space-x-0">
        <Logo />
        <div className="flex flex-1 items-center justify-end ">
          <nav className="flex items-center">
            <ThemeToggle />
            {!profile?.uid ? (
              <>
                {pathname.includes("/sign-up") ? (
                  <Link
                    href={"/login"}
                    className="form-link md:ml-6 font-semibold"
                  >
                    Log In
                  </Link>
                ) : (
                  <Link
                    href={"/sign-up"}
                    className="form-link md:ml-6 font-semibold"
                  >
                    Create Account
                  </Link>
                )}
              </>
            ) : (
              <ProfileDropDown />
            )}
          </nav>
        </div>
      </div>
      <Progress
        className="bg-[#EDEEF3] dark:bg-[#1B2335]"
        value={(currentStep / 17) * 100}
      />
    </header>
  )
}
