"use client"

import Link from "next/link"
import Button from "@/ui/portfolio-button"
import { ArrowLeft } from "lucide-react"

import FundAllocation from "@/components/portfolio/fund-allocation"

const initialState = [
  {
    id: 1,
    title: "RoboTrader",
    defaultValue: 60,
  },
  {
    id: 2,
    title: "RoboFunds",
    defaultValue: 40,
  },
  {
    id: 3,
    title: "MMCAP",
    defaultValue: 5,
  },
  {
    id: 4,
    title: "VR Global Offshore",
    defaultValue: 5,
  },
]

const AdjustRoboTrader = () => {
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
            <h2 className="text-2xl font-semibold">Adjust allocation funds </h2>
            <p className="text-sm text-brand-gray-60 dark:text-brand-gray-30 lg:mt-1">
              Set the percentage of portfolio assets that will be allocated to
              the selected fund
            </p>
          </div>
          <div className="hidden md:block">
            <Button disabled>Save Changes</Button>
          </div>
        </div>

        <FundAllocation initialFunds={initialState} />

        {/* Cancel */}
        <div className="sticky md:static bottom-0 bg-white dark:bg-brand-dark-bg -mx-px pt-10">
          <Button full disabled className="md:hidden">
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AdjustRoboTrader
