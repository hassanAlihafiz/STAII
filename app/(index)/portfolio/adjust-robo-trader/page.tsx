"use client"

import { useState } from "react"
import Link from "next/link"
import Button from "@/ui/portfolio-button"
import { ArrowLeft } from "lucide-react"

import FundAllocation from "@/components/portfolio/fund-allocation"
import RoboTraderSettings from "@/components/portfolio/robo-trader/setting"
import RoboTraderRiskManager from "@/components/robo-trader/risk-manager"

const initialFunds = [
  {
    id: 1,
    title: "RoboTrader",
    defaultValue: 60,
  },
  {
    id: 2,
    title: "RoboFunds",
    defaultValue: 30,
  },
]

const AdjustRoboTrader = () => {
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
  return (
    <main className="max-w-2xl lg:max-w-3xl mx-auto p-5 !pb-20 md:p-8 ">
      <Link
        href="/portfolio"
        className="flex items-center gap-1 text-brand-green-70 hover:text-brand-green-80"
      >
        <ArrowLeft size={17} strokeWidth={2.5} />
        <span className="font-semibold">Back</span>
      </Link>

      <div className="divide-y divide-brand-gray-10 dark:divide-brand-gray-70 mt-6">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Adjust RoboTrader </h2>
            <p className="text-sm text-brand-gray-60 dark:text-brand-gray-30 lg:mt-1">
              This is at the right level of risk for you
            </p>
          </div>
          <div className="hidden md:block">
            <Button disabled>Save Changes</Button>
          </div>
        </div>
        <RoboTraderRiskManager
          riskLevel={riskLevel}
          setRiskLevel={setRiskLevel}
          incrementRiskLevel={incrementRiskLevel}
          decrementRiskLevel={decrementRiskLevel}
        />
        <RoboTraderSettings />
        <div className="py-7">
          <h3 className="text-lg font-semibold">
            RoboTrader monthly transfers
          </h3>
          <div className="md:flex items-center justify-between mt-4">
            <div className="mb-4 md:mb-0">
              <p>
                <span className="text-brand-green-70">+$100</span> from JP
                Morgan (1001001925)
              </p>
              <p className="text-sm text-brand-gray-50 dark:text-brand-gray-30">
                RoboTrader monthly receives fixed sum to increase power of your
                portfolio
              </p>
            </div>

            <Button full>Change</Button>
          </div>
        </div>

        <FundAllocation initialFunds={initialFunds} />

        {/* Cancel */}
        <div className="sticky md:static bottom-0 bg-white dark:bg-brand-dark-bg md:flex items-start justify-between py-7 -mx-px">
          <div className="max-w-sm mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Cancel Subscription</h3>
            <p className="text-sm text-brand-gray-60 dark:text-brand-gray-30 mt-1">
              This action cannot be reverted. All funds will be saved but auto
              trading will be stopped
            </p>
          </div>

          <div className="grid gap-5">
            <Button full variant="red">
              Cancel My Subscription
            </Button>
            <Button full disabled className="md:hidden">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AdjustRoboTrader
