"use client"

import React, { useState } from "react"

import "@/styles/common-page.css"
import Link from "next/link"
import { ArrowLeftCircleIcon } from "lucide-react"

import BackBtn from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import SubscribedModal from "@/components/market/robo-fund/subscribe-confirm-modal"
import SubscriptionEditDrawer from "@/components/market/robo-fund/subscription-edit-drawer"

const RobofundSubscribe = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="md:w-[440px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="white-box dark:dark-white-box z-10 md:border-shadow max-md:px-5 max-md:py-0 max-md:!bg-transparent max-md:border-0">
        <div className="max-md:hidden">
          <BackBtn />
        </div>
        <div className="md:hidden flex items-center justify-between z-10">
          <Link href="/market/robo-funds">
            <ArrowLeftCircleIcon
              strokeWidth={"0.5px"}
              size={"40px"}
              className="stroke-brand-gray-50 dark:fill-brand-gray-70"
            />
          </Link>
        </div>
        <div className="my-6 max-md:mt-3">
          <div>
            <h1 className="black-600 text-2xl leading-10 dark:text-white">
              Subscribe to Growth Financial
            </h1>
          </div>
          <div>
            <p className="text-sm text-brand-gray-60 font-normal dark:text-brand-gray-30">
              $100.11 available
            </p>
          </div>
        </div>

        <hr className="divider" />

        <div className="my-4 flex justify-between items-start">
          <div className="text-base whitespace-nowrap flex-[2]">
            Subscription Fee
          </div>
          <div className="text-right flex-1">
            <div className="black-600 dark:text-white">$15 per month</div>
            <p className="text-xs dark:text-brand-gray-30">
              Including $4.15 fee of algorithm creator
            </p>
          </div>
        </div>

        <hr className="divider" />

        <div className="my-4 flex justify-between items-start">
          <div className="text-base flex-[2]">
            Percentage of Portfolio Will Allocated to the Fund
          </div>
          <div className="text-right flex-1">
            <div className="black-600 dark:text-white">
              60% <SubscriptionEditDrawer />
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="my-4 flex justify-between items-start">
          <div className="text-base flex-[2]">RoboTrader Allocation</div>
          <div className="text-right flex-1">
            <div className="black-600 dark:text-white">40% </div>
          </div>
        </div>
        <div className="text-brand-gray-60 text-xs mb-6 dark:text-brand-gray-30">
          You are placing a good till canceled stop limit order to sell 10 share
          (s) of CCIV. When the price of CCIV reaches $29.00, your order will
          be converted to a limit order at $30.00 per share.
        </div>
        <Button onClick={() => setOpen(true)} className="rounded-xl">
          Subscribe
        </Button>
      </div>
      <SubscribedModal {...{ open, setOpen }} />
    </div>
  )
}

export default RobofundSubscribe
