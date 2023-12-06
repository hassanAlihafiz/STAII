"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { assetAllocation } from "@/utils/asset-allocation"

import { Button } from "@/components/ui/button"
import MultipleProgress from "@/components/ui/mutliple-progress"
import BackButton from "@/components/auth/onboarding/back-btn"
import { PortfolioDeclineModal } from "@/components/modal/portfolio-decline-modal"
import RoboTraderRiskManager from "@/components/robo-trader/risk-manager"

type AssetListProp = { li: (typeof assetAllocation)[0] }
const AssetList = ({ li }: AssetListProp) => {
  return (
    <div className="my-7 flex w-full items-start justify-start">
      <span
        className="mt-2 h-2 w-2 rounded-full "
        style={{ backgroundColor: li.color }}
      />
      <div className="ml-2 flex flex-col">
        <h6 className=" text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
          {li.title}
        </h6>
        <p className="  text-sm font-normal text-[#9CA5AF] dark:text-[#EDEEF3]">
          {li.description}
        </p>
      </div>
      <span className="ml-auto text-base font-semibold text-[#2D3A43] dark:text-[#EDEEF3]">
        {li.value}%
      </span>
    </div>
  )
}
const RiskTolerance = () => {
  const router = useRouter()
  const [riskLevel, setRiskLevel] = useState<number>(7.0)

  const incrementRiskLevel = () => {
    if (riskLevel < 10) {
      setRiskLevel(riskLevel + 1)
    }
  }
  const decrementRiskLevel = () => {
    if (riskLevel > 0) {
      setRiskLevel(riskLevel - 1)
    }
  }

  const handleClick = () => {
    router.push("/sign-up/robo-trader")
  }
  return (
    <section className="form-container ">
      <div className="flex w-full items-center justify-between">
        <BackButton />
        <PortfolioDeclineModal />
      </div>
      <h1 className="form-title">Your personalized portfolio</h1>
      <p className="form-text mb-7">
        You can change the risk level at any time within the app&apos;s settings
      </p>
      <RoboTraderRiskManager
        riskLevel={riskLevel}
        setRiskLevel={setRiskLevel}
        incrementRiskLevel={incrementRiskLevel}
        decrementRiskLevel={decrementRiskLevel}
      />

      <hr className="my-3 w-full bg-[#EDEEF3] dark:border-[#3E4856]" />
      <div className="mt-4 w-full">
        <MultipleProgress list={assetAllocation} />
        {assetAllocation.map((li, i) => (
          <AssetList li={li} key={i} />
        ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-between md:mt-6 form-bottom-section ">
        <Button
          variant={"ghost"}
          className="mr-2 font-semibold sm:w-1/3 md:mr-4"
        >
          Skip for Now
        </Button>
        <Button onClick={() => handleClick()}>Continue</Button>
      </div>
    </section>
  )
}

export default RiskTolerance
