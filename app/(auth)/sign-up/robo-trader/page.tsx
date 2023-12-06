"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/store"
import { roboTraderFeatures } from "@/utils/onboarding"

import { Button } from "@/components/ui/button"
import BackButton from "@/components/auth/onboarding/back-btn"
import FeatureList from "@/components/auth/onboarding/feature-list"

const RoboTrader = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleClick = (title: string) => {
    // dispatch(setFinancialInfo({ risk_tolerance: title }))
    router.push("/sign-up/membership")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <div className="relative   w-44 lg:w-20  h-44 lg:h-20 my-4 mx-auto lg:ml-0">
        <Image src="/illustrations/onboarding/robo-trader.svg" fill alt="" />
      </div>
      <h1 className="form-title">RoboTrader personal trader in your pocket</h1>
      <p className="form-text mb-2">
        AI will analyze risk profile, to provide insights into investment and
        savings potential
      </p>
      <FeatureList features={roboTraderFeatures} />
      <div className="mt-2 flex w-full flex-col lg:flex-row items-center justify-between form-bottom-section">
        <Button
          variant="ghost"
          className="mb-3 lg:mb-0 lg:mr-2 lg:max-w-[140px] font-semibold"
        >
          Skip for Now
        </Button>
        <Button onClick={() => handleClick("Conservative")}>Continue</Button>
      </div>
    </section>
  )
}

export default RoboTrader
