import React from "react"
import Link from "next/link"
import { Sliders } from "lucide-react"

import Table from "./table"

const RoboFunds = () => {
  return (
    <div className="relative overflow-hidden px-px">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">RoboFunds </h3>
          <p className="hidden md:block text-xs text-brand-gray-60 dark:text-brand-gray-30 mt-1">
            An alternative way to invest to hedge funds without a legal
            nightmare
          </p>
        </div>

        <Link
          href="/portfolio/adjust-fund-allocation"
          className="inline-flex items-center rounded-xl text-sm font-semibold ring-1 ring-brand-green-40 bg-brand-green-20 px-5 py-2.5 text-brand-green-70 hover:ring-brand-green-70 transition duration-200 space-x-2"
        >
          <Sliders
            size={18}
            className="border-[1.5px] border-brand-green-70 rounded-sm p-0.5"
          />
          <span>Adjust</span>
        </Link>
      </div>
      <Table />
    </div>
  )
}

export default RoboFunds
