import React from "react"

import "@/styles/common-page.css"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const AccountInvesting = () => {
  return (
    <div className="w-full">
      <div className="mb-[15px]">
        <h1 className="black-xl-700 dark:text-white">Investing</h1>
      </div>
      <div>
        <div className="flex-baseline-between mb-[15px] gap-4">
          <p className="whitespace-nowrap heading-box dark:text-brand-gray-30">
            Total investing value
          </p>
          <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
          <p className="whitespace-nowrap black-550 text-lg dark:text-white">
            $96,656.32
          </p>
        </div>

        <div className="flex-baseline-between mb-[15px] gap-4">
          <p className="whitespace-nowrap heading-box dark:text-brand-gray-30">
            Brokerage holdings
          </p>
          <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
          <p className="whitespace-nowrap black-550 text-lg dark:text-white">
            $96,656.32
          </p>{" "}
        </div>

        <div className="flex-baseline-between mb-[15px] gap-4">
          <p className="whitespace-nowrap heading-box dark:text-brand-gray-30">
            Withdraw/buying power
          </p>
          <div className="w-full bg-brand-gray-20 h-[2px] rounded dark:bg-brand-gray-80"></div>
          <p className="whitespace-nowrap black-550 text-lg dark:text-white">
            $100.00
          </p>{" "}
        </div>
      </div>
      <Link href="/transfer">
        <Button className="my-[24px] md:hidden w-full h-[52px] border border-brand-green-40 rounded-[10px] font-[550] capitalize tracking-[1px] dark:border-brand-dark-bg">
          Transfer
        </Button>
      </Link>
    </div>
  )
}

export default AccountInvesting
