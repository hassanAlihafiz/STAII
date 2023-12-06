"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { membershipFeatures } from "@/utils/onboarding"

import { Button } from "@/components/ui/button"
import BackButton from "@/components/auth/onboarding/back-btn"
import FeatureList from "@/components/auth/onboarding/feature-list"

const RiskTolerance = () => {
  const router = useRouter()
  const handleClick = (title: string) => {
    router.push("/sign-up/robo-autonomy")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <div className="relative   w-44 lg:w-20  h-44 lg:h-20 my-4 mx-auto lg:ml-0">
        <Image src="/illustrations/onboarding/membership.svg" fill alt="" />
      </div>
      <h1 className="form-title">Unlock you membership</h1>
      <p className="form-text mb-2">
        AI will analyze risk profile, to provide insights into investment and
        savings potential
      </p>
      <FeatureList features={membershipFeatures} />
      <div className="flex w-full items-end text-[#9CA5AF] justify-center lg:justify-start ">
        <h6 className="mb-0 inline-block h-14 text-[44px] font-medium text-[#2A3033] dark:text-white">
          $20
        </h6>
        /month
      </div>
      <p className="mb-4 mt-2 lg:mt-0 text-sm text-[#9CA5AF]">
        Fee will be deducted from the
        <span className="ml-1 text-primary-foreground">monthly transfers</span>
      </p>
      <div className="mt-2 flex w-full items-center justify-between form-bottom-section">
        <Button variant="ghost" className="mr-2 max-w-[140px] font-semibold">
          Skip for Now
        </Button>
        <Button onClick={() => handleClick("Conservative")}>
          Submit Membership
        </Button>
      </div>
    </section>
  )
}

export default RiskTolerance
