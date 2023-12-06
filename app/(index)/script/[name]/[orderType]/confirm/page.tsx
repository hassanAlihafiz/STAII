"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeftCircle, X } from "lucide-react"

import "@/styles/common-page.css"
import { useParams } from "next/navigation"

import BackBtn from "@/components/ui/back-button"
import { Button } from "@/components/ui/button"
import ConfirmOrder from "@/components/modal/script/confirm-order"

const SellBuyScript: React.FC = () => {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const title = params?.orderType
  const sharesType = params?.name
  const description =
    title === "buy"
      ? "$100.88 cash available"
      : "10 shares for $902.4 available"
  return (
    <div className="w-full max-w-[480px] m-[auto] md:mt-6 mb-6 flex flex-col overflow-hidden">
      <div className="mobile-card-box md:card-box md:dark:dark-card-box md:border-shadow">
        {/* header */}
        <div className="flex-center-between">
          <div className="max-md:hidden">
            <BackBtn />
          </div>

          <div className="max-md:hidden">
            <Link href="/script/set-time">
              <X className="ml-auto w-5 cursor-pointer text-brand-gray-50" />
            </Link>
          </div>

          <div className="md:hidden flex items-center justify-between z-10">
            <Link href="/script/set-time">
              <div>
                <ArrowLeftCircle
                  strokeWidth={"0.5px"}
                  size={"35px"}
                  className="stroke-brand-gray-50 dark:fill-brand-gray-70"
                />
              </div>
            </Link>
          </div>
        </div>
        {/* header */}

        <div>
          <div className="flex flex-col my-6">
            <div className="text-2xl black-600 dark:text-white capitalize">
              {title} {sharesType?.toUpperCase()}
            </div>
            <div className="text-brand-gray-60 text-sm dark:text-brand-gray-30">
              {description}
            </div>
          </div>
          <div className="flex-center-between py-4 border-y border-brand-gray-20 dark:border-brand-blue-90">
            <div className="black-400 text-base dark:text-white">
              Number of Shares
            </div>
            <div className="black-600 text-base dark:text-white">10</div>
          </div>
          <div className="flex-center-between py-4 border-b border-brand-gray-20 dark:text-white dark:border-brand-blue-90">
            <div className="black-400 text-base dark:text-white">
              Stop Price
            </div>
            <div className="black-600 text-base dark:text-white">$90.00</div>
          </div>
          <div className="flex-center-between py-4 dark:text-white">
            <div className="black-400 text-base dark:text-white">
              Estimated Credit
            </div>
            <div className="black-600 text-base dark:text-white">$902.11</div>
          </div>
          <div>
            {" "}
            <p className="w-full text-brand-gray-60 text-xs dark:text-brand-gray-30">
              You are placing a good till canceled stop limit order to sell 10
              share (s) of CCIV. When the price of CCIV reaches $29.00, your
              order will be converted to a limit order at $30.00 per share.
            </p>
          </div>
          <div>
            <Button
              className="rounded-xl mt-6"
              onClick={() => {
                setOpen(true)
              }}
            >
              Submit & {title}
            </Button>
          </div>
        </div>
      </div>
      <ConfirmOrder open={open} setOpen={setOpen} sharesType={sharesType} />
    </div>
  )
}

export default SellBuyScript
