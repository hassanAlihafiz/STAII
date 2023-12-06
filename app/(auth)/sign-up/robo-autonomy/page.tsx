"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Coffee, Home, Info } from "lucide-react"

import BackButton from "@/components/auth/onboarding/back-btn"

const InvestingExperience = () => {
  const router = useRouter()
  const handleClick = (title: string) => {
    router.push("/sign-up/trading-community")
  }
  return (
    <section className="form-container ">
      <BackButton />
      <h1 className="form-title">
        Set level of RoboTrader’s autonomy while trading
      </h1>
      <p className="form-text flex flex-row items-center">
        <Info className="mr-2 h-[18px] w-[18px]" /> These preferences can be
        changed at any time within the app&apos;s settings
      </p>
      <div className="my-4 w-full">
        <div
          className={` my-2 flex w-full cursor-pointer  items-center justify-between border-b  border-[#EDEEF3] px-1 py-3 transition-all hover:rounded-xl hover:border-transparent hover:bg-[#ECFDF5] dark:border-[#3E4856] dark:hover:border-transparent dark:hover:bg-[#1E3E34]`}
          onClick={() => handleClick("autonomus")}
        >
          <div className="flex items-center  justify-start ">
            <span className="grid aspect-square min-w-[40px] place-items-center overflow-hidden rounded-full bg-[#ECFDF5] text-[#01A954] dark:bg-[#1E3E34]">
              <Coffee className="h-5 w-5" />
            </span>

            <h6 className="ml-3 text-base font-semibold text-[#2A3033] dark:text-white ">
              RoboTrader will run fully autonomous
            </h6>
          </div>
          <Image alt="" src="/icons/next.svg" width={20} height={20} />
        </div>
        <div
          className={` my-2 flex w-full cursor-pointer  items-center justify-between  px-1 py-3 transition-all hover:rounded-xl  hover:bg-[#E6F0FF]   dark:hover:bg-[#1E3E34] hover:dark:bg-[#09183F]`}
          onClick={() => handleClick("autonomus")}
        >
          <div className="flex items-center  justify-start ">
            <span className="grid aspect-square min-w-[40px] place-items-center overflow-hidden rounded-full bg-[#E6F0FF] text-[#1D5BD8] dark:bg-[#09183F] ">
              <Home className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <h6 className="ml-3 text-base font-semibold text-[#2A3033] dark:text-white ">
                I want to approve transaction that RoboTrader going to make
              </h6>
              <p className="ml-3 text-xs  text-[#6A7381] dark:text-[#D7DBE0] ">
                As soon as the RoboTrader is going to place an order you will
                receive notification to confirm the transaction
              </p>
            </div>
          </div>
          <Image alt="" src="/icons/next.svg" width={20} height={20} />
        </div>
      </div>
    </section>
  )
}

export default InvestingExperience
