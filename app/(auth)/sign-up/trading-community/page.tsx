"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { communityFeatures } from "@/utils/onboarding"

import { Button } from "@/components/ui/button"
import BackButton from "@/components/auth/onboarding/back-btn"
import FeatureList from "@/components/auth/onboarding/feature-list"

const TradingCommunity = () => {
  const router = useRouter()
  const handleClick = (title: string) => {
    router.push("/sign-up/join-community")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <div className="relative   w-44 lg:w-20  h-44 lg:h-20 my-4 mx-auto lg:ml-0">
        <Image
          src="/illustrations/onboarding/trading-community.svg"
          fill
          alt=""
        />
      </div>
      <h1 className="form-title">Interact with the trading community</h1>
      <p className="form-text mb-2">
        Get personalized investment recommendations and make informed decisions
      </p>
      <FeatureList features={communityFeatures} />
      <div className="mt-2 flex w-full items-center justify-between form-bottom-section">
        <Button variant="ghost" className="mr-2 max-w-[140px] font-semibold">
          Skip for Now
        </Button>
        <Button onClick={() => handleClick("Conservative")}>Continue</Button>
      </div>
    </section>
  )
}

export default TradingCommunity
